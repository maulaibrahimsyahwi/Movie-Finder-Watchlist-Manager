// src/components/UI/Loader.js - Updated with spinner animation
function Loader() {
  return (
    <div className="text-center p-12">
      <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
      <p className="mt-4 text-gray-300 font-medium flex items-center justify-center gap-2">
        <i className="ri-movie-line text-purple-400"></i>
        Loading movies...
      </p>
    </div>
  );
}

export default Loader;
