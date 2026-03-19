import { tokenize } from "./tokenizer.js";
import { removeStopwords } from "./stopwords.js";
import { stemTokens } from "./stemmer.js";

export const preprocess = (text) => {
  let tokens = tokenize(text);
  tokens = removeStopwords(tokens);
  tokens = stemTokens(tokens);

  return tokens;
};