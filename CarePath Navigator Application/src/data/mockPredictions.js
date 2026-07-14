// Mock data used when the backend (http://localhost:8000) is not running.
// The shape matches what the XGBoost backend returns from /api/predictions.
// Hospital names come from the real training dataset (Hong Kong A&E departments).

// Formats a time a few minutes before now, e.g. "14:30",
// so the "Last updated" labels look realistic without a backend.
function minutesAgo(minutes) {
  const time = new Date(Date.now() - minutes * 60 * 1000);
  return time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const mockPredictions = [
  {
    id: 1,
    name: "Queen Elizabeth Hospital",
    predicted_wait_minutes: 85,
    confidence_score: 91,
    uncertainty_minutes: 7.5,
    last_updated: minutesAgo(4),
    features: {
      "Median wait for urgent cases": "62 min",
      "Median wait for standard cases": "95 min",
      "Critical patients being treated": 2,
      "Emergency patients being treated": 5,
    },
  },
  {
    id: 2,
    name: "Queen Mary Hospital",
    predicted_wait_minutes: 35,
    confidence_score: 98,
    uncertainty_minutes: 0.8,
    last_updated: minutesAgo(2),
    features: {
      "Median wait for urgent cases": "17 min",
      "Median wait for standard cases": "30 min",
      "Critical patients being treated": 1,
      "Emergency patients being treated": 0,
    },
  },
  {
    id: 3,
    name: "Prince of Wales Hospital",
    predicted_wait_minutes: 132,
    confidence_score: 84,
    uncertainty_minutes: 12.3,
    last_updated: minutesAgo(7),
    features: {
      "Median wait for urgent cases": "110 min",
      "Median wait for standard cases": "150 min",
      "Critical patients being treated": 3,
      "Emergency patients being treated": 7,
    },
  },
  {
    id: 4,
    name: "Tuen Mun Hospital",
    predicted_wait_minutes: 33,
    confidence_score: 98,
    uncertainty_minutes: 0.6,
    last_updated: minutesAgo(3),
    features: {
      "Median wait for urgent cases": "21 min",
      "Median wait for standard cases": "30 min",
      "Critical patients being treated": 0,
      "Emergency patients being treated": 0,
    },
  },
  {
    id: 5,
    name: "Pamela Youde Nethersole Eastern Hospital",
    predicted_wait_minutes: 68,
    confidence_score: 89,
    uncertainty_minutes: 6.1,
    last_updated: minutesAgo(6),
    features: {
      "Median wait for urgent cases": "55 min",
      "Median wait for standard cases": "75 min",
      "Critical patients being treated": 1,
      "Emergency patients being treated": 3,
    },
  },
  {
    id: 6,
    name: "Princess Margaret Hospital",
    predicted_wait_minutes: 145,
    confidence_score: 66,
    uncertainty_minutes: 18.9,
    last_updated: minutesAgo(12),
    features: {
      "Median wait for urgent cases": "120 min",
      "Median wait for standard cases": "180 min",
      "Critical patients being treated": 4,
      "Emergency patients being treated": 8,
    },
  },
  {
    id: 7,
    name: "Kwong Wah Hospital",
    predicted_wait_minutes: 52,
    confidence_score: 93,
    uncertainty_minutes: 4.2,
    last_updated: minutesAgo(5),
    features: {
      "Median wait for urgent cases": "40 min",
      "Median wait for standard cases": "60 min",
      "Critical patients being treated": 1,
      "Emergency patients being treated": 2,
    },
  },
  {
    id: 8,
    name: "United Christian Hospital",
    predicted_wait_minutes: 98,
    confidence_score: 87,
    uncertainty_minutes: 9.4,
    last_updated: minutesAgo(8),
    features: {
      "Median wait for urgent cases": "80 min",
      "Median wait for standard cases": "110 min",
      "Critical patients being treated": 2,
      "Emergency patients being treated": 4,
    },
  },
  {
    id: 9,
    name: "Caritas Medical Centre",
    predicted_wait_minutes: 74,
    confidence_score: 90,
    uncertainty_minutes: 6.8,
    last_updated: minutesAgo(5),
    features: {
      "Median wait for urgent cases": "60 min",
      "Median wait for standard cases": "85 min",
      "Critical patients being treated": 1,
      "Emergency patients being treated": 3,
    },
  },
  {
    id: 10,
    name: "Tseung Kwan O Hospital",
    predicted_wait_minutes: 41,
    confidence_score: 95,
    uncertainty_minutes: 2.9,
    last_updated: minutesAgo(3),
    features: {
      "Median wait for urgent cases": "30 min",
      "Median wait for standard cases": "45 min",
      "Critical patients being treated": 0,
      "Emergency patients being treated": 1,
    },
  },
  {
    id: 11,
    name: "North District Hospital",
    predicted_wait_minutes: 127,
    confidence_score: 79,
    uncertainty_minutes: 14.6,
    last_updated: minutesAgo(10),
    features: {
      "Median wait for urgent cases": "100 min",
      "Median wait for standard cases": "140 min",
      "Critical patients being treated": 2,
      "Emergency patients being treated": 6,
    },
  },
  {
    id: 12,
    name: "Yan Chai Hospital",
    predicted_wait_minutes: 59,
    confidence_score: 92,
    uncertainty_minutes: 5.0,
    last_updated: minutesAgo(4),
    features: {
      "Median wait for urgent cases": "45 min",
      "Median wait for standard cases": "65 min",
      "Critical patients being treated": 1,
      "Emergency patients being treated": 2,
    },
  },
];

export default mockPredictions;
