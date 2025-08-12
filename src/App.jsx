import { useState, useEffect } from "react";
import NavBar, { Logo, Search, NumResults } from "./components/NavBar";
import { Main, Loader, ErrorMessage } from "./components/UI";
import { MovieList, MovieDetails } from "./components/Movies";
import { WatchedSummary, WatchedList } from "./components/Watched";
import BoxMovies from "./components/BoxMovies";
import { movieService } from "./services/movieService";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");

  // Calculate dynamic height based on content
  const getMaxHeight = () => {
    const hasMovies = movies && movies.length > 0;
    const hasWatchedMovies = watched && watched.length > 0;

    if (hasMovies && hasWatchedMovies) {
      // Both have content - make them equal height
      const movieCount = movies.length;
      const watchedCount = watched.length;

      // Estimate height needed based on item count
      const estimatedMovieHeight = Math.min(movieCount * 120, 600); // 120px per item, max 600px
      const estimatedWatchedHeight = Math.min(watchedCount * 140, 600); // 140px per item, max 600px

      // Use the larger height for both to keep them aligned
      const maxHeight = Math.max(
        estimatedMovieHeight,
        estimatedWatchedHeight,
        400
      );
      return `${maxHeight}px`;
    }

    // Default height when only one side has content
    return "60vh";
  };

  // Effect untuk pencarian movie
  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      try {
        setIsLoading(true);
        setError("");
        setSelectedMovieId(null);

        const data = await movieService.searchAllMovies(query);

        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setMovies([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    const timeoutId = setTimeout(fetchMovies, 500);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  // Reset sort when new search is performed
  useEffect(() => {
    setSortBy("relevance");
  }, [query]);

  // Handler untuk memilih movie
  function handleSelectMovieId(id) {
    console.log("Selected movie ID:", id);
    setSelectedMovieId(id);
  }

  // Handler untuk sorting
  function handleSortChange(newSortBy) {
    setSortBy(newSortBy);
  }

  // Handler untuk menambah movie ke watchlist
  function handleAddWatched(movie) {
    setWatched((prevWatched) => {
      const isAlreadyWatched = prevWatched.some(
        (w) => w.imdbID === movie.imdbID
      );

      if (isAlreadyWatched) {
        console.log("Movie already in watchlist");
        return prevWatched;
      }

      console.log("Adding movie to watchlist:", movie);
      return [...prevWatched, movie];
    });
  }

  // Handler untuk menghapus movie dari watchlist
  function handleDeleteWatched(id) {
    setWatched((prevWatched) => {
      return prevWatched.filter((movie) => movie.imdbID !== id);
    });
  }

  // Handler untuk menutup detail movie
  function handleCloseMovie() {
    setSelectedMovieId(null);
  }

  const dynamicMaxHeight = getMaxHeight();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <NavBar>
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <NumResults movies={movies} />
        </NavBar>

        <Main>
          {/* Left Panel - Search Results */}
          <BoxMovies
            title="Search Results"
            isFlexHeight={movies.length > 0 && watched.length > 0}
          >
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}

            {/* Show movies when search is successful */}
            {!isLoading && !error && query.length >= 3 && movies.length > 0 && (
              <MovieList
                movies={movies}
                onSelectMovieId={handleSelectMovieId}
                sortBy={sortBy}
                onSortChange={handleSortChange}
                maxHeight={dynamicMaxHeight}
              />
            )}

            {/* No movies found */}
            {!isLoading &&
              !error &&
              query.length >= 3 &&
              movies.length === 0 && (
                <div className="text-center p-6 sm:p-8 text-gray-400">
                  <div className="text-3xl sm:text-4xl mb-2 text-purple-400">
                    <i className="ri-movie-line"></i>
                  </div>
                  <p className="text-sm sm:text-base">
                    No movies found for "{query}"
                  </p>
                  <p className="text-xs sm:text-sm mt-2">
                    Try searching for something else
                  </p>
                </div>
              )}

            {/* Initial search prompt */}
            {!isLoading && !error && query.length < 3 && (
              <div className="text-center p-6 sm:p-8 text-gray-400">
                <div className="text-3xl sm:text-4xl mb-2 text-purple-400">
                  <i className="ri-search-line"></i>
                </div>
                <p className="text-sm sm:text-base">
                  Start typing to search movies...
                </p>
                <p className="text-xs sm:text-sm mt-2">
                  Enter at least 3 characters
                </p>
              </div>
            )}
          </BoxMovies>

          {/* Right Panel - Movie Details or Watchlist */}
          <BoxMovies
            title={selectedMovieId ? "Movie Details" : "Your Watchlist"}
            isFlexHeight={
              !selectedMovieId && watched.length > 0 && movies.length > 0
            }
          >
            {selectedMovieId ? (
              /* Show Movie Details with Rating Feature */
              <MovieDetails
                selectedId={selectedMovieId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatched}
                watched={watched}
              />
            ) : (
              /* Show Watchlist */
              <div
                className={`space-y-4 sm:space-y-6 ${
                  watched.length > 0 && movies.length > 0
                    ? "h-full flex flex-col"
                    : ""
                }`}
              >
                {/* Watchlist Summary - always show, even when empty */}
                <div className="flex-shrink-0">
                  <WatchedSummary watched={watched} />
                </div>

                {/* Watchlist Items */}
                {watched.length > 0 ? (
                  <div className="flex-1 flex flex-col min-h-0">
                    <WatchedList
                      watched={watched}
                      onDeleteWatched={handleDeleteWatched}
                      maxHeight={dynamicMaxHeight}
                    />
                  </div>
                ) : (
                  <div className="text-center p-6 sm:p-8 text-gray-400 flex-1 flex items-center justify-center flex-col">
                    <div className="text-3xl sm:text-4xl mb-2 text-purple-400">
                      <i className="ri-movie-2-line"></i>
                    </div>
                    <p className="text-sm sm:text-base">
                      Your watchlist is empty
                    </p>
                    <p className="text-xs sm:text-sm mt-2">
                      Search and add movies to start building your collection
                    </p>
                  </div>
                )}
              </div>
            )}
          </BoxMovies>
        </Main>
      </div>
    </div>
  );
}
