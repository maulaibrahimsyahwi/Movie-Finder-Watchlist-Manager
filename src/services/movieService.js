// src/services/movieService.js - DIPERBARUI
const API_KEY = "b10f0b40";

export const movieService = {
  // ... (searchMovies tidak berubah)
  searchMovies: async (query, page = 1, options = {}) => {
    if (!query) return { Search: [], Response: "True", totalResults: "0" };
    const { type = "", year = "" } = options;
    try {
      let url = `https://www.omdbapi.com/?s=${encodeURIComponent(
        query
      )}&page=${page}&apikey=${API_KEY}`;
      if (type) url += `&type=${type}`;
      if (year) url += `&y=${year}`;
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.Response === "False") {
        if (data.Error === "Movie not found!") {
          return { Search: [], Response: "True", totalResults: "0" };
        }
        throw new Error(data.Error || "Movie not found");
      }
      return data;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  },

  // Perbarui searchAllMovies untuk memfilter hasil "N/A"
  searchAllMovies: async (query, options = {}) => {
    if (!query) return { Search: [], Response: "True", totalResults: "0" };
    const { type = "", year = "", signal } = options;
    try {
      const firstPage = await movieService.searchMovies(query, 1, {
        type,
        year,
      });
      if (signal && signal.aborted) throw new Error("AbortError");
      if (!firstPage.Search || firstPage.totalResults <= 10) {
        // Filter hasil bahkan untuk satu halaman
        const filteredSearch = firstPage.Search
          ? firstPage.Search.filter((movie) => movie.Poster !== "N/A")
          : [];
        return { ...firstPage, Search: filteredSearch };
      }
      const totalResults = parseInt(firstPage.totalResults);
      const totalPages = Math.ceil(totalResults / 10);
      const maxPages = Math.min(totalPages, 3);
      const pagePromises = [];
      for (let page = 2; page <= maxPages; page++) {
        pagePromises.push(
          movieService.searchMovies(query, page, { type, year })
        );
      }
      const allPages = await Promise.all(pagePromises);
      if (signal && signal.aborted) throw new Error("AbortError");
      let allMovies = [...firstPage.Search];
      allPages.forEach((pageData) => {
        if (pageData.Search) {
          allMovies = [...allMovies, ...pageData.Search];
        }
      });

      // --- PERBAIKAN: Filter semua film yang posternya "N/A" ---
      const filteredMovies = allMovies.filter(
        (movie) => movie.Poster !== "N/A"
      );

      return {
        Search: filteredMovies,
        totalResults: firstPage.totalResults, // totalResults asli tetap ditampilkan
        Response: "True",
      };
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
        return { Search: [], Response: "False", Error: "Fetch aborted" };
      }
      console.error("Error searching all movies:", error);
      throw error;
    }
  },

  // ... (getMovieDetails tidak berubah)
  getMovieDetails: async (imdbID) => {
    if (!imdbID) throw new Error("Movie ID is required");
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      if (data.Response === "False")
        throw new Error(data.Error || "Movie details not found");
      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  },
};
