import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildIndex } from "../backend/src/search/indexing/indexBuilder.js";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct path to backend/src/data
const dataDir = path.join(__dirname, "../backend/src/data");

// Sample documents
const documents = [
  {
    id: "1",
    title: "Node.js Basics",
    content: "Node.js is a runtime environment for JavaScript.",
  },
  {
    id: "2",
    title: "React Guide",
    content: "React is a frontend library for building UI.",
  },
  {
    id: "3",
    title: "Express Framework",
    content: "Express is a backend framework for Node.js.",
  },
  {
    id: "4",
    title: "Test Document",
    content: "This is a test document to verify the merge logic works.",
  },
];

// Ensure folder exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const docsPath = path.join(dataDir, "documents.json");

// Read existing documents (if any)
let existing = [];
if (fs.existsSync(docsPath)) {
  try {
    existing = JSON.parse(fs.readFileSync(docsPath, "utf-8"));
  } catch {
    existing = [];
  }
}

// Merge: script docs override existing ones with the same id; new ids are appended
const existingMap = new Map(existing.map((d) => [String(d.id), d]));
documents.forEach((d) => existingMap.set(String(d.id), d));
const merged = Array.from(existingMap.values());

// Write merged documents.json
fs.writeFileSync(docsPath, JSON.stringify(merged, null, 2));

console.log(`✅ documents.json updated (${merged.length} total documents)`);

// 🔥 Build index
buildIndex();

console.log("✅ Index built successfully");