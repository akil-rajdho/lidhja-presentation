<?php
/* =============================================================
   DB layer — SQLite via PDO.

   The database file lives in data/slides.sqlite. Schema is created
   on first connection. One row per slide; everything type-specific
   (titles, body, videos, items, refs…) lives in the `data` JSON
   column, which keeps the schema flexible while still allowing
   ordering and type-based queries.
   ============================================================= */

const DATA_DIR = __DIR__ . '/data';
const DB_FILE  = __DIR__ . '/data/slides.sqlite';
const JSON_OUT = __DIR__ . '/slides.json';

function db(): PDO {
  static $pdo = null;
  if ($pdo) return $pdo;

  if (!is_dir(DATA_DIR)) {
    mkdir(DATA_DIR, 0775, true);
  }

  $pdo = new PDO('sqlite:' . DB_FILE);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

  // WAL gives us much better concurrency and never bites on local dev.
  $pdo->exec("PRAGMA journal_mode = WAL");
  $pdo->exec("PRAGMA foreign_keys = ON");

  $pdo->exec("
    CREATE TABLE IF NOT EXISTS slides (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      position   INTEGER NOT NULL,
      type       TEXT    NOT NULL,
      data       TEXT    NOT NULL,
      updated_at TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  ");
  $pdo->exec("CREATE INDEX IF NOT EXISTS idx_slides_position ON slides(position)");

  $pdo->exec("
    CREATE TABLE IF NOT EXISTS meta (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  ");

  return $pdo;
}

/* Returns the slide array in presentation order. */
function readAllSlides(): array {
  $rows = db()
    ->query("SELECT data FROM slides ORDER BY position ASC, id ASC")
    ->fetchAll(PDO::FETCH_COLUMN);
  $out = [];
  foreach ($rows as $r) {
    $d = json_decode($r, true);
    if (is_array($d)) $out[] = $d;
  }
  return $out;
}

/* Transactional full replace — the editor sends the whole array on
   each save. This is the simplest semantics that matches how the
   editor already works (one in-memory array → one DB write). */
function replaceAllSlides(array $slides): int {
  $pdo = db();
  $pdo->beginTransaction();
  try {
    $pdo->exec("DELETE FROM slides");
    $stmt = $pdo->prepare(
      "INSERT INTO slides (position, type, data, updated_at)
       VALUES (:p, :t, :d, datetime('now'))"
    );
    foreach ($slides as $i => $s) {
      if (!is_array($s) || !isset($s['type']) || !is_string($s['type'])) {
        throw new RuntimeException("Slide #$i is missing a 'type' field");
      }
      $stmt->execute([
        ':p' => $i,
        ':t' => $s['type'],
        ':d' => json_encode($s, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
      ]);
    }
    setMeta('last_saved_at', gmdate('c'));
    $pdo->commit();
    return count($slides);
  } catch (Throwable $e) {
    $pdo->rollBack();
    throw $e;
  }
}

/* Writes slides.json to the project root from whatever is currently
   in the DB. This is what index.html reads to render the show. */
function writeSlidesJson(): array {
  $slides = readAllSlides();
  $json = json_encode(
    $slides,
    JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
  );
  if ($json === false) {
    throw new RuntimeException("Failed to encode slides as JSON: " . json_last_error_msg());
  }
  $bytes = file_put_contents(JSON_OUT, $json, LOCK_EX);
  if ($bytes === false) {
    throw new RuntimeException("Failed to write " . JSON_OUT);
  }
  setMeta('last_exported_at', gmdate('c'));
  return ['path' => basename(JSON_OUT), 'bytes' => $bytes, 'count' => count($slides)];
}

function setMeta(string $key, string $value): void {
  $stmt = db()->prepare(
    "INSERT INTO meta (key, value) VALUES (:k, :v)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  );
  $stmt->execute([':k' => $key, ':v' => $value]);
}
function getMeta(string $key): ?string {
  $stmt = db()->prepare("SELECT value FROM meta WHERE key = :k");
  $stmt->execute([':k' => $key]);
  $v = $stmt->fetchColumn();
  return $v === false ? null : $v;
}
