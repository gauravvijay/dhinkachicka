import React, { useEffect, useRef, useState } from "react";

function fmt(seconds = 0) {
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  const m = Math.floor(seconds / 60).toString();
  return `${m}:${s}`;
}

function parseTime(input = "") {
  input = input.trim();
  if (!input) return null;
  if (input.includes(":")) {
    const parts = input.split(":").map((p) => parseFloat(p.trim()));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return parts[0] * 60 + parts[1];
    }
  }
  const n = parseFloat(input);
  return isNaN(n) ? null : n;
}

const STORAGE_KEYS = {
  videoUrl: "dhinkachika.videoUrl",
  steps: "dhinkachika.steps",
  playbackMode: "dhinkachika.mode",
  savedVideos: "dhinkachika.videos", // Map of URLs to their steps
};

export default function App() {
  const playerRef = useRef(null);
  const cameraVideoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const loopIntervalRef = useRef(null);
  const currentlyLoopingRef = useRef(null);

  const [mainVideoUrl, setMainVideoUrl] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const [steps, setSteps] = useState([]);
  const [playbackMode, setPlaybackMode] = useState("original");
  const [cameraActive, setCameraActive] = useState(false);
  const [showAddStepDialog, setShowAddStepDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showManageDataDialog, setShowManageDataDialog] = useState(false);
  const [editingStepId, setEditingStepId] = useState(null);
  const [isLooping, setIsLooping] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedStepForThumbnail, setSelectedStepForThumbnail] = useState(null);
  const [savedVideos, setSavedVideos] = useState({});

  const [dialogForm, setDialogForm] = useState({
    mainStart: "",
    mainEnd: "",
    tutorialUrl: "",
    tutorialStart: "",
    tutorialEnd: "",
    lyrics: "",
  });

  const [settingsForm, setSettingsForm] = useState({
    videoUrl: "",
  });

  useEffect(() => {
    if (window.YT && window.YT.Player) return;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {};
  }, []);

  useEffect(() => {
    const savedUrl = localStorage.getItem(STORAGE_KEYS.videoUrl);
    const savedSteps = localStorage.getItem(STORAGE_KEYS.steps);
    const savedMode = localStorage.getItem(STORAGE_KEYS.playbackMode);
    const savedVidMap = localStorage.getItem(STORAGE_KEYS.savedVideos);

    if (savedUrl) setMainVideoUrl(savedUrl);
    if (savedSteps) {
      try {
        setSteps(JSON.parse(savedSteps));
      } catch (e) {}
    }
    if (savedMode) setPlaybackMode(savedMode);
    if (savedVidMap) {
      try {
        setSavedVideos(JSON.parse(savedVidMap));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.videoUrl, mainVideoUrl);
  }, [mainVideoUrl]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.steps, JSON.stringify(steps));
    // Update saved videos with current steps
    if (mainVideoUrl) {
      setSavedVideos((prev) => ({ ...prev, [mainVideoUrl]: steps }));
    }
  }, [steps, mainVideoUrl]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.playbackMode, playbackMode);
  }, [playbackMode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.savedVideos, JSON.stringify(savedVideos));
  }, [savedVideos]);

  useEffect(() => {
    if (ytPlayerRef.current && isLooping) {
      ytPlayerRef.current.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed, isLooping]);

  useEffect(() => {
    return () => {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      if (ytPlayerRef.current?.destroy) ytPlayerRef.current.destroy();
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  function extractVideoId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/);
    return m ? m[1] : null;
  }

  function loadMainVideo() {
    const videoId = extractVideoId(mainVideoUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    if (!window.YT) {
      alert("YouTube API not loaded yet");
      return;
    }
    ytPlayerRef.current?.destroy?.();
    setPlayerReady(false);
    ytPlayerRef.current = new window.YT.Player(playerRef.current, {
      videoId,
      height: "400",
      width: "100%",
      playerVars: { rel: 0, modestbranding: 1, controls: 1 },
      events: {
        onReady: () => setPlayerReady(true),
      },
    });
  }

  function playStep(step) {
    if (!ytPlayerRef.current || !playerReady) return;
    setIsLooping(true);

    if (playbackMode === "tutorial" && step.tutorialUrl) {
      const tutorialId = extractVideoId(step.tutorialUrl);
      if (!tutorialId) return;
      ytPlayerRef.current.loadVideoById(tutorialId);
      setTimeout(() => {
        ytPlayerRef.current?.seekTo(step.tutorialStart, true);
        ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
        ytPlayerRef.current?.playVideo();
        currentlyLoopingRef.current = step.id;
        if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = setInterval(() => {
          const t = ytPlayerRef.current.getCurrentTime();
          if (t >= step.tutorialEnd - 0.05) {
            ytPlayerRef.current.seekTo(step.tutorialStart, true);
          }
        }, 150);
      }, 300);
    } else {
      const mainId = extractVideoId(mainVideoUrl);
      ytPlayerRef.current.loadVideoById(mainId);
      setTimeout(() => {
        ytPlayerRef.current?.seekTo(step.mainStart, true);
        ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
        ytPlayerRef.current?.playVideo();
        currentlyLoopingRef.current = step.id;
        if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
        loopIntervalRef.current = setInterval(() => {
          const t = ytPlayerRef.current.getCurrentTime();
          if (t >= step.mainEnd - 0.05) {
            ytPlayerRef.current.seekTo(step.mainStart, true);
          }
        }, 150);
      }, 300);
    }
  }

  function stopPlayback() {
    if (loopIntervalRef.current) {
      clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
    currentlyLoopingRef.current = null;
    ytPlayerRef.current?.pauseVideo?.();
    setIsLooping(false);
  }

  function handleAddStep() {
    const mainStart = parseTime(dialogForm.mainStart);
    const mainEnd = parseTime(dialogForm.mainEnd);
    const tutorialStart = parseTime(dialogForm.tutorialStart);
    const tutorialEnd = parseTime(dialogForm.tutorialEnd);

    if (mainStart === null || mainEnd === null || mainStart >= mainEnd) {
      alert("Enter valid main video start/end times");
      return;
    }

    if (dialogForm.tutorialUrl) {
      if (tutorialStart === null || tutorialEnd === null || tutorialStart >= tutorialEnd) {
        alert("Enter valid tutorial video start/end times");
        return;
      }
    }

    if (editingStepId) {
      // Update existing step
      setSteps((prev) =>
        prev.map((s) =>
          s.id === editingStepId
            ? {
                ...s,
                tutorialUrl: dialogForm.tutorialUrl,
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
      // Create new step
      const newStep = {
        id: Date.now().toString(36),
        tutorialUrl: dialogForm.tutorialUrl,
        mainStart,
        mainEnd,
        tutorialStart: tutorialStart || 0,
        tutorialEnd: tutorialEnd || 0,
        lyrics: dialogForm.lyrics,
      };
      setSteps((prev) => [...prev, newStep]);
    }

    setDialogForm({ mainStart: "", mainEnd: "", tutorialUrl: "", tutorialStart: "", tutorialEnd: "", lyrics: "" });
    setShowAddStepDialog(false);
  }

  function deleteStep(id) {
    if (currentlyLoopingRef.current === id) stopPlayback();
    setSteps((prev) => prev.filter((s) => s.id !== id));
  }

  async function startCamera() {
    try {
      console.log("📷 Camera: Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
      console.log("📷 Camera: Access granted, stream object:", stream);
      console.log("📷 Camera: Video tracks:", stream.getVideoTracks());
      cameraStreamRef.current = stream;
      
      // Check if ref exists
      if (!cameraVideoRef.current) {
        console.error("📷 Camera: Video ref is not available!");
        setCameraActive(true);
        return;
      }
      
      cameraVideoRef.current.srcObject = stream;
      console.log("📷 Camera: Stream assigned to video element");
      setCameraActive(true);
      console.log("✅ Camera: Active");
    } catch (e) {
      console.error("❌ Camera error:", e);
      alert("Camera access denied: " + e.message);
    }
  }

  function stopCamera() {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
    if (cameraVideoRef.current) cameraVideoRef.current.srcObject = null;
    setCameraActive(false);
  }

  function loadSavedVideo(videoUrl) {
    setMainVideoUrl(videoUrl);
    const stepsForVideo = savedVideos[videoUrl] || [];
    setSteps(stepsForVideo);
    loadMainVideo();
  }

  function clearAllData() {
    if (confirm("Clear all saved steps and video URL?")) {
      localStorage.removeItem(STORAGE_KEYS.videoUrl);
      localStorage.removeItem(STORAGE_KEYS.steps);
      setMainVideoUrl("");
      setSteps([]);
      stopPlayback();
    }
  }

  const handleSettingsClick = () => {
    setSettingsForm({ videoUrl: mainVideoUrl });
    setShowSettingsDialog(true);
  };

  const handleAddStepClick = () => {
    setDialogForm({ mainStart: "", mainEnd: "", tutorialUrl: "", tutorialStart: "", tutorialEnd: "", lyrics: "" });
    setEditingStepId(null);
    setShowAddStepDialog(true);
  };

  const handleEditStepClick = (step) => {
    setDialogForm({
      mainStart: fmt(step.mainStart),
      mainEnd: fmt(step.mainEnd),
      tutorialUrl: step.tutorialUrl || "",
      tutorialStart: step.tutorialStart ? fmt(step.tutorialStart) : "",
      tutorialEnd: step.tutorialEnd ? fmt(step.tutorialEnd) : "",
      lyrics: step.lyrics || "",
    });
    setEditingStepId(step.id);
    setShowAddStepDialog(true);
  };

  const handleSaveSettings = () => {
    setMainVideoUrl(settingsForm.videoUrl);
    loadMainVideo();
    setShowSettingsDialog(false);
  };

  return (
    <div style={styles.container}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; scrollbar-width: thin; scrollbar-color: #FF8A5B #f1f1f1; }
        body {
          font-family: 'Fredoka', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #FFFBF0 0%, #F5F0E8 100%);
          color: #2A1F1F;
          min-height: 100vh;
        }
        button {
          font-family: inherit;
          cursor: pointer;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
          transition: box-shadow 0.2s ease, background-color 0.2s ease;
        }
        button:hover:not(:disabled) {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }
        button:active:not(:disabled) {
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
        }
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        /* Global scrollbar - only visible on body/html */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #FF8A5B;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF6B3B;
        }
        /* Hide all scrollbars on divs */
        .no-scroll {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
        input, select, textarea {
          font-family: inherit;
          padding: 10px 12px;
          border: 2px solid #CCC;
          border-radius: 4px;
          font-size: 13px;
          background: #fff;
          color: #2A1F1F;
          transition: border-color 0.2s ease;
        }
        input::placeholder {
          color: #999;
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #FF8A5B;
          box-shadow: 0 0 0 2px rgba(255, 138, 91, 0.15);
        }
        @media (max-width: 768px) {
          body { background: linear-gradient(135deg, #FFFBF0 0%, #F5F0E8 100%); }
        }
      `}</style>

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🎬 dhinkachika</h1>
        <div style={styles.headerControls}>
          {Object.keys(savedVideos).length > 0 && (
            <select 
              value={mainVideoUrl} 
              onChange={(e) => loadSavedVideo(e.target.value)} 
              style={{ ...styles.headerSelect, marginRight: "12px" }}
            >
              <option value="">Select saved video...</option>
              {Object.keys(savedVideos).map((url) => (
                <option key={url} value={url}>
                  {url.substring(url.lastIndexOf("/") + 1, url.lastIndexOf("/") === -1 ? url.length : url.length)}
                </option>
              ))}
            </select>
          )}
          <button onClick={handleSettingsClick} style={{ ...styles.btn, ...styles.btnSecondary, padding: "8px 14px", fontSize: "13px" }}>
            ⚙️ Add Video
          </button>
        </div>
      </div>

      <div style={styles.mainContent}>
        {/* Top Row: Video and Camera */}
        <div style={styles.topRow}>
          {/* Main Player */}
          <div style={styles.playerSection}>
            <div ref={playerRef} style={styles.player} />
            <div style={styles.playerControls}>
              <select value={playbackMode} onChange={(e) => setPlaybackMode(e.target.value)} style={{ flex: 1, padding: "8px" }}>
                <option value="original">Original Video</option>
                <option value="tutorial">Tutorial Video</option>
              </select>
              <select value={playbackSpeed} onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))} style={{ flex: 1, padding: "8px", marginLeft: "8px" }}>
                <option value={0.5}>0.5x Speed</option>
                <option value={0.75}>0.75x Speed</option>
                <option value={1}>1x Speed</option>
                <option value={1.25}>1.25x Speed</option>
                <option value={1.5}>1.5x Speed</option>
              </select>
              <button onClick={stopPlayback} disabled={!isLooping} style={{ ...styles.btn, ...styles.btnSecondary, marginLeft: "8px" }}>
                ⏹ Stop
              </button>
            </div>
          </div>

          {/* Camera Mirror */}
          <div style={styles.cameraSection}>
            <div style={styles.sectionHeader}>
              <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>📷 Mirror</h2>
              <button onClick={() => (cameraActive ? stopCamera() : startCamera())} style={{ ...styles.btn, ...(cameraActive ? styles.btnDanger : styles.btnSuccess), padding: "6px 12px", fontSize: "12px" }}>
                {cameraActive ? "Stop" : "Start"}
              </button>
            </div>
            <video 
              ref={cameraVideoRef} 
              muted 
              autoPlay 
              playsInline 
              style={{ ...styles.cameraPreview, display: cameraActive ? "block" : "none" }} 
            />
            {!cameraActive && (
              <div style={styles.cameraPlaceholder}>Camera off</div>
            )}
          </div>
        </div>

        {/* Bottom Row: Full-Width Steps Timeline */}
        <div style={styles.timelineSection}>
          <div style={styles.sectionHeader}>
            <h2 style={{ margin: 0, fontSize: "18px", color: "#fff" }}>📍 Steps</h2>
            <button onClick={handleAddStepClick} disabled={!playerReady} style={{ ...styles.btn, ...styles.btnPrimary, padding: "6px 12px", fontSize: "12px" }}>
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
                    <div key={step.id} onClick={() => playStep(step)} style={{ ...styles.timelineBar, left: `${(step.mainStart / 300) * 100}%`, width: `${((step.mainEnd - step.mainStart) / 300) * 100}%`, ...(currentlyLoopingRef.current === step.id && styles.timelineBarActive) }} title={`${fmt(step.mainStart)} - ${fmt(step.mainEnd)}${step.lyrics ? ': ' + step.lyrics : ''}`} />
                  ))}
                  <div style={styles.timelinePlayhead} />
                </div>
              </div>

              <div style={styles.stepsList} className="no-scroll">
                {steps.map((step) => (
                  <div key={step.id} style={{ ...styles.stepItem, ...(currentlyLoopingRef.current === step.id && styles.stepItemActive) }}>
                    <div style={styles.stepInfo}>
                      <div style={styles.stepTime}>{fmt(step.mainStart)} → {fmt(step.mainEnd)}</div>
                      {step.lyrics && <div style={styles.stepLyrics}>{step.lyrics}</div>}
                    </div>
                    <div style={styles.stepActions}>
                      <button onClick={() => playStep(step)} disabled={!playerReady} style={{ ...styles.btn, ...(currentlyLoopingRef.current === step.id ? styles.btnSuccess : styles.btnSecondary), padding: "4px 8px", fontSize: "12px" }}>
                        ▶️
                      </button>
                      <button onClick={() => handleEditStepClick(step)} style={{ ...styles.btn, ...styles.btnSecondary, padding: "4px 8px", fontSize: "12px" }}>
                        ✎
                      </button>
                      <button onClick={() => deleteStep(step.id)} style={{ ...styles.btn, ...styles.btnDanger, padding: "4px 8px", fontSize: "12px" }}>
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Load Video Dialog */}
      {showSettingsDialog && (
        <div style={styles.modalOverlay} onClick={() => setShowSettingsDialog(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Load Choreography Video</h2>
              <button onClick={() => setShowSettingsDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, padding: "4px 8px", fontSize: "14px", minWidth: "auto" }}>
                ✕
              </button>
            </div>
            <div style={styles.formGroup}>
              <label>YouTube Video URL</label>
              <input
                type="text"
                placeholder="e.g., https://youtu.be/dQw4w9WgXcQ"
                value={settingsForm.videoUrl}
                onChange={(e) => setSettingsForm({ videoUrl: e.target.value })}
                style={{ width: "100%" }}
              />
              <small style={{ color: "#999" }}>The main choreography video you want to learn from</small>
            </div>
            <div style={styles.formActions}>
              <button onClick={() => setShowSettingsDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleSaveSettings} style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}>
                Load Video
              </button>
            </div>
            <button onClick={() => { setShowSettingsDialog(false); setShowManageDataDialog(true); }} style={{ ...styles.btn, ...styles.btnSecondary, width: "100%", marginTop: "16px" }}>
              ⚙️ Manage Data
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Step Dialog */}
      {showAddStepDialog && (
        <div style={styles.modalOverlay} onClick={() => setShowAddStepDialog(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>{editingStepId ? "Edit Step" : "Add New Step"}</h2>
              <button onClick={() => setShowAddStepDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, padding: "4px 8px", fontSize: "14px", minWidth: "auto" }}>
                ✕
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              <div style={styles.formGroup}>
                <label>Start Time</label>
                <input type="text" placeholder="0:15" value={dialogForm.mainStart} onChange={(e) => setDialogForm({ ...dialogForm, mainStart: e.target.value })} style={{ width: "100%" }} />
                <small style={{ color: "#999" }}>mm:ss or seconds</small>
              </div>
              <div style={styles.formGroup}>
                <label>End Time</label>
                <input type="text" placeholder="0:30" value={dialogForm.mainEnd} onChange={(e) => setDialogForm({ ...dialogForm, mainEnd: e.target.value })} style={{ width: "100%" }} />
                <small style={{ color: "#999" }}>mm:ss or seconds</small>
              </div>
            </div>
            <div style={styles.divider} />
            <div style={styles.formGroup}>
              <label>Tutorial Video URL (optional)</label>
              <input type="text" placeholder="e.g., https://youtu.be/different-video" value={dialogForm.tutorialUrl} onChange={(e) => setDialogForm({ ...dialogForm, tutorialUrl: e.target.value })} style={{ width: "100%" }} />
              <small style={{ color: "#999" }}>Alternative tutorial video for this step (if different)</small>
            </div>
            {dialogForm.tutorialUrl && (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
                  <div style={styles.formGroup}>
                    <label>Tutorial Start</label>
                    <input type="text" placeholder="0:05" value={dialogForm.tutorialStart} onChange={(e) => setDialogForm({ ...dialogForm, tutorialStart: e.target.value })} style={{ width: "100%" }} />
                    <small style={{ color: "#999" }}>mm:ss or seconds</small>
                  </div>
                  <div style={styles.formGroup}>
                    <label>Tutorial End</label>
                    <input type="text" placeholder="0:20" value={dialogForm.tutorialEnd} onChange={(e) => setDialogForm({ ...dialogForm, tutorialEnd: e.target.value })} style={{ width: "100%" }} />
                    <small style={{ color: "#999" }}>mm:ss or seconds</small>
                  </div>
                </div>
              </>
            )}
            <div style={styles.divider} />
            <div style={styles.formGroup}>
              <label>Lyrics / Description (optional)</label>
              <input type="text" placeholder="e.g., 'Step forward and groove'" value={dialogForm.lyrics} onChange={(e) => setDialogForm({ ...dialogForm, lyrics: e.target.value })} style={{ width: "100%" }} />
              <small style={{ color: "#999" }}>Helps you remember what happens in this step</small>
            </div>
            <div style={styles.formActions}>
              <button onClick={() => setShowAddStepDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleAddStep} style={{ ...styles.btn, ...styles.btnPrimary, flex: 1 }}>
                {editingStepId ? "Update Step" : "Save Step"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Data Dialog */}
      {showManageDataDialog && (
        <div style={styles.modalOverlay} onClick={() => setShowManageDataDialog(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>Manage Data</h2>
              <button onClick={() => setShowManageDataDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, padding: "4px 8px", fontSize: "14px", minWidth: "auto" }}>
                ✕
              </button>
            </div>
            <div style={styles.formGroup}>
              <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                Clearing all data will reset your video URL and all steps you've created. This action cannot be undone.
              </p>
            </div>
            <div style={styles.formActions}>
              <button onClick={() => setShowManageDataDialog(false)} style={{ ...styles.btn, ...styles.btnSecondary, flex: 1 }}>
                Cancel
              </button>
              <button onClick={() => { clearAllData(); setShowManageDataDialog(false); }} style={{ ...styles.btn, ...styles.btnDanger, flex: 1 }}>
                🧹 Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { width: "100%", height: "100vh", fontFamily: "'Nunito', sans-serif", backgroundColor: "#FFFBF0", display: "flex", flexDirection: "column", overflow: "auto" },
  header: { backgroundColor: "#fff", borderBottom: "1px solid #e0e0e0", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 },
  headerTitle: { margin: 0, fontSize: "24px", fontWeight: "700", color: "#2A1F1F" },
  headerControls: { display: "flex", gap: "12px", alignItems: "center" },
  headerSelect: { padding: "8px 12px", border: "2px solid #CCC", borderRadius: "4px", fontSize: "13px", backgroundColor: "#fff", color: "#2A1F1F", cursor: "pointer" },
  mainContent: { display: "flex", flexDirection: "column", gap: "16px", padding: "20px", flex: 1, maxWidth: "1400px", margin: "0 auto", width: "100%" },
  topRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", minHeight: "0" },
  playerSection: { display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  player: { width: "100%", aspectRatio: "16 / 9", backgroundColor: "#000", borderRadius: "8px", overflow: "hidden" },
  playerControls: { display: "flex", gap: "8px", flexWrap: "wrap" },
  cameraSection: { backgroundColor: "#fff", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  cameraPreview: { width: "100%", aspectRatio: "16 / 9", borderRadius: "8px", backgroundColor: "#000", objectFit: "cover" },
  cameraPlaceholder: { width: "100%", aspectRatio: "16 / 9", borderRadius: "8px", backgroundColor: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", color: "#999", fontSize: "14px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" },
  timelineSection: { backgroundColor: "#fff", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" },
  timelineContainer: { display: "flex", flexDirection: "column", gap: "12px", flex: 1, overflow: "hidden" },
  timelineEmpty: { textAlign: "center", color: "#999", padding: "20px", fontSize: "14px" },
  timelineScroll: { height: "80px", backgroundColor: "#f5f5f5", borderRadius: "6px", overflow: "auto", position: "relative", border: "1px solid #e0e0e0" },
  timelineTrack: { position: "relative", height: "100%", minWidth: "100%" },
  timelineBar: { position: "absolute", height: "100%", backgroundColor: "#FF8A5B", opacity: 0.7, cursor: "pointer", top: 0, borderRadius: "3px" },
  timelineBarActive: { backgroundColor: "#5DD9C1", opacity: 1, boxShadow: "0 0 8px rgba(93, 217, 193, 0.5)" },
  timelinePlayhead: { position: "absolute", width: "2px", height: "100%", backgroundColor: "#FF8A5B", left: "0%", zIndex: 10, opacity: 0.8 },
  stepsList: { display: "flex", flexDirection: "column", gap: "8px", flex: 1, overflow: "auto", paddingRight: "4px" },
  stepItem: { display: "grid", gridTemplateColumns: "1fr auto", gap: "8px", padding: "12px", backgroundColor: "#f9f9f9", border: "2px solid #CCC", borderRadius: "6px", alignItems: "center" },
  stepItemActive: { borderColor: "#FF8A5B", backgroundColor: "#FFF5F0" },
  stepInfo: { display: "flex", flexDirection: "column", gap: "4px" },
  stepTime: { fontSize: "13px", fontWeight: "600", color: "#2A1F1F" },
  stepLyrics: { fontSize: "12px", color: "#FF8A5B", fontStyle: "italic" },
  stepActions: { display: "flex", gap: "4px" },
  btn: { padding: "8px 14px", borderRadius: "4px", fontSize: "13px", fontWeight: "500", cursor: "pointer", border: "none", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.12)" },
  btnPrimary: { backgroundColor: "#FF8A5B", color: "#fff" },
  btnSecondary: { backgroundColor: "#F5F5F5", color: "#2A1F1F", border: "1px solid #DDD" },
  btnSuccess: { backgroundColor: "#4CAF50", color: "#fff" },
  btnDanger: { backgroundColor: "#F44336", color: "#fff" },
  formGroup: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" },
  formActions: { display: "flex", gap: "12px", marginTop: "24px" },
  divider: { height: "1px", backgroundColor: "#E0E0E0", margin: "12px 0" },
  modalOverlay: { position: "fixed", inset: "0", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: "9999" },
  modal: { backgroundColor: "#fff", borderRadius: "12px", padding: "32px", maxWidth: "600px", width: "90%", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "12px", borderBottom: "1px solid #E0DDD5", color: "#2A1F1F" },
};
