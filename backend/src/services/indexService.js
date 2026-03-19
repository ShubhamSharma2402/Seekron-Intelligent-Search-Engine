import { buildIndex } from "../search/indexing/indexBuilder.js";

export const rebuildIndex = () => {
  try {
    buildIndex();
    console.log("✅ Index rebuilt successfully");
  } catch (err) {
    console.error("❌ Index rebuild failed:", err);
  }
};