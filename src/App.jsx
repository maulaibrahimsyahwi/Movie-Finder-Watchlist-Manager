// src/App.jsx - DIPERBARUI
import { Routes, Route, NavLink } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Loader, ErrorMessage } from "./components/UI";
import Footer from "./components/UI/Footer";
import { MovieDetails } from "./components/Movies";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import StatsPage from "./pages/StatsPage";
import WatchlistPage from "./pages/WatchlistPage";
import { useMovies } from "./contexts/MovieContext";

export default function App() {
  const { query, setQuery, onSearchSubmit, isLoading, error } = useMovies();

  return (
    <div className="flex flex-col min-h-screen bg-[#141414] p-4 sm:p-6 text-gray-200">
      <div className="max-w-screen-xl mx-auto w-full flex-grow">
        <NavBar
          query={query}
          setQuery={setQuery}
          onSearchSubmit={onSearchSubmit}
        >
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
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/watchlist" element={<WatchlistPage />} />
            </Routes>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
