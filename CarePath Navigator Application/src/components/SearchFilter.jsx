const STATUS_OPTIONS = ["All", "Low wait", "Moderate wait", "High wait"];

const SORT_OPTIONS = [
  { value: "wait", label: "Shortest wait first" },
  { value: "confidence", label: "Most reliable first" },
  { value: "name", label: "Hospital name (A to Z)" },
];

function SearchFilter({
  searchText,
  onSearchChange,
  statusFilter,
  onStatusChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <input
          type="text"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search for a hospital..."
          aria-label="Search for a hospital"
          className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm shadow-sm placeholder:text-stone-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
        />

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort hospitals"
          className="rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100 sm:w-56"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status filter pills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option}
            onClick={() => onStatusChange(option)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              statusFilter === option
                ? "bg-stone-800 text-white"
                : "border border-stone-200 bg-white text-stone-600 hover:border-stone-300 hover:bg-stone-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchFilter;
