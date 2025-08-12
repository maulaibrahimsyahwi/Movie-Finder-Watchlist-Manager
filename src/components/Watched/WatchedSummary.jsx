// src/components/Watched/WatchedSummary.js - Updated with improved statistics
const average = (arr) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return 0;
  }

  try {
    const validNumbers = arr.filter(
      (num) => !isNaN(num) && num !== null && num !== undefined && num > 0
    );

    if (validNumbers.length === 0) return 0;

    const sum = validNumbers.reduce((acc, cur) => acc + Number(cur), 0);
    return sum / validNumbers.length;
  } catch (error) {
    console.error("Error calculating average:", error);
    return 0;
  }
};

function WatchedSummary({ watched }) {
  // Safe fallback untuk watched array
  let watchedMovies = [];

  if (watched && Array.isArray(watched)) {
    watchedMovies = watched;
  } else if (
    watched &&
    typeof watched === "object" &&
    watched.length !== undefined
  ) {
    watchedMovies = Array.from(watched);
  }

  // Calculation dengan error handling
  let avgImdbRating = 0;
  let avgUserRating = 0;
  let avgRuntime = 0;

  try {
    // Filter out invalid movies
    const validMovies = watchedMovies.filter(
      (movie) => movie && typeof movie === "object"
    );

    avgImdbRating = average(
      validMovies.map((movie) => Number(movie.imdbRating) || 0)
    );

    avgUserRating = average(
      validMovies.map((movie) => Number(movie.userRating) || 0)
    );

    avgRuntime = average(
      validMovies.map((movie) => Number(movie.runtime) || 0)
    );
  } catch (error) {
    console.error("Error calculating movie averages:", error);
    avgImdbRating = avgUserRating = avgRuntime = 0;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-6 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <i className="ri-eye-line text-purple-400"></i>
        Movies you watched
      </h2>

      {watchedMovies.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <div className="text-4xl mb-2 text-purple-400">
            <i className="ri-movie-2-line"></i>
          </div>
          <p>No movies in your watchlist yet</p>
          <p className="text-sm mt-1">
            Start adding movies to see your statistics
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Total Movies */}
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700/30 hover:border-purple-500/30 transition-colors">
            <p className="text-2xl font-bold text-purple-400">
              {watchedMovies.length}
            </p>
            <p className="text-xs text-gray-400">movies</p>
          </div>

          {/* IMDb Average */}
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700/30 hover:border-yellow-500/30 transition-colors">
            <p className="text-2xl font-bold text-yellow-400">
              {avgImdbRating > 0 ? avgImdbRating.toFixed(1) : "—"}
            </p>
            <p className="text-xs text-gray-400">IMDb avg</p>
          </div>

          {/* User Average */}
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700/30 hover:border-pink-500/30 transition-colors">
            <p className="text-2xl font-bold text-pink-400">
              {avgUserRating > 0 ? avgUserRating.toFixed(1) : "—"}
            </p>
            <p className="text-xs text-gray-400">your avg</p>
          </div>

          {/* Runtime Average */}
          <div className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700/30 hover:border-green-500/30 transition-colors">
            <p className="text-2xl font-bold text-green-400">
              {avgRuntime > 0 ? Math.trunc(avgRuntime) : "—"}
            </p>
            <p className="text-xs text-gray-400">min avg</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchedSummary;
