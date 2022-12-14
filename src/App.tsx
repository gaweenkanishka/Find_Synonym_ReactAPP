import React, { useState } from "react";
import "./App.css";
import { useGetSynonyms } from "./hooks/useGetSynonyms";
import { MantineProvider, Text } from "@mantine/core";

function App() {
  const [word, setWord] = useState("");
  const { isLoading, synonyms, getSynonyms } = useGetSynonyms();

  const handleFetchSynonyms = (e: React.FormEvent) => {
    e.preventDefault();
    getSynonyms(word);
  };

  const handleFetchSynonymClicked = (newWord: string) => {
    setWord(newWord);
    getSynonyms(newWord);
  };

  return (
    <MantineProvider withGlobalStyles  >
      <div className="flex flex-col items-center justify-center min-h-screen py-5">
        <form onSubmit={handleFetchSynonyms} className="flex flex-col">
          <label
            className="block text-sm font-medium text-gray-700 text-2xl"
            htmlFor="word-input"
          >
            Your Word type here
          </label>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            id="word-input"
            className="border-2 border-black rounded-md p-2"
          />
          <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Find Synonyms
          </button>
          {/* Reset button */}
          <button
            onClick={() => setWord("")}
            className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reset
          </button>
        </form>

        {isLoading ? (
          <div>Loading...</div>
        ) : synonyms.length > 0 ? (
          <ul className="flex flex-col items-center justify-center">
            {synonyms.map((synonym) => (
              <li
                onClick={() => handleFetchSynonymClicked(synonym.word)}
                key={synonym.word}
                className="m-2 p-2 border-2 border-black rounded-md cursor-pointer"
              >
                {synonym.word}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-2xl text-gray-700 font-bold">
            No synonyms found
          </div>
        )}
      </div>
    </MantineProvider>
  );
}

export default App;
