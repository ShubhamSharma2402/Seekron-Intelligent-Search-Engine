import fs from "fs";
import path from "path";

import { preprocess } from "../preprocessing/preprocess.js";
import { parseQuery } from "../query/queryParser.js";
import { booleanSearch } from "../query/booleanSearch.js";
import { phraseSearch } from "../query/phraseSearch.js";

import { computeTF, computeIDF, computeTFIDF } from "../ranking/tfidf.js";
import { cosineSimilarity } from "../ranking/cosineSimilarity.js";

import { explainRanking } from "../features/explanation/explainRank.js";

import { getFromCache, setCache, hasCache } from "../../cache/queryCache.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const documentsPath = path.join(__dirname, "../../data/documents.json");
const indexPath = path.join(__dirname, "../../data/index.json");

const loadDocs = () =>
  JSON.parse(fs.readFileSync(documentsPath, "utf-8"));

const loadIndex = () =>
  JSON.parse(fs.readFileSync(indexPath, "utf-8"));

class SearchEngine {
  async search(query) {
    // 🔥 CACHE CHECK
    if (hasCache(query)) {
      return getFromCache(query);
    }

    const docs = loadDocs();
    const index = loadIndex();

    // 🔹 Phrase search support
    let docIds = [];
    if (query.startsWith('"') && query.endsWith('"')) {
      docIds = phraseSearch(query.slice(1, -1));
    } else {
      const parsed = parseQuery(query);
      docIds = booleanSearch(parsed.terms, parsed.operator);
    }

    if (docIds.length === 0) return [];

    // 🔹 Build query vector
    const queryTokens = preprocess(query);
    const queryVector = {};

    queryTokens.forEach((term) => {
      const df = Object.keys(index[term] || {}).length;
      const idf = computeIDF(docs.length, df);
      queryVector[term] = computeTFIDF(computeTF(1), idf); // log-normalize TF like doc vectors
    });

    // 🔹 Score documents
    const results = docIds.map((docId) => {
      const doc = docs.find((d) => d.id === docId);

      const docVector = {};

      for (let term of queryTokens) {
        const tf = index[term]?.[docId] || 0;
        if (tf > 0) {
          const idf = computeIDF(docs.length, Object.keys(index[term]).length);
          docVector[term] = computeTFIDF(computeTF(tf), idf);
        }
      }

      const score = cosineSimilarity(queryVector, docVector);

      return {
        id: doc.id,
        title: doc.title,
        content: doc.content,
        category: doc.category || null,
        score,
        explanation: explainRanking(doc.id, score, queryTokens)
      };
    });

    // 🔹 Sort by score
    const sorted = results.sort((a, b) => b.score - a.score);

    // 🔥 STORE IN CACHE
    setCache(query, sorted);

    return sorted;
  }
}

export default new SearchEngine();