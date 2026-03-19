// backend/src/search/ranking/cosineSimilarity.js

// Normalize a vector represented as an object
const normalizeVector = (vec) => {
  let sumSquares = 0;
  Object.values(vec).forEach(val => {
    sumSquares += val * val;
  });
  if (sumSquares === 0) return vec;
  const normalized = {};
  Object.keys(vec).forEach(key => {
    normalized[key] = vec[key] / Math.sqrt(sumSquares);
  });
  return normalized;
};

// Cosine similarity between two sparse vectors (objects)
export const cosineSimilarity = (vecA, vecB) => {
  const normA = normalizeVector(vecA);
  const normB = normalizeVector(vecB);

  const allKeys = new Set([...Object.keys(normA), ...Object.keys(normB)]);
  let dotProduct = 0;

  allKeys.forEach(key => {
    dotProduct += (normA[key] || 0) * (normB[key] || 0);
  });

  return dotProduct; // already normalized, so value between 0 and 1
};