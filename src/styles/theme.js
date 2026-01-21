/**
 * Premium Styles Module - Ultra Premium Design System
 * All styles for the application, organized and optimized
 * Uses premium font stack for maximum elegance and performance
 */

// Import premium fonts
import '@fontsource/playfair-display/700.css';
import '@fontsource/syne/700.css';
import '@fontsource/space-grotesk/400.css';
import '@fontsource/space-grotesk/600.css';

const FONTS = {
  display: `'Playfair Display', 'Georgia', serif`,
  heading: `'Syne', 'Trebuchet MS', sans-serif`,
  body: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
};

const COLORS = {
  primary: "#FF6B35",
  primaryLight: "#FF8A5B",
  accent: "#00D9FF",
  background: "#0F0F0F",
  backgroundLight: "#252525",
  text: "#E8E8E8",
  textSecondary: "#B0B0B0",
  textMuted: "#888888",
};

export const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #FF8A5B #1F1F1F; }
  body {
    font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%);
    color: #E8E8E8;
    font-weight: 400;
    letter-spacing: 0.3px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.3px;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.15);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  button:hover:not(:disabled) {
    box-shadow: 0 8px 24px rgba(255, 107, 53, 0.25);
    transform: translateY(-2px);
  }
  button:active:not(:disabled) {
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.15);
    transform: translateY(0);
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .btn-primary {
    background: linear-gradient(135deg, #FF7D4A 0%, #FF6B35 100%) !important;
    color: #fff !important;
  }
  .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #FF8F5F 0%, #FF7D4A 100%) !important;
  }
  .btn-secondary {
    background: rgba(255, 107, 53, 0.1) !important;
    color: #FF8A5B !important;
    border: 1.5px solid rgba(255, 107, 53, 0.3) !important;
    font-weight: 600;
  }
  .btn-secondary:hover:not(:disabled) {
    background: rgba(255, 107, 53, 0.15) !important;
    border-color: rgba(255, 107, 53, 0.5) !important;
  }
  /* Global scrollbar - only visible on body/html */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #FF8A5B;
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #FF6B3B;
  }
  /* Hide all scrollbars on divs */
  .no-scroll {
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }
  .no-scroll::-webkit-scrollbar {
    display: none;
  }
  input, select, textarea {
    font-family: inherit;
    padding: 11px 14px;
    border: 1.5px solid rgba(255, 107, 53, 0.2);
    border-radius: 8px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.05);
    color: #E8E8E8;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }
  input::placeholder {
    color: #888888;
  }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #FF8A5B;
    box-shadow: 0 0 0 3px rgba(255, 138, 91, 0.15);
    background: rgba(255, 255, 255, 0.08);
  }
  label {
    font-size: 13px;
    font-weight: 600;
    color: #E8E8E8;
    letter-spacing: 0.2px;
  }
  small {
    font-size: 12px;
    color: #8A8A8A;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', 'Georgia', serif;
    line-height: 1.2;
  }
  h1 {
    font-size: 2rem;
    letter-spacing: -1px;
  }
  /* Mobile Floating Action Button */
  [data-mobile-fab] {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF7D4A 0%, #FF6B35 100%);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
    transition: all 0.3s ease;
  }
  [data-mobile-fab]:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 20px rgba(255, 107, 53, 0.5);
  }
  [data-mobile-fab]:active {
    transform: scale(0.95);
  }
  [data-mobile-fab][aria-pressed="true"] {
    background: linear-gradient(135deg, #F53E3E 0%, #E21E1E 100%);
    box-shadow: 0 4px 16px rgba(255, 68, 68, 0.5);
  }
  /* Grid for video and camera */
  [data-video-camera-grid] {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  /* Logo image styling */
  [data-logo-img] {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media (max-width: 768px) {
    body { font-size: 15px; }
    button { padding: 8px 16px; font-size: 13px; }
    h1 { font-size: 1.5rem; }
  }
`;

export const mediaQueryStyles = `
  @media (max-width: 768px) {
    [data-mobile-stack] {
      display: grid !important;
      grid-template-columns: 1fr !important;
    }
    [data-desktop-only] {
      display: none !important;
    }
    [data-mobile-fab] {
      display: flex !important;
    }
  }
`;

export const styles = {
  container: { width: "100%", minHeight: "100vh", fontFamily: "'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", backgroundColor: "#0F0F0F", display: "flex", flexDirection: "column", overflow: "auto" },
  header: { backgroundColor: "rgba(20, 20, 20, 0.8)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255, 107, 53, 0.1)", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, boxShadow: "0 2px 16px rgba(0, 0, 0, 0.3)", position: "sticky", top: 0, zIndex: 100 },
  headerTitle: { margin: 0, fontSize: "26px", fontWeight: "700", color: "#FF6B35", letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: "12px", fontFamily: "'Playfair Display', 'Georgia', serif", textShadow: "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 107, 53, 0.2)" },
  headerControls: { display: "flex", gap: "10px", alignItems: "center" },
  headerSelect: { padding: "10px 14px", border: "1.5px solid rgba(255, 107, 53, 0.2)", borderRadius: "8px", fontSize: "14px", backgroundColor: "rgba(255, 255, 255, 0.05)", color: "#E8E8E8", cursor: "pointer", fontWeight: "500", backdropFilter: "blur(10px)" },
  mainContent: { display: "flex", flexDirection: "column", gap: "16px", padding: "20px", flex: 1, width: "100%" },
  topRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  playerSection: { display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "rgba(30, 30, 30, 0.6)", borderRadius: "16px", padding: "16px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 107, 53, 0.1)", backdropFilter: "blur(10px)" },
  player: { width: "100%", aspectRatio: "16 / 9", backgroundColor: "#000", borderRadius: "12px", overflow: "hidden" },
  playerControls: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" },
  cameraSection: { backgroundColor: "rgba(30, 30, 30, 0.6)", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 107, 53, 0.1)", backdropFilter: "blur(10px)" },
  cameraPreview: { width: "100%", aspectRatio: "16 / 9", borderRadius: "12px", backgroundColor: "#000", objectFit: "cover" },
  cameraPlaceholder: { width: "100%", aspectRatio: "16 / 9", borderRadius: "12px", backgroundColor: "rgba(255, 107, 53, 0.05)", display: "flex", alignItems: "center", justifyContent: "center", color: "#666666", fontSize: "15px", fontWeight: "500", border: "2px dashed rgba(255, 107, 53, 0.2)" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0px" },
  sectionTitle: { fontSize: "15px", fontWeight: "700", color: "#E8E8E8", letterSpacing: "0.2px" },
  timelineSection: { backgroundColor: "rgba(30, 30, 30, 0.6)", borderRadius: "16px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 107, 53, 0.1)", backdropFilter: "blur(10px)" },
  timelineContainer: { display: "flex", flexDirection: "column", gap: "12px", flex: 1 },
  timelineEmpty: { textAlign: "center", color: "#666666", padding: "24px", fontSize: "14px", fontWeight: "500" },
  timelineScroll: { height: "90px", backgroundColor: "rgba(255, 107, 53, 0.05)", borderRadius: "12px", position: "relative", border: "1.5px solid rgba(255, 107, 53, 0.15)" },
  timelineTrack: { position: "relative", height: "100%", minWidth: "100%" },
  timelineBar: { position: "absolute", height: "100%", backgroundColor: "#FF8A5B", opacity: 0.6, cursor: "pointer", top: 0, borderRadius: "4px", transition: "all 0.2s ease" },
  timelineBarActive: { backgroundColor: "#00D9FF", opacity: 1, boxShadow: "0 0 16px rgba(0, 217, 255, 0.5)" },
  timelinePlayhead: { position: "absolute", width: "2px", height: "100%", backgroundColor: "#FF8A5B", left: "0%", zIndex: 10, opacity: 0.9 },
  stepsList: { display: "flex", flexDirection: "column", gap: "10px", flex: 1, paddingRight: "4px" },
  stepItem: { display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", padding: "12px", backgroundColor: "rgba(255, 107, 53, 0.05)", border: "1.5px solid rgba(255, 107, 53, 0.15)", borderRadius: "12px", alignItems: "center", transition: "all 0.2s ease" },
  stepItemActive: { borderColor: "#FF8A5B", backgroundColor: "rgba(255, 138, 91, 0.15)", boxShadow: "0 4px 12px rgba(255, 138, 91, 0.15)" },
  stepInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  stepTime: { fontSize: "13px", fontWeight: "700", color: "#E8E8E8", letterSpacing: "0.1px" },
  stepLyrics: { fontSize: "12px", color: "#888888", fontStyle: "normal" },
  stepActions: { display: "flex", gap: "6px" },
  btn: { padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", border: "none", letterSpacing: "0.3px", boxShadow: "0 4px 12px rgba(255, 107, 53, 0.15)" },
  btnPrimary: { backgroundColor: "#FF8A5B", color: "#fff" },
  btnSecondary: { backgroundColor: "rgba(255, 107, 53, 0.1)", color: "#FF8A5B", border: "1px solid rgba(255, 107, 53, 0.3)", fontWeight: "600" },
  btnSuccess: { backgroundColor: "#4CAF50", color: "#fff" },
  btnDanger: { backgroundColor: "#F44336", color: "#fff" },
  formGroup: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "18px" },
  formGroupLabel: { minWidth: "120px", fontSize: "13px", fontWeight: "700", color: "#E8E8E8", letterSpacing: "0.2px" },
  formGroupInput: { flex: 1 },
  formActions: { display: "flex", gap: "12px", marginTop: "20px" },
  divider: { height: "1px", backgroundColor: "rgba(255, 107, 53, 0.1)", margin: "18px 0" },
  modalOverlay: { position: "fixed", inset: "0", backgroundColor: "rgba(0, 0, 0, 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999", backdropFilter: "blur(4px)" },
  modal: { backgroundColor: "rgba(20, 20, 20, 0.95)", borderRadius: "16px", padding: "28px", maxWidth: "500px", width: "95%", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)", border: "1px solid rgba(255, 107, 53, 0.2)", backdropFilter: "blur(10px)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px solid rgba(255, 107, 53, 0.1)", color: "#E8E8E8" },
  modalTitle: { fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px" },
  closeButton: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", padding: "0", color: "#666666", transition: "color 0.2s ease" },
};
