import autocomplete from "../search/features/autocomplete/autocomplete.js";

export const getSuggestions = async (req, res, next) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await autocomplete.getSuggestions(query);

    res.json({ suggestions });
  } catch (err) {
    next(err);
  }
};