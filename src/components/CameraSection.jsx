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
        <h2 style={styles.sectionTitle}>📷 Mirror</h2>
        <button
          onClick={onToggleCamera}
          style={{
            ...styles.btn,
            ...(cameraActive ? styles.btnDanger : styles.btnPrimary),
          }}
        >
          {cameraActive ? "Stop Camera" : "Start Camera"}
        </button>
      </div>
      {cameraActive ? (
        <video
          ref={cameraVideoRef}
          muted
          autoPlay
          playsInline
          style={{
            ...styles.cameraPreview,
            display: "block",
          }}
        />
      ) : (
        <div style={styles.cameraPlaceholder}>
          Camera off - click Start Camera to begin
        </div>
      )}
    </div>
  );
}
