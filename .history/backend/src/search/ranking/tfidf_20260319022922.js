export const computeTF = (termFreq) => {
  return 1 + Math.log(termFreq);
};

export const computeIDF = (totalDocs, docFreq) => {
  // Smooth IDF: always positive, avoids zero scores for frequent terms
  return Math.log((totalDocs + 1) / (docFreq + 1)) + 1;
};

export const computeTFIDF = (tf, idf) => {
  return tf * idf;
};