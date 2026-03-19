const HighlightText = ({ text, query }) => {
  if (!text) return null;
  if (!query?.trim()) return <span>{text}</span>;

  // Escape special regex chars in each query word
  const words = query
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  if (!words.length) return <span>{text}</span>;

  const pattern = words.join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "gi"));
  const matchRe = new RegExp(`^(${pattern})$`, "i");

  return (
    <span>
      {parts.map((part, i) =>
        matchRe.test(part) ? (
          <mark
            key={i}
            className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded px-0.5 font-semibold not-italic"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default HighlightText;
