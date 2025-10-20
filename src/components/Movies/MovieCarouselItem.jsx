// src/components/Movies/MovieCarouselItem.jsx - DIPERBARUI
import React from "react";

function MovieCarouselItem({ movie, onSelectMovieId, onDeleteWatched }) {
  // Gunakan fallback yang konsisten untuk poster
  const poster =
    (movie.Poster || movie.poster) && (movie.Poster || movie.poster) !== "N/A"
      ? movie.Poster || movie.poster
      : "https://via.placeholder.com/300x450?text=No+Image";

  const title = movie.Title || movie.title || "Judul Tidak Tersedia";
  const year = movie.Year || movie.year || "";
  const imdbID = movie.imdbID;

  return (
    <div className="relative min-w-[180px] md:min-w-[200px] transform hover:-translate-y-2 transition-transform duration-300 group">
      <div className="cursor-pointer" onClick={() => onSelectMovieId(imdbID)}>
        <div className="rounded-lg overflow-hidden shadow-lg group-hover:shadow-purple-500/30 transition-shadow duration-300">
          <img
            src={poster}
            alt={`${title} Poster`}
            className="w-full h-auto object-cover aspect-[2/3]"
          />
        </div>
        <h3
          className="text-white text-base font-semibold mt-2 truncate"
          title={title}
        >
          {title}
        </h3>
        {year && <p className="text-gray-400 text-sm">{year}</p>}
      </div>

      {onDeleteWatched && (
        <button
          className="absolute top-2 right-2 w-7 h-7 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteWatched(imdbID);
          }}
          title="Hapus dari watchlist"
        >
          <i className="ri-close-line"></i>
        </button>
      )}
    </div>
  );
}

export default MovieCarouselItem;
