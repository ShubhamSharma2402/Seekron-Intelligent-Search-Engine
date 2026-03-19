import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/documents.json");

export const getDocuments = (req, res, next) => {
  try {
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
    res.json({ documents: data });
  } catch (err) {
    next(err);
  }
};

export const addDocument = (req, res, next) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    const newDoc = {
      id: Date.now(),
      title,
      content,
    };

    data.push(newDoc);

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

    res.json({ message: "Document added", document: newDoc });
  } catch (err) {
    next(err);
  }
};