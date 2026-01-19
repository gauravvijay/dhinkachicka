/**
 * useStepManagement Hook
 * Manages choreography steps: add, edit, delete
 */

import { useCallback, useState } from "react";
import { parseTime } from "../utils/helpers";
import { normalizeYouTubeUrl } from "../utils/urlCompression";

export function useStepManagement(initialSteps = []) {
  const [steps, setSteps] = useState(initialSteps);
  const [editingStepId, setEditingStepId] = useState(null);
  const [dialogForm, setDialogForm] = useState({
    mainStart: "",
    mainEnd: "",
    tutorialUrl: "",
    tutorialStart: "",
    tutorialEnd: "",
    lyrics: "",
  });

  const handleAddStep = useCallback((currentlyLoopingRef) => {
    const mainStart = parseTime(dialogForm.mainStart);
    const mainEnd = parseTime(dialogForm.mainEnd);
    const tutorialStart = parseTime(dialogForm.tutorialStart);
    const tutorialEnd = parseTime(dialogForm.tutorialEnd);

    if (mainStart === null || mainEnd === null || mainStart >= mainEnd) {
      alert("Enter valid main video start/end times");
      return false;
    }

    if (dialogForm.tutorialUrl) {
      if (tutorialStart === null || tutorialEnd === null || tutorialStart >= tutorialEnd) {
        alert("Enter valid tutorial video start/end times");
        return false;
      }
    }

    const normalizedTutorialUrl = dialogForm.tutorialUrl ? normalizeYouTubeUrl(dialogForm.tutorialUrl) : "";

    if (editingStepId) {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === editingStepId
            ? {
                ...s,
                tutorialUrl: normalizedTutorialUrl,
                mainStart,
                mainEnd,
                tutorialStart: tutorialStart || 0,
                tutorialEnd: tutorialEnd || 0,
                lyrics: dialogForm.lyrics,
              }
            : s
        )
      );
      setEditingStepId(null);
    } else {
      const newStep = {
        id: Date.now().toString(36),
        tutorialUrl: normalizedTutorialUrl,
        mainStart,
        mainEnd,
        tutorialStart: tutorialStart || 0,
        tutorialEnd: tutorialEnd || 0,
        lyrics: dialogForm.lyrics,
      };
      setSteps((prev) => [...prev, newStep]);
    }

    setDialogForm({
      mainStart: "",
      mainEnd: "",
      tutorialUrl: "",
      tutorialStart: "",
      tutorialEnd: "",
      lyrics: "",
    });
    
    return true;
  }, [dialogForm, editingStepId]);

  const deleteStep = useCallback((stepId, currentlyLoopingRef) => {
    if (currentlyLoopingRef.current === stepId) {
      // Signal to stop playback if this step is currently playing
      return { shouldStop: true };
    }
    setSteps((prev) => prev.filter((s) => s.id !== stepId));
    return { shouldStop: false };
  }, []);

  const startEditingStep = useCallback((step, fmt) => {
    setDialogForm({
      mainStart: fmt(step.mainStart),
      mainEnd: fmt(step.mainEnd),
      tutorialUrl: step.tutorialUrl || "",
      tutorialStart: step.tutorialStart ? fmt(step.tutorialStart) : "",
      tutorialEnd: step.tutorialEnd ? fmt(step.tutorialEnd) : "",
      lyrics: step.lyrics || "",
    });
    setEditingStepId(step.id);
  }, []);

  const cancelEditing = useCallback(() => {
    setEditingStepId(null);
    setDialogForm({
      mainStart: "",
      mainEnd: "",
      tutorialUrl: "",
      tutorialStart: "",
      tutorialEnd: "",
      lyrics: "",
    });
  }, []);

  const setStepsData = useCallback((newSteps) => {
    setSteps(newSteps);
  }, []);

  return {
    steps,
    editingStepId,
    dialogForm,
    setDialogForm,
    handleAddStep,
    deleteStep,
    startEditingStep,
    cancelEditing,
    setStepsData,
  };
}
