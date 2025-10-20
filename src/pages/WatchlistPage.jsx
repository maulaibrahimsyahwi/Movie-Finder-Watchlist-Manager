// src/pages/WatchlistPage.jsx - DIPERBARUI
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";

function WatchlistPage({ watched, onSelectMovieId, onDeleteWatched }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      {/* --- PERUBAHAN DI SINI --- */}
      <div className="mb-6">
        {/* Tombol "Kembali" dibungkus div */}
        <div>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Kembali
          </Link>
        </div>
      </div>
      {/* --- AKHIR PERUBAHAN --- */}

      <h1 className="text-3xl font-bold text-white mb-8">
        Daftar Tontonan Anda
      </h1>

      <MovieGrid
        movies={watched}
        onSelectMovieId={onSelectMovieId}
        onDeleteWatched={onDeleteWatched}
      />
    </div>
  );
}

export default WatchlistPage;
