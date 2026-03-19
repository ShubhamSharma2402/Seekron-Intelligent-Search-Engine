import HighlightText from "./HighlightText";

// Top-3 rank badge gradient colours
const RANK_GRADIENTS = [
  "from-amber-400 to-orange-500",
  "from-slate-300 to-slate-400 dark:from-slate-500 dark:to-slate-600",
  "from-orange-400 to-amber-600",
];

const ResultCard = ({ result, query, rank, maxScore, style }) => {
  // Normalize against the top result so scores are relative (top result = 100%)
  const scorePercent =
    result.score != null && maxScore
      ? Math.round((result.score / maxScore) * 100)
      : 0;
  const scoreColor =
    scorePercent >= 70
      ? "bg-emerald-500"
      : scorePercent >= 40
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div
      className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:-translate-y-0.5 transition-all duration-200 animate-fade-in"
      style={style}
    >
      <div className="flex items-start gap-3">
        {/* Rank badge */}
        {rank && (
          <span
            className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${
              rank <= 3
                ? RANK_GRADIENTS[rank - 1]
                : "from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700"
            }`}
          >
            {rank}
          </span>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
            {result.title || "Untitled Document"}
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
            <HighlightText
              text={result.content || result.snippet || ""}
              query={query}
            />
          </p>
        </div>

        {/* Score display */}
        {result.score !== undefined && (
          <div className="shrink-0 text-right ml-2">
            <div className="text-sm font-mono font-semibold text-slate-700 dark:text-slate-300">
              {result.score.toFixed(3)}
            </div>
            <div className="text-xs text-slate-400 dark:text-slate-500">score</div>
          </div>
        )}
      </div>

      {/* Score progress bar */}
      {result.score !== undefined && (
        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full score-bar-fill ${scoreColor}`}
              style={{ width: `${scorePercent}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 dark:text-slate-500 w-7 text-right tabular-nums">
            {scorePercent}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
