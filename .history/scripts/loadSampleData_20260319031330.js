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
    title: "Data Structures Overview",
    content: "Data structures are a way of organizing and storing data so it can be accessed efficiently. Common data structures include arrays, linked lists, stacks, and queues. Choosing the right data structure can improve both the performance and readability of code."
  },
  {
    id: "5",
    title: "Arrays in Programming",
    content: "An array is a collection of elements identified by index or key. Arrays are widely used due to their simplicity and speed in accessing elements. However, inserting or deleting elements in the middle of an array can be costly in terms of performance."
  },
  {
    id: "6",
    title: "Stacks and Queues",
    content: "Stacks are data structures that follow the LIFO principle, where the last element added is the first to be removed. Queues follow FIFO, where the first element added is the first to be removed. Both are used in algorithm design and task scheduling."
  },
  {
    id: "7",
    title: "Binary Search Trees",
    content: "A binary search tree (BST) is a data structure where each node has at most two children. The left child contains values less than the parent, and the right child contains values greater than the parent. BSTs allow for efficient search, insertion, and deletion operations."
  },
  {
    id: "8",
    title: "Graph Theory Basics",
    content: "Graphs are a collection of nodes and edges representing relationships between entities. They can be directed or undirected, weighted or unweighted. Graph algorithms are used in network analysis, pathfinding, and recommendation systems."
  },
  {
    id: "9",
    title: "Relational Databases",
    content: "Relational databases store data in tables with rows and columns. SQL is the standard language for querying and manipulating relational databases. Proper normalization ensures data integrity and reduces redundancy."
  },
  {
    id: "10",
    title: "NoSQL Databases",
    content: "NoSQL databases are designed for flexible, schema-less data storage. They include document databases, key-value stores, column-family stores, and graph databases. NoSQL is preferred for handling large-scale and unstructured data."
  },
  {
    id: "11",
    title: "RESTful APIs",
    content: "RESTful APIs follow the principles of REST architecture, allowing communication between client and server over HTTP. They use standard HTTP methods like GET, POST, PUT, and DELETE. REST APIs are stateless, scalable, and easy to integrate with web and mobile applications."
  },
  {
    id: "12",
    title: "Introduction to AI",
    content: "Artificial Intelligence (AI) is the simulation of human intelligence in machines. It includes tasks like reasoning, learning, problem-solving, and language understanding. AI applications include chatbots, recommendation engines, and self-driving cars."
  },
  {
    id: "13",
    title: "Machine Learning Fundamentals",
    content: "Machine Learning (ML) is a subset of AI focused on teaching machines to learn from data. ML algorithms can be supervised, unsupervised, or reinforcement-based. Feature engineering and model selection are critical steps for building effective ML systems."
  }

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
buildIndex();

console.log("✅ Index built successfully");