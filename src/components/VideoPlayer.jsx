/**
 * VideoPlayer Component
 * Main video player with playback controls
 */

import React from "react";
import { styles } from "../styles/theme";

export function VideoPlayer({
  playerRef,
  playerReady,
  playbackMode,
  onPlaybackModeChange,
  playbackSpeed,
  onPlaybackSpeedChange,
  isLooping,
  onStop,
}) {
  return (
    <div style={styles.playerSection}>
      <div ref={playerRef} style={styles.player} />
      <div style={styles.playerControls}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#1A1A1A", minWidth: "60px" }}>Mode</label>
          <select
            value={playbackMode}
            onChange={(e) => onPlaybackModeChange(e.target.value)}
            style={{ ...styles.headerSelect, flex: 0 }}
          >
            <option value="original">Original</option>
            <option value="tutorial">Tutorial</option>
          </select>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <label style={{ fontSize: "13px", fontWeight: "600", color: "#1A1A1A", minWidth: "50px" }}>Speed</label>
          <select
            value={playbackSpeed}
            onChange={(e) => onPlaybackSpeedChange(parseFloat(e.target.value))}
            style={{ ...styles.headerSelect, flex: 0 }}
          >
            <option value={0.5}>0.5x</option>
            <option value={0.75}>0.75x</option>
            <option value={1}>1x</option>
            <option value={1.25}>1.25x</option>
            <option value={1.5}>1.5x</option>
          </select>
        </div>
        <button
          onClick={onStop}
          disabled={!isLooping}
          style={{
            ...styles.btn,
            ...styles.btnSecondary,
            marginLeft: "auto",
          }}
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}
