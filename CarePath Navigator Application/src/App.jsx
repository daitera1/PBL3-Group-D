import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import HospitalCard from "./components/HospitalCard";
import HospitalDetails from "./components/HospitalDetails";
import HospitalMap from "./components/HospitalMap";
import SearchFilter from "./components/SearchFilter";
import RecommendedHospital, {
  getRecommendation,
} from "./components/RecommendedHospital";
import { fetchPredictions } from "./services/api";
import mockPredictions from "./data/mockPredictions";
import { getWaitStatus } from "./utils/waitStatus";

// Grey placeholder cards shown while waiting for the backend.
function LoadingCards() {
  return (
    <div>
      <p className="mb-4 text-sm text-stone-500">
        Checking current waiting times...
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="h-56 animate-pulse rounded-2xl border border-stone-100 bg-white p-5"
          >
            <div className="h-4 w-2/3 rounded bg-stone-100" />
            <div className="mt-6 h-9 w-1/2 rounded bg-stone-100" />
            <div className="mt-3 h-3 w-3/4 rounded bg-stone-100" />
            <div className="mt-8 h-10 rounded-xl bg-stone-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // The hospital currently highlighted on the map and in the list.
  const [focusedHospital, setFocusedHospital] = useState(null);

  // Refs to each card so we can scroll to one when its marker is clicked.
  const cardRefs = useRef({});

  // Search / filter / sort state
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("wait");

  // Load predictions from the backend when the dashboard opens.
  // If the backend is not running, fall back to mock data.
  useEffect(() => {
    async function loadPredictions() {
      try {
        const data = await fetchPredictions();
        setHospitals(data);
        setUsingMockData(false);
      } catch {
        setHospitals(mockPredictions);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    }
    loadPredictions();
  }, []);

  // Apply search, status filter and sorting to the hospital list.
  const visibleHospitals = useMemo(() => {
    let result = hospitals.filter((h) =>
      h.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (statusFilter !== "All") {
      result = result.filter(
        (h) => getWaitStatus(h.predicted_wait_minutes).label === statusFilter
      );
    }

    const sorted = [...result];
    if (sortBy === "wait") {
      sorted.sort((a, b) => a.predicted_wait_minutes - b.predicted_wait_minutes);
    } else if (sortBy === "confidence") {
      sorted.sort((a, b) => b.confidence_score - a.confidence_score);
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [hospitals, searchText, statusFilter, sortBy]);

  const recommendation = useMemo(() => getRecommendation(hospitals), [hospitals]);

  const hasActiveFilters = searchText !== "" || statusFilter !== "All";

  function clearFilters() {
    setSearchText("");
    setStatusFilter("All");
  }

  // Called when a map marker is clicked: highlight the matching card
  // and gently scroll it into view.
  function handleMarkerClick(hospital) {
    setFocusedHospital(hospital);
    cardRefs.current[hospital.id]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <div className="min-h-screen pb-16">
      <Header usingMockData={!loading && usingMockData} />

      <main className="mx-auto max-w-6xl px-5 py-6">
        {loading ? (
          <LoadingCards />
        ) : selectedHospital ? (
          <HospitalDetails
            hospital={selectedHospital}
            onBack={() => setSelectedHospital(null)}
          />
        ) : (
          <>
            <RecommendedHospital
              recommendation={recommendation}
              onViewDetails={setSelectedHospital}
            />

            <SearchFilter
              searchText={searchText}
              onSearchChange={setSearchText}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />

            {/* Map section title */}
            <div className="mb-4 mt-2">
              <h2 className="text-lg font-semibold text-stone-800">
                Live hospital map
              </h2>
              <p className="text-sm text-stone-500">
                See estimated waiting times across Hong Kong. Tap a marker or
                a hospital card to connect the two.
              </p>
            </div>

            {/*
              Map + list layout:
              - Mobile: map on top, list below (single column).
              - Desktop (lg): list on the left, map on the right.
              The map div comes first in the DOM, and lg:flex-row-reverse
              places it on the right on large screens.
            */}
            <div className="flex flex-col gap-5 lg:flex-row-reverse">
              {/* Map */}
              <div className="h-80 overflow-hidden rounded-2xl border border-stone-200 shadow-sm sm:h-96 lg:sticky lg:top-5 lg:h-[560px] lg:flex-1">
                <HospitalMap
                  hospitals={visibleHospitals}
                  focusedHospital={focusedHospital}
                  onMarkerClick={handleMarkerClick}
                  onViewDetails={setSelectedHospital}
                />
              </div>

              {/* Hospital list */}
              <div className="flex flex-col gap-4 lg:max-h-[560px] lg:w-[380px] lg:shrink-0 lg:overflow-y-auto lg:pr-1">
                {visibleHospitals.length === 0 ? (
                  <div className="rounded-2xl border border-stone-100 bg-white px-6 py-14 text-center shadow-sm">
                    <p className="font-medium text-stone-700">
                      No hospitals match your search.
                    </p>
                    <p className="mt-1 text-sm text-stone-500">
                      Try a different name, or clear your filters to see every
                      hospital again.
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-5 rounded-xl border border-stone-200 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                      >
                        Clear filters
                      </button>
                    )}
                  </div>
                ) : (
                  visibleHospitals.map((hospital) => (
                    <div
                      key={hospital.id}
                      ref={(el) => {
                        cardRefs.current[hospital.id] = el;
                      }}
                    >
                      <HospitalCard
                        hospital={hospital}
                        onViewDetails={setSelectedHospital}
                        onSelect={setFocusedHospital}
                        isHighlighted={focusedHospital?.id === hospital.id}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>

            <p className="mx-auto mt-10 max-w-xl text-center text-xs leading-relaxed text-stone-400">
              These are model-based estimates and should be used for
              comparison only. For emergencies, call emergency services or go
              to the nearest emergency department right away.
            </p>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
