import { t } from "@/lib/i18n";

export function EmergencyBanner() {
  return (
    <header
      role="alert"
      className="animate-header sticky top-0 z-50 flex items-center justify-between gap-4 bg-brand-red px-4 py-3 text-primary-foreground"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="size-2 shrink-0 animate-pulse rounded-full bg-primary-foreground" />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] sm:text-xs">
          {t("emergencyBadge")}
        </span>
      </div>
      <p className="truncate text-center text-xs font-semibold tracking-tight sm:text-sm">
        {t("emergencyMessage")}
      </p>
    </header>
  );
}
