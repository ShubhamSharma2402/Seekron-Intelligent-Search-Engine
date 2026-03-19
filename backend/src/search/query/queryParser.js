import { preprocess } from "../preprocessing/preprocess.js";

export const parseQuery = (query) => {
  const tokens = query.split(" ");

  const parsed = {
    terms: [],
    operator: "AND", // default
  };

  tokens.forEach((token) => {
    if (token.toUpperCase() === "OR") {
      parsed.operator = "OR";
    } else if (token.toUpperCase() === "AND") {
      parsed.operator = "AND";
    } else {
      parsed.terms.push(token);
    }
  });

  parsed.terms = preprocess(parsed.terms.join(" "));
  return parsed;
};