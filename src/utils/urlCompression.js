/**
 * URL Compression Utilities
 * Handles encoding/decoding of choreography data to shareable URLs
 * Stores only video IDs instead of full URLs, reducing share URL size by ~60%
 */

export function extractVideoId(url) {
  if (!url) return null;
  
  // Handle embed URLs: youtube.com/embed/VIDEO_ID
  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
  if (embedMatch) return embedMatch[1];
  
  // Handle YouTube Shorts: youtube.com/shorts/VIDEO_ID
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) return shortsMatch[1];
  
  // Handle regular YouTube URLs: youtube.com/watch?v=VIDEO_ID and youtu.be/VIDEO_ID
  const m = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&?/]+)/);
  return m ? m[1] : null;
}

export function normalizeYouTubeUrl(url) {
  // Detect YouTube Shorts and convert to embeddable format ONLY for Shorts
  const shortsMatch = url.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]+)/);
  if (shortsMatch) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }
  return url;
}

export function compressData(data) {
  // Only store video IDs and steps - reconstruct URLs on load
  // This reduces share URL size by ~60%
  const compressed = {
    v: extractVideoId(data.videoUrl), // main video ID
    s: data.steps, // steps array
    m: data.playbackMode || "original"
  };
  const json = JSON.stringify(compressed);
  return btoa(json); // Base64 encode
}

export function decompressData(encoded) {
  try {
    const json = atob(encoded);
    const compressed = JSON.parse(json);
    // Reconstruct full URL from video ID
    return {
      videoUrl: compressed.v ? `https://www.youtube.com/embed/${compressed.v}` : "",
      steps: compressed.s || [],
      playbackMode: compressed.m || "original"
    };
  } catch (e) {
    console.error("Failed to decompress data:", e);
    return null;
  }
}

export function generateShareableUrl(mainVideoUrl, steps, playbackMode) {
  if (!mainVideoUrl || steps.length === 0) {
    return null;
  }

  const dataToShare = {
    videoUrl: mainVideoUrl,
    steps: steps,
    playbackMode: playbackMode,
  };

  const compressed = compressData(dataToShare);
  const baseUrl = window.location.origin + window.location.pathname;
  const fullUrl = `${baseUrl}?share=${encodeURIComponent(compressed)}`;
  
  console.log(`📤 Share URL length: ${fullUrl.length} characters`);
  console.log(`📤 Data size: ${JSON.stringify(dataToShare).length} characters`);
  console.log(`📤 Compressed size: ${compressed.length} characters`);
  
  return fullUrl;
}
