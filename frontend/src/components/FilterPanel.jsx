const CATEGORIES = [
  { value: "all", label: "All Categories" },
  { value: "technology", label: "Technology" },
  { value: "science", label: "Science" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
];

const FilterPanel = ({ onClose, minScore, onMinScoreChange, category, onCategoryChange }) => {
  return (
    <aside className="hidden md:block w-52 shrink-0 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Filters
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          aria-label="Close filters"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Category filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mb-3">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Category
        </h4>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={`w-full text-left text-sm px-3 py-1.5 rounded-lg transition-all ${
                category === cat.value
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Min score filter */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Min. Relevance
        </h4>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={minScore}
          onChange={(e) => onMinScoreChange(Number(e.target.value))}
          className="w-full h-1.5 appearance-none bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-slate-400 dark:text-slate-500">0%</span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {minScore}%
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">100%</span>
        </div>
      </div>

      {/* Reset button */}
      {(category !== "all" || minScore > 0) && (
        <button
          onClick={() => {
            onCategoryChange("all");
            onMinScoreChange(0);
          }}
          className="mt-3 w-full text-xs text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
        >
          Reset filters
        </button>
      )}
    </aside>
  );
};

export default FilterPanel;
