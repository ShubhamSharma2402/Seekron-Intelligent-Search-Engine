export const cosineSimilarity = (vecA, vecB) => {
  let dotProduct = 0;
  let magA = 0;
  let magB = 0;

  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);

  allKeys.forEach((key) => {
    const a = vecA[key] || 0;
    const b = vecB[key] || 0;

    dotProduct += a * b;
    magA += a * a;
    magB += b * b;
  });

  if (magA === 0 || magB === 0) return 0;

  return dotProduct / (Math.sqrt(magA) * Math.sqrt(magB));
};