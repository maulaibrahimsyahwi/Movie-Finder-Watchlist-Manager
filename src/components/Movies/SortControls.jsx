import { useState } from "react";

function SortControls({ onSortChange, currentSort }) {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "relevance", label: "Relevance", icon: "ri-search-line" },
    { value: "year-desc", label: "Year (Newest)", icon: "ri-calendar-line" },
    { value: "year-asc", label: "Year (Oldest)", icon: "ri-calendar-line" },
    {
      value: "rating-desc",
      label: "Rating (High to Low)",
      icon: "ri-star-fill",
    },
    {
      value: "rating-asc",
      label: "Rating (Low to High)",
      icon: "ri-star-line",
    },
    { value: "title-asc", label: "Title (A-Z)", icon: "ri-font-size" },
    { value: "title-desc", label: "Title (Z-A)", icon: "ri-font-size" },
  ];

  const currentOption =
    sortOptions.find((option) => option.value === currentSort) ||
    sortOptions[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700/50 rounded-lg text-sm text-gray-300 hover:text-white transition-all duration-200 min-w-[160px] justify-between"
      >
        <span className="flex items-center gap-2">
          <i className={`${currentOption.icon} text-purple-400`}></i>
          <span>Sort: {currentOption.label}</span>
        </span>
        <i
          className={`ri-arrow-down-s-line transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700/50 rounded-lg shadow-xl z-20 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-700/60 transition-colors ${
                currentSort === option.value
                  ? "bg-purple-900/30 text-purple-300 border-l-2 border-purple-500"
                  : "text-gray-300"
              }`}
            >
              <i className={`${option.icon} text-purple-400`}></i>
              <span>{option.label}</span>
              {currentSort === option.value && (
                <i className="ri-check-line text-purple-400 ml-auto"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SortControls;
