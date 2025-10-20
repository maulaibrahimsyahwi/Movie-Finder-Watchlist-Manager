// src/pages/CategoryPage.jsx - DIPERBARUI
import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid";
import { movieService } from "../services/movieService";
import { Loader } from "../components/UI";

const categoryTitles = {
  popular: "Populer Saat Ini",
  newReleases: "Rilisan Terbaru",
  action: "Film Aksi Pilihan",
  horror: "Film Horor Mencekam",
  tvSeries: "Serial TV Populer",
  search: "Hasil Pencarian",
  comedy: "Film Komedi",
  scifi: "Sains Fiksi",
  animation: "Animasi",
  thriller: "Film Thriller",
  romance: "Film Romantis",
};

const categoryQueries = {
  popular: "avengers",
  newReleases: "2024",
  action: "action",
  horror: "horror",
  tvSeries: "crime",
  comedy: "comedy",
  scifi: "sci-fi",
  animation: "animation",
  thriller: "thriller",
  romance: "romance",
};

// ... (Komponen SortControl tidak berubah) ...
function SortControl({ sortBy, setSortBy }) {
  return (
    <div>
      <label htmlFor="sort" className="block text-sm font-medium text-gray-300">
        Urutkan
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="mt-1 bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500"
      >
        <option value="relevance">Relevansi</option>
        <option value="year_desc">Tahun (Terbaru)</option>
        <option value="year_asc">Tahun (Terlama)</option>
      </select>
    </div>
  );
}

// Terima kembali 'allMovies' sebagai prop
function CategoryPage({ allMovies, onSelectMovieId }) {
  const { categoryId } = useParams();

  // State untuk paginasi halaman kategori
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("relevance");

  const isSearchPage = categoryId === "search";
  const title = categoryTitles[categoryId] || "Kategori";

  useEffect(() => {
    // Efek ini HANYA untuk mengambil data halaman kategori, bukan pencarian
    if (isSearchPage) {
      setCategoryMovies([]); // Kosongkan state jika ini halaman pencarian
      return;
    }

    setCategoryMovies([]);
    setCurrentPage(1);
    setTotalResults(0);
    setError("");

    async function fetchCategoryMovies() {
      setIsLoading(true);
      try {
        const query = categoryQueries[categoryId];
        const type = categoryId === "tvSeries" ? "series" : "movie";
        const data = await movieService.searchMovies(query, 1, { type });

        if (data.Search) {
          setCategoryMovies(data.Search);
          setTotalResults(Number(data.totalResults));
        } else {
          setError("Tidak ada film ditemukan untuk kategori ini.");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal memuat film.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategoryMovies();
  }, [categoryId, isSearchPage]);

  // --- PERBAIKAN UTAMA DI SINI ---
  // Tentukan sumber data film yang akan ditampilkan
  const movies = isSearchPage ? allMovies.searchResults : categoryMovies;

  const handleLoadMore = async () => {
    // ... (fungsi handleLoadMore tetap sama) ...
    const nextPage = currentPage + 1;
    setIsLoading(true);
    try {
      const query = categoryQueries[categoryId];
      const type = categoryId === "tvSeries" ? "series" : "movie";
      const data = await movieService.searchMovies(query, nextPage, { type });
      if (data.Search) {
        setCategoryMovies((prevMovies) => [...prevMovies, ...data.Search]);
        setCurrentPage(nextPage);
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat lebih banyak film.");
    } finally {
      setIsLoading(false);
    }
  };

  const hasMore = categoryMovies.length < totalResults;

  const sortedMovies = useMemo(() => {
    const sorted = [...movies]; // Gunakan 'movies' yang sudah ditentukan sumbernya
    switch (sortBy) {
      case "year_desc":
        return sorted.sort((a, b) => (b.Year || 0) - (a.Year || 0));
      case "year_asc":
        return sorted.sort((a, b) => (a.Year || 0) - (b.Year || 0));
      default:
        return sorted;
    }
  }, [movies, sortBy]);

  return (
    <div className="py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <Link
              to="/"
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Kembali
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>

        {isSearchPage && <SortControl sortBy={sortBy} setSortBy={setSortBy} />}
      </div>

      {error && <p className="text-red-400 text-center">{error}</p>}

      {movies.length === 0 && !isLoading && (
        <p className="text-gray-400 text-center text-lg">
          Tidak ada hasil yang ditemukan.
        </p>
      )}

      <MovieGrid movies={sortedMovies} onSelectMovieId={onSelectMovieId} />

      {isLoading && (
        <div className="mt-8">
          <Loader />
        </div>
      )}

      {!isLoading && hasMore && !isSearchPage && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Muat Lebih Banyak
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
