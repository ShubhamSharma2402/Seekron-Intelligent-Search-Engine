import SearchBar from "../components/SearchBar";
import { useTheme } from "../App";

const STATS = [
  { value: "10K+", label: "Documents" },
  { value: "<50ms", label: "Avg Response" },
  { value: "TF-IDF", label: "Ranking Model" },
];

const Home = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col relative overflow-hidden transition-colors duration-300">
      {/* Background ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-violet-400/10 dark:bg-violet-600/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-300/5 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-end items-center p-5">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200 shadow-sm transition-all duration-200"
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
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Logo mark */}
        <div className="animate-fade-in flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/30 dark:shadow-indigo-500/20 mb-5">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-3">
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Seekron
            </span>
          </h1>

          <p className="text-slate-500 dark:text-slate-400 text-center text-lg mb-10 max-w-sm">
            Intelligent full-text search powered by{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">TF-IDF</span> &amp;{" "}
            <span className="text-violet-600 dark:text-violet-400 font-medium">cosine similarity</span>
          </p>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-2xl animate-slide-up">
          <SearchBar />
        </div>

        {/* Quick tips */}
        <div className="mt-5 flex flex-wrap justify-center gap-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
          {['"exact phrase"', 'machine learning', 'neural network'].map((tip) => (
            <span
              key={tip}
              className="px-3 py-1 text-xs rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 shadow-sm cursor-default"
            >
              {tip}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className="mt-16 flex items-center divide-x divide-slate-200 dark:divide-slate-700 animate-fade-in"
          style={{ animationDelay: "300ms" }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="px-8 text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stat.value}</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-slate-400 dark:text-slate-600">
        Seekron &mdash; Built with Express &bull; React &bull; TailwindCSS
      </footer>
    </div>
  );
};

export default Home;
