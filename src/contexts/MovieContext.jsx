// src/contexts/MovieContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { movieService } from "../services/movieService";
import { CATEGORY_QUERIES } from "../utils/constants";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState({
    popular: [],
    newReleases: [],
    action: [],
    horror: [],
    tvSeries: [],
    comedy: [],
    scifi: [],
    animation: [],
    thriller: [],
    romance: [],
    searchResults: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInitialMovies() {
      setIsLoading(true);
      setError("");
      try {
        const responses = await Promise.all(
          Object.entries(CATEGORY_QUERIES).map(([key, query]) =>
            movieService.searchAllMovies(query, {
              type: key === "tvSeries" ? "series" : "movie",
            })
          )
        );

        const newMoviesState = {};
        Object.keys(CATEGORY_QUERIES).forEach((key, index) => {
          newMoviesState[key] = responses[index].Search || [];
        });

        setMovies((prev) => ({ ...prev, ...newMoviesState }));
      } catch (err) {
        setError(err.message || "Gagal memuat film. Coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialMovies();
  }, []);

  async function handleSearchSubmit() {
    if (query.length < 3) {
      setError("Silakan masukkan minimal 3 karakter untuk mencari.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const data = await movieService.searchAllMovies(query, {});
      setMovies((prev) => ({ ...prev, searchResults: data.Search || [] }));
      navigate("/category/search");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelectMovieId(id) {
    navigate(`/movie/${id}`);
  }

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        error,
        query,
        setQuery,
        onSearchSubmit: handleSearchSubmit,
        onSelectMovieId: handleSelectMovieId,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
}
