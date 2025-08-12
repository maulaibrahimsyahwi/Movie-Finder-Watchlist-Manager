// src/components/Watched/WatchedItem.js - Updated with better UI and data handling
function WatchedItem({ movie, onDeleteWatched }) {
  // Validasi movie object
  if (!movie || typeof movie !== "object") {
    return null;
  }

  const {
    imdbID = "",
    title = "Unknown Title",
    poster = "",
    imdbRating = 0,
    userRating = 0,
    runtime = 0,
    year = "Unknown",
  } = movie;

  return (
    <li className="group flex gap-4 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-700/60 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-300 relative">
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-lg flex-shrink-0">
        <img
          src={
            poster && poster !== "N/A"
              ? poster
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={`${title} poster`}
          className="w-16 h-24 object-cover transition-transform group-hover:scale-110"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
          }}
        />
      </div>

      {/* Movie Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white text-base sm:text-lg mb-1 truncate group-hover:text-purple-300 transition-colors">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-2 flex items-center gap-1">
          <i className="ri-calendar-line text-purple-400"></i>
          {year}
        </p>

        {/* Ratings and Runtime */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1 text-yellow-400">
            <i className="ri-movie-line"></i>
            <span className="font-medium">{imdbRating || "N/A"}</span>
          </span>
          <span className="flex items-center gap-1 text-pink-400">
            <i className="ri-star-fill"></i>
            <span className="font-medium">{userRating || "N/A"}</span>
          </span>
          <span className="flex items-center gap-1 text-green-400">
            <i className="ri-time-line"></i>
            <span className="font-medium">{runtime || "N/A"}m</span>
          </span>
        </div>
      </div>

      {/* Delete Button */}
      <button
        className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 backdrop-blur-sm"
        onClick={() => onDeleteWatched && onDeleteWatched(imdbID)}
        title="Remove from watchlist"
      >
        <i className="ri-close-line"></i>
      </button>
    </li>
  );
}

export default WatchedItem;
