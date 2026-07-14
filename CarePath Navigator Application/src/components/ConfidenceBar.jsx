import { getConfidenceLevel } from "../utils/confidence";

// Shows the prediction confidence in plain words ("High · 91%")
// with a small progress bar underneath.
function ConfidenceBar({ score }) {
  const level = getConfidenceLevel(score);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-stone-500">Prediction confidence</span>
        <span className="font-medium text-stone-700">
          {level.word} · {score}%
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
        <div
          className={`h-full rounded-full ${level.barColor}`}
          style={{ width: `${Math.min(score, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;
