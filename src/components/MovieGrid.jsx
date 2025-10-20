// src/components/MovieGrid.jsx - FILE BARU
import React from "react";
import MovieCarouselItem from "./Movies/MovieCarouselItem";

function MovieGrid({ movies, onSelectMovieId, onDeleteWatched }) {
  if (!movies || movies.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        Tidak ada film untuk ditampilkan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCarouselItem
          key={movie.imdbID}
          movie={movie}
          onSelectMovieId={onSelectMovieId}
          onDeleteWatched={onDeleteWatched} // Akan null jika tidak diteruskan
        />
      ))}
    </div>
  );
}

export default MovieGrid;
