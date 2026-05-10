# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages automatically on every push to the `main` branch.

## Setup

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - Save

2. The deployment workflow (`.github/workflows/deploy.yml`) will:
   - Install dependencies
   - Build the project with `GITHUB_PAGES=true`
   - Deploy the `dist/` folder to GitHub Pages

## Deployment Details

- **Base URL**: `https://yourusername.github.io/Mama/`
- **Build Process**: Vite builds the app as a static SPA with base path `/Mama/`
- **Routing**: The router is configured to use the `/Mama/` base path automatically
- **404 Handling**: The `404.html` file enables client-side routing on GitHub Pages

## Local Testing

To test the build locally:

```bash
# Build for GitHub Pages
GITHUB_PAGES=true npm run build

# Preview the build
npm run preview
```

## Browser Support

The app builds to ES2020 and uses modern JavaScript features. It works on all modern browsers (Chrome, Firefox, Safari, Edge).

## Files Changed/Created

- `vite.config.ts` - Updated to build for static SPA deployment
- `src/main.tsx` - New entry point for client-side app
- `src/router.tsx` - Updated router config with basepath support
- `index.html` - New root HTML file
- `public/404.html` - GitHub Pages SPA routing handler
- `.github/workflows/deploy.yml` - Automated deployment workflow
- `package.json` - Added terser dependency (for minification)
