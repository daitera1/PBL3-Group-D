# NaviCare — Hospital Waiting Time Navigator (Frontend)

A React + Vite + Tailwind CSS frontend that shows predicted A&E waiting times
from the XGBoost backend (see the `XGBoost Prediction Model` folder), with an
interactive live map of Hong Kong hospitals (Leaflet + OpenStreetMap).

## Install and run

```bash
cd "CarePath Navigator Application"
npm install
npm run dev
```

(Map dependencies are already in package.json; installing from scratch is
just `npm install`. To add them manually: `npm install leaflet react-leaflet@4`.)

Then open the URL Vite prints (usually http://localhost:5173).

## Backend connection

The frontend calls `GET http://localhost:8000/api/predictions` on load
(configured in `src/services/api.js`). It expects a JSON array (or
`{ "predictions": [...] }`) of objects like:

```json
{
  "id": 1,
  "name": "Queen Elizabeth Hospital",
  "predicted_wait_minutes": 85,
  "confidence_score": 91,
  "uncertainty_minutes": 7.5,
  "features": { "Current triage 3 median wait (min)": 62 }
}
```

Backend field names `predicted_wait_time_minutes`, `hospName`, and
`hospital_name` are also accepted (mapped in `normalizePredictions`).

If the backend is not running, the app automatically falls back to sample
data from `src/data/mockPredictions.js` and shows a banner in the header.

## Project structure

```
src/
  App.jsx                        Main page: loads data, search/filter/sort state
  main.jsx                       React entry point
  index.css                      Tailwind import + page background
  components/
    Header.jsx                   App title bar + mock-data banner
    HospitalCard.jsx             Hospital card (tap to focus it on the map)
    HospitalDetails.jsx          Detail view (opened via "View details")
    HospitalMap.jsx              Interactive Hong Kong map with wait-time markers
    SearchFilter.jsx             Search bar, status filter pills, sort dropdown
    RecommendedHospital.jsx      "Recommended option" banner + logic
    ConfidenceBar.jsx            Confidence bar with plain-word level
  services/
    api.js                       Backend fetch + field normalization
  data/
    mockPredictions.js           Fallback sample data
    hospitalLocations.js         Hong Kong A&E coordinates + name matching
  utils/
    waitStatus.js                Wait-time → status label/color mapping
    confidence.js                Confidence % → High / Fair / Low wording
```

## Map

- Centered on Hong Kong, OpenStreetMap tiles, zoom/pan enabled.
- Each hospital is a colored pill marker showing its predicted wait
  (green below 60 min, orange 60–120 min, red above 120 min).
- Clicking a marker highlights the matching hospital card; tapping a card
  flies the map to that hospital and opens its popup.
- Desktop shows the list on the left and the map on the right; on mobile
  the map appears first with the list below.
- Hospitals whose names can't be matched to coordinates in
  `src/data/hospitalLocations.js` are skipped with a console warning
  instead of crashing the app.

## Status thresholds

- **Low wait** (green): below 60 minutes
- **Moderate wait** (yellow/orange): 60–120 minutes
- **High wait** (red): above 120 minutes

## Note on the confidence score

The confidence score represents how stable the prediction is across multiple
XGBoost models. Higher confidence means the model predictions are more
consistent. It does **not** guarantee the prediction is correct.
