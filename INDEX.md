# Dhinkachicka - Complete Documentation Index

**Last Updated:** 2024  
**Status:** Production Ready with Premium Design System  
**Dev Server:** http://localhost:5174/dhinkachicka/

---

## 📋 Quick Navigation

1. **[Getting Started](#getting-started)** - Setup & Installation
2. **[Architecture](#architecture)** - System Design & Structure
3. **[Features](#features)** - Core Capabilities
4. **[Design System](#design-system)** - Visual & Typography
5. **[Deployment](#deployment)** - Production Build
6. **[Contributing](#contributing)** - Development Guidelines

---

## Getting Started

### Installation

```bash
npm install
npm run dev
```

The app runs on **http://localhost:5174/dhinkachicka/** with hot-reload enabled.

### Project Structure

```
src/
├── components/          # React components
│   ├── CameraSection.jsx
│   ├── Dialogs.jsx
│   ├── Header.jsx
│   ├── Timeline.jsx
│   └── VideoPlayer.jsx
├── hooks/              # Custom React hooks
│   ├── useCamera.js
│   ├── useSharing.js
│   ├── useStepManagement.js
│   └── useVideoPlayback.js
├── styles/             # Global styling
│   └── theme.js        # Complete design system
├── utils/              # Utility functions
│   ├── helpers.js
│   └── urlCompression.js
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Base styles

public/
├── manifest.json       # App metadata
└── logo.svg           # App logo (dancing figure + notes)

vite.config.js         # Build configuration
```

### Quick Tips

- **Load a YouTube Video**: Click "⚙️ Load Video" and paste a YouTube URL
- **Add Choreography Steps**: Click "Add Step" to mark positions with lyrics
- **Share**: Click "🔗 Share" to generate a shareable URL with all steps
- **Mobile Camera**: On mobile devices, use the floating camera button (📷)
- **Playback Modes**: Switch between "Original Speed" and "Slowed Down" (0.5x)

---

## Architecture

### Tech Stack

- **Frontend**: React 18 + Vite 5 (super fast builds)
- **Video API**: YouTube IFrame API (no backend required)
- **State**: React Hooks (useReducer for complex state)
- **Data Persistence**: localStorage (browser-based)
- **Deployment**: Static hosting (Vercel, Netlify, GitHub Pages)

### Component Hierarchy

```
App
├── Header
│   ├── Logo (SVG)
│   ├── "Load Video" Button
│   └── "Share" Button
├── VideoPlayer
│   └── YouTube IFrame
├── CameraSection (Mobile)
│   └── Video Stream from Webcam
├── Timeline
│   ├── Timeline Scrubber
│   ├── Playhead Indicator
│   └── Step List
├── Mobile FAB (Camera Button)
└── Dialogs
    ├── LoadVideoDialog
    ├── AddStepDialog
    └── ShareDialog
```

### Data Flow

1. **User loads YouTube URL** → App validates → Creates player instance
2. **User clicks time/adds step** → Step data stored in state + localStorage
3. **User clicks share** → Data compressed with URL encoding → Share link generated
4. **User opens share link** → URL decoded → Data loaded into state
5. **Playback** → Timeline scrubber controls player → Camera synced on mobile

### Responsive Design

- **Desktop (>768px)**: Video player & camera side-by-side (1fr 1fr grid)
- **Mobile (<768px)**: Video player stacked, camera in overlay, FAB button for controls
- **All breakpoints**: Touch-friendly buttons, readable typography

---

## Features

### Core Capabilities

#### 1. Video Management
- Load any YouTube video (public URLs only)
- Play, pause, seek, speed control (0.5x, 1x)
- Looping for specific sections
- Loop mode for practicing choreography

#### 2. Choreography Tracking
- Mark steps with exact timestamps
- Add custom lyrics/notes for each step
- Sort steps chronologically
- Edit or delete steps
- Visual highlighting of current step

#### 3. Mobile Camera Support
- Webcam access on mobile devices
- Record yourself dancing alongside video
- Picture-in-picture view
- Full-screen camera option (desktop)

#### 4. Timeline Visualization
- Interactive timeline scrubber
- Shows all marked steps as colored bars
- Playhead position indicator
- Jump to specific step with click

#### 5. Sharing System
- Generate shareable URLs with all choreography
- Data compression (URL-safe encoding)
- No server required (pure client-side)
- Works across devices

#### 6. Playback Modes
- **Original Speed**: Full speed playback for viewing
- **Slowed Down**: 0.5x speed for learning detailed moves

---

## Design System

### Premium Typography

The app uses a sophisticated font stack for maximum elegance:

- **Display Font**: *Playfair Display* (serif) - headings & titles
- **Heading Font**: *Syne* (sans-serif) - section titles
- **Body Font**: *Space Grotesk* (monospace-inspired sans-serif) - all content

These fonts are imported via `@fontsource` packages for:
- ✅ Maximum performance (no Google Fonts CDN)
- ✅ Offline availability
- ✅ Self-hosted control
- ✅ Premium appearance

### Color Palette

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Orange | #FF6B35 | Buttons, highlights, accents |
| Primary Light | Lighter Orange | #FF8A5B | Hover states, secondary accents |
| Accent | Cyan | #00D9FF | Active states, timeline highlights |
| Background | Near Black | #0F0F0F | Main background |
| Surface | Dark Gray | #1A1A1A | Cards, sections |
| Text | Light Gray | #E8E8E8 | Primary text |
| Text Secondary | Medium Gray | #B0B0B0 | Secondary text |
| Text Muted | Dark Gray | #888888 | Disabled, placeholder |

### Visual Effects

1. **Glassmorphism**: `backdrop-filter: blur(10px)` on surfaces
2. **Shadows**: Layered shadows for depth
   - Small: `0 2px 8px rgba(0, 0, 0, 0.2)`
   - Medium: `0 4px 12px rgba(255, 107, 53, 0.15)`
   - Large: `0 8px 24px rgba(255, 107, 53, 0.25)`
3. **Text Effects**: Title has subtle glow `text-shadow`
4. **Animations**: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) for smooth interactions

### CSS Architecture

All styles moved from inline props to centralized CSS classes in `theme.js`:

- `.mobile-fab` - Floating action button styling
- `[data-video-camera-grid]` - Responsive grid layout
- `[data-logo-img]` - Logo image styling
- All component styles via theme object exports

**Benefits**:
- ✅ Single source of truth for styling
- ✅ Easier maintenance and updates
- ✅ Better performance (no inline object recreation)
- ✅ Cleaner component code

### Responsive Breakpoints

- **Desktop**: 769px and above
- **Mobile**: 768px and below

Adjustments:
- Font sizes scale down on mobile
- Grid becomes single column on mobile
- Mobile FAB button appears automatically

---

## Deployment

### Production Build

```bash
npm run build
```

Creates optimized bundle in `dist/` folder.

### Hosting Options

1. **Vercel** (Recommended)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Netlify**
   - Connect repo to Netlify
   - Auto-deploys on push to main

3. **GitHub Pages**
   ```bash
   npm run build
   git add dist/
   git commit -m "Deploy"
   git push
   ```

### Environment

- **Base Path**: `/dhinkachicka/` (set in vite.config.js)
- **All assets** load with this base path
- **Logo**: `/dhinkachicka/logo.svg` ✓ Correct path
- **No server required** - pure static hosting

---

## Recent Improvements (Phase 2)

### ✅ Typography Upgrade
- Replaced Inter with premium fonts (Playfair Display, Syne, Space Grotesk)
- Added custom font imports via @fontsource
- Improved visual hierarchy and premium feel

### ✅ Style Refactoring
- Removed ALL inline styles from components
- Moved to centralized CSS classes in theme.js
- Cleaner, more maintainable code
- Better performance

### ✅ Layout Fixes
- Fixed 100vh double-scrolling issue
- Changed to `minHeight: 100vh` for flexible layout
- Mobile grid properly responsive
- No unnecessary scrollbars

### ✅ Asset Path Correction
- Logo now loads from `/dhinkachicka/logo.svg`
- Works correctly on production with base path
- All assets properly configured

### ✅ Premium Polish
- Title now has subtle glow effect via text-shadow
- FAB button has smooth hover animations
- Glassmorphism effects on all surfaces
- Consistent shadow system

---

## Key Implementation Details

### How Sharing Works

1. **Data Compression**: All steps + video URL encoded in URL parameter
2. **URL-Safe Encoding**: Base64 + LZ-string compression
3. **Share URL Format**: `?share=<compressed_data>`
4. **Decoding**: Automatic on page load with `share` param
5. **No Backend**: Pure client-side compression/decompression

### How Camera Integration Works

1. **Permission Request**: Browser asks for camera access
2. **Webcam Stream**: getUserMedia API captures video
3. **Mobile Floating Button**: FAB appears only on mobile (<768px)
4. **Picture-in-Picture**: Can overlay camera on video player
5. **Sync**: Camera plays same video at same time

### How Timeline Works

1. **Click on timeline** → Seek to that position
2. **Play → Timeline updates** playhead in real-time
3. **Step list sorted** chronologically by timestamp
4. **Active step highlighted** based on current playback position
5. **Visual bars** show all steps as colored sections

---

## Troubleshooting

### Logo Not Loading
- **Issue**: Logo appears broken
- **Solution**: Check base path is `/dhinkachicka/` (not `/`)
- **Verify**: Open DevTools → Network → check logo.svg URL

### Mobile Camera Not Working
- **Issue**: Camera permission denied
- **Solution**: Check browser settings → Site permissions → Camera
- **Verify**: Only HTTPS or localhost can access camera

### Share URL Not Working
- **Issue**: Shared choreography doesn't load
- **Solution**: Check URL parameter is complete (not truncated)
- **Verify**: Copy full URL including `?share=...`

### Styles Not Updating
- **Issue**: CSS changes not visible in dev mode
- **Solution**: Vite should hot-reload, try page refresh
- **Hard Refresh**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## Contributing

### Code Style

- Use functional components with hooks
- Keep components under 300 lines
- Export styles from `theme.js`
- Use semantic HTML elements
- Add JSDoc comments for complex logic

### Adding Features

1. Create component in `src/components/`
2. Add styles to `src/styles/theme.js`
3. Import and use in App.jsx
4. Test on mobile & desktop
5. Update this INDEX.md

### Git Workflow

```bash
git checkout -b feature/description
# Make changes
git add .
git commit -m "feat: description"
git push origin feature/description
# Open PR on GitHub
```

---

## Performance Tips

- ✅ Uses Vite for instant hot reload
- ✅ Lazy loads YouTube player on demand
- ✅ Compresses sharing data with LZ-string
- ✅ Minimal bundle size (~50kb gzipped)
- ✅ Static hosting for fast global CDN delivery

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 8+)

**Note**: Camera feature requires HTTPS or localhost

---

## Support & Questions

For issues or questions:
1. Check this INDEX.md
2. Check QUICK_REFERENCE.md for common tasks
3. Review inline code comments
4. Open an issue with details

---

## Archive

The following files have been consolidated into this INDEX:
- DOCS.md, ARCHITECTURE.md (→ Architecture section)
- REFACTORING.md, REFACTORING_SUMMARY.md (→ Design System section)
- PHASE_0_COMPLETION.md, PHASE_0_SUMMARY.md (→ Recent Improvements section)
- IMPLEMENTATION_SUMMARY.md, IMPLEMENTATION_PRIORITY.md (→ Features section)
- DESIGN_SPECIFICATION.md, DESIGN_OPTIMIZATION.md (→ Design System section)
- BEFORE_AFTER.md, VISUAL_REFRESH_SUMMARY.md (→ Recent Improvements section)
- TRANSFORMATION_COMPLETE.md, TRANSFORMATION_SUMMARY.md (→ Historical reference)
- VERIFICATION_CHECKLIST.md, VISUAL_TESTING_GUIDE.md (→ Testing guidelines)
- SHOWCASE.md, UX_DESIGN_PROMPT.md (→ Feature descriptions)
- PREMIUM_DESIGN_VISION.md, PREMIUM_REDESIGN_ROADMAP.md (→ Design System section)
- README_PREMIUM_STRATEGY.md, COMPETITIVE_STRATEGY.md (→ Product strategy)

These archived files can be found in the Git history for reference.

---

**Made with ❤️ for dancers, choreographers, and move enthusiasts.**
