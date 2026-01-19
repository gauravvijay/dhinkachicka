# 🎬 dhinkachicka - Choreography Trainer# dhinkachicka



A minimal, fast, and feature-rich choreography trainer built with **Vite + React**. Create, practice, and share dance choreography with built-in YouTube video integration, multi-video support, and shareable links.Minimal Vite + React starter scaffold.



## ✨ FeaturesGetting started



- **🎯 YouTube Integration:** Link YouTube videos as references for choreography1. Install dependencies

- **⏱️ Choreography Steps:** Time-stamped notes with lyrics, movements, and descriptions

- **📹 Multi-Video Support:** Save and switch between multiple choreography sequences```bash

- **🎬 Playback Control:** Adjustable playback speeds (0.5x - 1.5x)cd /Users/abhinav/work/dhinkachicka

- **📱 Camera Preview:** Practice with side-by-side camera feed (16:9 aspect ratio)npm install

- **🔗 Shareable URLs:** Generate compressed share links that load complete choreography automatically```

- **💾 Local Storage:** All data saved in browser - no backend required

- **📱 Mobile Responsive:** Optimized for desktop (side-by-side layout) and mobile (vertical stack)2. Run dev server

- **🎨 Material Design:** Clean, modern UI with smooth interactions

```bash

## 🚀 Quick Startnpm run dev

```

### Prerequisites

- Node.js 18+ 3. Build

- npm or yarn

- Modern browser with camera access (for camera preview)```bash

npm run build

### Installationnpm run preview

```

```bash

# Clone the repositoryNotes

git clone https://github.com/yourusername/dhinkachicka.git

cd dhinkachicka- This repo contains a minimal `src` with `App.jsx` and `main.jsx`.

- Uses Vite for fast development.

# Install dependencies# dhinkachicka

npm install

# Start development server
npm run dev
```

The app opens at `http://localhost:5173/`

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage Guide

### 1. Add a Video

1. Click **⚙️ Add Video** button in the header
2. Paste a YouTube video URL (e.g., `https://www.youtube.com/watch?v=...`)
3. Click **Save Video**
4. Video loads in the left panel

### 2. Create Choreography Steps

1. Click **➕ Add Step** button
2. Enter:
   - **Start Time:** When the choreography begins (mm:ss)
   - **End Time:** When the choreography ends (mm:ss)
   - **Lyrics/Movements:** Description of steps (e.g., "Jump, spin, land")
3. Click **Add Step**
4. Steps appear in the timeline below

### 3. Practice & Review

- **Timeline Visualization:** See all steps color-coded on the timeline
- **Speed Control:** Adjust playback speed (0.5x - 1.5x) to slow down complex moves
- **Camera Feed:** Enable camera to practice alongside the video
- **Step Details:** Click any step to edit or delete

### 4. Save Multiple Videos

- Each video has its own choreography sequence
- Use the dropdown menu to switch between saved videos
- All data persists in browser localStorage

### 5. Share Choreography

1. Add at least one video and one step
2. Click **🔗 Share** button
3. Copy the generated shareable link
4. Share with others via:
   - Email
   - Social media
   - Direct message
   - Chat apps

**When recipients open the link:**
- Choreography loads automatically
- No file uploads or downloads needed
- Works on any device with a modern browser

## 🎮 Playback Modes

- **Original Video:** View the reference video at full speed
- **Tutorial Video:** Play at reduced speed for practice (if available)

## 📱 Responsive Design

| Device | Layout | View |
|--------|--------|------|
| Desktop (>768px) | 2 Columns | Video & Camera side-by-side |
| Mobile (<768px) | 1 Column | Video above Camera |

## 🔐 Data & Privacy

- **No Server:** All data stored locally in your browser
- **No Tracking:** No analytics or telemetry
- **No Accounts:** No login or registration required
- **Browser Storage:** Uses localStorage (~5-10MB limit per domain)

> **Tip:** Clear browser data will delete all choreography. Export/share before clearing!

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **API Integrations:** 
  - YouTube IFrame API
  - MediaStream API (camera)
  - Web Storage API (localStorage)
- **Styling:** CSS-in-JS (inline styles)
- **Font:** Fredoka (Google Fonts)

## 📂 Project Structure

```
dhinkachicka/
├── src/
│   ├── App.jsx           # Main component (choreography trainer)
│   ├── main.jsx          # React entry point
│   └── index.css         # Global styles & imports
├── index.html            # HTML template
├── package.json          # Project dependencies
├── vite.config.js        # Vite configuration
├── README.md             # This file
└── CODESPACES_SETUP.md   # GitHub Codespaces deployment guide
```

## 🚀 Deployment

### GitHub Pages

See [CODESPACES_SETUP.md](./CODESPACES_SETUP.md) for detailed GitHub Pages and Codespaces deployment instructions.

Quick deploy:
```bash
npm run build
# Push dist/ folder to GitHub Pages
```

### GitHub Codespaces

See [CODESPACES_SETUP.md](./CODESPACES_SETUP.md) for complete Codespaces setup and deployment guide.

Quick start:
```bash
npm install
npm run dev
```

### Other Hosting

Deploy the `dist/` folder to any static host:
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps
- Firebase Hosting

## 🔗 Share URL Details

### How Compression Works

Share links use Base64 encoding to compress choreography data:
- **Original JSON:** Full choreography object
- **Compressed:** Base64-encoded string
- **Result:** Shareable URL with ~33% overhead

### URL Structure

```
https://yourdomain.com/?share=<base64_encoded_data>
```

### Example Share Data

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=...",
  "steps": [
    { "startTime": 10, "endTime": 15, "lyrics": "Jump" },
    { "startTime": 15, "endTime": 20, "lyrics": "Spin" }
  ],
  "playbackMode": "original"
}
```

## ⚙️ Configuration

### Customizing Colors

Edit styles in `src/App.jsx`:

```javascript
const styles = {
  btnPrimary: { backgroundColor: "#FF8A5B", color: "#fff" },
  btnSecondary: { backgroundColor: "#F5F5F5", color: "#2A1F1F" },
  // ... more styles
};
```

### Font Customization

Change or add fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet" />
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Video not loading | Check YouTube URL is public and not region-blocked |
| Camera not working | Allow camera access in browser permissions |
| Data not saving | Check localStorage is enabled in browser |
| Share link too long | Reduce number of steps (<50 recommended) |
| Mobile layout not stacking | Clear browser cache & hard refresh (Ctrl+Shift+R) |

## 🎓 Learning Resources

- **Vite:** https://vitejs.dev/
- **React:** https://react.dev/
- **YouTube API:** https://developers.google.com/youtube
- **Web APIs:** https://developer.mozilla.org/en-US/docs/Web/API

## 📋 Future Enhancements

- [ ] Download choreography as PDF/JSON
- [ ] Audio track upload and sync
- [ ] Gesture recognition with camera AI
- [ ] Collaborative editing with WebRTC
- [ ] Cloud sync with optional backend

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

- Built with [Vite](https://vitejs.dev/) ⚡
- Powered by [React](https://react.dev/) ⚛️
- Font by [Google Fonts](https://fonts.google.com/)
- API by [YouTube](https://www.youtube.com/)

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/dhinkachicka/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/dhinkachicka/discussions)
- **Email:** your.email@example.com

---

**Made with ❤️ for dancers and choreographers everywhere.** 💃🕺

**Try it now:** [Live Demo](https://yourusername.github.io/dhinkachicka)
