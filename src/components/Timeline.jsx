/**
 * Timeline Component
 * Steps timeline and list view
 */

import React from "react";
import { styles } from "../styles/theme";
import { fmt } from "../utils/helpers";

export function Timeline({
  steps,
  currentlyLoopingStepId,
  playerReady,
  onPlayStep,
  onEditStep,
  onDeleteStep,
  onAddStep,
}) {
  return (
    <div style={styles.timelineSection}>
      <div style={styles.sectionHeader}>
        <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>📍 Steps</h2>
        <button
          onClick={onAddStep}
          disabled={!playerReady}
          style={{
            ...styles.btn,
            ...styles.btnPrimary,
            padding: "6px 12px",
            fontSize: "12px",
          }}
        >
          ➕ Add
        </button>
      </div>

      {steps.length === 0 ? (
        <div style={styles.timelineEmpty}>No steps yet</div>
      ) : (
        <div style={styles.timelineContainer}>
          <div style={styles.timelineScroll} className="no-scroll">
            <div style={styles.timelineTrack}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => onPlayStep(step)}
                  style={{
                    ...styles.timelineBar,
                    left: `${(step.mainStart / 300) * 100}%`,
                    width: `${((step.mainEnd - step.mainStart) / 300) * 100}%`,
                    ...(currentlyLoopingStepId === step.id &&
                      styles.timelineBarActive),
                  }}
                  title={`${fmt(step.mainStart)} - ${fmt(step.mainEnd)}${
                    step.lyrics ? ": " + step.lyrics : ""
                  }`}
                />
              ))}
              <div style={styles.timelinePlayhead} />
            </div>
          </div>

          <div style={styles.stepsList} className="no-scroll">
            {steps.map((step) => (
              <div
                key={step.id}
                style={{
                  ...styles.stepItem,
                  ...(currentlyLoopingStepId === step.id && styles.stepItemActive),
                }}
              >
                <div style={styles.stepInfo}>
                  <div style={styles.stepTime}>
                    {fmt(step.mainStart)} → {fmt(step.mainEnd)}
                  </div>
                  {step.lyrics && (
                    <div style={styles.stepLyrics}>{step.lyrics}</div>
                  )}
                </div>
                <div style={styles.stepActions}>
                  <button
                    onClick={() => onPlayStep(step)}
                    disabled={!playerReady}
                    style={{
                      ...styles.btn,
                      ...(currentlyLoopingStepId === step.id
                        ? styles.btnSuccess
                        : styles.btnSecondary),
                      padding: "4px 8px",
                      fontSize: "12px",
                    }}
                  >
                    ▶️
                  </button>
                  <button
                    onClick={() => onEditStep(step)}
                    style={{
                      ...styles.btn,
                      ...styles.btnSecondary,
                      padding: "4px 8px",
                      fontSize: "12px",
                    }}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => onDeleteStep(step.id)}
                    style={{
                      ...styles.btn,
                      ...styles.btnDanger,
                      padding: "4px 8px",
                      fontSize: "12px",
                    }}
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
