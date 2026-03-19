export const stem = (word) => {
  return word
    .replace(/ing$/, "")
    .replace(/ed$/, "")
    .replace(/s$/, "");
};

export const stemTokens = (tokens) => {
  return tokens.map(stem);
};