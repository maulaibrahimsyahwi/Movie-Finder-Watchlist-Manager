function NumResults({ movies }) {
  return (
    <p className="text-xs sm:text-sm text-gray-300 bg-gray-800/50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full backdrop-blur-sm border border-gray-700/30 whitespace-nowrap">
      Found{" "}
      <span className="font-semibold text-purple-400">
        {movies?.length || 0}
      </span>{" "}
      results
    </p>
  );
}

export default NumResults;
