import fs from "fs";
import path from "path";
import { Trie } from "./trie.js";
import { preprocess } from "../../preprocessing/preprocess.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const documentsPath = path.join(__dirname, "../../../data/documents.json");

let trie = new Trie();
let initialized = false;

const buildTrie = () => {
  const docs = JSON.parse(fs.readFileSync(documentsPath, "utf-8"));

  docs.forEach((doc) => {
    const tokens = preprocess(doc.content);
    tokens.forEach((token) => trie.insert(token));
  });

  initialized = true;
};

export const getSuggestions = (query) => {
  if (!initialized) buildTrie();

  const tokens = preprocess(query);
  const lastWord = tokens[tokens.length - 1];

  if (!lastWord) return [];

  return trie.searchPrefix(lastWord).slice(0, 5);
};

export default {
  getSuggestions,
};