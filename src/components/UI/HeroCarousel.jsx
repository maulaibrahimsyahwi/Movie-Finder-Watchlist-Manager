// src/components/UI/HeroCarousel.jsx - FILE BARU
import React, { useState, useEffect, useCallback } from "react";

function HeroCarousel({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk maju ke slide berikutnya (dibuat dengan useCallback agar tidak dibuat ulang)
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  }, [movies.length]);

  // Efek untuk auto-play carousel setiap 5 detik
  useEffect(() => {
    if (movies.length === 0) return; // Jangan jalankan jika tidak ada film
    const interval = setInterval(goToNext, 5000); // Ganti slide setiap 5 detik
    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [movies.length, goToNext]);

  // Fungsi untuk navigasi manual
  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + movies.length) % movies.length
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (!movies || movies.length === 0) {
    return (
      <div className="relative h-96 md:h-[500px] bg-gray-800 rounded-2xl mb-8 flex items-center justify-center">
        <p>Memuat film unggulan...</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
      {/* Slider Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {movies.map((movie) => (
          // Setiap Slide
          <div key={movie.imdbID} className="relative min-w-full h-full">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/1280x720?text=Image+Not+Found"
              }
              alt={`${movie.Title} poster`}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 p-6 md:p-10 w-full md:w-2/3 lg:w-1/2">
              <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg line-clamp-2">
                {movie.Title}
              </h1>
              {/* Kita bisa tambahkan plot singkat jika ada di data awal, tapi untuk sekarang kita skip */}
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Navigasi Kiri & Kanan */}
      <button
        onClick={goToPrevious}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-2 rounded-full z-10"
      >
        <i className="ri-arrow-left-s-line text-3xl"></i>
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 hover:bg-black/60 p-2 rounded-full z-10"
      >
        <i className="ri-arrow-right-s-line text-3xl"></i>
      </button>

      {/* Navigasi Titik (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentIndex === index
                ? "bg-white"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
