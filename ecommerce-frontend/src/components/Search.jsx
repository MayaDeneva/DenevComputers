// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!query.trim()) return;
    // Navigate to the search results page with the query in the URL
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="ml-4 relative w-1/2">
      <label className="relative flex items-center rounded-full bg-white border-2 border-gray-300 focus-within:border-blue-500 px-4 py-2">
        <input
          type="text"
          className="grow w-72 bg-transparent outline-none text-sm placeholder-gray-400 pr-10"
          placeholder="Потърси продукт.."
          value={query}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="absolute right-4 flex items-center justify-center"
        >
          {/* Search icon */}
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 26"
          >
            <path
              d="M11.0909 21.75C16.6138 21.75 21.0909 17.2728 21.0909 11.75C21.0909 6.22715 16.6138 1.75 11.0909 1.75C5.56809 1.75 1.09094 6.22715 1.09094 11.75C1.09094 17.2728 5.56809 21.75 11.0909 21.75Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M23.5909 24.25L18.2159 18.875"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </label>
    </form>
  );
};

export default SearchBar;
