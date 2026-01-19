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
        <select
          value={playbackMode}
          onChange={(e) => onPlaybackModeChange(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        >
          <option value="original">Original Video</option>
          <option value="tutorial">Tutorial Video</option>
        </select>
        <select
          value={playbackSpeed}
          onChange={(e) => onPlaybackSpeedChange(parseFloat(e.target.value))}
          style={{ flex: 1, padding: "8px", marginLeft: "8px" }}
        >
          <option value={0.5}>0.5x Speed</option>
          <option value={0.75}>0.75x Speed</option>
          <option value={1}>1x Speed</option>
          <option value={1.25}>1.25x Speed</option>
          <option value={1.5}>1.5x Speed</option>
        </select>
        <button
          onClick={onStop}
          disabled={!isLooping}
          style={{
            ...styles.btn,
            ...styles.btnSecondary,
            marginLeft: "8px",
          }}
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}
