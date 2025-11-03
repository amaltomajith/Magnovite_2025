## Magnovite'25 – Official Website

A modern, static website for Magnovite'25 (CHRIST University, Kengeri Campus) featuring a cinematic landing experience, event information, and a performant gallery with lightbox.

### Highlights
- Hero scroll experience powered by GSAP + ScrollTrigger
- Promo video CTA with custom modal player (desktop + mobile-friendly)
- Responsive Gallery with keyboard, mouse, and touch support
- Accessible interactions (focusable thumbnails, Enter/Space to open, Esc to close)
- Static hosting ready (GitHub Pages/Netlify/Vercel)

### Tech Stack
- HTML, CSS (no framework)
- Vanilla JavaScript
- GSAP + ScrollTrigger (home page only)

### Quick Start
1) Clone
   - `git clone <your-repo-url>`
   - `cd Magnovite_2025`

2) Run locally (any one method)
   - PowerShell (Node): `npx --yes serve .`
   - PowerShell (Python 3): `python -m http.server 5173`
   - VS Code: Live Server extension → Open `index.html`

3) Open the site
   - Home: `http://localhost:3000` or the port shown by your server
   - Or double‑click `index.html` (animations reliant on scroll may behave better via a local server)

### Project Structure
```
├── index.html               # Home page (hero animations + video CTA)
├── gallery.html             # Canvas gallery page + image lightbox
├── events.html              # Events index
├── events/                  # Individual event pages (static HTML)
├── public/                  # Images and media (logos, gallery, videos)
│   ├── Gallery/             # Gallery photos (used by canvas gallery)
│   ├── events/              # Event card images
│   ├── christwhite.png      # Christ logo (header/footer)
│   ├── magnovite.png        # Magnovite logo + favicon source
│   └── promo.mp4            # Hero promo video
├── src/
│   ├── style.css            # Global styles for home
│   ├── script.js            # Hero animations + video modal + lightbox
│   ├── gallery.css          # Gallery page styles
│   └── gallery.js           # Canvas-based rotating gallery tiles
├── css/                     # Additional page-specific CSS
└── README.md
```

### Editing Content
- Logos and assets: place under `public/`
- Home hero video: replace `public/promo.mp4` (keep filename or update the HTML)
- Event pages: edit HTML files in `events/` and their images in `public/events/`
- Header/footer logos: update `public/christwhite.png`, `public/magnovite.png`

### Gallery Notes
- The rotating canvas gallery (`src/gallery.js`) preloads images from `public/Gallery/` (and optionally `public/gallary/`).
- By default it references a predefined list of filenames. To change images:
  - Replace files in `public/Gallery/` using the existing names, or
  - Update the `names` array in `src/gallery.js` with your filenames.
- The lightbox on `gallery.html` opens images with the class `gallery-img`. Add new thumbnails there to include them in the lightbox sequence.

### Development Details
- GSAP logic is guarded so non-home pages won’t error if GSAP isn’t present.
- Video modal supports keyboard (Esc), backdrop click, and a custom progress/seek bar.
- Lightbox supports mouse, touch, keyboard (←/→/Esc), zoom via wheel, and click‑to‑zoom with panning.

### Deployment
- GitHub Pages
  1. Commit and push main branch
  2. In repo Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, Folder: `/root`
  3. Ensure paths are relative (e.g., `./public/...`) — already configured
- Netlify/Vercel
  - Framework: None / Static
  - Build command: None
  - Publish directory: repo root

### Contributing
- Open an issue for bugs or enhancements
- Use clear titles and attach screenshots when UI is involved

### License & Credits
This site is intended for Magnovite'25. All media assets belong to their respective owners.
