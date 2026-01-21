/**
 * Modal Dialog Components
 * Reusable modal dialogs for various interactions
 */

import React from "react";
import { styles } from "../styles/theme";

export function LoadVideoDialog({
  isOpen,
  videoUrl,
  onVideoUrlChange,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Load Choreography Video</h2>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
          <label style={styles.formGroupLabel}>YouTube URL</label>
          <input
            type="text"
            placeholder="https://youtu.be/dQw4w9WgXcQ"
            value={videoUrl}
            onChange={(e) => onVideoUrlChange(e.target.value)}
            style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
          />
          <small style={{ color: "#8A8A8A" }}>
            Paste the choreography video link
          </small>
        </div>
        <div style={styles.formActions}>
          <button
            onClick={onClose}
            style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}
          >
            Load Video
          </button>
        </div>
      </div>
    </div>
  );
}

export function AddStepDialog({
  isOpen,
  isEditing,
  form,
  onFormChange,
  onSave,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{isEditing ? "Edit Step" : "Add New Step"}</h2>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>

        {/* Main Video Times */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#1A1A1A", marginBottom: "12px", letterSpacing: "0.2px" }}>
            Main Video
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={styles.formGroupLabel}>Start</label>
              <input
                type="text"
                placeholder="0:15"
                value={form.mainStart}
                onChange={(e) =>
                  onFormChange({ ...form, mainStart: e.target.value })
                }
                style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
              />
              <small style={{ color: "#8A8A8A" }}>mm:ss or seconds</small>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label style={styles.formGroupLabel}>End</label>
              <input
                type="text"
                placeholder="0:30"
                value={form.mainEnd}
                onChange={(e) =>
                  onFormChange({ ...form, mainEnd: e.target.value })
                }
                style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
              />
              <small style={{ color: "#8A8A8A" }}>mm:ss or seconds</small>
            </div>
          </div>
        </div>

        <div style={{ ...styles.divider, margin: "12px 0" }} />

        {/* Tutorial Video */}
        <div style={{ marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", fontWeight: "700", color: "#1A1A1A", marginBottom: "12px", letterSpacing: "0.2px" }}>
            Tutorial Video
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
            <label style={styles.formGroupLabel}>URL (optional)</label>
            <input
              type="text"
              placeholder="https://youtu.be/different-video"
              value={form.tutorialUrl}
              onChange={(e) =>
                onFormChange({ ...form, tutorialUrl: e.target.value })
              }
              style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
            />
            <small style={{ color: "#8A8A8A" }}>
              Leave empty to use main video
            </small>
          </div>

          {form.tutorialUrl && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={styles.formGroupLabel}>Start</label>
                <input
                  type="text"
                  placeholder="0:05"
                  value={form.tutorialStart}
                  onChange={(e) =>
                    onFormChange({
                      ...form,
                      tutorialStart: e.target.value,
                    })
                  }
                  style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
                />
                <small style={{ color: "#8A8A8A" }}>mm:ss or seconds</small>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={styles.formGroupLabel}>End</label>
                <input
                  type="text"
                  placeholder="0:20"
                  value={form.tutorialEnd}
                  onChange={(e) =>
                    onFormChange({ ...form, tutorialEnd: e.target.value })
                  }
                  style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
                />
                <small style={{ color: "#8A8A8A" }}>mm:ss or seconds</small>
              </div>
            </div>
          )}
        </div>

        <div style={{ ...styles.divider, margin: "12px 0" }} />

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
          <label style={styles.formGroupLabel}>Description</label>
          <input
            type="text"
            placeholder="e.g., 'Step forward and groove'"
            value={form.lyrics}
            onChange={(e) =>
              onFormChange({ ...form, lyrics: e.target.value })
            }
            style={{ ...styles.formGroupInput, flex: "unset", width: "100%" }}
          />
          <small style={{ color: "#8A8A8A" }}>
            Optional - helps you remember this step
          </small>
        </div>

        <div style={styles.formActions}>
          <button
            onClick={onClose}
            style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}
          >
            {isEditing ? "Update Step" : "Save Step"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ShareDialog({ isOpen, shareUrl, onCopyUrl, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>🔗 Share Choreography</h2>
          <button
            onClick={onClose}
            style={styles.closeButton}
          >
            ✕
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
          <label style={styles.formGroupLabel}>Share Link</label>
          <textarea
            value={shareUrl}
            readOnly
            style={{
              ...styles.formGroupInput,
              padding: "12px 14px",
              fontSize: "12px",
              fontFamily: "monospace",
              minHeight: "70px",
              resize: "none",
              backgroundColor: "#F9F6F2",
              color: "#1A1A1A",
              wordBreak: "break-all",
              flex: "unset",
              width: "100%"
            }}
          />
          <small style={{ color: "#8A8A8A" }}>
            {shareUrl.length} characters
          </small>
        </div>
        <div style={styles.formActions}>
          <button
            onClick={onCopyUrl}
            style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}
          >
            📋 Copy Link
          </button>
          <button
            onClick={onClose}
            style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}
          >
            Close
          </button>
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "14px 16px",
            backgroundColor: "#F9F6F2",
            borderRadius: "10px",
            fontSize: "13px",
            color: "#1A1A1A",
            lineHeight: "1.6",
            border: "1.5px solid #E8DFD5",
          }}
        >
          <strong>How it works:</strong>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px", fontSize: "12px" }}>
            <li>Copy and share the link with others</li>
            <li>Your choreography will load automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
