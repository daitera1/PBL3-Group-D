import { lazy, Suspense, useEffect, useState } from "react";
import type { Hospital } from "@/lib/hospitals";
import type { UserLocation } from "@/lib/preferences";
import { t } from "@/lib/i18n";

interface Props {
  hospitals: Hospital[];
  activeId?: string;
  onSelect: (id: string) => void;
  userLocation?: UserLocation;
}

const LeafletMap = lazy(() => import("./LeafletMap"));

export function MapPanel({ hospitals, activeId, onSelect, userLocation }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section
      className="relative w-full md:sticky md:top-[52px] md:h-[calc(100vh-52px)] md:w-1/2 lg:w-3/5"
      aria-label={t("liveMap")}
    >
      <div className="relative h-[44vh] w-full overflow-hidden bg-surface md:h-full">
        {mounted ? (
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center font-mono text-[11px] text-muted-foreground">
                Loading live map…
              </div>
            }
          >
            <LeafletMap
              hospitals={hospitals}
              activeId={activeId}
              onSelect={onSelect}
              userLocation={userLocation}
            />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center font-mono text-[11px] text-muted-foreground">
            Loading live map…
          </div>
        )}

        {/* Legend */}
        <div className="pointer-events-none absolute bottom-4 left-4 z-[1000] rounded-md border border-border bg-card/95 p-3 backdrop-blur-sm">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {t("liveMap")}
          </p>
          <ul className="space-y-1.5 text-[11px]">
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-green" /> Low congestion
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-amber" /> Moderate
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-brand-red" /> High
            </li>
          </ul>
        </div>

        {/* Privacy note */}
        <div className="pointer-events-none absolute right-4 top-4 z-[1000] max-w-[180px] rounded-md border border-border bg-card/95 px-3 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Your location
          </p>
          <p className="mt-1 text-[11px] leading-tight">
            {userLocation ? userLocation.label : "Not set. Use the picker to enable pin previews."}
          </p>
        </div>
      </div>
    </section>
  );
}
