import MovieItem from "./MovieItem";
import SortControls from "./SortControls";

function MovieList({
  movies,
  onSelectMovieId,
  sortBy,
  onSortChange,
  maxHeight = "50vh",
}) {
  // Function to sort movies based on selected criteria
  const sortMovies = (movies, sortBy) => {
    if (!movies || !Array.isArray(movies)) return [];

    const moviesCopy = [...movies];

    switch (sortBy) {
      case "year-desc":
        return moviesCopy.sort((a, b) => {
          const yearA = parseInt(a.Year) || 0;
          const yearB = parseInt(b.Year) || 0;
          return yearB - yearA;
        });

      case "year-asc":
        return moviesCopy.sort((a, b) => {
          const yearA = parseInt(a.Year) || 0;
          const yearB = parseInt(b.Year) || 0;
          return yearA - yearB;
        });

      case "rating-desc":
        return moviesCopy.sort((a, b) => {
          const ratingA = parseFloat(a.imdbRating) || 0;
          const ratingB = parseFloat(b.imdbRating) || 0;
          return ratingB - ratingA;
        });

      case "rating-asc":
        return moviesCopy.sort((a, b) => {
          const ratingA = parseFloat(a.imdbRating) || 0;
          const ratingB = parseFloat(b.imdbRating) || 0;
          return ratingA - ratingB;
        });

      case "title-asc":
        return moviesCopy.sort((a, b) =>
          (a.Title || "").localeCompare(b.Title || "")
        );

      case "title-desc":
        return moviesCopy.sort((a, b) =>
          (b.Title || "").localeCompare(a.Title || "")
        );

      case "relevance":
      default:
        return moviesCopy;
    }
  };

  const sortedMovies = sortMovies(movies, sortBy);

  return (
    <div className="flex flex-col h-full">
      {/* Sort Controls - Fixed height */}
      {movies && movies.length > 0 && (
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <p className="text-sm text-gray-400">
            Showing {movies.length} results
          </p>
          <SortControls onSortChange={onSortChange} currentSort={sortBy} />
        </div>
      )}

      {/* Movies List - Flexible height */}
      <div
        className="overflow-y-auto custom-scrollbar flex-1"
        style={{ maxHeight: maxHeight }}
      >
        <ul className="space-y-2 sm:space-y-3">
          {sortedMovies?.map((movie, index) => (
            <MovieItem
              key={movie.imdbID || index}
              movie={movie}
              onSelectMovieId={onSelectMovieId}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieList;
