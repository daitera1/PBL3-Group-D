import { useEffect, useState } from "react";
import type { Priority } from "./hospitals";

export interface UserLocation {
  lat: number;
  lng: number;
  label: string;
  source: "gps" | "manual";
}

export interface Preferences {
  priority: Priority;
  preferredLanguage?: string;
  preferredSpecialty?: string;
  userLocation?: UserLocation;
}

const KEY = "carepath:prefs:v1";

const defaults: Preferences = {
  priority: "fastest",
};

export function loadPreferences(): Preferences {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export function savePreferences(prefs: Preferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(prefs));
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(defaults);
  // hydrate after mount to keep SSR-safe
  useEffect(() => {
    setPrefs(loadPreferences());
  }, []);
  const update = (patch: Partial<Preferences>) => {
    setPrefs((p) => {
      const next = { ...p, ...patch };
      savePreferences(next);
      return next;
    });
  };
  return [prefs, update] as const;
}
