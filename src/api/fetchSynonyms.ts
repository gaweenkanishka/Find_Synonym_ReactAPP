const API_URL = import.meta.env.VITE_API_URL ?? "http://api.datamuse.com";

export const fetchSynonyms = async (word: string) => {
  const response = await fetch(`${API_URL}/words?rel_syn=${word}`);
  return await response.json();
};
