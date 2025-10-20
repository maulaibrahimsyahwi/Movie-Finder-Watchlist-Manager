// src/components/NavBar/index.jsx - DIPERBARUI
import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Search from "./Search";
import NumResults from "./NumResults";

// Tambahkan onSearchSubmit ke props
function NavBar({ query, setQuery, onSearchSubmit, children }) {
  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <Link to="/" title="Kembali ke Beranda">
            <Logo />
          </Link>
        </div>

        <div className="w-full sm:w-auto sm:min-w-[300px] lg:min-w-[400px]">
          {/* Teruskan onSearchSubmit ke Search */}
          <Search
            query={query}
            setQuery={setQuery}
            onSearchSubmit={onSearchSubmit}
          />
        </div>

        <div className="flex items-center gap-4 ml-auto flex-shrink-0">
          {children}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
export { Logo, Search, NumResults };
