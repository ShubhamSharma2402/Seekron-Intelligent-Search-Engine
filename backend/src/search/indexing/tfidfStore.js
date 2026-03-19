import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const metadataPath = path.join(__dirname, "../../data/metadata.json");

export const saveMetadata = (data) => {
  fs.writeFileSync(metadataPath, JSON.stringify(data, null, 2));
};

export const loadMetadata = () => {
  if (!fs.existsSync(metadataPath)) return {};
  return JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
};