import { useEffect, useState } from "react";
import { autocompleteAPI } from "../services/api";

const Suggestions = ({ query, setInput }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query?.trim()) {
      setSuggestions([]);
      return;
    }

    // Debounce 150ms
    const timer = setTimeout(async () => {
      setLoading(true);
      const data = await autocompleteAPI(query);
      setSuggestions(data.suggestions || []);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!query?.trim() || (!loading && !suggestions.length)) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl dark:shadow-black/30 overflow-hidden animate-slide-up">
      {loading ? (
        <div className="flex items-center gap-2.5 px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
          <div className="w-3.5 h-3.5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          Searching&hellip;
        </div>
      ) : (
        <ul>
          {suggestions.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
                onMouseDown={() => setInput(s)}
              >
                <svg
                  className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Suggestions;
