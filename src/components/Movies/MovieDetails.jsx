// src/components/Movies/MovieDetails.jsx - DIPERBARUI
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StarRating from "../StarRating";
import { movieService } from "../../services/movieService";
import { Loader } from "../UI";
import MovieCarousel from "./MovieCarousel";

function MovieDetails({ onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  const { id: selectedId } = useParams();
  const navigate = useNavigate();

  const isWatched = watched.some((movie) => movie?.imdbID === selectedId);
  const userRatingWatched = watched.find(
    (movie) => movie?.imdbID === selectedId
  )?.userRating;

  useEffect(() => {
    // ... (useEffect utama tidak berubah)
    setMovie({});
    setRecommendations([]);
    async function getMovieDetails() {
      if (!selectedId) return;
      setIsLoading(true);
      setError("");
      try {
        const movieData = await movieService.getMovieDetails(selectedId);
        if (movieData && typeof movieData === "object") {
          setMovie(movieData);
        } else {
          throw new Error("Data film tidak valid");
        }
      } catch (err) {
        setError(err.message || "Gagal mengambil detail film");
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    // ... (useEffect rekomendasi tidak berubah)
    if (movie && movie.Genre) {
      const mainGenre = movie.Genre.split(",")[0].trim();
      if (mainGenre && mainGenre !== "N/A") {
        const fetchRecommendations = async () => {
          setIsLoadingRecs(true);
          try {
            const data = await movieService.searchAllMovies(mainGenre, {
              type: "movie",
            });
            if (data.Search) {
              const filteredRecs = data.Search.filter(
                (m) => m.imdbID !== selectedId
              ).slice(0, 6);
              setRecommendations(filteredRecs);
            }
          } catch (error) {
            console.error("Gagal mengambil rekomendasi:", error);
          } finally {
            setIsLoadingRecs(false);
          }
        };
        fetchRecommendations();
      }
    }
  }, [movie, selectedId]);

  useEffect(() => {
    // ... (useEffect judul tab tidak berubah)
    if (movie.Title) document.title = `CinemaHub | ${movie.Title}`;
    return () => (document.title = "CinemaHub");
  }, [movie.Title]);

  // --- PERBAIKAN UTAMA: FALLBACK UNTUK "N/A" ---
  const {
    Title: title = "Memuat...",
    Year: year = "",
    Rated: rated = "Not Rated",
    Released: released = "Tidak diketahui",
    Poster: poster = "",
    imdbRating = "0",
    imdbVotes = "0",
    Metascore: metascore = "0",
    Awards: awards = "Tidak ada",
    Runtime: runtime = "0 min",
    Plot: plot = "Deskripsi plot tidak tersedia.",
    Genre: genre = "Tidak diketahui",
    Actors: actors = "Tidak diketahui",
    Director: director = "Tidak diketahui",
  } = movie || {};
  // --- AKHIR PERBAIKAN ---

  // ... (handler add/close tidak berubah)
  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating) || 0,
      runtime: Number(runtime.split(" ").at(0)) || 0,
      userRating: Number(userRating),
    };
    onAddWatched(newWatchedMovie);
    navigate(-1);
  }
  function handleCloseMovie() {
    navigate(-1);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-12">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-900/20 rounded-xl">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative text-white">
      <button
        className="absolute top-4 left-4 z-20 w-10 h-10 bg-gray-800/70 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all"
        onClick={handleCloseMovie}
      >
        <i className="ri-arrow-left-line text-xl"></i>
      </button>

      <div className="relative h-64 md:h-80 lg:h-96">
        <img
          src={
            poster !== "N/A"
              ? poster
              : "https://via.placeholder.com/1280x720?text=No+Image"
          }
          alt={`${title} poster`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
      </div>

      <div className="p-6 md:p-8 relative -mt-24 z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">{title}</h2>
        <div className="flex items-center space-x-4 text-gray-400 mb-6">
          <span>{released !== "N/A" ? released : year}</span>
          {rated !== "N/A" && rated !== "Not Rated" && (
            <>
              <span>&bull;</span>
              <span className="border px-2 py-0.5 rounded text-xs">
                {rated}
              </span>
            </>
          )}
          {runtime !== "N/A" && runtime !== "0 min" && (
            <>
              <span>&bull;</span>
              <span>{runtime}</span>
            </>
          )}
        </div>

        {/* InfoBox sekarang akan menampilkan fallback dengan benar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 text-center">
          <InfoBox
            icon="ri-star-fill"
            label="Rating IMDb"
            value={imdbRating}
            subtext={imdbVotes !== "N/A" ? `dari ${imdbVotes} suara` : ""}
            color="text-yellow-400"
          />
          <InfoBox
            icon="ri-trophy-fill"
            label="Metascore"
            value={metascore}
            subtext="dari kritikus"
            color="text-green-400"
          />
          <InfoBox
            icon="ri-award-fill"
            label="Penghargaan"
            value={awards.split(" ").slice(0, 2).join(" ")}
            subtext={awards !== "N/A" && awards !== "Tidak ada" ? "Total" : ""}
            color="text-purple-400"
          />
          <InfoBox
            icon="ri-user-star-fill"
            label="Rating Anda"
            value={isWatched ? `${userRatingWatched}/10` : "Belum dinilai"}
            subtext={isWatched ? "Telah ditonton" : ""}
            color="text-pink-400"
          />
        </div>

        <p className="text-base leading-relaxed mb-6">{plot}</p>
        <p className="text-sm text-gray-400 mb-2">
          <span className="font-semibold text-gray-200">Dibintangi:</span>{" "}
          {actors}
        </p>
        <p className="text-sm text-gray-400 mb-2">
          <span className="font-semibold text-gray-200">Sutradara:</span>{" "}
          {director}
        </p>
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-200">Genre:</span> {genre}
        </p>

        {/* ... (Bagian Rating tidak berubah) ... */}
        <div className="mt-8 bg-gray-800/50 rounded-lg p-6">
          {!isWatched ? (
            <>
              <h3 className="text-lg font-semibold text-center mb-4">
                Beri rating film ini
              </h3>
              <div className="flex justify-center">
                <StarRating max={10} size={28} onSetRating={setUserRating} />
              </div>
              {userRating > 0 && (
                <button
                  className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all"
                  onClick={handleAddWatched}
                >
                  Tambahkan ke Daftar Tontonan
                </button>
              )}
            </>
          ) : (
            <p className="text-center text-lg text-yellow-400">
              Anda telah menilai film ini {userRatingWatched}/10{" "}
              <i className="ri-check-double-line"></i>
            </p>
          )}
        </div>
      </div>

      <div className="px-6 md:px-8 mt-8">
        {!isLoadingRecs && recommendations.length > 0 && (
          <MovieCarousel
            title="Rekomendasi Serupa"
            movies={recommendations}
            onSelectMovieId={(id) => navigate(`/movie/${id}`)}
          />
        )}
      </div>
    </div>
  );
}

// Komponen InfoBox diperbarui untuk menangani nilai 'N/A' atau '0'
function InfoBox({ icon, label, value, subtext, color }) {
  const displayValue = value === "N/A" || value === "0" ? "–" : value;
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <i className={`${icon} ${color} text-3xl mb-2`}></i>
      <p className="text-xl font-bold text-white">{displayValue}</p>
      <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
      {subtext && <p className="text-xs text-gray-500 mt-1">{subtext}</p>}
    </div>
  );
}

export default MovieDetails;
