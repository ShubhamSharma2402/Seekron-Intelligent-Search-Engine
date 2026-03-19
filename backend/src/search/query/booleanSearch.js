import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "../../data/index.json");

const loadIndex = () => {
  return JSON.parse(fs.readFileSync(indexPath, "utf-8"));
};

export const booleanSearch = (terms, operator = "AND") => {
  const index = loadIndex();

  const docSets = terms.map((term) => {
    const docs = index[term] || {};
    return new Set(Object.keys(docs));
  });

  if (docSets.length === 0) return [];

  let resultSet = docSets[0];

  for (let i = 1; i < docSets.length; i++) {
    if (operator === "AND") {
      resultSet = new Set(
        [...resultSet].filter((doc) => docSets[i].has(doc))
      );
    } else {
      resultSet = new Set([...resultSet, ...docSets[i]]);
    }
  }

  return Array.from(resultSet);
};