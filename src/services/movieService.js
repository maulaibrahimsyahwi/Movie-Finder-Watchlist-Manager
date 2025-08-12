// src/services/movieService.js
const API_KEY = "b10f0b40";

export const movieService = {
  searchMovies: async (query, page = 1) => {
    if (!query) return { Search: [], Response: "True", totalResults: "0" };

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(
          query
        )}&page=${page}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie not found");
      }

      return data;
    } catch (error) {
      console.error("Error searching movies:", error);
      throw error;
    }
  },

  // Fungsi baru untuk mengambil semua hasil pencarian
  searchAllMovies: async (query) => {
    if (!query) return { Search: [], Response: "True", totalResults: "0" };

    try {
      // Ambil halaman pertama dulu untuk mengetahui total hasil
      const firstPage = await movieService.searchMovies(query, 1);

      if (!firstPage.Search || firstPage.totalResults <= 10) {
        return firstPage; // Jika hasil <= 10, return langsung
      }

      // Hitung total halaman
      const totalResults = parseInt(firstPage.totalResults);
      const totalPages = Math.ceil(totalResults / 10);
      const maxPages = Math.min(totalPages, 3); // Batasi maksimal 10 halaman (100 hasil)

      // Ambil semua halaman secara paralel
      const pagePromises = [];
      for (let page = 2; page <= maxPages; page++) {
        pagePromises.push(movieService.searchMovies(query, page));
      }

      const allPages = await Promise.all(pagePromises);

      // Gabungkan semua hasil
      let allMovies = [...firstPage.Search];

      allPages.forEach((pageData) => {
        if (pageData.Search) {
          allMovies = [...allMovies, ...pageData.Search];
        }
      });

      return {
        Search: allMovies,
        totalResults: firstPage.totalResults,
        Response: "True",
      };
    } catch (error) {
      console.error("Error searching all movies:", error);
      throw error;
    }
  },

  getMovieDetails: async (imdbID) => {
    if (!imdbID) throw new Error("Movie ID is required");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.Response === "False") {
        throw new Error(data.Error || "Movie details not found");
      }

      return data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      throw error;
    }
  },
};
