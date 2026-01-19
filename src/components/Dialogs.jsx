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
          <h2>Load Choreography Video</h2>
          <button
            onClick={onClose}
            style={{
              ...styles.btn,
              ...styles.btnSecondary,
              padding: "4px 8px",
              fontSize: "14px",
              minWidth: "auto",
            }}
          >
            ✕
          </button>
        </div>
        <div style={styles.formGroup}>
          <label>YouTube Video URL</label>
          <input
            type="text"
            placeholder="e.g., https://youtu.be/dQw4w9WgXcQ"
            value={videoUrl}
            onChange={(e) => onVideoUrlChange(e.target.value)}
            style={{ width: "100%" }}
          />
          <small style={{ color: "#999" }}>
            The main choreography video you want to learn from
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
          <h2>{isEditing ? "Edit Step" : "Add New Step"}</h2>
          <button
            onClick={onClose}
            style={{
              ...styles.btn,
              ...styles.btnSecondary,
              padding: "4px 8px",
              fontSize: "14px",
              minWidth: "auto",
            }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={styles.formGroup}>
            <label>Start Time</label>
            <input
              type="text"
              placeholder="0:15"
              value={form.mainStart}
              onChange={(e) =>
                onFormChange({ ...form, mainStart: e.target.value })
              }
              style={{ width: "100%" }}
            />
            <small style={{ color: "#999" }}>mm:ss or seconds</small>
          </div>
          <div style={styles.formGroup}>
            <label>End Time</label>
            <input
              type="text"
              placeholder="0:30"
              value={form.mainEnd}
              onChange={(e) =>
                onFormChange({ ...form, mainEnd: e.target.value })
              }
              style={{ width: "100%" }}
            />
            <small style={{ color: "#999" }}>mm:ss or seconds</small>
          </div>
        </div>
        <div style={styles.divider} />
        <div style={styles.formGroup}>
          <label>Tutorial Video URL (optional)</label>
          <input
            type="text"
            placeholder="e.g., https://youtu.be/different-video"
            value={form.tutorialUrl}
            onChange={(e) =>
              onFormChange({ ...form, tutorialUrl: e.target.value })
            }
            style={{ width: "100%" }}
          />
          <small style={{ color: "#999" }}>
            Alternative tutorial video for this step (if different)
          </small>
        </div>
        {form.tutorialUrl && (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div style={styles.formGroup}>
                <label>Tutorial Start</label>
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
                  style={{ width: "100%" }}
                />
                <small style={{ color: "#999" }}>mm:ss or seconds</small>
              </div>
              <div style={styles.formGroup}>
                <label>Tutorial End</label>
                <input
                  type="text"
                  placeholder="0:20"
                  value={form.tutorialEnd}
                  onChange={(e) =>
                    onFormChange({ ...form, tutorialEnd: e.target.value })
                  }
                  style={{ width: "100%" }}
                />
                <small style={{ color: "#999" }}>mm:ss or seconds</small>
              </div>
            </div>
          </>
        )}
        <div style={styles.divider} />
        <div style={styles.formGroup}>
          <label>Lyrics / Description (optional)</label>
          <input
            type="text"
            placeholder="e.g., 'Step forward and groove'"
            value={form.lyrics}
            onChange={(e) =>
              onFormChange({ ...form, lyrics: e.target.value })
            }
            style={{ width: "100%" }}
          />
          <small style={{ color: "#999" }}>
            Helps you remember what happens in this step
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
          <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#2A1F1F" }}>
            🔗 Share Choreography
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>
        <div style={styles.formGroup}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#2A1F1F" }}>
            Shareable Link
          </label>
          <textarea
            value={shareUrl}
            readOnly
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "12px",
              border: "2px solid #CCC",
              borderRadius: "4px",
              fontFamily: "monospace",
              minHeight: "80px",
              resize: "vertical",
              backgroundColor: "#f9f9f9",
              color: "#2A1F1F",
            }}
          />
          <p style={{ fontSize: "12px", color: "#999", margin: "8px 0 0 0" }}>
            Link size: {shareUrl.length} characters
          </p>
        </div>
        <div style={styles.formActions}>
          <button
            onClick={onCopyUrl}
            style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}
          >
            📋 Copy to Clipboard
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
            padding: "12px",
            backgroundColor: "#f0f7ff",
            borderRadius: "6px",
            fontSize: "12px",
            color: "#2A1F1F",
            lineHeight: "1.5",
          }}
        >
          <strong>How to share:</strong>
          <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
            <li>Copy the link and share it with others</li>
            <li>When they open it, your choreography and steps will load automatically</li>
            <li>No need to save or upload files separately</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
