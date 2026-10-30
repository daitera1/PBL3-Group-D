import { useState } from "react";
import type { UserLocation } from "@/lib/preferences";

interface Props {
  value?: UserLocation;
  onChange: (loc: UserLocation | undefined) => void;
}

export function LocationPicker({ value, onChange }: Props) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const useGPS = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("Geolocation not supported on this device.");
      return;
    }
    setBusy(true);
    setStatus("Requesting GPS…");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "My GPS location",
          source: "gps",
        });
        setStatus(null);
        setBusy(false);
      },
      (err) => {
        setStatus(`GPS unavailable: ${err.message}`);
        setBusy(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  };

  const searchAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setBusy(true);
    setStatus("Searching…");
    try {
      // Bias to Hong Kong so an "MTR" or district name resolves locally.
      const url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=hk&q=" +
        encodeURIComponent(q);
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      const data: Array<{ lat: string; lon: string; display_name: string }> =
        await res.json();
      if (!data.length) {
        setStatus("No match. Try a district or landmark in Hong Kong.");
        setBusy(false);
        return;
      }
      const hit = data[0];
      onChange({
        lat: parseFloat(hit.lat),
        lng: parseFloat(hit.lon),
        label: hit.display_name.split(",").slice(0, 2).join(",").trim(),
        source: "manual",
      });
      setStatus(null);
      setQuery("");
    } catch (err) {
      setStatus("Lookup failed. Check connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Your location
        </p>
        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {value ? (
        <p className="mb-2 truncate text-xs">
          <span className={`mr-1.5 inline-block size-1.5 rounded-full align-middle ${
            value.source === "gps" ? "bg-brand-green" : "bg-brand-amber"
          }`} />
          <span className="font-medium">{value.label}</span>
          <span className="ml-1 font-mono text-[10px] text-muted-foreground">
            {value.lat.toFixed(3)}, {value.lng.toFixed(3)}
          </span>
        </p>
      ) : (
        <p className="mb-2 text-[11px] text-muted-foreground">
          Set your location to sort by real distance. Defaults to Kowloon central.
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={useGPS}
          disabled={busy}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-primary-foreground disabled:opacity-50"
        >
          Use GPS
        </button>
        <form onSubmit={searchAddress} className="flex flex-1 gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Address, district or landmark…"
            className="flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs"
            maxLength={120}
          />
          <button
            type="submit"
            disabled={busy || !query.trim()}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-[11px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-primary-foreground disabled:opacity-50"
          >
            Set
          </button>
        </form>
      </div>

      {status && (
        <p className="mt-2 text-[11px] text-muted-foreground">{status}</p>
      )}
    </div>
  );
}
