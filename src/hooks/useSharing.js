/**
 * useSharing Hook
 * Manages choreography sharing functionality
 */

import { useState, useCallback } from "react";
import { generateShareableUrl } from "../utils/urlCompression";

export function useSharing() {
  const [shareUrl, setShareUrl] = useState("");

  const generateUrl = useCallback((mainVideoUrl, steps, playbackMode) => {
    if (!mainVideoUrl || steps.length === 0) {
      alert("Please load a video and create at least one step before sharing");
      return false;
    }

    const url = generateShareableUrl(mainVideoUrl, steps, playbackMode);
    if (url) {
      setShareUrl(url);
      return true;
    }
    return false;
  }, []);

  const copyToClipboard = useCallback(() => {
    if (!shareUrl) return false;
    
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Share URL copied to clipboard!");
        return true;
      })
      .catch(() => {
        alert("Failed to copy URL. Please copy manually.");
        return false;
      });
  }, [shareUrl]);

  return {
    shareUrl,
    generateUrl,
    copyToClipboard,
  };
}
