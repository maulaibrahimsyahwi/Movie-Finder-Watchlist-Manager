// src/pages/StatsPage.jsx - DIPERBARUI
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { WatchedSummary } from "../components/Watched";

function StatsPage({ watched }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-8">
      {/* --- PERUBAHAN DI SINI --- */}
      <div className="mb-6">
        {/* Tombol "Kembali" dibungkus div */}
        <div>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Kembali
          </Link>
        </div>
      </div>
      {/* --- AKHIR PERUBAHAN --- */}

      <h1 className="text-3xl font-bold text-white mb-8">
        Statistik Tontonan Anda
      </h1>

      <WatchedSummary watched={watched} />
    </div>
  );
}

export default StatsPage;
