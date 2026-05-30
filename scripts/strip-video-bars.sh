#!/usr/bin/env bash
# Strip baked-in black bars from every .mp4 in videos/.
#
# How it works:
#   1. ffmpeg's cropdetect filter samples ~5s of each video and reports
#      the smallest bounding box that contains non-black pixels.
#   2. We re-encode the file using that crop rectangle, dropping the
#      bars entirely so the output is a clean 16:9 (or whatever the
#      content actually is) with no padding.
#   3. Originals are backed up to videos/_originals/<same path>.mp4
#      so nothing is lost. Re-run safely — already-processed files
#      (smaller than their backup) are skipped.
#
# Requires: ffmpeg, ffprobe (brew install ffmpeg).
#
# Usage:
#   bash scripts/strip-video-bars.sh
#
# Tweakables:
#   CROP_LIMIT   How dark a pixel counts as "black" (0–255). Bigger =
#                more aggressive crop. 24 is a safe default.
#   CROP_ROUND   Crop dimensions are rounded to multiples of this.
#                Use 2 for H.264 compatibility.

set -euo pipefail

CROP_LIMIT="${CROP_LIMIT:-24}"
CROP_ROUND="${CROP_ROUND:-2}"

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
VIDEOS_DIR="$ROOT_DIR/videos"
BACKUP_DIR="$VIDEOS_DIR/_originals"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg not found. Install with: brew install ffmpeg" >&2
  exit 1
fi
if [ ! -d "$VIDEOS_DIR" ]; then
  echo "videos/ directory not found at $VIDEOS_DIR" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"

count_total=0
count_done=0
count_skip=0

# Find all .mp4 files under videos/, excluding the backup folder.
while IFS= read -r -d '' src; do
  count_total=$((count_total + 1))
  rel="${src#$VIDEOS_DIR/}"
  backup="$BACKUP_DIR/$rel"

  # Skip the backup tree itself.
  case "$rel" in
    _originals/*) continue ;;
  esac

  printf "\n[%d] %s\n" "$count_total" "$rel"

  # If we already have a backup AND src is smaller, it was already processed.
  if [ -f "$backup" ] && [ "$(stat -f%z "$src" 2>/dev/null || stat -c%s "$src")" -lt \
                          "$(stat -f%z "$backup" 2>/dev/null || stat -c%s "$backup")" ]; then
    echo "  ↪ already processed (smaller than backup), skipping"
    count_skip=$((count_skip + 1))
    continue
  fi

  # 1) Detect the crop rectangle.
  crop=$(ffmpeg -nostdin -hide_banner -ss 0 -t 5 -i "$src" \
              -vf "cropdetect=${CROP_LIMIT}:${CROP_ROUND}:0" \
              -f null - 2>&1 \
        | grep -o "crop=[0-9:]*" | tail -1 || true)

  if [ -z "$crop" ]; then
    echo "  ⚠ cropdetect produced no rectangle — leaving as-is"
    count_skip=$((count_skip + 1))
    continue
  fi

  # crop=w:h:x:y — read the four numbers.
  IFS=':' read -r CW CH CX CY <<< "${crop#crop=}"

  # Get the original dimensions.
  read OW OH < <(ffprobe -v error -select_streams v:0 \
                         -show_entries stream=width,height \
                         -of csv=p=0:s=' ' "$src")

  # If crop matches the source dimensions, there's nothing to strip.
  if [ "$CW" = "$OW" ] && [ "$CH" = "$OH" ]; then
    echo "  ✓ no bars detected (${OW}x${OH})"
    count_skip=$((count_skip + 1))
    continue
  fi

  echo "  → original ${OW}x${OH} · cropping to ${CW}x${CH} (offset +${CX}+${CY})"

  # 2) Back up the original (only if we don't already have one).
  if [ ! -f "$backup" ]; then
    mkdir -p "$(dirname "$backup")"
    cp "$src" "$backup"
    echo "  · original backed up to _originals/$rel"
  fi

  # 3) Re-encode with the detected crop.
  tmp="${src}.cropping.mp4"
  ffmpeg -nostdin -hide_banner -loglevel warning -y \
         -i "$backup" \
         -vf "crop=${CW}:${CH}:${CX}:${CY}" \
         -c:v libx264 -preset medium -crf 20 \
         -movflags +faststart \
         -an \
         "$tmp"

  mv "$tmp" "$src"
  count_done=$((count_done + 1))
  echo "  ✓ done"
done < <(find "$VIDEOS_DIR" -type f -name '*.mp4' -print0)

echo ""
echo "Summary: $count_done cropped · $count_skip skipped · $count_total total"
echo "Originals preserved in: $BACKUP_DIR"
