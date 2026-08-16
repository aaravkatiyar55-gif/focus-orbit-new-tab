# Focus Orbit

Focus Orbit is an original, space-inspired new-tab dashboard for students. It is designed as a calm home base for checking the time, choosing one focus task, keeping a small local to-do list, and opening useful study links.

## What it does

- Shows a live clock, date, and time-aware greeting.
- Lets you write one daily focus task and keeps it after refresh.
- Includes a local to-do list where tasks can be added, completed, deleted, and saved.
- Rotates through short motivational quotes.
- Fetches NASA's Astronomy Picture of the Day, with a button to explore a random archive image.
- Offers a persistent day/night theme switcher.
- Includes editable quick links for study tools or school portals.
- Uses responsive CSS, visible keyboard focus states, semantic form controls, and reduced-motion support.

## Screenshot

A real screenshot was captured during the final public deployment check. Visit the live dashboard to see the current interface: [Focus Orbit live demo](https://aaravkatiyar55-gif.github.io/focus-orbit-new-tab/).

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

Live demo: [https://aaravkatiyar55-gif.github.io/focus-orbit-new-tab/](https://aaravkatiyar55-gif.github.io/focus-orbit-new-tab/)

## Project structure

```text
focus-orbit-new-tab/
├── index.html   # semantic dashboard structure
├── style.css    # responsive orbit-inspired visual system
├── script.js    # clock, localStorage, to-dos, links, theme, and quotes
├── README.md
├── .wakatime-project # labels future editor time as this project only
└── .gitignore
```

## Technologies used

- HTML5
- CSS3 (custom properties, grid, media queries, animation)
- Vanilla JavaScript (DOM APIs, `Intl.DateTimeFormat`, and `localStorage`)
- NASA APOD public API

## AI usage statement

I used ChatGPT/Codex as a learning and coding assistant for planning, debugging, accessibility checks, API integration, and reviewing the HTML, CSS, and JavaScript. The project concept, feature choices, testing steps, and final decisions were reviewed by me.

## Current verification

- Local browser test: clock, greeting, focus-task persistence, quote button, theme persistence, to-do add/complete/delete/persistence, responsive mobile task-entry layout, and quick-link persistence.
- Public deployment test: a fresh browser tab loaded the live URL; focus task, to-do list, and theme persisted after refresh, and the quote button changed its text.
- NASA APOD test: the live NASA API returned a daily image and metadata, and the archive button returned another valid item.

## NASA API note

Focus Orbit uses NASA's documented APOD endpoint with `DEMO_KEY` for a small public demo. NASA documents lower limits for `DEMO_KEY`, so a production version should use a personal API key or a backend proxy if traffic grows. [NASA Open APIs documentation](https://api.nasa.gov/)
