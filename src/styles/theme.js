/**
 * Styles Module - Ultra Premium Design
 * All styles for the application, separated for maintainability
 */

export const globalStyles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #FF8A5B #f1f1f1; }
  body {
    font-family: 'Segoe Print', 'Comic Sans MS', 'Trebuchet MS', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #FFFBF0 0%, #F9F6F2 100%);
    color: #1A1A1A;
    min-height: 100vh;
    font-weight: 500;
    letter-spacing: 0.3px;
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  button:hover:not(:disabled) {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }
  button:active:not(:disabled) {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transform: translateY(0);
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  .btn-primary {
    background: linear-gradient(135deg, #FF9F6B 0%, #FF8A5B 100%) !important;
    color: #fff !important;
  }
  .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #FFB08A 0%, #FF9F6B 100%) !important;
  }
  .btn-secondary {
    background: #F5F0E8 !important;
    color: #1A1A1A !important;
    border: 1.5px solid #E8DFD5 !important;
  }
  .btn-secondary:hover:not(:disabled) {
    background: #F0E8E0 !important;
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
    border: 1.5px solid #E8E0D5;
    border-radius: 8px;
    font-size: 14px;
    background: #FFFDFB;
    color: #1A1A1A;
    transition: all 0.3s ease;
  }
  input::placeholder {
    color: #A0A0A0;
  }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #FF8A5B;
    box-shadow: 0 0 0 3px rgba(255, 138, 91, 0.1);
    background: #FFFBF8;
  }
  label {
    font-size: 13px;
    font-weight: 600;
    color: #1A1A1A;
    letter-spacing: 0.2px;
  }
  small {
    font-size: 12px;
    color: #8A8A8A;
  }
  @media (max-width: 768px) {
    body { background: linear-gradient(135deg, #FFFBF0 0%, #F9F6F2 100%); }
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
  container: { width: "100%", height: "100vh", fontFamily: "'Segoe Print', 'Comic Sans MS', 'Trebuchet MS', sans-serif", backgroundColor: "#FFFBF0", display: "flex", flexDirection: "column", overflow: "auto" },
  header: { backgroundColor: "#fff", borderBottom: "1px solid #E8DFD5", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" },
  headerTitle: { margin: 0, fontSize: "26px", fontWeight: "700", color: "#1A1A1A", letterSpacing: "-0.5px" },
  headerControls: { display: "flex", gap: "10px", alignItems: "center" },
  headerSelect: { padding: "10px 14px", border: "1.5px solid #E8E0D5", borderRadius: "8px", fontSize: "14px", backgroundColor: "#fff", color: "#1A1A1A", cursor: "pointer", fontWeight: "500" },
  mainContent: { display: "flex", flexDirection: "column", gap: "20px", padding: "24px", flex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" },
  topRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", minHeight: "0" },
  playerSection: { display: "flex", flexDirection: "column", gap: "14px", backgroundColor: "#fff", borderRadius: "14px", padding: "18px", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" },
  player: { width: "100%", aspectRatio: "16 / 9", backgroundColor: "#000", borderRadius: "10px", overflow: "hidden" },
  playerControls: { display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" },
  cameraSection: { backgroundColor: "#fff", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" },
  cameraPreview: { width: "100%", aspectRatio: "16 / 9", borderRadius: "10px", backgroundColor: "#000", objectFit: "cover" },
  cameraPlaceholder: { width: "100%", aspectRatio: "16 / 9", borderRadius: "10px", backgroundColor: "#F0E8E0", display: "flex", alignItems: "center", justifyContent: "center", color: "#A0A0A0", fontSize: "15px", fontWeight: "500" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2px" },
  sectionTitle: { fontSize: "15px", fontWeight: "700", color: "#1A1A1A", letterSpacing: "0.2px" },
  timelineSection: { backgroundColor: "#fff", borderRadius: "14px", padding: "18px", display: "flex", flexDirection: "column", gap: "14px", flex: 1, boxShadow: "0 2px 12px rgba(0, 0, 0, 0.06)" },
  timelineContainer: { display: "flex", flexDirection: "column", gap: "14px", flex: 1 },
  timelineEmpty: { textAlign: "center", color: "#A0A0A0", padding: "24px", fontSize: "14px", fontWeight: "500" },
  timelineScroll: { height: "90px", backgroundColor: "#F9F6F2", borderRadius: "10px", position: "relative", border: "1.5px solid #E8DFD5" },
  timelineTrack: { position: "relative", height: "100%", minWidth: "100%" },
  timelineBar: { position: "absolute", height: "100%", backgroundColor: "#FF8A5B", opacity: 0.6, cursor: "pointer", top: 0, borderRadius: "4px", transition: "opacity 0.2s ease" },
  timelineBarActive: { backgroundColor: "#5DD9C1", opacity: 1, boxShadow: "0 0 10px rgba(93, 217, 193, 0.4)" },
  timelinePlayhead: { position: "absolute", width: "2px", height: "100%", backgroundColor: "#FF8A5B", left: "0%", zIndex: 10, opacity: 0.9 },
  stepsList: { display: "flex", flexDirection: "column", gap: "10px", flex: 1, paddingRight: "4px" },
  stepItem: { display: "grid", gridTemplateColumns: "1fr auto", gap: "12px", padding: "13px 14px", backgroundColor: "#F9F6F2", border: "1.5px solid #E8DFD5", borderRadius: "10px", alignItems: "center", transition: "all 0.2s ease" },
  stepItemActive: { borderColor: "#FF8A5B", backgroundColor: "#FFF8F4", boxShadow: "0 2px 8px rgba(255, 138, 91, 0.08)" },
  stepInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  stepTime: { fontSize: "13px", fontWeight: "700", color: "#1A1A1A", letterSpacing: "0.1px" },
  stepLyrics: { fontSize: "12px", color: "#8A8A8A", fontStyle: "normal" },
  stepActions: { display: "flex", gap: "6px" },
  btn: { padding: "10px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", border: "none", letterSpacing: "0.3px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  btnPrimary: { backgroundColor: "#FF8A5B", color: "#fff" },
  btnSecondary: { backgroundColor: "#F5F0E8", color: "#1A1A1A", border: "1.5px solid #E8DFD5", fontWeight: "600" },
  btnSuccess: { backgroundColor: "#4CAF50", color: "#fff" },
  btnDanger: { backgroundColor: "#F44336", color: "#fff" },
  formGroup: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "18px" },
  formGroupLabel: { minWidth: "120px", fontSize: "13px", fontWeight: "700", color: "#1A1A1A", letterSpacing: "0.2px" },
  formGroupInput: { flex: 1 },
  formActions: { display: "flex", gap: "12px", marginTop: "20px" },
  divider: { height: "1px", backgroundColor: "#E8DFD5", margin: "18px 0" },
  modalOverlay: { position: "fixed", inset: "0", backgroundColor: "rgba(0, 0, 0, 0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999", backdropFilter: "blur(2px)" },
  modal: { backgroundColor: "#fff", borderRadius: "16px", padding: "28px", maxWidth: "500px", width: "95%", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "1.5px solid #E8DFD5", color: "#1A1A1A" },
  modalTitle: { fontSize: "18px", fontWeight: "700", margin: 0, letterSpacing: "-0.3px" },
  closeButton: { background: "none", border: "none", fontSize: "24px", cursor: "pointer", padding: "0", color: "#999", transition: "color 0.2s ease" },
};
