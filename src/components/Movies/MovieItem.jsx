import { useState, useEffect } from "react";
import { movieService } from "../../services/movieService";

function MovieItem({ movie, onSelectMovieId }) {
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  // Fetch additional details when component mounts
  useEffect(() => {
    async function fetchMovieDetails() {
      if (!movie?.imdbID) return;

      try {
        setIsLoadingDetails(true);
        const details = await movieService.getMovieDetails(movie.imdbID);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details for item:", error);
      } finally {
        setIsLoadingDetails(false);
      }
    }

    fetchMovieDetails();
  }, [movie?.imdbID]);

  const displayData = movieDetails || movie;

  return (
    <li
      className="group flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 cursor-pointer transform hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg"
      onClick={() => onSelectMovieId(movie.imdbID)}
    >
      <div className="relative overflow-hidden rounded-md sm:rounded-lg flex-shrink-0">
        <img
          src={
            movie.Poster && movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={`${movie.Title} poster`}
          className="w-12 h-16 sm:w-16 sm:h-24 object-cover transition-transform group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex flex-col justify-center min-w-0 flex-1">
        <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors text-sm sm:text-lg mb-1 sm:mb-2 line-clamp-2">
          {movie.Title}
        </h3>

        <div className="space-y-1">
          {/* Year */}
          <p className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
            <i className="ri-calendar-line text-purple-400"></i>
            <span>{movie.Year}</span>
          </p>

          {/* Runtime - show if available */}
          {displayData?.Runtime && displayData.Runtime !== "N/A" && (
            <p className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
              <i className="ri-time-line text-green-400"></i>
              <span>{displayData.Runtime}</span>
            </p>
          )}

          {/* IMDb Rating - show if available */}
          {displayData?.imdbRating && displayData.imdbRating !== "N/A" && (
            <p className="flex items-center gap-1 sm:gap-2 text-gray-400 text-xs sm:text-sm">
              <i className="ri-star-fill text-yellow-400"></i>
              <span>{displayData.imdbRating}</span>
            </p>
          )}

          {/* Loading indicator for details */}
          {isLoadingDetails && (
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <div className="w-3 h-3 border border-purple-400 border-t-transparent rounded-full animate-spin"></div>
              Loading details...
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MovieItem;
