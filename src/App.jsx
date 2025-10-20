// src/App.jsx - DIPERBARUI
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Loader, ErrorMessage } from "./components/UI";
import Footer from "./components/UI/Footer";
import { MovieDetails } from "./components/Movies";
import { movieService } from "./services/movieService";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import StatsPage from "./pages/StatsPage";
import WatchlistPage from "./pages/WatchlistPage";

export default function App() {
  // ... (semua state dan useEffect tetap sama)
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
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
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
        const [
          popularRes,
          newRes,
          actionRes,
          horrorRes,
          seriesRes,
          comedyRes,
          scifiRes,
          animationRes,
          thrillerRes,
          romanceRes,
        ] = await Promise.all([
          movieService.searchAllMovies("avengers", { type: "movie" }),
          movieService.searchAllMovies("2024", { type: "movie" }),
          movieService.searchAllMovies("action", { type: "movie" }),
          movieService.searchAllMovies("horror", { type: "movie" }),
          movieService.searchAllMovies("crime", { type: "series" }),
          movieService.searchAllMovies("comedy", { type: "movie" }),
          movieService.searchAllMovies("sci-fi", { type: "movie" }),
          movieService.searchAllMovies("animation", { type: "movie" }),
          movieService.searchAllMovies("thriller", { type: "movie" }),
          movieService.searchAllMovies("romance", { type: "movie" }),
        ]);

        setMovies((prev) => ({
          ...prev,
          popular: popularRes.Search || [],
          newReleases: newRes.Search || [],
          action: actionRes.Search || [],
          horror: horrorRes.Search || [],
          tvSeries: seriesRes.Search || [],
          comedy: comedyRes.Search || [],
          scifi: scifiRes.Search || [],
          animation: animationRes.Search || [],
          thriller: thrillerRes.Search || [],
          romance: romanceRes.Search || [],
        }));
      } catch (err) {
        setError(err.message || "Gagal memuat film. Coba lagi nanti.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchInitialMovies();
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watched));
  }, [watched]);

  async function handleSearchSubmit() {
    if (query.length < 3) {
      setError("Silakan masukkan minimal 3 karakter untuk mencari.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await movieService.searchAllMovies(query, {});
      if (data.Search) {
        setMovies((prev) => ({ ...prev, searchResults: data.Search }));
      } else {
        setMovies((prev) => ({ ...prev, searchResults: [] }));
      }
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
  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }
  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  // Hapus baris ini, karena sudah tidak digunakan
  // const featuredMovie = movies.popular[0] || null;

  return (
    <div className="flex flex-col min-h-screen bg-[#141414] p-4 sm:p-6 text-gray-200">
      <div className="max-w-screen-xl mx-auto w-full flex-grow">
        <NavBar
          query={query}
          setQuery={setQuery}
          onSearchSubmit={handleSearchSubmit}
        >
          {/* ... Tautan NavLink Anda ... */}
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/50"
              }`
            }
          >
            <i className="ri-bar-chart-fill"></i>
            Statistik
          </NavLink>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-300 hover:bg-gray-700/50"
              }`
            }
          >
            <i className="ri-play-list-2-line"></i>
            Daftar Saya
          </NavLink>
        </NavBar>

        <main>
          {isLoading && <Loader />}
          {error && !isLoading && <ErrorMessage message={error} />}

          {!isLoading && !error && (
            <Routes>
              {/* Hapus prop 'featuredMovie' dari sini */}
              <Route
                path="/"
                element={
                  <HomePage
                    movies={movies}
                    onSelectMovieId={handleSelectMovieId}
                  />
                }
              />

              <Route
                path="/category/:categoryId"
                element={
                  <CategoryPage
                    allMovies={movies}
                    onSelectMovieId={handleSelectMovieId}
                  />
                }
              />
              <Route
                path="/movie/:id"
                element={
                  <MovieDetails
                    onAddWatched={handleAddWatched}
                    watched={watched}
                  />
                }
              />
              <Route path="/stats" element={<StatsPage watched={watched} />} />
              <Route
                path="/watchlist"
                element={
                  <WatchlistPage
                    watched={watched}
                    onSelectMovieId={handleSelectMovieId}
                    onDeleteWatched={handleDeleteWatched}
                  />
                }
              />
            </Routes>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
