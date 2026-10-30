type Dict = Record<string, string>;

const dict: Dict = {
  emergencyBadge: "Emergency Protocol",
  emergencyMessage: "Life-threatening? Call 999 immediately.",
  notDiagnostic: "CarePath is not a diagnostic tool. For emergencies, call 999.",
  nearbyFacilities: "Nearby facilities",
  fastest: "Fastest",
  closest: "Closest",
  allServices: "All services",
  recommended: "Recommended",
  estWait: "Est. wait",
  confidence: "Confidence",
  rationale: "Rationale",
  minutes: "min",
  liveMap: "Live facility network map",
  filterLanguage: "Filter by language",
  filterSpecialty: "Filter by specialty",
  any: "Any",
  reportWait: "Report current wait",
  reportThanks: "Thanks — your anonymous report has been queued for the data pipeline.",
  lowConfWarning:
    "The predicted wait time may be longer than expected or the prediction confidence is low. Would you still like to continue?",
  continueAnyway: "Continue anyway",
  cancel: "Cancel",
  viewDetails: "View details",
  back: "Back",
};

export function t(key: string): string {
  return dict[key] ?? key;
}
