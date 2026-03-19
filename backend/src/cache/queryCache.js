const cache = new Map();

export const getFromCache = (query) => {
  return cache.get(query);
};

export const setCache = (query, results) => {
  cache.set(query, results);
};

export const hasCache = (query) => {
  return cache.has(query);
};