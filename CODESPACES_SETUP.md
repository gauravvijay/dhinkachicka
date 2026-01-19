# GitHub Codespaces Deployment Guide

This guide walks you through deploying **dhinkachika** (Choreography Trainer) on GitHub Codespaces.

## Prerequisites

- GitHub account with access to Codespaces
- GitHub repository with this project pushed to a branch

## Step 1: Create a Codespace

1. Go to your repository on GitHub
2. Click the **Code** button (green button)
3. Select the **Codespaces** tab
4. Click **Create codespace on [branch-name]**
5. Wait for the Codespace to initialize (1-2 minutes)

> **Note:** Your first Codespace is free monthly. Codespaces uses compute resources, so remember to stop/delete unused spaces to manage your quota.

## Step 2: Install Dependencies

Once your Codespace terminal opens, run:

```bash
npm install
```

This installs all required packages including:
- React and ReactDOM
- Vite (build tool)
- All other project dependencies

Expected output: Should complete in 1-2 minutes.

## Step 3: Start Development Server

Run the development server:

```bash
npm run dev
```

Expected output:
```
VITE v5.4.21  ready in 1128 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

## Step 4: Access the Application

VS Code will automatically detect the port forwarding. You should see a notification suggesting to open the application in a browser. Click that notification, or:

1. Open the **Ports** panel in your Codespace (bottom panel, or run **Ctrl+Shift+`** to open terminal, then click Ports tab)
2. Find port **5173** in the list
3. Click the globe icon or **Open in Browser**

The app will open in a new browser tab with your Codespace's public URL.

## Step 5: Test the Application

1. **Add a Video:** Click ⚙️ Add Video, paste a YouTube URL (e.g., `https://www.youtube.com/watch?v=...`)
2. **Add Steps:** Click + Add Step, enter timing and choreography notes
3. **Share Choreography:** 
   - Click 🔗 Share button
   - Copy the generated link
   - Open it in a new browser/incognito window
   - Verify choreography loads automatically
4. **Test Mobile Responsive:** 
   - Right-click in browser → Inspect
   - Toggle device toolbar (iPhone/mobile view)
   - Verify video and camera stack vertically (not side-by-side)

## Step 6: Build for Production (Optional)

To create an optimized production build:

```bash
npm run build
```

This creates a `dist/` folder with minified/optimized files.

## Step 7: Deploy to GitHub Pages (Optional)

To make your app publicly accessible via GitHub Pages:

### 6a. Update `vite.config.js`

Modify the config to set the correct base path:

```javascript
export default {
  base: '/dhinkachicka/', // Replace with your repo name
  // ... rest of config
}
```

### 6b. Build and Deploy

```bash
npm run build
```

Then, if using GitHub Actions (recommended):

1. Create `.github/workflows/deploy.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Push to your repository
3. GitHub Actions will automatically build and deploy to `https://yourusername.github.io/dhinkachicka`

## Useful Codespaces Commands

### Stop/Resume Codespace
- Click **Codespaces** menu → Select space → Stop (saves billing)
- Resume later: Click **Codespaces** menu → Select space → Resume

### Environment Variables (if needed)
Create `.env` file in project root:
```
VITE_API_URL=https://your-api.com
```

### Terminal Shortcuts
- Open terminal: **Ctrl+`** (backtick)
- Split terminal: **Ctrl+Shift+5**
- Stop dev server: **Ctrl+C**

## Feature Overview

### 🎬 Core Features
- **Multi-Video Support:** Add multiple YouTube videos and switch between them
- **Choreography Steps:** Time-stamped notes with lyrics/descriptions
- **Playback Control:** 0.5x - 1.5x speed adjustments
- **Camera Preview:** Side-by-side view with your practice
- **Shareable URLs:** Compressed share links that load choreography automatically

### 📱 Mobile Responsive
- Desktop: Video and camera side-by-side (16:9 aspect ratio)
- Mobile (<768px): Video and camera stack vertically
- Touch-friendly buttons and controls

### 💾 Data Persistence
- All choreography saved to browser localStorage
- Multiple videos stored with step mappings
- No backend required - fully client-side

### 🔗 Share Feature
- Generate compressed shareable URLs
- No file uploads needed
- Recipients see complete choreography on link open

## Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 5174
```

### npm install fails
Clear npm cache and retry:
```bash
npm cache clean --force
npm install
```

### Camera not working
- Check browser permissions (camera access)
- Allow camera access when prompted
- Try a different browser if issues persist

### Share URL too long
- Share URLs are compressed but long sequences can exceed limits
- Limit choreography to ~50 steps per video for optimal sharing

### Changes not reflecting
- Hard refresh: **Ctrl+Shift+R** (or Cmd+Shift+R on Mac)
- Clear browser cache in DevTools → Application tab

## Tips for Success

1. **Keep Codespace Active:** After 30 minutes of inactivity, Codespaces stops. Restart from your repo when needed.
2. **Use the Port Forwarding:** Codespaces automatically handles SSL and port forwarding - no extra setup needed.
3. **Test Mobile Early:** Use browser DevTools device emulation (F12) to test responsive design during development.
4. **Commit Frequently:** Use Git to commit changes - your Codespace can be deleted/recreated anytime.
5. **Monitor Quota:** Check your GitHub Codespaces usage in Settings → Billing & Plans.

## Next Steps

- Customize colors in `src/index.css` or component styles
- Add authentication if needed (beyond scope of current app)
- Deploy full app to production using GitHub Pages or external hosting
- Share choreography links with your dance community!

## Support

- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **GitHub Codespaces:** https://docs.github.com/en/codespaces
- **GitHub Pages:** https://docs.github.com/en/pages

---

**Happy choreography training! 🎬🎵**
