import React, { useEffect, useRef, useState } from "react";
import { compressData, decompressData, normalizeYouTubeUrl } from "./utils/urlCompression";
import { fmt, parseTime, loadYouTubeAPI } from "./utils/helpers";
import { globalStyles, mediaQueryStyles, styles } from "./styles/theme";
import { useVideoPlayback } from "./hooks/useVideoPlayback";
import { useCamera } from "./hooks/useCamera";
import { useStepManagement } from "./hooks/useStepManagement";
import { useSharing } from "./hooks/useSharing";
import { Header } from "./components/Header";
import { VideoPlayer } from "./components/VideoPlayer";
import { CameraSection } from "./components/CameraSection";
import { Timeline } from "./components/Timeline";
import { LoadVideoDialog, AddStepDialog, ShareDialog } from "./components/Dialogs";

export default function App() {
  const playerRef = useRef(null);
  const cameraVideoRef = useRef(null);

  // State management
  const [mainVideoUrl, setMainVideoUrl] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const [playbackMode, setPlaybackMode] = useState("original");
  const [cameraActive, setCameraActive] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackSpeedState, setPlaybackSpeedState] = useState(1);

  // Dialog visibility states
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);

  // Form state
  const [settingsForm, setSettingsForm] = useState({ videoUrl: "" });

  // Custom hooks
  const {
    ytPlayerRef,
    currentlyLoopingRef,
    loadMainVideo,
    playStep,
    stopPlayback,
    setPlaybackSpeed,
    cleanup: cleanupPlayback,
  } = useVideoPlayback();

  const { startCamera, stopCamera, cleanup: cleanupCamera } = useCamera();

  const {
    steps,
    editingStepId,
    dialogForm,
    setDialogForm,
    handleAddStep,
    deleteStep,
    startEditingStep,
    cancelEditing,
    setStepsData,
  } = useStepManagement();

  const { shareUrl, generateUrl, copyToClipboard } = useSharing();

  // Load YouTube API on mount
  useEffect(() => {
    loadYouTubeAPI();
  }, []);

  // Check for shared data in URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get("share");

    if (sharedData) {
      try {
        const decoded = decompressData(sharedData);
        if (decoded && decoded.videoUrl && decoded.steps) {
          console.log("📤 Loading shared choreography...");
          setMainVideoUrl(decoded.videoUrl);
          setStepsData(decoded.steps);
          if (decoded.playbackMode) setPlaybackMode(decoded.playbackMode);
          window.shouldAutoLoadVideo = true;
        }
      } catch (e) {
        console.error("Failed to load shared data:", e);
      }
    }
  }, [setStepsData]);

  // Auto-load video when shared URL is loaded
  useEffect(() => {
    const checkAndLoad = () => {
      if (mainVideoUrl && window.YT && window.YT.Player && window.shouldAutoLoadVideo) {
        console.log("Auto-loading shared video:", mainVideoUrl);
        loadMainVideo(mainVideoUrl, playerRef, () => setPlayerReady(true));
        window.shouldAutoLoadVideo = false;
      }
    };

    checkAndLoad();

    const originalCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      originalCallback?.();
      checkAndLoad();
    };

    return () => {
      window.onYouTubeIframeAPIReady = originalCallback;
    };
  }, [mainVideoUrl, loadMainVideo]);

  // Update playback speed
  useEffect(() => {
    if (isLooping) {
      setPlaybackSpeed(playbackSpeedState);
    }
  }, [playbackSpeedState, isLooping, setPlaybackSpeed]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupPlayback();
      cleanupCamera();
    };
  }, [cleanupPlayback, cleanupCamera]);

  // Handlers
  const handleLoadVideo = () => {
    const normalizedUrl = normalizeYouTubeUrl(settingsForm.videoUrl);
    setMainVideoUrl(normalizedUrl);
    loadMainVideo(normalizedUrl, playerRef, () => setPlayerReady(true));
    setShowSettingsDialog(false);
  };

  const handlePlayStep = (step) => {
    playStep(step, mainVideoUrl, playbackMode, playbackSpeedState, isLooping);
    setIsLooping(true);
  };

  const handleStopPlayback = () => {
    stopPlayback();
    setIsLooping(false);
  };

  const handleDeleteStep = (stepId) => {
    const result = deleteStep(stepId, currentlyLoopingRef);
    if (result.shouldStop) {
      handleStopPlayback();
    }
  };

  const handleSaveStep = () => {
    const success = handleAddStep(currentlyLoopingRef);
    if (success) {
      setShowAddStepDialog(false);
    }
  };

  const handleEditStepClick = (step) => {
    startEditingStep(step, fmt);
    setShowAddStepDialog(true);
  };

  const handleCancelAddStep = () => {
    cancelEditing();
    setShowAddStepDialog(false);
  };

  const handleGenerateShareUrl = () => {
    const success = generateUrl(mainVideoUrl, steps, playbackMode);
    if (success) {
      setShowShareDialog(true);
    }
  };

  const handleToggleCamera = async () => {
    if (cameraActive) {
      stopCamera(cameraVideoRef);
      setCameraActive(false);
    } else {
      const success = await startCamera(cameraVideoRef);
      if (success) {
        setCameraActive(true);
      }
    }
  };

  return (
    <div style={styles.container}>
      <style>{globalStyles + mediaQueryStyles}</style>

      {/* Mobile floating camera button */}
      <button
        onClick={handleToggleCamera}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: cameraActive ? "#FF4444" : "#FF6B35",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(255, 107, 53, 0.4)",
          transition: "all 0.3s ease",
        }}
        data-mobile-fab
        title={cameraActive ? "Stop Camera" : "Start Camera"}
      >
        📷
      </button>

      <Header
        onSettingsClick={() => {
          setSettingsForm({ videoUrl: mainVideoUrl });
          setShowSettingsDialog(true);
        }}
        onShareClick={handleGenerateShareUrl}
        canShare={!!mainVideoUrl && steps.length > 0}
      />

      <div style={styles.mainContent}>
        {/* Desktop: two-column layout, Mobile: single column */}
        <div style={styles.topRow} data-mobile-stack>
          <VideoPlayer
            playerRef={playerRef}
            playerReady={playerReady}
            playbackMode={playbackMode}
            onPlaybackModeChange={setPlaybackMode}
            playbackSpeed={playbackSpeedState}
            onPlaybackSpeedChange={setPlaybackSpeedState}
            isLooping={isLooping}
            onStop={handleStopPlayback}
          />
          <CameraSection
            cameraVideoRef={cameraVideoRef}
            cameraActive={cameraActive}
            onToggleCamera={handleToggleCamera}
          />
        </div>
        <Timeline
          steps={steps}
          currentlyLoopingStepId={currentlyLoopingRef.current}
          playerReady={playerReady}
          onPlayStep={handlePlayStep}
          onEditStep={handleEditStepClick}
          onDeleteStep={handleDeleteStep}
          onAddStep={() => {
            setDialogForm({
              mainStart: "",
              mainEnd: "",
              tutorialUrl: "",
              tutorialStart: "",
              tutorialEnd: "",
              lyrics: "",
            });
            cancelEditing();
            setShowAddStepDialog(true);
          }}
        />
      </div>

      <LoadVideoDialog
        isOpen={showSettingsDialog}
        videoUrl={settingsForm.videoUrl}
        onVideoUrlChange={(url) => setSettingsForm({ videoUrl: url })}
        onSave={handleLoadVideo}
        onClose={() => setShowSettingsDialog(false)}
      />

      <AddStepDialog
        isOpen={showAddStepDialog}
        isEditing={!!editingStepId}
        form={dialogForm}
        onFormChange={setDialogForm}
        onSave={handleSaveStep}
        onClose={handleCancelAddStep}
      />

      <ShareDialog
        isOpen={showShareDialog}
        shareUrl={shareUrl}
        onCopyUrl={copyToClipboard}
        onClose={() => setShowShareDialog(false)}
      />
    </div>
  );
}
