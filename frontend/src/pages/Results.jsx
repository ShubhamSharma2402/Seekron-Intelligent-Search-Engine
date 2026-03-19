import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import FilterPanel from "../components/FilterPanel";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { searchAPI } from "../services/api";
import { useTheme } from "../App";

const Results = () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const query = queryParams.get("q");
  const { isDark, toggleTheme } = useTheme();

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTime, setSearchTime] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [minScore, setMinScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      setLoading(true);
      setResults([]);
      const start = performance.now();
      const data = await searchAPI(query);
      const elapsed = Math.round(performance.now() - start);
      setResults(data.results || []);
      setSearchTime(elapsed);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  // Normalise scores relative to the top result (same scale shown in ResultCard)
  const maxScore = results.length > 0 ? Math.max(...results.map((r) => r.score || 0)) : 1;

  const filteredResults = results
    .filter((r) => {
      // Category filter
      if (selectedCategory !== "all" && r.category !== selectedCategory) return false;
      // Min relevance filter — use the same normalised percentage shown on ResultCard
      const normalizedScore = maxScore > 0 ? Math.round(((r.score || 0) / maxScore) * 100) : 0;
      return normalizedScore >= minScore;
    })
    .sort((a, b) => {
      if (sortBy === "relevance") return (b.score || 0) - (a.score || 0);
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "");
      return 0;
    });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <span className="hidden sm:block font-bold text-slate-900 dark:text-white tracking-tight">
              Seekron
            </span>
          </a>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl">
            <SearchBar initialQuery={query} />
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen((p) => !p)}
            className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              filtersOpen
                ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-700/50"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            Filters
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 transition-all shrink-0"
          >
            {isDark ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 flex gap-5">
        {/* Filter sidebar */}
        {filtersOpen && (
          <FilterPanel
            onClose={() => setFiltersOpen(false)}
            minScore={minScore}
            onMinScoreChange={setMinScore}
            category={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        )}

        {/* Results main column */}
        <main className="flex-1 min-w-0">
          {/* Result meta bar */}
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {loading ? (
                <span>Searching…</span>
              ) : results.length > 0 ? (
                <>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{filteredResults.length}</span> result{filteredResults.length !== 1 ? "s" : ""}
                  {query && (
                    <> for{" "}<span className="font-medium text-indigo-600 dark:text-indigo-400">"{query}"</span></>
                  )}
                  {searchTime !== null && (
                    <span className="ml-2 text-slate-400 dark:text-slate-500">&mdash; {searchTime}ms</span>
                  )}
                </>
              ) : null}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="title">Title A–Z</option>
              </select>
            </div>
          </div>

          {/* Loading skeletons */}
          {loading && (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <LoadingSkeleton key={i} style={{ animationDelay: `${i * 60}ms` }} />
              ))}
            </div>
          )}

          {/* Results list */}
          {!loading && filteredResults.length > 0 && (
            <div className="space-y-3">
              {(() => {
                return filteredResults.map((item, index) => (
                  <ResultCard
                    key={index}
                    result={item}
                    query={query}
                    rank={index + 1}
                    maxScore={maxScore}
                    style={{ animationDelay: `${Math.min(index * 50, 400)}ms` }}
                  />
                ));
              })()}
            </div>
          )}

          {/* Empty state */}
          {!loading && filteredResults.length === 0 && query && (
            <div className="flex flex-col items-center justify-center py-24 animate-fade-in">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">No results found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-500 text-center max-w-xs">
                No documents matched{" "}
                <span className="font-medium text-indigo-600 dark:text-indigo-400">"{query}"</span>.
                Try different keywords or broader terms.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Results;
