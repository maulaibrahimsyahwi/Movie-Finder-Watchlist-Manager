// src/hooks/useWatchlist.js
import { useContext } from "react";
import { WatchlistContext } from "../contexts/WatchlistContext";

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
