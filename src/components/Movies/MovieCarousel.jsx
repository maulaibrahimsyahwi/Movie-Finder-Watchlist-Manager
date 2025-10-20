// src/components/Movies/MovieCarousel.jsx - DIPERBARUI
import React from "react";
import { Link } from "react-router-dom"; // Impor Link
import MovieCarouselItem from "./MovieCarouselItem";

function MovieCarousel({
  title,
  movies,
  onSelectMovieId,
  onDeleteWatched,
  categoryKey,
}) {
  if (!movies || movies.length === 0) {
    if (!categoryKey) return null; // Jangan tampilkan apa-apa jika tidak ada film & bukan kategori
    return (
      <div className="mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
          {title}
        </h2>
        <p className="text-gray-400 italic">Daftar ini masih kosong.</p>
      </div>
    );
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>

        {/* --- TAUTAN "SEE MORE" BARU --- */}
        {categoryKey && (
          <Link
            to={`/category/${categoryKey}`}
            className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            Lihat Semua &raquo;
          </Link>
        )}
        {/* --- AKHIR TAUTAN BARU --- */}
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4 custom-scrollbar">
        {movies.map((movie) => (
          <MovieCarouselItem
            key={movie.imdbID}
            movie={movie}
            onSelectMovieId={onSelectMovieId}
            onDeleteWatched={onDeleteWatched}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;
