import { getWaitStatus } from "../utils/waitStatus";
import { getConfidenceLevel } from "../utils/confidence";

// Picks the hospital with the lowest predicted wait among those with
// confidence above 70%. If none qualify, falls back to the overall
// shortest wait and shows a low-confidence note.
export function getRecommendation(hospitals) {
  if (hospitals.length === 0) return null;

  const byShortestWait = [...hospitals].sort(
    (a, b) => a.predicted_wait_minutes - b.predicted_wait_minutes
  );
  const confident = byShortestWait.filter((h) => h.confidence_score > 70);

  if (confident.length > 0) {
    return { hospital: confident[0], lowConfidence: false };
  }
  return { hospital: byShortestWait[0], lowConfidence: true };
}

function RecommendedHospital({ recommendation, onViewDetails }) {
  if (!recommendation) return null;

  const { hospital, lowConfidence } = recommendation;
  const status = getWaitStatus(hospital.predicted_wait_minutes);
  const confidence = getConfidenceLevel(hospital.confidence_score);
  const variation = Math.max(1, Math.round(hospital.uncertainty_minutes));

  return (
    <div className="mb-8 rounded-2xl border border-teal-100 bg-teal-50/70 p-5 sm:p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">
        Recommended option
      </p>
      <p className="mt-0.5 text-sm text-teal-800/70">
        Shortest wait with reliable prediction
      </p>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-stone-800">{hospital.name}</h2>

          <p className="mt-2 text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            ~{hospital.predicted_wait_minutes}
            <span className="ml-1.5 text-base font-normal text-stone-500">
              min
            </span>
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Usually varies by around ±{variation} min · {confidence.word}{" "}
            confidence · {hospital.confidence_score}%
          </p>

          <span
            className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.bgColor} ${status.textColor}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
            {status.label}
          </span>
        </div>

        <button
          onClick={() => onViewDetails(hospital)}
          className="shrink-0 rounded-xl bg-teal-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700 active:bg-teal-800"
        >
          View details
        </button>
      </div>

      {lowConfidence && (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          A quick note: none of the predictions are very reliable right now.
          This hospital has the shortest estimated wait, but the actual wait
          could differ more than usual.
        </p>
      )}
    </div>
  );
}

export default RecommendedHospital;
