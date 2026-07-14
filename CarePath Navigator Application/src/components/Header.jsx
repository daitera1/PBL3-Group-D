function Header({ usingMockData }) {
  return (
    <header>
      {/* Top bar with the app name */}
      <div className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-baseline gap-2 px-5 py-4">
          <span className="text-xl font-bold tracking-tight text-teal-700">
            NaviCare
          </span>
          <span className="text-sm text-stone-400">
            Hospital Waiting Time Navigator
          </span>
        </div>
      </div>

      {/* Friendly greeting */}
      <div className="mx-auto max-w-5xl px-5 pt-8 pb-2">
        <h1 className="text-2xl font-bold text-stone-800 sm:text-3xl">
          Find the best hospital to visit right now
        </h1>
        <p className="mt-2 text-stone-500">
          Compare estimated waiting times before you go.
        </p>

        {usingMockData && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Live data isn't available right now, so you're seeing example
            data. Estimates will update once the connection is back.
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
