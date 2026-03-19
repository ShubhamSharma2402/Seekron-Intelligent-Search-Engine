import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Suggestions from "./Suggestions";

const SearchBar = ({ initialQuery = "" }) => {
  const [input, setInput] = useState(initialQuery);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // Sync when initialQuery changes (navigating between queries)
  useEffect(() => {
    setInput(initialQuery);
  }, [initialQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    navigate(`/results?q=${encodeURIComponent(input.trim())}`);
  };

  const handleClear = () => {
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSearch}>
        <div
          className={`flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 border-2 transition-all duration-200 ${
            focused
              ? "border-indigo-500 dark:border-indigo-400 shadow-lg shadow-indigo-500/10"
              : "border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 dark:hover:border-slate-600"
          }`}
        >
          {/* Search icon */}
          <svg
            className="w-5 h-5 shrink-0 text-slate-400 dark:text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          {/* Input */}
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base min-w-0"
            placeholder="Search documents…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            autoComplete="off"
          />

          {/* Clear button */}
          {input && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              aria-label="Clear search"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="shrink-0 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 active:scale-95 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-all"
          >
            Search
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {focused && <Suggestions query={input} setInput={setInput} />}
    </div>
  );
};

export default SearchBar;
