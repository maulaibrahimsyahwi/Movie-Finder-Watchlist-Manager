import { useState } from "react";

function BoxMovies({ children, title, isFlexHeight = false }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-gray-900/80 backdrop-blur-md border border-gray-700/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:border-gray-600/50 ${
        isFlexHeight ? "flex flex-col" : ""
      }`}
    >
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700/30 bg-gray-800/50 flex-shrink-0">
        {title && (
          <h2 className="text-base sm:text-lg font-semibold text-white truncate pr-2">
            {title}
          </h2>
        )}
        <button
          className="w-7 h-7 cursor-pointer sm:w-8 sm:h-8 rounded-full bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center transition-all duration-200 hover:scale-110 ml-auto flex-shrink-0"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? (
            <i className="ri-subtract-line"></i>
          ) : (
            <i className="ri-add-line"></i>
          )}
        </button>
      </div>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "opacity-100" : "max-h-0 opacity-0"
        } ${isFlexHeight ? "flex-1 flex flex-col" : ""}`}
        style={isOpen ? {} : { maxHeight: 0 }}
      >
        <div
          className={`p-3 sm:p-4 ${isFlexHeight ? "flex-1 flex flex-col" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default BoxMovies;
