import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const documentsPath = path.join(__dirname, "../../data/documents.json");

export const phraseSearch = (phrase) => {
  const docs = JSON.parse(fs.readFileSync(documentsPath, "utf-8"));

  const lowerPhrase = phrase.toLowerCase();

  return docs
    .filter((doc) =>
      doc.content.toLowerCase().includes(lowerPhrase)
    )
    .map((doc) => doc.id);
};