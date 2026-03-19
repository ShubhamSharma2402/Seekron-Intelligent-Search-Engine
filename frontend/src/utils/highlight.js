export const highlightText = (text, query) => {
  if (!query) return text;

  const words = query.split(" ");
  let result = text;

  words.forEach((word) => {
    const regex = new RegExp(`(${word})`, "gi");
    result = result.replace(
      regex,
      `<mark class="bg-yellow-300 px-1 rounded">$1</mark>`
    );
  });

  return result;
};