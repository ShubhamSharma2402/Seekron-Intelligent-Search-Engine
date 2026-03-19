const BASE_URL = "http://localhost:5000/api"; // ⚠️ change if backend runs on different port

export const searchAPI = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search API failed");
    return await res.json();
  } catch (err) {
    console.error("Search Error:", err);
    return { results: [] };
  }
};

export const autocompleteAPI = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/autocomplete?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Autocomplete API failed");
    return await res.json();
  } catch (err) {
    console.error("Autocomplete Error:", err);
    return { suggestions: [] };
  }
};