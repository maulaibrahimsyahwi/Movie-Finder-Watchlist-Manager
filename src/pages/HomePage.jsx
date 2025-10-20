// src/pages/HomePage.jsx - DIPERBARUI
import React from "react";
import HeroCarousel from "../components/UI/HeroCarousel";
import MovieCarousel from "../components/Movies/MovieCarousel";
import { useMovies } from "../contexts/MovieContext";

function HomePage() {
  const { movies, onSelectMovieId } = useMovies();

  const heroMovies = [
    movies.popular[0],
    movies.newReleases[0],
    movies.horror[0],
    movies.tvSeries[0],
    movies.romance[0],
  ].filter(Boolean);

  return (
    <>
      <HeroCarousel movies={heroMovies} />
      {Object.entries(movies).map(([key, value]) => {
        if (key === "searchResults" || value.length === 0) return null;
        return (
          <MovieCarousel
            key={key}
            title={
              key.charAt(0).toUpperCase() +
              key
                .slice(1)
                .replace(/([A-Z])/g, " $1")
                .trim()
            }
            movies={value.slice(0, 6)}
            onSelectMovieId={onSelectMovieId}
            categoryKey={key}
          />
        );
      })}
    </>
  );
}

export default HomePage;
