// backend/src/search/ranking/tfidf.js

export const computeTF = (termFreq) => {
  // log(1 + TF) prevents TF = 1 for single occurrence
  return Math.log(1 + termFreq);
};

export const computeIDF = (totalDocs, docFreq) => {
  return Math.log((totalDocs + 1) / (docFreq + 1)) + 1;
};

export const computeTFIDF = (tf, idf) => {
  return tf * idf;
};