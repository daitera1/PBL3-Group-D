// Translates a raw confidence percentage into plain words,
// so users don't have to interpret the number themselves.

export function getConfidenceLevel(score) {
  if (score >= 85) {
    return { word: "High", barColor: "bg-teal-500" };
  }
  if (score >= 70) {
    return { word: "Fair", barColor: "bg-sky-500" };
  }
  return { word: "Low", barColor: "bg-amber-400" };
}
