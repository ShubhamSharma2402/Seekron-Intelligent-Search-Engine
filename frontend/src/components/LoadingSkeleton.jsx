const LoadingSkeleton = ({ style }) => (
  <div
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 animate-pulse"
    style={style}
  >
    <div className="flex items-start gap-3">
      {/* Rank badge placeholder */}
      <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0" />

      {/* Content lines */}
      <div className="flex-1 min-w-0 space-y-2.5">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded-lg w-2/3" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-5/6" />
      </div>

      {/* Score placeholder */}
      <div className="shrink-0 w-10 space-y-1.5">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-full" />
      </div>
    </div>

    {/* Score bar placeholder */}
    <div className="mt-3 h-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
  </div>
);

export default LoadingSkeleton;
