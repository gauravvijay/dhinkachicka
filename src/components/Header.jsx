/**
 * Header Component
 * Application header with title and action buttons
 */

import React from "react";
import { styles } from "../styles/theme";

export function Header({ onSettingsClick, onShareClick, canShare }) {
  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>🎬 dhinkachika</h1>
      <div style={styles.headerControls}>
        <button
          onClick={onSettingsClick}
          style={styles.btn}
          className="btn-secondary"
        >
          ⚙️ Load Video
        </button>
        <button
          onClick={onShareClick}
          disabled={!canShare}
          style={styles.btn}
          className="btn-primary"
        >
          🔗 Share
        </button>
      </div>
    </div>
  );
}
