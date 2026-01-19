/**
 * useVideoPlayback Hook
 * Manages YouTube video playback, looping, and seeking functionality
 */

import { useRef, useCallback } from "react";
import { extractVideoId } from "../utils/urlCompression";

export function useVideoPlayback() {
  const ytPlayerRef = useRef(null);
  const loopIntervalRef = useRef(null);
  const currentlyLoopingRef = useRef(null);

  const loadMainVideo = useCallback((videoUrl, playerRef, onReady) => {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      alert("Please enter a valid YouTube URL");
      return;
    }
    if (!window.YT) {
      alert("YouTube API not loaded yet");
      return;
    }
    ytPlayerRef.current?.destroy?.();
    ytPlayerRef.current = new window.YT.Player(playerRef.current, {
      videoId,
      height: "400",
      width: "100%",
      playerVars: { rel: 0, modestbranding: 1, controls: 1 },
      events: {
        onReady: onReady,
      },
    });
  }, []);

  const playStep = useCallback((step, mainVideoUrl, playbackMode, playbackSpeed, isLoopingRef) => {
    if (!ytPlayerRef.current) return;

    const startLoop = (startTime, endTime) => {
      if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = setInterval(() => {
        const t = ytPlayerRef.current.getCurrentTime();
        if (t >= endTime - 0.05) {
          ytPlayerRef.current.seekTo(startTime, true);
        }
      }, 150);
    };

    if (playbackMode === "tutorial" && step.tutorialUrl) {
      const tutorialId = extractVideoId(step.tutorialUrl);
      if (!tutorialId) {
        console.error("Could not extract tutorial video ID from:", step.tutorialUrl);
        return;
      }
      const currentVideoId = ytPlayerRef.current.getVideoData?.()?.video_id;
      
      if (currentVideoId !== tutorialId) {
        ytPlayerRef.current.loadVideoById(tutorialId);
        setTimeout(() => {
          ytPlayerRef.current?.seekTo(step.tutorialStart, true);
          ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
          ytPlayerRef.current?.playVideo();
          currentlyLoopingRef.current = step.id;
          startLoop(step.tutorialStart, step.tutorialEnd);
        }, 300);
      } else {
        ytPlayerRef.current?.seekTo(step.tutorialStart, true);
        ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
        ytPlayerRef.current?.playVideo();
        currentlyLoopingRef.current = step.id;
        startLoop(step.tutorialStart, step.tutorialEnd);
      }
    } else {
      const mainId = extractVideoId(mainVideoUrl);
      if (!mainId) {
        console.error("Could not extract video ID from:", mainVideoUrl);
        return;
      }
      const currentVideoId = ytPlayerRef.current.getVideoData?.()?.video_id;
      
      if (currentVideoId !== mainId) {
        ytPlayerRef.current.loadVideoById(mainId);
        setTimeout(() => {
          ytPlayerRef.current?.seekTo(step.mainStart, true);
          ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
          ytPlayerRef.current?.playVideo();
          currentlyLoopingRef.current = step.id;
          startLoop(step.mainStart, step.mainEnd);
        }, 300);
      } else {
        ytPlayerRef.current?.seekTo(step.mainStart, true);
        ytPlayerRef.current?.setPlaybackRate(playbackSpeed);
        ytPlayerRef.current?.playVideo();
        currentlyLoopingRef.current = step.id;
        startLoop(step.mainStart, step.mainEnd);
      }
    }
  }, []);

  const stopPlayback = useCallback(() => {
    if (loopIntervalRef.current) {
      clearInterval(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
    currentlyLoopingRef.current = null;
    ytPlayerRef.current?.pauseVideo?.();
  }, []);

  const setPlaybackSpeed = useCallback((speed) => {
    if (ytPlayerRef.current) {
      ytPlayerRef.current.setPlaybackRate(speed);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (loopIntervalRef.current) clearInterval(loopIntervalRef.current);
    if (ytPlayerRef.current?.destroy) ytPlayerRef.current.destroy();
  }, []);

  return {
    ytPlayerRef,
    currentlyLoopingRef,
    loadMainVideo,
    playStep,
    stopPlayback,
    setPlaybackSpeed,
    cleanup,
  };
}
