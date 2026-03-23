"use client";

interface QuoteUtilityBarProps {
  totalCount: number;
  activeCategory?: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onFilterToggle?: () => void;
}

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "featured", label: "Featured First" },
  { value: "newest", label: "Newest" },
  { value: "mostRead", label: "Most Read" },
];

export default function QuoteUtilityBar({
  totalCount,
  activeCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onFilterToggle,
}: QuoteUtilityBarProps) {
  return (
    <div className="bg-[#232B52] border border-[#C5A85C]/10 rounded-xl p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Result Count & Context */}
        <div className="flex-1">
          <p className="text-sm text-[#AAB3CF]">
            <span className="text-white font-medium">{totalCount}</span>
            {" "}{totalCount === 1 ? "Quote" : "Quotes"}
            {activeCategory && activeCategory !== "All" && (
              <span className="text-[#C5A85C]"> in {activeCategory}</span>
            )}
          </p>
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Search teachings..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#1C2340] border border-[#C5A85C]/20 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A85C]/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="appearance-none bg-[#1C2340] border border-[#C5A85C]/20 rounded-lg py-2 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#C5A85C]/40 transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C5A85C]/60 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Mobile Filter Toggle */}
          {onFilterToggle && (
            <button
              onClick={onFilterToggle}
              className="lg:hidden p-2 text-[#C5A85C] hover:bg-[#1C2340] rounded-lg transition-colors"
              aria-label="Toggle filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
