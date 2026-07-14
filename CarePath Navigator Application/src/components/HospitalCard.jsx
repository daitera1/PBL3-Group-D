import { getWaitStatus } from "../utils/waitStatus";
import ConfidenceBar from "./ConfidenceBar";

function HospitalCard({ hospital, onViewDetails, onSelect, isHighlighted }) {
  const status = getWaitStatus(hospital.predicted_wait_minutes);
  const variation = Math.max(1, Math.round(hospital.uncertainty_minutes));

  return (
    <div
      onClick={() => onSelect?.(hospital)}
      className={`flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-5 shadow-sm transition duration-150 hover:-translate-y-0.5 hover:shadow-md ${
        isHighlighted
          ? "border-teal-400 ring-2 ring-teal-200"
          : "border-stone-100"
      }`}
    >
      {/* Name area: fixed two-line height so every card lines up evenly */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 min-h-[2.75rem] flex-1 text-base font-semibold leading-snug text-stone-800">
          {hospital.name}
        </h3>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bgColor} ${status.textColor}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
          {status.label}
        </span>
      </div>

      {/* Estimated wait: fixed height so cards stay even */}
      <div className="mb-1 min-h-[5.5rem]">
        <p className="text-sm text-stone-500">Estimated wait</p>
        <p className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          ~{hospital.predicted_wait_minutes}
          <span className="ml-1.5 text-lg font-normal text-stone-400">min</span>
        </p>
        <p className="mt-1 text-xs text-stone-400">
          Usually varies by around ±{variation} min
        </p>
      </div>

      <div className="my-4">
        <ConfidenceBar score={hospital.confidence_score} />
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-stone-400">
        {hospital.last_updated ? (
          <span>Last updated {hospital.last_updated}</span>
        ) : (
          <span />
        )}
        <span className="text-teal-600">
          {isHighlighted ? "Shown on map" : "Tap to show on map"}
        </span>
      </div>

      <button
        onClick={(e) => {
          // Keep the card's "show on map" click from firing too.
          e.stopPropagation();
          onViewDetails(hospital);
        }}
        className="mt-auto w-full rounded-xl bg-teal-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-teal-700 active:bg-teal-800"
      >
        View details
      </button>
    </div>
  );
}

export default HospitalCard;
