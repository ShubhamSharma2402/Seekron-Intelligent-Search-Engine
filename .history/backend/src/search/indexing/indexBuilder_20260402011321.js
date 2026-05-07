import fs from "fs";
import path from "path";
import { preprocess } from "../preprocessing/preprocess.js";
import { InvertedIndex } from "./invertedIndex.js";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const documentsPath = path.join(__dirname, "../../data/documents.json");
const indexPath = path.join(__dirname, "../../data/index.json");
const metadataPath = path.join(__dirname, "../../data/metadata.json");

export const buildIndex = () => {
  const docs = JSON.parse(fs.readFileSync(documentsPath, "utf-8"));

  const invertedIndex = new InvertedIndex();
  const metadata = {};

  docs.forEach((doc) => {
    const tokens = preprocess(doc.content);

    tokens.forEach((token) => {
      invertedIndex.add(token, doc.id);
    });

    // har document ke metadata store karte hain, jisme category aur title jaise fields hote hain, jo search results me dikhayenge
    metadata[doc.id] = {
      category: doc.category || "uncategorized",
      title: doc.title,
    };
  });

  fs.writeFileSync(indexPath, JSON.stringify(invertedIndex.getAll(), null, 2));
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  console.log("✅ Index built successfully");
};
