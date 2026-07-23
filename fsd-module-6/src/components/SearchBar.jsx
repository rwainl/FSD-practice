import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    await onSearch(keyword);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit} className="mb-8 space-y-8">
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            id=""
            className="w-full px-4 py-3 pl-12 pr-24 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Cari produk kesehatan"
          />
          <button
          type="submit"
          disabled={!keyword.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 disabled:bg-gray-300 transition"
        >
            Cari
        </button>
        </div>
      </form>
    </>
  );
}

export default SearchBar;
