/**
 * useCamera Hook
 * Manages camera access and stream handling
 */

import { useRef, useCallback } from "react";

export function useCamera() {
  const cameraStreamRef = useRef(null);

  const startCamera = useCallback(async (videoRef) => {
    try {
      console.log("📷 Camera: Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      console.log("📷 Camera: Access granted, stream object:", stream);
      console.log("📷 Camera: Video tracks:", stream.getVideoTracks());
      cameraStreamRef.current = stream;
      
      if (!videoRef.current) {
        console.error("📷 Camera: Video ref is not available!");
        return false;
      }
      
      videoRef.current.srcObject = stream;
      console.log("📷 Camera: Stream assigned to video element");
      console.log("✅ Camera: Active");
      return true;
    } catch (e) {
      console.error("❌ Camera error:", e);
      alert("Camera access denied: " + e.message);
      return false;
    }
  }, []);

  const stopCamera = useCallback((videoRef) => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const cleanup = useCallback(() => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      cameraStreamRef.current = null;
    }
  }, []);

  return {
    cameraStreamRef,
    startCamera,
    stopCamera,
    cleanup,
  };
}
