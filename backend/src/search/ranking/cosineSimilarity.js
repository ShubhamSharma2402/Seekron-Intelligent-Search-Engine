// backend/src/search/ranking/cosineSimilarity.js

// Cosine similarity between two sparse vectors (objects).
// NOTE: We intentionally do NOT normalize here.
// Normalizing 1-D vectors (single-term queries) always yields score = 1 for every
// matching document, making ranking useless.
// Using the raw TF-IDF dot product preserves magnitude, so documents with higher
// term frequency or more matching terms rank higher.
export const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;

  // Only iterate over keys present in vecA (query terms);
  // vecB (doc) is a subset of those keys when using the current search engine.
  Object.keys(vecA).forEach(key => {
    dotProduct += (vecA[key] || 0) * (vecB[key] || 0);
  });

  return dotProduct;
};
