/**
 * Timeline Component
 * Steps timeline and list view with multi-select support
 */

import React, { useState } from "react";
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
  const [selectedStepIds, setSelectedStepIds] = useState(new Set());

  const handleStepSelect = (stepId) => {
    const newSelected = new Set(selectedStepIds);
    if (newSelected.has(stepId)) {
      newSelected.delete(stepId);
    } else {
      newSelected.add(stepId);
    }
    setSelectedStepIds(newSelected);
  };

  const handlePlaySelected = () => {
    if (selectedStepIds.size === 0) return;

    const selectedSteps = steps.filter((s) => selectedStepIds.has(s.id));
    const minStart = Math.min(...selectedSteps.map((s) => s.mainStart));
    const maxEnd = Math.max(...selectedSteps.map((s) => s.mainEnd));

    onPlayStep({ mainStart: minStart, mainEnd: maxEnd, isMultiSelect: true });
  };

  const isMultiSelectMode = selectedStepIds.size > 0;

  // Sort steps by mainStart time (chronologically)
  const sortedSteps = [...steps].sort((a, b) => a.mainStart - b.mainStart);

  return (
    <div style={styles.timelineSection}>
      <div style={styles.sectionHeader}>
        <h2 style={styles.sectionTitle}>
          📍 Steps {isMultiSelectMode && `(${selectedStepIds.size} selected)`}
        </h2>
        {isMultiSelectMode ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handlePlaySelected}
              style={{
                ...styles.btn,
                ...styles.btnPrimary,
              }}
            >
              ▶️ Play Selected
            </button>
            <button
              onClick={() => setSelectedStepIds(new Set())}
              style={{
                ...styles.btn,
                ...styles.btnSecondary,
              }}
            >
              Clear
            </button>
          </div>
        ) : (
          <button
            onClick={onAddStep}
            disabled={!playerReady}
            style={{
              ...styles.btn,
              ...styles.btnPrimary,
            }}
          >
            ➕ Add Step
          </button>
        )}
      </div>

      {steps.length === 0 ? (
        <div style={styles.timelineEmpty}>Load a video to add steps</div>
      ) : (
        <div style={styles.timelineContainer}>
          <div style={styles.timelineScroll} className="no-scroll">
            <div style={styles.timelineTrack}>
              {sortedSteps.map((step) => (
                <div
                  key={step.id}
                  onClick={() => onPlayStep(step)}
                  style={{
                    ...styles.timelineBar,
                    left: `${(step.mainStart / 300) * 100}%`,
                    width: `${((step.mainEnd - step.mainStart) / 300) * 100}%`,
                    ...(currentlyLoopingStepId === step.id &&
                      styles.timelineBarActive),
                    ...(selectedStepIds.has(step.id) && {
                      backgroundColor: "#FF8A5B",
                      opacity: 1,
                      boxShadow: "0 0 10px rgba(255, 138, 91, 0.6)",
                    }),
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
            {sortedSteps.map((step) => (
              <div
                key={step.id}
                style={{
                  ...styles.stepItem,
                  ...(currentlyLoopingStepId === step.id && styles.stepItemActive),
                  ...(selectedStepIds.has(step.id) && {
                    borderColor: "#FF8A5B",
                    backgroundColor: "#FFF8F4",
                    boxShadow: "0 2px 8px rgba(255, 138, 91, 0.2)",
                  }),
                  cursor: "pointer",
                }}
                onClick={() => handleStepSelect(step.id)}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center", flex: 1 }}>
                  <input
                    type="checkbox"
                    checked={selectedStepIds.has(step.id)}
                    onChange={() => handleStepSelect(step.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      width: "18px",
                      height: "18px",
                      cursor: "pointer",
                      accentColor: "#FF8A5B",
                    }}
                  />
                  <div style={styles.stepInfo}>
                    <div style={styles.stepTime}>
                      {fmt(step.mainStart)} → {fmt(step.mainEnd)}
                    </div>
                    {step.lyrics && (
                      <div style={styles.stepLyrics}>{step.lyrics}</div>
                    )}
                  </div>
                </div>
                <div style={styles.stepActions}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditStep(step);
                    }}
                    style={{
                      ...styles.btn,
                      ...styles.btnSecondary,
                      padding: "6px 10px",
                    }}
                    title="Edit"
                  >
                    ✎
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteStep(step.id);
                    }}
                    style={{
                      ...styles.btn,
                      ...styles.btnDanger,
                      padding: "6px 10px",
                    }}
                    title="Delete"
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
