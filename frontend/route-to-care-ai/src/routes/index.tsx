import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ALL_LANGUAGES,
  ALL_SPECIALTIES,
  hospitals,
  rankHospitals,
  type Priority,
} from "@/lib/hospitals";
import { usePreferences } from "@/lib/preferences";
import { t } from "@/lib/i18n";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { MapPanel } from "@/components/MapPanel";
import { HospitalCard } from "@/components/HospitalCard";
import { LocationPicker } from "@/components/LocationPicker";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CarePath Navigator — Hong Kong A&E wait-time estimator" },
      {
        name: "description",
        content:
          "Live XGBoost-predicted A&E wait times across all 18 Hospital Authority hospitals in Hong Kong. Not a diagnostic tool — for emergencies call 999.",
      },
      { property: "og:title", content: "CarePath Navigator — Hong Kong A&E wait-time estimator" },
      {
        property: "og:description",
        content:
          "Live XGBoost-predicted A&E wait times across all 18 Hospital Authority hospitals in Hong Kong. Not a diagnostic tool — for emergencies call 999.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [prefs, updatePrefs] = usePreferences();
  const [activeId, setActiveId] = useState<string | undefined>(hospitals[0]?.id);
  const [overrideContinue, setOverrideContinue] = useState<Record<string, boolean>>({});


  // Simulate load-balancing: penalise the most popular pick to redistribute traffic.
  const loadBalanceFactor = useMemo(() => {
    const top = hospitals[0]?.id;
    return top ? { [top]: 0.15 } : {};
  }, []);

  const visibleHospitals = useMemo(() => {
    return hospitals.filter((h) => {
      if (
        prefs.preferredSpecialty &&
        !h.specialties.includes(prefs.preferredSpecialty)
      )
        return false;
      if (
        prefs.preferredLanguage &&
        !h.languages.some(
          (l) =>
            l.language === prefs.preferredLanguage &&
            l.level !== "No Verified Language Support",
        )
      )
        return false;
      return true;
    });
  }, [prefs.preferredSpecialty, prefs.preferredLanguage]);

  const ranked = useMemo(
    () =>
      rankHospitals(visibleHospitals, {
        priority: prefs.priority,
        preferredLanguage: prefs.preferredLanguage,
        preferredSpecialty: prefs.preferredSpecialty,
        loadBalanceFactor,
        userLocation: prefs.userLocation
          ? { lat: prefs.userLocation.lat, lng: prefs.userLocation.lng }
          : undefined,
      }),
    [visibleHospitals, prefs, loadBalanceFactor],
  );

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <EmergencyBanner />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:flex-row">
        <MapPanel
          hospitals={hospitals}
          activeId={activeId}
          onSelect={setActiveId}
          userLocation={prefs.userLocation}
        />


        <section className="animate-list w-full space-y-6 overflow-y-auto p-4 md:w-1/2 md:p-6 lg:w-2/5">
          {/* Header & priority toggle */}
          <div className="space-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                CarePath Navigator · Hong Kong
              </p>
              <h1 className="mt-1 font-display text-2xl tracking-tight">
                {t("nearbyFacilities")}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <PriorityToggle
                value={prefs.priority}
                onChange={(p) => updatePrefs({ priority: p })}
              />
            </div>


            <LocationPicker
              value={prefs.userLocation}
              onChange={(loc) => updatePrefs({ userLocation: loc })}
            />

            {/* Filters */}
            <div className="grid grid-cols-2 gap-3">
              <SelectField
                label={t("filterSpecialty")}
                value={prefs.preferredSpecialty ?? ""}
                onChange={(v) =>
                  updatePrefs({ preferredSpecialty: v || undefined })
                }
                options={[
                  { value: "", label: t("any") },
                  ...ALL_SPECIALTIES.map((s) => ({ value: s, label: s })),
                ]}
              />
              <SelectField
                label={t("filterLanguage")}
                value={prefs.preferredLanguage ?? ""}
                onChange={(v) =>
                  updatePrefs({ preferredLanguage: v || undefined })
                }
                options={[
                  { value: "", label: t("any") },
                  ...ALL_LANGUAGES.map((l) => ({ value: l, label: l })),
                ]}
              />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {ranked.map((r, idx) => (
              <HospitalCard
                key={r.hospital.id}
                ranked={
                  overrideContinue[r.hospital.id]
                    ? { ...r, rationale: "Acknowledged warning — proceeding to facility details." }
                    : r
                }
                index={idx}
                isTop={idx === 0}
                onContinue={(id) =>
                  setOverrideContinue((m) => ({ ...m, [id]: true }))
                }
              />
            ))}
            {ranked.length === 0 && (
              <p className="rounded-md border border-dashed border-border bg-card p-4 text-sm text-muted-foreground">
                No facilities match the current filters.
              </p>
            )}
          </div>

          <footer className="border-t border-border pt-6">
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              {t("notDiagnostic")} Emergency: <strong className="text-brand-red">999</strong>{" "}
              · Hospital Authority hotline: <strong>(852) 2300 6555</strong>.
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}


function PriorityToggle({
  value,
  onChange,
}: {
  value: Priority;
  onChange: (p: Priority) => void;
}) {
  return (
    <div className="inline-flex rounded-md bg-surface p-1" role="group" aria-label="Priority">
      {(["fastest", "closest"] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={[
            "rounded-[4px] px-3 py-1 text-xs font-semibold transition-colors",
            value === opt
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {t(opt)}
        </button>
      ))}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-border bg-card px-2.5 py-2 text-xs font-medium"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span>{label}</span>
      <span className="font-mono text-muted-foreground">{value}</span>
    </div>
  );
}
