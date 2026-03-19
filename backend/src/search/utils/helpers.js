export const normalizeVector = (vector) => {
  const norm = Math.sqrt(
    Object.values(vector).reduce((sum, val) => sum + val * val, 0)
  );

  if (norm === 0) return vector;

  const normalized = {};
  for (let key in vector) {
    normalized[key] = vector[key] / norm;
  }

  return normalized;
};