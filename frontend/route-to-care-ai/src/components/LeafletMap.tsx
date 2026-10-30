import { useEffect } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { Hospital } from "@/lib/hospitals";
import type { UserLocation } from "@/lib/preferences";
import "leaflet/dist/leaflet.css";

const colorByCongestion = {
  low: "#15803d",
  moderate: "#b45309",
  high: "#d93025",
} as const;

interface Props {
  hospitals: Hospital[];
  activeId?: string;
  onSelect: (id: string) => void;
  userLocation?: UserLocation;
}

function makeIcon(color: string, active: boolean) {
  const size = active ? 20 : 14;
  return L.divIcon({
    className: "carepath-pin",
    html: `<span style="display:block;width:${size}px;height:${size}px;border-radius:9999px;background:${color};box-shadow:0 0 0 2px #fdfdfc,0 0 0 4px ${color}55;"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function userIcon() {
  return L.divIcon({
    className: "carepath-user-pin",
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#2563eb;box-shadow:0 0 0 3px #fdfdfc,0 0 0 6px #2563eb55;"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FlyToActive({ hospital }: { hospital?: Hospital }) {
  const map = useMap();
  useEffect(() => {
    if (hospital) map.panTo([hospital.lat, hospital.lng], { animate: true });
  }, [hospital, map]);
  return null;
}

export default function LeafletMap({ hospitals, activeId, onSelect, userLocation }: Props) {
  const active = hospitals.find((h) => h.id === activeId);
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : active
      ? [active.lat, active.lng]
      : [22.3193, 114.1694];

  const showPopups = Boolean(userLocation);

  return (
    <MapContainer
      center={center}
      zoom={11}
      scrollWheelZoom
      className="size-full"
      style={{ background: "var(--color-surface)", height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToActive hospital={active} />

      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon()}>
          <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent>
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600 }}>
              You · {userLocation.label}
            </span>
          </Tooltip>
        </Marker>
      )}

      {hospitals.map((h) => (
        <Marker
          key={h.id}
          position={[h.lat, h.lng]}
          icon={makeIcon(colorByCongestion[h.congestion], h.id === activeId)}
          eventHandlers={{ click: () => onSelect(h.id) }}
        >
          <Tooltip
            direction="top"
            offset={[0, -10]}
            opacity={1}
            permanent={showPopups}
          >
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>
              {h.name} · {h.waitLow}–{h.waitHigh} min
            </span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
