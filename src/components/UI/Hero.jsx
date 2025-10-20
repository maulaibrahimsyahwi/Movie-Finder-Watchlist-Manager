// src/components/UI/Hero.jsx
import React from "react";

function Hero({ movie }) {
  if (!movie) {
    // Tampilkan placeholder atau pesan jika tidak ada film unggulan
    return (
      <div className="relative h-96 md:h-[500px] bg-gray-800 text-white rounded-2xl overflow-hidden mb-8 shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">CinemaHub</h1>
          <p className="text-lg">Temukan film favorit Anda berikutnya.</p>
        </div>
      </div>
    );
  }

  // Cek detail movie yang dibutuhkan
  const title = movie.Title || "Judul Tidak Tersedia";
  const plot =
    movie.Plot ||
    "Deskripsi plot tidak tersedia. Jelajahi untuk mengetahui lebih lanjut!";
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/1280x720?text=Image+Not+Found";

  return (
    <div className="relative h-96 md:h-[500px] text-white rounded-2xl overflow-hidden mb-8 shadow-2xl group">
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="absolute bottom-0 p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-3 drop-shadow-lg">
          {title}
        </h1>
        <p className="hidden md:block md:w-2/3 lg:w-1/2 text-base text-gray-200 drop-shadow-md line-clamp-3">
          {plot}
        </p>
      </div>
    </div>
  );
}

export default Hero;
