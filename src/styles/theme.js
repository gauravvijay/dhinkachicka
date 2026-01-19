/**
 * Styles Module
 * All styles for the application, separated for maintainability
 */

export const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #FF8A5B #f1f1f1; }
  body {
    font-family: 'Fredoka', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #FFFBF0 0%, #F5F0E8 100%);
    color: #2A1F1F;
    min-height: 100vh;
  }
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.2s ease, background-color 0.2s ease;
  }
  button:hover:not(:disabled) {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  button:active:not(:disabled) {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  }
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
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
    border-radius: 4px;
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
    padding: 10px 12px;
    border: 2px solid #CCC;
    border-radius: 4px;
    font-size: 13px;
    background: #fff;
    color: #2A1F1F;
    transition: border-color 0.2s ease;
  }
  input::placeholder {
    color: #999;
  }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #FF8A5B;
    box-shadow: 0 0 0 2px rgba(255, 138, 91, 0.15);
  }
  @media (max-width: 768px) {
    body { background: linear-gradient(135deg, #FFFBF0 0%, #F5F0E8 100%); }
  }
`;

export const mediaQueryStyles = `
  @media (max-width: 768px) {
    [data-mobile-stack] {
      display: grid !important;
      grid-template-columns: 1fr !important;
    }
  }
`;

export const styles = {
  container: { width: "100%", height: "100vh", fontFamily: "'Nunito', sans-serif", backgroundColor: "#FFFBF0", display: "flex", flexDirection: "column", overflow: "auto" },
  header: { backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  headerTitle: { margin: 0, fontSize: "24px", fontWeight: "700", color: "#2A1F1F" },
  headerControls: { display: "flex", gap: "12px", alignItems: "center" },
  headerSelect: { padding: "8px 12px", border: "2px solid #CCC", borderRadius: "4px", fontSize: "13px", backgroundColor: "#fff", color: "#2A1F1F", cursor: "pointer" },
  mainContent: { display: "flex", flexDirection: "column", gap: "16px", padding: "20px", flex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" },
  topRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "0" },
  playerSection: { display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  player: { width: "100%", aspectRatio: "16 / 9", backgroundColor: "#000", borderRadius: "8px", overflow: "hidden" },
  playerControls: { display: "flex", gap: "8px", flexWrap: "wrap" },
  cameraSection: { backgroundColor: "#fff", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  cameraPreview: { width: "100%", aspectRatio: "16 / 9", borderRadius: "8px", backgroundColor: "#000", objectFit: "cover" },
  cameraPlaceholder: { width: "100%", aspectRatio: "16 / 9", borderRadius: "8px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: "14px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  timelineSection: { backgroundColor: "#fff", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  timelineContainer: { display: "flex", flexDirection: "column", gap: "12px", flex: 1, overflow: "hidden" },
  timelineEmpty: { textAlign: "center", color: "#999", padding: "20px", fontSize: "14px" },
  timelineScroll: { height: "80px", backgroundColor: "#f5f5f5", borderRadius: "6px", overflow: "auto", position: "relative", border: "1px solid #e0e0e0" },
  timelineTrack: { position: "relative", height: "100%", minWidth: "100%" },
  timelineBar: { position: "absolute", height: "100%", backgroundColor: "#FF8A5B", opacity: 0.7, cursor: "pointer", top: 0, borderRadius: "3px" },
  timelineBarActive: { backgroundColor: "#5DD9C1", opacity: 1, boxShadow: "0 0 8px rgba(93, 217, 193, 0.5)" },
  timelinePlayhead: { position: "absolute", width: "2px", height: "100%", backgroundColor: "#FF8A5B", left: "0%", zIndex: 10, opacity: 0.8 },
  stepsList: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, overflow: "auto", paddingRight: "4px" },
  stepItem: { display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "12px", backgroundColor: "#f9f9f9", border: "2px solid #CCC", borderRadius: "6px", alignItems: "center" },
  stepItemActive: { borderColor: "#FF8A5B", backgroundColor: "#FFF5F0" },
  stepInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  stepTime: { fontSize: "13px", fontWeight: "600", color: "#2A1F1F" },
  stepLyrics: { fontSize: "12px", color: "#FF8A5B", fontStyle: "italic" },
  stepActions: { display: "flex", gap: "4px" },
  btn: { padding: "8px 14px", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: "none", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.12)" },
  btnPrimary: { backgroundColor: "#FF8A5B", color: "#fff" },
  btnSecondary: { backgroundColor: "#F5F5F5", color: "#2A1F1F", border: "1px solid #DDD" },
  btnSuccess: { backgroundColor: "#4CAF50", color: "#fff" },
  btnDanger: { backgroundColor: "#F44336", color: "#fff" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" },
  formActions: { display: "flex", gap: "12px", marginTop: "24px" },
  divider: { height: "1px", backgroundColor: "#E0E0E0", margin: "12px 0" },
  modalOverlay: { position: "fixed", inset: "0", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999" },
  modal: { backgroundColor: "#fff", borderRadius: "12px", padding: "32px", maxWidth: "600px", width: "90%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid #E0DDD5", color: "#2A1F1F" },
};
