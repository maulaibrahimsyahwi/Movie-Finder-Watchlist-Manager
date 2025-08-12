// src/components/Movies/MovieDetails.js - Updated Version with Rating Feature
import { useEffect, useState } from "react";
import StarRating from "../StarRating";
import { movieService } from "../../services/movieService";

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddWatchlist, setShowAddWatchlist] = useState(false);

  // Safe checking untuk watched array dengan multiple fallbacks
  const safeWatched = (() => {
    if (Array.isArray(watched)) return watched;
    if (
      watched &&
      typeof watched === "object" &&
      watched.length !== undefined
    ) {
      return Array.from(watched);
    }
    return [];
  })();

  const isWatched = safeWatched.some((movie) => movie?.imdbID === selectedId);
  const userRatingWatched = safeWatched.find(
    (movie) => movie?.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    async function getMovieDetails() {
      if (!selectedId) return;

      try {
        setIsLoading(true);
        setError("");
        setMovie({});
        setUserRating(0);
        setShowAddWatchlist(false);

        const movieData = await movieService.getMovieDetails(selectedId);

        if (movieData && typeof movieData === "object") {
          setMovie(movieData);
        } else {
          throw new Error("Invalid movie data received");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch movie details");
        console.error("Error fetching movie details:", err);
        setMovie({});
      } finally {
        setIsLoading(false);
      }
    }

    getMovieDetails();
  }, [selectedId]);

  // Destructure dengan fallback values
  const {
    Title: title = "",
    Year: year = "",
    Released: released = "",
    Poster: poster = "",
    imdbRating = "N/A",
    Runtime: runtime = "",
    Plot: plot = "",
    Genre: genre = "",
    Actors: actors = "",
    Director: director = "",
  } = movie || {};

  // Handler untuk rating
  function handleSetRating(rating) {
    setUserRating(rating);
    if (rating > 0) {
      setShowAddWatchlist(true);
    } else {
      setShowAddWatchlist(false);
    }
  }

  function handleAddWatched() {
    if (!title || !userRating || !selectedId) {
      console.warn("Missing required data for adding to watchlist");
      return;
    }

    try {
      let runtimeNumber = 0;
      if (runtime && typeof runtime === "string") {
        const match = runtime.match(/\d+/);
        runtimeNumber = match ? Number(match[0]) : 0;
      } else if (runtime && !isNaN(runtime)) {
        runtimeNumber = Number(runtime);
      }

      const newWatchedMovie = {
        imdbID: selectedId,
        title: title,
        year: year || "Unknown",
        poster: poster && poster !== "N/A" ? poster : "",
        imdbRating: Number(imdbRating) || 0,
        runtime: runtimeNumber,
        userRating: Number(userRating),
      };

      if (typeof onAddWatched === "function") {
        onAddWatched(newWatchedMovie);
        // Reset state setelah berhasil menambahkan
        setUserRating(0);
        setShowAddWatchlist(false);
        if (typeof onCloseMovie === "function") {
          onCloseMovie();
        }
      } else {
        console.error("onAddWatched is not a function");
      }
    } catch (err) {
      console.error("Error adding movie to watchlist:", err);
      setError("Failed to add movie to watchlist");
    }
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="text-center p-8 sm:p-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-purple-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-300 font-medium text-sm sm:text-base">
          Loading movie details...
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center p-6 sm:p-8 bg-red-900/20 border border-red-500/30 rounded-xl">
        <div className="text-3xl sm:text-4xl mb-2 text-red-400">
          <i className="ri-error-warning-line"></i>
        </div>
        <p className="text-red-400 font-medium text-sm sm:text-base mb-4">
          {error}
        </p>
        <button
          onClick={() => {
            setError("");
            if (typeof onCloseMovie === "function") {
              onCloseMovie();
            }
          }}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
        >
          Go Back
        </button>
      </div>
    );
  }

  // No movie selected state
  if (!title && !isLoading) {
    return (
      <div className="text-center p-6 sm:p-8 text-gray-400">
        <div className="text-3xl sm:text-4xl mb-2 text-purple-400">
          <i className="ri-movie-line"></i>
        </div>
        <p className="text-sm sm:text-base">No movie selected</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        className="absolute top-2 left-2 cursor-pointer sm:top-4 sm:left-4 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white text-gray-900 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-200 hover:scale-110 text-sm sm:text-base"
        onClick={() => {
          if (typeof onCloseMovie === "function") {
            onCloseMovie();
          }
        }}
      >
        <i className="ri-arrow-left-line "></i>
      </button>

      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
        <img
          src={
            poster && poster !== "N/A"
              ? poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={`${title} poster`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
            {title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-gray-300 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <i className="ri-calendar-line text-purple-400"></i>
              {released || year}
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line text-green-400"></i>
              {runtime || "N/A"}
            </span>
            <span className="flex items-center gap-1 text-yellow-400">
              <i className="ri-star-fill"></i>
              {imdbRating || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        <div className="prose prose-invert">
          <p className="text-gray-300 italic leading-relaxed text-sm sm:text-base">
            {plot && plot !== "N/A" ? plot : "No plot description available."}
          </p>
          <div className="grid grid-cols-1 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs sm:text-sm">
            <p>
              <span className="font-semibold text-purple-400">Genre:</span>{" "}
              <span className="text-gray-300">{genre || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold text-purple-400">Starring:</span>{" "}
              <span className="text-gray-300">{actors || "N/A"}</span>
            </p>
            <p>
              <span className="font-semibold text-purple-400">
                Directed by:
              </span>{" "}
              <span className="text-gray-300">{director || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-purple-500/20">
          {!isWatched ? (
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                Rate this movie
              </h3>
              <div className="flex justify-center">
                <StarRating
                  max={10}
                  size={
                    typeof window !== "undefined" && window.innerWidth < 640
                      ? 24
                      : 28
                  }
                  color="#fbbf24"
                  onSetRating={handleSetRating}
                />
              </div>

              {/* Add to Watchlist Button - muncul setelah rating diberikan */}
              {showAddWatchlist && userRating > 0 && (
                <div className="animate-fadeIn">
                  <button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.01] sm:hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
                    onClick={handleAddWatched}
                  >
                    <i className="ri-add-line"></i>
                    Add to Watchlist
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 text-sm sm:text-base flex items-center justify-center gap-2">
                <i className="ri-checkbox-circle-fill text-green-400"></i>
                You've watched this movie and rated it{" "}
                <span className="font-bold text-yellow-400 flex items-center gap-1">
                  <i className="ri-star-fill"></i>
                  {userRatingWatched || 0}/10
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
