export const explainRanking = (docId, score, matchedTerms) => {
  return {
    docId,
    score,
    explanation: `Document matched terms: ${matchedTerms.join(
      ", "
    )} with relevance score ${score.toFixed(3)}`
  };
};