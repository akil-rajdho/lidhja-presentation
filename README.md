# Arkitektura e Universit · Lidhja

A PHP-backed HTML presentation on astrophysics.
Albanian + English, looping background video per slide, keyboard-driven.

The slide content lives in a SQLite database. The editor reads and writes
through a small PHP API, and on every save it exports `slides.json` to
the project root — that's the file the presentation actually renders from.

## Run it

You need PHP (any 7.4+) with the PDO + SQLite extensions enabled — both
come with the standard PHP build on macOS, Linux, and Windows.

```bash
cd Lidhja-Arkitektura
php -S localhost:8000
```

Then in your browser:

1. **First time only** — open <http://localhost:8000/bootstrap.html>.
   It reads `slides.js` (the seed) and inserts all slides into the DB.
2. Open <http://localhost:8000/index.html> for the presentation.
3. Open <http://localhost:8000/editor.html> to edit content.

> Tip: press **F** for fullscreen once the presentation opens.

## Controls

| Key | Action |
|---|---|
| **← →** | Back / forward |
| **Space** | Next slide |
| **Home / End** | First / last slide |
| **L** | Cycle language: BOTH → SQ → EN |
| **F** | Fullscreen |
| **?** | Help overlay |

Clicking anywhere on the slide does **not** advance — use the arrow buttons or
the keyboard.

You can also jump to a slide via the URL — open `index.html?slide=15` to land on
slide 15. As you navigate, the URL updates in place (no history pollution), so
refreshing or sharing the link always lands you on the same slide. The older
`#15` hash style still works as a fallback.

## Structure (66 slides)

1. Title
2. Table of contents
3. **Section 01 — Si u formua Toka** (23 topics)
4. **Section 02 — Shpikje të zgjuara** (15 topics)
5. **Section 03 — Shpejtësia e dritës, graviteti dhe koha** (12 topics)
6. **Section 04 — Përbindëshat e universit** (8 topics)
7. References
8. End

## Editing the content

Open `editor.html` while the PHP server is running. Edit any slide; the
debounced auto-save POSTs to `api.php?action=save`, which:

1. Replaces all rows in the `slides` table (one transaction).
2. Re-writes `slides.json` to the project root.
3. Force-reloads the presentation window if you opened it from the editor.

The editor's toolbar buttons:

- **RUAJ** — force-save now.
- **EKSPORTO JSON** — save and re-export `slides.json` (useful if the
  file got out of sync somehow).
- **RESET** — wipe DB and re-seed from `slides.js` defaults.
- **SHKARKO JSON** — download a backup copy of the current state.
- **HAP PREZANTIMIN** — open / re-focus the presentation tab.

## Adding videos (or images)

Drop `.mp4` files into `videos/` for moving backgrounds, or `.jpg / .png /
.webp / .gif / .avif` for stills — both kinds work in the same `video` slot on
a slide. The renderer detects the kind by extension and uses an `<img>` (no
audio, no looping) for images, a `<video>` (autoplay, muted, loop) for video.
See `videos/README.md` for the expected file names. Missing files fall back
gracefully to the procedural starfield — so you can ship the deck immediately
and add media one by one.

## Fonts

Fonts come from the Google Fonts CDN at runtime — Cormorant Garamond for the
display/body and JetBrains Mono for the timeline/eyebrow. No local files
required. If the machine is offline, system serifs and monospaced fallbacks
take over and the deck still looks polished.

## Files at a glance

| File | Role |
|---|---|
| `index.html`     | The presentation. Fetches `slides.json`. |
| `editor.html`    | Visual editor. Talks to `api.php`. |
| `bootstrap.html` | One-time setup: seeds the DB from `slides.js`. |
| `api.php`        | JSON endpoints: list, save, export, seed, reset, status. |
| `db.php`         | SQLite + PDO layer (schema bootstrap, helpers). |
| `slides.js`      | Initial-seed source for the DB; used by bootstrap.html and editor RESET. |
| `slides.json`    | Auto-generated artifact — what the presentation reads. |
| `data/slides.sqlite` | The database itself. Not served (see `data/.htaccess`). |

## Direct DB edits

It's just SQLite — `sqlite3 data/slides.sqlite` works:

```sql
SELECT position, type, json_extract(data, '$.titleSq') FROM slides
ORDER BY position;
```

If you change rows directly, run
`curl -X POST http://localhost:8000/api.php?action=export` to refresh
`slides.json`.
