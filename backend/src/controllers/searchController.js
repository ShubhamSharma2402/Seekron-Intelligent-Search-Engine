import searchEngine from "../search/engine/searchEngine.js";

export const search = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const results = await searchEngine.search(query);

    res.json({ results });
  } catch (err) {
    next(err);
  }
};