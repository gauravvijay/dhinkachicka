# UX Design Prompt - dhinkachika App Features

## Comprehensive App Functionality

The dhinkachika app is a web-based choreography learning tool designed to help dancers break down, practice, and share dance routines. **Core Features**: Users can load YouTube videos (supports regular watch URLs, Shorts, and short links like youtu.be) and create timestamped choreography steps with optional tutorial video references. Each step includes a start/end time (formatted as mm:ss or raw seconds) and optional lyrics/description to aid memory. Steps display in an interactive horizontal timeline that shows all moves at a glance, with a vertical steps list below showing timing and lyrics. Users can click any step to loop playback between the start and end times indefinitely, making practice focused and repetitive. The app supports two playback modes: "Original Video" (main choreography) and "Tutorial Video" (alternative instructional angle), switchable mid-practice. Playback speed can be adjusted from 0.5x to 1.5x in increments (0.5x, 0.75x, 1x, 1.25x, 1.5x) for slow-motion practice or accelerated review. Users can activate a camera mirror to see themselves dancing alongside the video, providing real-time visual feedback and self-critique capability. The app generates shareable URLs by compressing choreography data (video ID, steps, playback mode) using Base64 encoding, reducing URL size by ~60% to enable easy sharing with ~1200-character compressed links. When someone opens a shared URL, the choreography auto-loads with all steps and settings intact, eliminating setup friction. **Dialogs/Forms**: "Add Video" dialog allows pasting YouTube URLs to load main choreography content. "Add Step" dialog (also used for editing existing steps) collects main video timing (required), optional tutorial video URL with separate timing, and optional lyrics. "Share" dialog displays the compressed shareable URL with character count and copy-to-clipboard functionality. The timeline shows an interactive horizontal bar with step blocks positioned and sized proportionally by timing, with a playhead indicator. Currently, the video player and camera mirror display side-by-side on desktop (grid: 1fr 1fr) and stack vertically on mobile (<768px). **Requested Change**: Collapse the camera mirror and timeline sections by default (hidden unless explicitly opened), allowing the main video player to expand and take full width of the screen on both desktop and mobile. Add a toggle button to show/hide the camera and timeline panels, improving the primary focus on learning choreography without visual clutter.

---

## Detailed Feature Breakdown for UX Designer

**Primary Viewing Area:**
- YouTube video player with controls (play, seek, fullscreen, etc. inherited from YouTube IFrame API)
- Video title/metadata from YouTube
- Two playback modes selectable via dropdown: "Original Video" and "Tutorial Video"
- Playback speed selector: 0.5x, 0.75x, 1x (default), 1.25x, 1.5x
- "Stop" button to end looping and pause

**Choreography Steps Management:**
- Add new step: Opens modal dialog with fields for start time, end time (both required, mm:ss or seconds format), optional tutorial video URL, optional tutorial timing, optional lyrics/description
- Edit existing step: Same modal dialog but pre-populated with existing values
- Delete step: Remove from choreography permanently
- Each step displays in two places: (1) horizontal timeline as colored block, (2) vertical list with timing range and lyrics

**Timeline Visualization:**
- Horizontal bar showing all steps as proportionally-sized blocks
- Step blocks are clickable and show timing in tooltip
- Playhead indicator shows current playback position
- Steps list below timeline shows play button, edit button, delete button for each step

**Camera Mirror:**
- Toggle start/stop camera access
- Displays live video stream of dancer
- Helps with real-time visual feedback
- Requires user permission (browser camera access dialog)

**Sharing Mechanism:**
- "Share" button generates compressed URL
- Modal dialog shows full shareable link
- Copy-to-clipboard button
- Displays URL character length
- Includes instruction text about sharing

**Settings/Configuration:**
- Load Video dialog: Paste YouTube URL to load main choreography video
- Supports multiple YouTube URL formats: watch URLs (youtube.com/watch?v=ID), Shorts (youtube.com/shorts/ID), short links (youtu.be/ID)

**Data Persistence:**
- All choreography data (video, steps, settings) stored in URL parameters only (no server, no local storage)
- Shared URLs auto-load everything on page open

---

## Implementation Request

**Layout Optimization:**
- By default, show only the main video player taking up 80-90% of screen width
- Add a toggle button (labeled "Show Camera & Steps" or similar) to reveal/hide camera mirror and timeline sections
- When hidden: Single-column layout with full-width video
- When shown: Split layout (desktop: video + camera side-by-side; mobile: stacked vertically)
- Toggle state should be remembered during session (but not persisted, resets on page reload)
- Smooth animation/transition when collapsing/expanding panels

**Responsive Behavior:**
- Desktop (>768px): 
  - Collapsed (default): Full-width video player
  - Expanded: Video player (60%) + Camera (40%) OR full layout depending on preference
- Mobile (<768px):
  - Collapsed (default): Full-width video player
  - Expanded: Video player, then camera, then timeline (vertical stack)

---

## UX Designer Task

Improve the user interface of dhinkachika with the following considerations:

1. **Primary Focus**: The video player should be the hero element - dominant and distraction-free by default
2. **Secondary Controls**: Camera mirror and timeline should be collapsible to reduce cognitive load for initial learners
3. **Visual Hierarchy**: Make the main choreography video the clear focal point
4. **Accessibility**: Ensure toggle button is obvious and always available
5. **Mobile Experience**: Prioritize touch-friendly interactions and readable text on small screens
6. **Color/Branding**: Current color scheme uses #FF8A5B (coral), #5DD9C1 (teal), #2A1F1F (dark brown) - maintain consistency
7. **Animation**: Smooth transitions when expanding/collapsing panels
8. **Feedback**: Clear visual indicators for current state (collapsed/expanded, active step, playing mode)
