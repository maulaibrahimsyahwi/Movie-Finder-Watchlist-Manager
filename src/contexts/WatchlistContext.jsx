// src/contexts/WatchlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watched));
  }, [watched]);

  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((prev) => prev.filter((movie) => movie.imdbID !== id));
  }

  return (
    <WatchlistContext.Provider
      value={{
        watched,
        onAddWatched: handleAddWatched,
        onDeleteWatched: handleDeleteWatched,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
