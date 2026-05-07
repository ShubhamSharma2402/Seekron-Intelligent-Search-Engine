// backend/src/search/ranking/tfidf.js

export const computeTF = (termFreq) => {
  // log(1 + TF) use karte hain to dampen the effect of very high term frequencies, jo common words ke liye hota hai
  //isse rare terms ko zyada weight milta hai, aur common terms ka influence kam hota hai, jo ranking ke liye better hota hai
  return Math.log(1 + termFreq);
};

export const computeIDF = (totalDocs, docFreq) => {
  return Math.log((totalDocs + 1) / (docFreq + 1)) + 1;
};

export const computeTFIDF = (tf, idf) => {
  return tf * idf;
};