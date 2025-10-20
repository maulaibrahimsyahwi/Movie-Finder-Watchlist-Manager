// src/pages/HomePage.jsx - DIPERBARUI
import React from "react";
import HeroCarousel from "../components/UI/HeroCarousel";
import MovieCarousel from "../components/Movies/MovieCarousel";

function HomePage({ movies, onSelectMovieId }) {
  // --- PERUBAHAN UTAMA DI SINI ---
  // Ambil satu film teratas dari 5 kategori berbeda untuk hero carousel.
  // .filter(Boolean) akan menghapus item yang mungkin 'undefined' jika sebuah kategori kosong.
  const heroMovies = [
    movies.popular[0],
    movies.newReleases[0],
    movies.horror[0],
    movies.tvSeries[0],
    movies.romance[0],
  ].filter(Boolean);
  // --- AKHIR PERUBAHAN ---

  return (
    <>
      {/* HeroCarousel sekarang akan menampilkan film-film pilihan */}
      <HeroCarousel movies={heroMovies} />

      <MovieCarousel
        title="Populer Saat Ini"
        movies={movies.popular.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="popular"
      />
      <MovieCarousel
        title="Rilisan Terbaru"
        movies={movies.newReleases.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="newReleases"
      />
      <MovieCarousel
        title="Film Aksi Pilihan"
        movies={movies.action.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="action"
      />
      <MovieCarousel
        title="Film Horor Mencekam"
        movies={movies.horror.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="horror"
      />
      <MovieCarousel
        title="Serial TV Populer"
        movies={movies.tvSeries.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="tvSeries"
      />
      <MovieCarousel
        title="Film Komedi"
        movies={movies.comedy.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="comedy"
      />
      <MovieCarousel
        title="Sains Fiksi"
        movies={movies.scifi.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="scifi"
      />
      <MovieCarousel
        title="Animasi"
        movies={movies.animation.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="animation"
      />
      <MovieCarousel
        title="Film Thriller"
        movies={movies.thriller.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="thriller"
      />
      <MovieCarousel
        title="Film Romantis"
        movies={movies.romance.slice(0, 6)}
        onSelectMovieId={onSelectMovieId}
        categoryKey="romance"
      />
    </>
  );
}

export default HomePage;
