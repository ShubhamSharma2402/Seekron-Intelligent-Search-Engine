export const tokenize = (text) => {
  if (!text) return [];

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // remove punctuation
    .split(/\s+/) // split by spaces
    .filter(Boolean); // remove empty
};