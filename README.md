# YTL × Codex Workshop Field Guide

The public resource hub for the YTL Codex workshop. It is a dependency-free static site designed for GitHub Pages.

## Local preview

From this directory, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Updating resources

All resource copy and links live in `index.html`.

- Replace **Slides coming soon** with an `<a>` link to the uploaded PDF.
- Replace **Recordings coming soon** with a link to the recording or playlist.
- Edit the two starter prompts and recreation steps in the walkthrough section.
- Update the footer date after publishing new material.

Files such as PDFs can be placed in a `resources/` directory and linked with a relative URL, for example `resources/ytl-codex-slides.pdf`.

## Publishing

GitHub Pages deploys the root of the `main` branch. The public URL is:

<https://kairosiann.github.io/ytl-chatgpt-tutorial/>
