// Turns a predicted waiting time (in minutes) into a status label + colors.
// Low wait: below 60 min, Moderate wait: 60-120 min, High wait: above 120 min.
// Colors are kept soft so the page stays calm even when waits are long.

export function getWaitStatus(minutes) {
  if (minutes < 60) {
    return {
      label: "Low wait",
      textColor: "text-emerald-800",
      bgColor: "bg-emerald-50",
      dotColor: "bg-emerald-500",
      borderColor: "border-emerald-200",
    };
  }
  if (minutes <= 120) {
    return {
      label: "Moderate wait",
      textColor: "text-amber-800",
      bgColor: "bg-amber-50",
      dotColor: "bg-amber-500",
      borderColor: "border-amber-200",
    };
  }
  return {
    label: "High wait",
    textColor: "text-rose-800",
    bgColor: "bg-rose-50",
    dotColor: "bg-rose-500",
    borderColor: "border-rose-200",
  };
}
