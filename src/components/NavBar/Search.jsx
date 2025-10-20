// src/components/NavBar/Search.jsx - DIPERBARUI
import React from "react";

// Tambahkan onSearchSubmit ke props
function Search({ query, setQuery, onSearchSubmit }) {
  // Buat handler untuk event key down
  const handleKeyDown = (event) => {
    // Cek jika tombol yang ditekan adalah "Enter"
    if (event.key === "Enter") {
      // Hentikan perilaku default (seperti submit form)
      event.preventDefault();
      // Panggil fungsi pencarian dari App.jsx
      onSearchSubmit();
    }
  };

  return (
    <div className="relative group w-full sm:w-auto sm:min-w-[300px] lg:min-w-[400px]">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200 hover:bg-gray-800/90 text-sm sm:text-base"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} // Tambahkan event handler di sini
      />
    </div>
  );
}

export default Search;
