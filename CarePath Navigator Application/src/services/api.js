// Connects the frontend to the XGBoost prediction backend.
// If the backend is not running, App.jsx falls back to mock data.

const API_BASE_URL = "http://localhost:8000";

export async function fetchPredictions() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predictions`);

    if (!response.ok) {
      throw new Error("Failed to fetch predictions");
    }

    const data = await response.json();
    return normalizePredictions(data);
  } catch (error) {
    console.error("Backend connection failed:", error);
    throw error;
  }
}

// The backend may name fields slightly differently (e.g. the CSV column
// "predicted_wait_time_minutes"). This maps them to the shape the UI uses,
// so backend changes only need to be handled here.
function normalizePredictions(data) {
  const list = Array.isArray(data) ? data : data.predictions || [];

  return list.map((item, index) => ({
    id: item.id ?? index + 1,
    name: item.name ?? item.hospName ?? item.hospital_name ?? "Unknown hospital",
    predicted_wait_minutes: Math.round(
      item.predicted_wait_minutes ?? item.predicted_wait_time_minutes ?? 0
    ),
    confidence_score: Math.round(item.confidence_score ?? 0),
    uncertainty_minutes:
      Math.round((item.uncertainty_minutes ?? 0) * 10) / 10,
    last_updated: item.last_updated ?? formatTime(item._datetime),
    features: item.features ?? null,
  }));
}

// Turns a datetime string like "2026-01-08 08:45:00" into "08:45".
function formatTime(datetime) {
  if (!datetime) return null;
  const date = new Date(datetime);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
