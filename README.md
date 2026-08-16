# Focus Orbit

Focus Orbit is an original, space-inspired new-tab dashboard for students. It is designed as a calm home base for checking the time, choosing one focus task, keeping a small local to-do list, and opening useful study links.

## What it does

- Shows a live clock, date, and time-aware greeting.
- Lets you write one daily focus task and keeps it after refresh.
- Includes a local to-do list where tasks can be added, completed, deleted, and saved.
- Rotates through short motivational quotes.
- Offers a persistent day/night theme switcher.
- Includes editable quick links for study tools or school portals.
- Uses responsive CSS, visible keyboard focus states, semantic form controls, and reduced-motion support.

## Screenshot

_A real screenshot of the deployed site will be added after deployment._

## Run it locally

No build step or package install is needed.

1. Open this folder in a code editor.
2. Start a local server from the folder:

   ```bash
   python -m http.server 4173
   ```

3. Open [http://127.0.0.1:4173](http://127.0.0.1:4173) in a browser.

Using a local server is important because browser `localStorage` behavior for `file://` pages is not reliable across browsers.

## Deployment

Deployment URL: **pending — this project has not been deployed yet.**

## Project structure

```text
focus-orbit-new-tab/
├── index.html   # semantic dashboard structure
├── style.css    # responsive orbit-inspired visual system
├── script.js    # clock, localStorage, to-dos, links, theme, and quotes
├── README.md
└── .gitignore
```

## Technologies used

- HTML5
- CSS3 (custom properties, grid, media queries, animation)
- Vanilla JavaScript (DOM APIs, `Intl.DateTimeFormat`, and `localStorage`)

## AI usage statement

I used ChatGPT/Codex as a learning and coding assistant for planning, debugging, accessibility checks, and reviewing the HTML, CSS, and JavaScript. The project concept, feature choices, testing steps, and final decisions were reviewed by me.

## Current verification

- Local browser test: clock, greeting, focus-task persistence, quote button, theme persistence, to-do add/complete/delete/persistence, and quick-link persistence.
- Deployment and fresh public-URL testing are still pending.
