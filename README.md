# Anwin Jojo - Portfolio

A clean, modern, and interactive developer portfolio website built with pure static HTML, CSS, and JavaScript.

## Live Demo
https://guess-watt.github.io/portfolio/

## Features
- **Pure Static Architecture**: 100% client-side HTML, CSS, and JS (no backend or build step required).
- **Interactive Animations**: Dynamic particle canvas, custom typing loader, shooting star animations, and smooth scroll reveal effects.
- **Project Showcase**: Detailed project page with custom astronomical background effects.
- **Certificate Viewer**: Interactive modal popup to view certificates.
- **Mobile Responsive**: Fully responsive layout optimized across devices.

## Project Structure
```text
portfolio/
├── index.html              # Main portfolio homepage
├── about.html              # Standalone About page
├── project_galactic.html   # Galactic Rotation Curve project page
├── static/
│   ├── css/
│   │   ├── style.css       # Core styles, responsive layouts, theme tokens
│   │   └── stars.css       # Star and space animation styles
│   ├── js/
│   │   ├── main.js        # UI interactions, typewriter, scroll reveals, modal logic
│   │   └── particles.js   # Interactive particle canvas logic
│   └── images/             # Portfolio assets & certificate images
└── README.md
```

## Local Development & Testing
To view the website locally, simply double-click `index.html` or open it directly in any browser (`file:///path/to/portfolio/index.html`). Alternatively, serve it using any local web server:

```bash
# Using Python builtin HTTP server
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment to GitHub Pages
1. Push the updated repository to GitHub:
   ```bash
   git add .
   git commit -m "Convert portfolio to pure static site for GitHub Pages"
   git push origin main
   ```
2. Navigate to your repository on GitHub: `https://github.com/guess-watt/portfolio`
3. Go to **Settings** > **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` branch and `/ (root)` folder
   - Click **Save**.
5. Your site will automatically deploy at `https://guess-watt.github.io/portfolio/`.
