import { getWaitStatus } from "../utils/waitStatus";
import { getConfidenceLevel } from "../utils/confidence";
import { getHospitalLocation } from "../data/hospitalLocations";
import ConfidenceBar from "./ConfidenceBar";

function HospitalDetails({ hospital, onBack }) {
  const status = getWaitStatus(hospital.predicted_wait_minutes);
  const confidence = getConfidenceLevel(hospital.confidence_score);
  const variation = Math.max(1, Math.round(hospital.uncertainty_minutes));
  const location = getHospitalLocation(hospital.name);

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onBack}
        className="mb-4 rounded-lg px-2 py-2 text-sm font-medium text-teal-700 transition hover:bg-teal-50"
      >
        &larr; Back to all hospitals
      </button>

      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm sm:p-8">
        {/* Name + status */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-stone-800">{hospital.name}</h2>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${status.bgColor} ${status.textColor}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotColor}`} />
            {status.label}
          </span>
        </div>
        {location?.address && (
          <p className="mt-1 text-sm text-stone-500">{location.address}</p>
        )}
        {hospital.last_updated && (
          <p className="mt-1 text-sm text-stone-400">
            Last updated {hospital.last_updated}
          </p>
        )}

        {/* Estimated waiting time */}
        <div className="mt-6 rounded-2xl bg-stone-50 p-5">
          <p className="text-sm text-stone-500">Estimated waiting time</p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl">
            ~{hospital.predicted_wait_minutes}
            <span className="ml-2 text-xl font-normal text-stone-400">min</span>
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Possible variation: usually around ±{variation} min more or less
            than this.
          </p>
        </div>

        {/* Prediction confidence */}
        <div className="mt-5">
          <ConfidenceBar score={hospital.confidence_score} />
          <p className="mt-2 text-sm text-stone-500">
            {confidence.word} confidence means our prediction models
            {confidence.word === "Low"
              ? " disagree with each other more than usual, so treat this estimate with extra care."
              : " mostly agree with each other, so this estimate is fairly stable."}
          </p>
        </div>

        {/* Current situation */}
        {hospital.features && (
          <div className="mt-7">
            <h3 className="text-base font-semibold text-stone-800">
              At this hospital right now
            </h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-stone-100">
              {Object.entries(hospital.features).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 border-b border-stone-100 px-4 py-3 text-sm last:border-b-0 odd:bg-stone-50/60"
                >
                  <span className="text-stone-500">{key}</span>
                  <span className="font-medium text-stone-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plain-language explanation */}
        <div className="mt-7 rounded-2xl bg-sky-50 p-5 text-sm leading-relaxed text-sky-950">
          <p className="font-semibold">What this means</p>
          <p className="mt-1.5">
            This is an estimate based on recent hospital waiting-time
            patterns. It should help you compare hospitals, but it does not
            replace emergency medical advice.
          </p>
          <p className="mt-2">
            The confidence score shows how consistent our prediction models
            are with each other. Higher confidence means a more stable
            estimate — it does not guarantee the prediction is always correct.
          </p>
          <p className="mt-2 font-medium">
            If your situation feels serious, go to the nearest emergency
            department or call emergency services right away.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetails;
