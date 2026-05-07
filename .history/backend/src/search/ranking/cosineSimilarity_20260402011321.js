// backend/src/search/ranking/cosineSimilarity.js

// Cosine similarity calculate karte hain between query vector (vecA) and document vector (vecB).
// NOTE: Normalization step skip karte hain to preserve magnitude differences, jo ranking ke liye important hai.
// Normalizing 1-D vectors ke liye cosine similarity aur dot product equivalent hote hain, kyunki magnitude 1 hoti hai. 


// Lekin agar normalization karte hain, toh sabhi scores 0-1 ke beech aa jate hain, jo ki ranking ke liye utna useful nahi hota,
//  kyunki top results ke beech score differences chhup jate hain.
//  Normalization skip karne se, higher term frequency ya zyada matching terms wale documents naturally higher rank karenge,
//  jo ki desired behavior hai. Agar normalization karte hain, toh sabhi scores 0-1 ke beech aa jate hain,
//  aur top results ke beech score differences chhup jate hain, jo ki ranking ke liye utna useful nahi hota.
// Normalization skip karne se, higher term frequency ya zyada matching terms wale documents naturally higher rank karenge,
//  jo ki desired behavior hai. Agar normalization karte hain, toh sabhi scores 0-1 ke beech aa jate hain, 
// aur top results ke beech score differences chhup jate hain, jo ki ranking ke liye utna useful nahi hota.
//  Normalization skip karne se, higher term frequency ya zyada matching terms wale documents naturally higher rank karenge,
//  jo ki desired behavior hai. Agar normalization karte hain, toh sabhi scores 0-1 ke beech aa jate hain, aur top results ke beech 

// matching document, making ranking useless.
// Normalization skip karne se, higher term frequency ya zyada matching terms wale documents naturally higher rank karenge,
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
