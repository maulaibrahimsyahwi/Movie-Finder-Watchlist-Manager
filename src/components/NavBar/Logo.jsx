// src/components/NavBar/Logo.js - Updated with Remix Icons
function Logo() {
  return (
    <div className="flex items-center gap-2 sm:gap-3 group">
      <div className="text-2xl sm:text-3xl transition-transform group-hover:rotate-12 group-hover:scale-110 text-purple-400">
        <i className="ri-movie-2-line"></i>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
        CinemaHub
      </h1>
    </div>
  );
}

export default Logo;
