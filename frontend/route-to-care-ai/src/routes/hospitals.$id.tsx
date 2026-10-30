import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  confidenceLabel,
  congestionLabel,
  formatWait,
  generateHourlyForecast,
  getHospital,
  shouldWarn,
  type Hospital,
  type HourlyForecastPoint,
} from "@/lib/hospitals";
import { usePreferences } from "@/lib/preferences";
import { t } from "@/lib/i18n";
import { EmergencyBanner } from "@/components/EmergencyBanner";

export const Route = createFileRoute("/hospitals/$id")({
  loader: ({ params }) => {
    const hospital = getHospital(params.id);
    if (!hospital) throw notFound();
    return { hospital };
  },
  head: ({ loaderData }) => {
    const h = loaderData?.hospital;
    const title = h ? `${h.name} — CarePath Navigator` : "Hospital — CarePath Navigator";
    const description = h
      ? `${h.facilityType} in ${h.area}. Predicted ${h.waitCategory}: ${formatWait(h)} min · confidence ${confidenceLabel(h.confidenceScore)}.`
      : "Hospital details on CarePath Navigator.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: HospitalDetail,
});

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background p-6 text-center">
      <div>
        <h1 className="font-display text-2xl">Hospital not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The facility you requested isn't in our directory.
        </p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-md bg-foreground px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Back to map
        </Link>
      </div>
    </div>
  );
}

function HospitalDetail() {
  const { hospital } = Route.useLoaderData() as { hospital: Hospital };
  usePreferences();

  const tone = toneByCongestion(hospital);
  const warn = shouldWarn(hospital);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <EmergencyBanner />

      <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6">
        <Link
          to="/"
          className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          ← {t("back")}
        </Link>

        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface">
          <img
            src={hospital.photo}
            alt={`${hospital.name} facility`}
            className="h-56 w-full object-cover md:h-72"
          />
        </div>

        <header className="mt-6 grid gap-6 border-b border-border pb-8 md:grid-cols-[1fr_auto]">

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {hospital.facilityType} · {hospital.area}
            </p>
            <h1 className="mt-1 font-display text-3xl tracking-tight">{hospital.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{hospital.address}</p>
            <p className="mt-4 max-w-prose text-sm leading-relaxed">{hospital.description}</p>
          </div>

          <aside className="rounded-xl border border-border bg-card p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              {hospital.waitCategory}
            </p>
            <p className={`mt-1 font-display text-3xl ${tone.text}`}>
              {formatWait(hospital)}{" "}
              <span className="font-sans text-base font-medium">{t("minutes")}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className={`rounded px-2 py-1 ${tone.soft} ${tone.text}`}>
                {congestionLabel(hospital.congestion)}
              </span>
              <span className="rounded border border-border bg-surface px-2 py-1">
                {confidenceLabel(hospital.confidenceScore)} confidence
              </span>
            </div>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Source: predictions table · refreshed 4m ago
            </p>
          </aside>
        </header>

        {warn && (
          <div className="my-6 rounded-md border border-brand-red/30 bg-brand-red-soft p-4">
            <p className="text-sm text-brand-red">{t("lowConfWarning")}</p>
          </div>
        )}

        <section className="mt-8 grid gap-8 md:grid-cols-2">
          <Card title="Predicted busy hours today">
            <BusyChart points={generateHourlyForecast(hospital).hourly_forecast} />
            <p className="mt-3 font-mono text-[10px] leading-relaxed text-muted-foreground">
              Hourly pattern is estimated for prototype visualization.
            </p>
          </Card>

          <Card title="Supported languages">
            <ul className="divide-y divide-border">
              {hospital.languages.map((l) => (
                <li key={l.language} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">{l.language}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {l.level}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-mono text-[10px] text-muted-foreground">
              Last verified {hospital.languagesVerifiedOn}
            </p>
          </Card>

          <Card title="Departments">
            <ul className="flex flex-wrap gap-2">
              {hospital.departments.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Accepted insurance">
            <ul className="flex flex-wrap gap-2">
              {hospital.insurance.map((i) => (
                <li
                  key={i}
                  className="rounded-md border border-border bg-card px-3 py-1 font-mono text-[11px]"
                >
                  {i}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Bring with you">
            <ul className="space-y-2 text-sm">
              {hospital.documents.map((doc) => (
                <li key={doc} className="flex items-start gap-2">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-foreground" />
                  {doc}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              {hospital.arrivalInstructions}
            </p>
          </Card>

        </section>

        <footer className="mt-12 border-t border-border pt-6">
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Predictions are produced by a scheduled XGBoost job every 15 minutes and may differ
            from actual experience.{" "}
            <a href="tel:999" className="font-semibold text-brand-red underline-offset-2 hover:underline">
              Call 999 for emergencies
            </a>{" "}
            · Hospital Authority hotline: <a href="tel:23006555" className="font-semibold underline-offset-2 hover:underline">(852) 2300 6555</a>.
          </p>
        </footer>
      </main>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function BusyChart({ points }: { points: HourlyForecastPoint[] }) {
  const values = points.map((p) => p.predicted_wait_time_minutes);
  const max = Math.max(...values, 1);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return (
    <div>
      <div className="flex h-32 items-end gap-[3px]">
        {points.map((p) => {
          const v = p.predicted_wait_time_minutes;
          const h = (v / max) * 100;
          const tone =
            v > avg * 1.2 ? "bg-brand-red" : v > avg * 0.85 ? "bg-brand-amber" : "bg-brand-green";
          return (
            <div
              key={p.hour}
              className={`${tone} flex-1 rounded-sm transition-all`}
              style={{ height: `${h}%` }}
              title={`${p.hour.toString().padStart(2, "0")}:00 · ${v} min`}
            />
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-muted-foreground">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>23</span>
      </div>
    </div>
  );
}

function toneByCongestion(h: Hospital) {
  switch (h.congestion) {
    case "low":
      return { text: "text-brand-green", soft: "bg-brand-green-soft" };
    case "moderate":
      return { text: "text-brand-amber", soft: "bg-brand-amber-soft" };
    case "high":
      return { text: "text-brand-red", soft: "bg-brand-red-soft" };
  }
}
