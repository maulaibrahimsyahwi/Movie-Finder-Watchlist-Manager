// src/pages/StatsPage.jsx - DIPERBARUI
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { WatchedSummary } from "../components/Watched";
import { useWatchlist } from "../contexts/WatchlistContext";

function StatsPage() {
  const { watched } = useWatchlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      <div className="mb-6">
        <div>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Kembali
          </Link>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-white mb-8">
        Statistik Tontonan Anda
      </h1>

      <WatchedSummary watched={watched} />
    </div>
  );
}

export default StatsPage;
