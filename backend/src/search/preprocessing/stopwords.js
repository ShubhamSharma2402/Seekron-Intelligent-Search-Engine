// Basic stopwords list (can expand later)
export const STOPWORDS = new Set([
  "the", "is", "in", "at", "of", "on", "and", "a", "to", "for",
  "with", "that", "this", "it", "as", "an", "be", "are", "was",
  "were", "by", "or", "from"
]);

export const removeStopwords = (tokens) => {
  return tokens.filter((word) => !STOPWORDS.has(word));
};