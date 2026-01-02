// utils/scrollResolver.js
let resolveScroll = null;

// The Router calls this to wait
export function waitForScroll() {
  return new Promise((resolve) => {
    resolveScroll = resolve;
  });
}

// Your Component calls this when data is ready
export function triggerScroll() {
  if (resolveScroll) {
    resolveScroll();
    resolveScroll = null; // Reset for next time
  }
}
