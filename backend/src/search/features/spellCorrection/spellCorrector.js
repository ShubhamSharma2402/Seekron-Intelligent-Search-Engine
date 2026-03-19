import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { editDistance } from "./editDistance.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const indexPath = path.join(__dirname, "../../../data/index.json");

const loadVocabulary = () => {
  const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"));
  return Object.keys(index);
};

export const correctWord = (word) => {
  const vocab = loadVocabulary();

  let bestMatch = word;
  let minDist = Infinity;

  for (let v of vocab) {
    const dist = editDistance(word, v);

    if (dist < minDist && dist <= 2) {
      minDist = dist;
      bestMatch = v;
    }
  }

  return bestMatch;
};

export const correctQuery = (query) => {
  return query
    .split(" ")
    .map((word) => correctWord(word))
    .join(" ");
};