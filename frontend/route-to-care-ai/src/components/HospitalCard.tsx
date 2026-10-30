import { Link } from "@tanstack/react-router";
import {
  confidenceLabel,
  congestionLabel,
  formatWait,
  shouldWarn,
  type Ranked,
} from "@/lib/hospitals";
import { t } from "@/lib/i18n";

interface Props {
  ranked: Ranked;
  index: number;
  isTop: boolean;
  onContinue: (hospitalId: string) => void;
}

const toneByCongestion = {
  low: { dot: "bg-brand-green", text: "text-brand-green", soft: "bg-brand-green-soft" },
  moderate: { dot: "bg-brand-amber", text: "text-brand-amber", soft: "bg-brand-amber-soft" },
  high: { dot: "bg-brand-red", text: "text-brand-red", soft: "bg-brand-red-soft" },
} as const;

export function HospitalCard({ ranked, index, isTop, onContinue }: Props) {
  const h = ranked.hospital;
  const tone = toneByCongestion[h.congestion];
  const warn = shouldWarn(h);
  const isLowConf = warn;

  return (
    <article
      className={[
        "animate-list relative rounded-xl border bg-card text-card-foreground transition-colors",
        isTop
          ? "border-border bg-card shadow-sm hover:border-foreground/20"
          : "border-border/60 bg-card/60 hover:border-border",
        isLowConf ? "border-dashed" : "",
      ].join(" ")}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-32 w-full overflow-hidden rounded-t-xl bg-surface">
        <img
          src={h.photo}
          alt={`${h.name} facility`}
          loading="lazy"
          className="size-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-card to-transparent" />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`size-2 shrink-0 rounded-full ${tone.dot}`} aria-hidden />
            <h3
              className={`truncate font-display text-lg tracking-tight ${
                isLowConf ? "text-muted-foreground" : ""
              }`}
            >
              {h.name}
            </h3>
          </div>
          {isTop ? (
            <span className="rounded bg-brand-green-soft px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-brand-green">
              {t("recommended")}
            </span>
          ) : (
            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">
              {ranked.distanceMiles} mi ({ranked.distanceKm} km)
            </span>
          )}
        </div>

        <div className="mb-3 grid grid-cols-2 gap-4">
          <div>
            <p className="mb-0.5 font-mono text-[10px] uppercase text-muted-foreground">
              {t("estWait")}
            </p>
            <p className={`font-display text-xl ${tone.text} ${isLowConf ? "opacity-60" : ""}`}>
              {formatWait(h)}{" "}
              <span className="font-sans text-sm font-medium">{t("minutes")}</span>
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {h.waitCategory}
            </p>
          </div>
          <div className="text-right">
            <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">
              {t("confidence")}
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2 py-1">
              <span className={`size-1.5 rounded-full ${tone.dot}`} aria-hidden />
              <span className="text-[10px] font-bold">{confidenceLabel(h.confidenceScore)}</span>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              {h.facilityType} · {congestionLabel(h.congestion)}
            </p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{ranked.distanceKm} km</span>
          <span className="text-foreground">
            {h.languages
              .filter((l) => l.level !== "No Verified Language Support")
              .map((l) => l.language)
              .slice(0, 4)
              .join(", ")}
          </span>
        </div>

        {warn && (
          <div className="mb-3 rounded-md border border-brand-red/30 bg-brand-red-soft p-2.5">
            <p className="text-[11px] leading-relaxed text-brand-red">{t("lowConfWarning")}</p>
            <div className="mt-2 flex gap-2">
              <Link
                to="/hospitals/$id"
                params={{ id: h.id }}
                onClick={() => onContinue(h.id)}
                className="rounded border border-brand-red/40 bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-red transition-colors hover:bg-brand-red hover:text-primary-foreground"
              >
                {t("continueAnyway")}
              </Link>
            </div>
          </div>
        )}

        <div className="-mx-4 -mb-4 flex items-center justify-between gap-3 rounded-b-xl border-t border-border bg-surface/60 px-4 py-3">
          <p className="min-w-0 flex-1 text-[11px] italic leading-relaxed text-muted-foreground">
            <span className="mr-1 font-mono text-foreground not-italic">{t("rationale")}:</span>
            {ranked.rationale.replace(/^Recommended because:\s*/, "")}
          </p>
          <Link
            to="/hospitals/$id"
            params={{ id: h.id }}
            className="shrink-0 rounded-md border border-border bg-card px-3 py-1.5 text-[11px] font-semibold tracking-tight transition-colors hover:bg-foreground hover:text-primary-foreground"
          >
            {t("viewDetails")} →
          </Link>
        </div>
      </div>
    </article>
  );
}
