/**
 * CameraSection Component
 * Camera preview and control
 */

import React from "react";
import { styles } from "../styles/theme";

export function CameraSection({ cameraVideoRef, cameraActive, onToggleCamera }) {
  return (
    <div style={styles.cameraSection}>
      <div style={styles.sectionHeader}>
        <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>📷 Mirror</h2>
        <button
          onClick={onToggleCamera}
          style={{
            ...styles.btn,
            ...(cameraActive ? styles.btnDanger : styles.btnSuccess),
            padding: "6px 12px",
            fontSize: "12px",
          }}
        >
          {cameraActive ? "Stop" : "Start"}
        </button>
      </div>
      <video
        ref={cameraVideoRef}
        muted
        autoPlay
        playsInline
        style={{
          ...styles.cameraPreview,
          display: cameraActive ? "block" : "none",
        }}
      />
      {!cameraActive && <div style={styles.cameraPlaceholder}>Camera off</div>}
    </div>
  );
}
