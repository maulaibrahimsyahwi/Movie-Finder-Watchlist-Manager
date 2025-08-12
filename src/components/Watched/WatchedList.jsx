import WatchedItem from "./WatchedItem";

function WatchedList({ watched, onDeleteWatched, maxHeight = "50vh" }) {
  // Validasi watched array
  if (!watched || !Array.isArray(watched)) {
    return (
      <div className="text-center p-6 text-gray-400 flex-1 flex items-center justify-center flex-col">
        <div className="text-4xl mb-2 text-purple-400">
          <i className="ri-movie-2-line"></i>
        </div>
        <p>No watched movies to display</p>
      </div>
    );
  }

  if (watched.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400 flex-1 flex items-center justify-center flex-col">
        <div className="text-4xl mb-3 text-purple-400">
          <i className="ri-movie-line"></i>
        </div>
        <p className="text-lg font-medium mb-2">Your watchlist is empty</p>
        <p className="text-sm">
          Search for movies and add them to your watchlist
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed height */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <i className="ri-play-list-2-line text-purple-400"></i>
          Your Watchlist ({watched.length})
        </h3>
      </div>

      {/* Watchlist Items - Flexible height */}
      <div
        className="overflow-y-auto custom-scrollbar flex-1"
        style={{ maxHeight: maxHeight }}
      >
        <ul className="space-y-3">
          {watched.map((movie, index) => (
            <WatchedItem
              key={movie?.imdbID || `movie-${index}`}
              movie={movie}
              onDeleteWatched={onDeleteWatched}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WatchedList;
