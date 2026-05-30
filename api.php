<?php
/* =============================================================
   API — single endpoint, action-based dispatch.

     GET  api.php?action=list           → JSON array of slides
     POST api.php?action=save           → body: full slide array, replaces all
     GET|POST api.php?action=export     → re-writes slides.json from DB
     POST api.php?action=seed           → body: array; only seeds if DB is empty
                                           (?force=1 to override)
     POST api.php?action=reset          → wipes DB (next seed re-loads defaults)
     GET  api.php?action=status         → diagnostic info
   ============================================================= */

require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

function readJsonBody(): array {
  $raw = file_get_contents('php://input');
  if ($raw === false || $raw === '') {
    throw new RuntimeException("Empty request body");
  }
  $data = json_decode($raw, true);
  if (!is_array($data)) {
    throw new RuntimeException("Body must be valid JSON: " . json_last_error_msg());
  }
  return $data;
}

function ok(array $payload = []): void {
  echo json_encode(['ok' => true] + $payload, JSON_UNESCAPED_UNICODE);
}

try {
  switch ($action) {

    case 'list':
      // Always return a fresh array (even if empty) so the editor can
      // distinguish "DB has no slides" from "API broke".
      echo json_encode(readAllSlides(), JSON_UNESCAPED_UNICODE);
      break;

    case 'save':
      if ($method !== 'POST') {
        http_response_code(405);
        throw new RuntimeException("save requires POST");
      }
      $body = readJsonBody();
      if (count($body) === 0) {
        throw new RuntimeException("Cannot save an empty slide array");
      }
      $count = replaceAllSlides($body);
      $exp   = writeSlidesJson();
      ok(['saved' => $count, 'exported' => $exp]);
      break;

    case 'export':
      $exp = writeSlidesJson();
      ok(['exported' => $exp]);
      break;

    case 'seed':
      if ($method !== 'POST') {
        http_response_code(405);
        throw new RuntimeException("seed requires POST");
      }
      $existing = readAllSlides();
      $force = !empty($_GET['force']);
      if (count($existing) > 0 && !$force) {
        ok([
          'seeded'  => false,
          'reason'  => 'already_seeded',
          'count'   => count($existing),
          'hint'    => 'POST ?action=seed&force=1 to overwrite',
        ]);
        break;
      }
      $body = readJsonBody();
      if (count($body) === 0) {
        throw new RuntimeException("Seed body must be a non-empty slide array");
      }
      $count = replaceAllSlides($body);
      $exp   = writeSlidesJson();
      ok(['seeded' => $count, 'exported' => $exp]);
      break;

    case 'reset':
      if ($method !== 'POST') {
        http_response_code(405);
        throw new RuntimeException("reset requires POST");
      }
      db()->exec("DELETE FROM slides");
      // Also clear the JSON export so bootstrap is needed next.
      if (is_file(JSON_OUT)) @unlink(JSON_OUT);
      ok(['reset' => true]);
      break;

    case 'status':
      $count = (int) db()->query("SELECT COUNT(*) FROM slides")->fetchColumn();
      ok([
        'slides_count'     => $count,
        'last_saved_at'    => getMeta('last_saved_at'),
        'last_exported_at' => getMeta('last_exported_at'),
        'json_exists'      => is_file(JSON_OUT),
        'json_path'        => basename(JSON_OUT),
        'json_bytes'       => is_file(JSON_OUT) ? filesize(JSON_OUT) : 0,
      ]);
      break;

    case 'videos':
      // Scan videos/ for any .mp4 files. Returns paths RELATIVE to the
      // project root so they can be dropped into a slide's `video` field
      // unchanged.
      echo json_encode(scanVideos(), JSON_UNESCAPED_UNICODE);
      break;

    case 'upload':
      // Multipart upload — saves the file under videos/<target>. The
      // target path is constrained: relative, no '..', must end .mp4.
      if ($method !== 'POST') {
        http_response_code(405);
        throw new RuntimeException("upload requires POST");
      }
      if (empty($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        $err = $_FILES['file']['error'] ?? 'no file';
        throw new RuntimeException("Upload failed (code: $err)");
      }
      $target = trim($_POST['target'] ?? '');
      $rel    = sanitiseVideoTarget($target);
      $abs    = __DIR__ . '/' . $rel;

      $dir = dirname($abs);
      if (!is_dir($dir) && !mkdir($dir, 0775, true)) {
        throw new RuntimeException("Cannot create directory: " . dirname($rel));
      }
      if (!move_uploaded_file($_FILES['file']['tmp_name'], $abs)) {
        throw new RuntimeException("Failed to write " . $rel);
      }
      ok([
        'uploaded' => [
          'path'  => $rel,
          'bytes' => filesize($abs),
        ],
      ]);
      break;

    default:
      http_response_code(404);
      echo json_encode([
        'ok'    => false,
        'error' => 'Unknown action',
        'hint'  => 'Use one of: list, save, export, seed, reset, status, videos, upload',
      ]);
  }
} catch (Throwable $e) {
  // Preserve a more specific code (405, etc.) if one was set before the throw.
  if (http_response_code() === 200) http_response_code(500);
  echo json_encode([
    'ok'    => false,
    'error' => $e->getMessage(),
  ]);
}

/* ----- Video helpers ----- */

function scanVideos(): array {
  $base = __DIR__ . '/videos';
  if (!is_dir($base)) return [];

  // Accept videos AND still images — slides can use either as background.
  $exts = ['mp4', 'jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

  $items = [];
  $it = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator(
      $base,
      FilesystemIterator::SKIP_DOTS | FilesystemIterator::UNIX_PATHS
    )
  );
  foreach ($it as $file) {
    /** @var SplFileInfo $file */
    if (!$file->isFile()) continue;
    $ext = strtolower($file->getExtension());
    if (!in_array($ext, $exts, true)) continue;

    // Make the path relative to the project root, normalised to forward slashes.
    $abs = str_replace('\\', '/', $file->getPathname());
    $rel = 'videos/' . ltrim(substr($abs, strlen($base)), '/');

    // Derive a section label from the parent directory name (sectionN).
    $dirName = basename(dirname($abs));
    $section = preg_match('/^section(\d+)$/i', $dirName, $m) ? (int) $m[1] : null;

    $items[] = [
      'path'    => $rel,
      'name'    => $file->getFilename(),
      'kind'    => $ext === 'mp4' ? 'video' : 'image',
      'section' => $section,
      'bytes'   => $file->getSize(),
      'mtime'   => $file->getMTime(),
    ];
  }

  usort($items, fn($a, $b) => strnatcasecmp($a['path'], $b['path']));
  return $items;
}

/* Validate an upload target path: must be `videos/...`, no path traversal,
   must end in an allowed extension (.mp4 or a still-image format), only
   safe characters. Returns the normalised relative path. */
function sanitiseVideoTarget(string $target): string {
  if ($target === '') {
    throw new RuntimeException("Upload target path is empty");
  }
  // Normalise slashes, collapse repeats, strip leading ./
  $target = str_replace('\\', '/', $target);
  $target = preg_replace('#/+#', '/', $target);
  $target = ltrim($target, './');

  if (!str_starts_with($target, 'videos/')) {
    throw new RuntimeException("Target must start with 'videos/' — got: $target");
  }
  if (str_contains($target, '..')) {
    throw new RuntimeException("Target may not contain '..'");
  }
  if (!preg_match('#^videos/[A-Za-z0-9._/-]+\.(mp4|jpe?g|png|webp|gif|avif)$#i', $target)) {
    throw new RuntimeException("Target may only contain letters, digits, '.', '_', '-', '/' and must end in .mp4/.jpg/.png/.webp/.gif/.avif");
  }
  return $target;
}
