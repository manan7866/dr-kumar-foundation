"use client";

interface QuotePaginationProps {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export default function QuotePagination({
  currentPage,
  totalPages,
  hasMore,
  onLoadMore,
  isLoading = false,
}: QuotePaginationProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="group inline-flex items-center px-6 py-3 bg-[#C5A85C]/10 border border-[#C5A85C]/30 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/20 hover:border-[#C5A85C]/50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          <>
            <span>Load More Reflections</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </>
        )}
      </button>
    </div>
  );
}
