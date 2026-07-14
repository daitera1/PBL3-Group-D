import { useEffect, useMemo, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// --- Leaflet icon fix for React/Vite ---------------------------------
// Leaflet's default marker images don't resolve correctly when bundled
// by Vite, so we point them at the copies inside the leaflet package.
// (Our own markers use custom div icons, but this keeps any default
// marker usage from showing as a broken image.)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
// ----------------------------------------------------------------------

import { getHospitalLocation } from "../data/hospitalLocations";
import { getWaitStatus } from "../utils/waitStatus";
import { getConfidenceLevel } from "../utils/confidence";

// Roughly the middle of Hong Kong, so all hospitals fit on screen.
const HONG_KONG_CENTER = [22.36, 114.13];
const DEFAULT_ZOOM = 11;

// Colors for the wait-time pill markers (kept in sync with the
// status colors used on the hospital cards).
const MARKER_COLORS = {
  "Low wait": "#059669", // emerald
  "Moderate wait": "#d97706", // amber
  "High wait": "#e11d48", // rose
};

// Builds a small rounded "pill" marker showing the predicted wait.
// A div icon is plain HTML, which lets us color and label it freely.
function makePillIcon(hospital, isFocused) {
  const status = getWaitStatus(hospital.predicted_wait_minutes);
  const color = MARKER_COLORS[status.label];

  return L.divIcon({
    className: "", // no default Leaflet styling
    html: `
      <div style="
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 999px;
        background: ${color};
        color: white;
        font-size: 12px;
        font-weight: 600;
        font-family: system-ui, sans-serif;
        white-space: nowrap;
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.35)${
          isFocused ? `, 0 0 0 3px ${color}55` : ""
        };
        transform: scale(${isFocused ? 1.15 : 1});
        transform-origin: center;
      ">
        ${hospital.predicted_wait_minutes} min
      </div>
    `,
    iconSize: null, // let the HTML decide its own size
    iconAnchor: [30, 14], // roughly the middle of the pill
  });
}

// Small helper component: whenever the focused hospital changes,
// glide the map over to it. (useMap only works inside MapContainer.)
function FlyToFocusedHospital({ hospital }) {
  const map = useMap();

  useEffect(() => {
    if (hospital?.location) {
      map.flyTo([hospital.location.lat, hospital.location.lng], 13, {
        duration: 0.8,
      });
    }
  }, [hospital, map]);

  return null;
}

function HospitalMap({ hospitals, focusedHospital, onMarkerClick, onViewDetails }) {
  // Keep a ref to each marker so we can open its popup
  // when the user selects a hospital from the card list.
  const markerRefs = useRef({});

  // Attach coordinates to each hospital; skip the ones we can't place.
  const hospitalsOnMap = useMemo(
    () =>
      hospitals
        .map((h) => ({ ...h, location: getHospitalLocation(h.name) }))
        .filter((h) => h.location !== null),
    [hospitals]
  );

  const focusedWithLocation = useMemo(() => {
    if (!focusedHospital) return null;
    return hospitalsOnMap.find((h) => h.id === focusedHospital.id) ?? null;
  }, [focusedHospital, hospitalsOnMap]);

  // When a hospital card is selected, open its marker popup too.
  useEffect(() => {
    if (focusedWithLocation) {
      markerRefs.current[focusedWithLocation.id]?.openPopup();
    }
  }, [focusedWithLocation]);

  return (
    <MapContainer
      center={HONG_KONG_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FlyToFocusedHospital hospital={focusedWithLocation} />

      {hospitalsOnMap.map((hospital) => {
        const status = getWaitStatus(hospital.predicted_wait_minutes);
        const confidence = getConfidenceLevel(hospital.confidence_score);
        const variation = Math.max(1, Math.round(hospital.uncertainty_minutes));
        const isFocused = focusedWithLocation?.id === hospital.id;

        return (
          <Marker
            key={hospital.id}
            position={[hospital.location.lat, hospital.location.lng]}
            icon={makePillIcon(hospital, isFocused)}
            zIndexOffset={isFocused ? 1000 : 0}
            ref={(ref) => {
              markerRefs.current[hospital.id] = ref;
            }}
            eventHandlers={{
              click: () => onMarkerClick(hospital),
            }}
          >
            <Popup>
              <div className="min-w-52 font-sans">
                <p className="text-sm font-semibold text-stone-800">
                  {hospital.name}
                </p>
                {hospital.location.address && (
                  <p className="mt-0.5 text-xs text-stone-400">
                    {hospital.location.address}
                  </p>
                )}

                <p className="mt-2 text-sm text-stone-700">
                  Estimated wait: ~{hospital.predicted_wait_minutes} min
                </p>
                <p className="mt-0.5 text-xs text-stone-500">
                  Usually varies by around ±{variation} min
                </p>
                <p className="mt-0.5 text-xs text-stone-500">
                  Prediction confidence: {confidence.word} ·{" "}
                  {hospital.confidence_score}%
                </p>

                <span
                  className={`mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${status.bgColor} ${status.textColor}`}
                >
                  {status.label}
                </span>

                {hospital.last_updated && (
                  <p className="mt-1.5 text-xs text-stone-400">
                    Last updated {hospital.last_updated}
                  </p>
                )}

                <button
                  onClick={() => onViewDetails(hospital)}
                  className="mt-2.5 w-full rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-teal-700"
                >
                  View details
                </button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default HospitalMap;
