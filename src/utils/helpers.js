/**
 * Utility Helpers
 * Time formatting, parsing, YouTube API setup, and other common functions
 */

export function fmt(seconds = 0) {
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  const m = Math.floor(seconds / 60).toString();
  return `${m}:${s}`;
}

export function parseTime(input = "") {
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

export function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) return;
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {};
}
