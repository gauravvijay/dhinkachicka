/**
 * Header Component
 * Application header with title and action buttons
 */

import React from "react";
import { styles } from "../styles/theme";

export function Header({ onSettingsClick, onShareClick, canShare, onTogglePanels, panelsVisible }) {
  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>🎬 dhinkachika</h1>
      <div style={styles.headerControls}>
        <button
          onClick={onSettingsClick}
          style={{
            ...styles.btn,
            ...styles.btnSecondary,
            padding: "8px 14px",
            fontSize: "13px",
          }}
        >
          ⚙️ Add Video
        </button>
        <button
          onClick={onTogglePanels}
          style={{
            ...styles.btn,
            ...styles.btnSecondary,
            padding: "8px 14px",
            fontSize: "13px",
            marginRight: "8px",
          }}
        >
          {panelsVisible ? "Hide Camera & Steps" : "Show Camera & Steps"}
        </button>
        <button
          onClick={onShareClick}
          disabled={!canShare}
          style={{
            ...styles.btn,
            ...styles.btnPrimary,
            padding: "8px 14px",
            fontSize: "13px",
          }}
        >
          🔗 Share
        </button>
      </div>
    </div>
  );
}
