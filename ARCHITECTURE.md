# Refactored Architecture Diagram

## Component Hierarchy
```
App
├── Header
│   ├── Add Video button (settings dialog)
│   └── Share button (share dialog)
├── VideoPlayer
│   ├── YouTube iframe
│   ├── Playback mode selector
│   ├── Speed selector
│   └── Stop button
├── CameraSection
│   ├── Camera toggle button
│   └── Video stream
├── Timeline
│   ├── Timeline track visualization
│   └── Steps list
│       ├── Play button
│       ├── Edit button
│       └── Delete button
└── Dialogs
    ├── LoadVideoDialog (video URL input)
    ├── AddStepDialog (step timing/lyrics)
    └── ShareDialog (compressed URL)
```

## Data Flow & State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                        App.jsx                                   │
│  - mainVideoUrl, playerReady, playbackMode, cameraActive, etc.  │
└─────────────────────────────────────────────────────────────────┘
         │              │                  │                │
         ├──────────────┼──────────────────┼────────────────┤
         ▼              ▼                  ▼                ▼
    ┌─────────────┐ ┌──────────────┐ ┌──────────────┐ ┌────────────┐
    │ useVideo    │ │ useCamera    │ │ useStep      │ │ useSharing │
    │ Playback    │ │              │ │ Management   │ │            │
    │             │ │ ─ stream     │ │              │ │ ─ shareUrl │
    │ ─ player    │ │ ─ ref        │ │ ─ steps      │ │            │
    │ ─ loop      │ │              │ │ ─ form       │ │ Returns:   │
    │ ─ refs      │ │ Returns:     │ │              │ │ generateUrl
    │             │ │ start/stop   │ │ Returns:     │ │ copyTo     │
    │ Returns:    │ │ cleanup      │ │ add/delete   │ │ Clipboard  │
    │ load        │ │              │ │ edit/cancel  │ │            │
    │ playStep    │ │              │ │              │ │            │
    │ stopPlayback│ │              │ │              │ │            │
    └─────────────┘ └──────────────┘ └──────────────┘ └────────────┘
         │              │                  │                │
         └──────────────┼──────────────────┼────────────────┘
                        ▼
         ┌──────────────────────────────────────┐
         │ Passed as Props to Components        │
         └──────────────────────────────────────┘
```

## Module Dependency Graph

```
App.jsx
├── hooks/
│   ├── useVideoPlayback.js
│   │   └── utils/urlCompression.js (extractVideoId)
│   ├── useCamera.js
│   ├── useStepManagement.js
│   │   └── utils/urlCompression.js (normalizeYouTubeUrl)
│   │   └── utils/helpers.js (parseTime)
│   └── useSharing.js
│       └── utils/urlCompression.js (generateShareableUrl)
├── components/
│   ├── Header.jsx
│   │   └── styles/theme.js
│   ├── VideoPlayer.jsx
│   │   └── styles/theme.js
│   ├── CameraSection.jsx
│   │   └── styles/theme.js
│   ├── Timeline.jsx
│   │   ├── utils/helpers.js (fmt)
│   │   └── styles/theme.js
│   └── Dialogs.jsx
│       └── styles/theme.js
├── utils/
│   ├── urlCompression.js (standalone)
│   ├── helpers.js (standalone)
│   └── (YouTube API injected into window)
└── styles/
    └── theme.js (no dependencies)
```

## Function Call Hierarchy

### User clicks "Play Step"
```
Timeline.jsx → onPlayStep() → App.jsx
  → handlePlayStep() → useVideoPlayback.playStep()
    → extractVideoId() from urlCompression
    → ytPlayerRef.current.loadVideoById() or seekTo()
    → loopInterval for auto-replay
```

### User clicks "Add Video"
```
Header.jsx → onSettingsClick() → App.jsx
  → setShowSettingsDialog(true)
  → VideoPlayer visible → LoadVideoDialog renders
  → onSave() → handleLoadVideo() → useVideoPlayback.loadMainVideo()
    → normalizeYouTubeUrl() from urlCompression
    → new window.YT.Player()
```

### User clicks "Share"
```
Header.jsx → onShareClick() → App.jsx
  → handleGenerateShareUrl() → useSharing.generateUrl()
    → urlCompression.generateShareableUrl()
      → compressData() → extractVideoId() + btoa()
    → setShowShareDialog(true)
  → ShareDialog renders with URL
  → onCopyUrl() → navigator.clipboard.writeText()
```

### App Loads Shared URL
```
App.jsx useEffect → window.location.search
  → decompressData() from urlCompression
    → atob() + JSON.parse()
    → reconstruct videoUrl from video ID
  → setMainVideoUrl() → YouTube API ready check
    → loadMainVideo() → ytPlayerRef
    → Auto-loads video for user
```

## Key Improvements

1. **Single Responsibility**: Each file does ONE thing well
2. **Easy to Test**: Hooks and utilities can be tested independently
3. **Reusable Logic**: Hooks can be used in future components
4. **Clear Data Flow**: Props and callbacks make dependencies explicit
5. **Maintainable Styles**: All UI rules in one place
6. **Reduced Complexity**: App.jsx now a coordinator, not an executor
7. **Better Error Handling**: Centralized logic easier to debug
8. **Scalable**: Easy to add features without increasing complexity

## Example: Adding a New Feature

To add "slow-motion mode", you would:

1. Create hook: `useSlowMotion.js` - manages slow-mo state/logic
2. Add to `useVideoPlayback.js` - integrate with player controls
3. Add to `VideoPlayer.jsx` - UI control for slow-motion
4. Update `styles/theme.js` - styling if needed
5. **App.jsx changes**: Just instantiate hook and pass props

No changes to dialogs, utilities, or other components!
