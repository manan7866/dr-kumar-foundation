// Re-export the archive page as the main quotes page
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PremiumHeader from "@/app/components/PremiumHeader";
import PremiumFooter from "@/app/components/PremiumFooter";
import {
  WisdomSidebar,
  QuoteUtilityBar,
  QuoteArchiveCard,
  QuotePagination,
} from "@/app/components/quotes";

interface Quote {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  text: string;
  primaryCategory?: string;
  isFeatured?: boolean;
  author?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: {
    quotes: number;
  };
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export default function QuotesArchivePage() {
  // State
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 0,
    hasMore: false,
  });

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingType, setReadingType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/quote-categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch quotes
  const fetchQuotes = useCallback(async (page: number = 1, append: boolean = false) => {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(pagination.limit),
        category: selectedCategory !== "All" ? selectedCategory : "",
        readingType,
        search: debouncedSearch,
        sort: sortBy,
      });

      const response = await fetch(`/api/quotes?${params}`);
      if (response.ok) {
        const data = await response.json();
        
        if (append) {
          setQuotes((prev) => [...prev, ...data.quotes]);
        } else {
          setQuotes(data.quotes);
        }
        
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, [selectedCategory, readingType, debouncedSearch, sortBy, pagination.limit]);

  // Initial load
  useEffect(() => {
    setIsLoading(true);
    fetchQuotes(1, false);
  }, [selectedCategory, readingType, debouncedSearch, sortBy]);

  // Handlers
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    fetchQuotes(pagination.page + 1, true);
  };

  const handleReset = () => {
    setSelectedCategory("All");
    setReadingType("");
    setSearchQuery("");
    setSortBy("recommended");
  };

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="absolute inset-0 pattern-subtle opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
              <span className="text-[#C5A85C] uppercase tracking-[0.2em] text-xs">
                Wisdom Archive
              </span>
              <div className="w-10 h-[1px] bg-[#C5A85C]/40" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Collection of
              <br />
              <span className="gradient-gold">Wisdom</span>
            </h1>

            <p className="text-[#AAB3CF] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              A curated archive of reflections and teachings from Dr. Kumar,
              inviting seekers toward awareness, compassion, and ethical living.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Archive Module */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <div className="flex gap-8">
            {/* Sidebar */}
            <WisdomSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              readingType={readingType}
              onReadingTypeChange={setReadingType}
              onReset={handleReset}
              isOpen={isFilterDrawerOpen}
              onClose={() => setIsFilterDrawerOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Utility Bar */}
              <QuoteUtilityBar
                totalCount={pagination.total}
                activeCategory={selectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onFilterToggle={() => setIsFilterDrawerOpen(true)}
              />

              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
                </div>
              ) : quotes.length > 0 ? (
                <>
                  {/* Quote Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {quotes.map((quote, index) => (
                      <QuoteArchiveCard
                        key={quote.id}
                        {...quote}
                        delay={index * 0.05}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  <QuotePagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    hasMore={pagination.hasMore}
                    onLoadMore={handleLoadMore}
                    isLoading={isLoadingMore}
                  />
                </>
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C5A85C]/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-[#AAB3CF] text-lg mb-2">No teachings found</p>
                  <p className="text-[#AAB3CF] text-sm">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-6 px-6 py-2.5 bg-[#C5A85C]/10 border border-[#C5A85C]/30 text-[#C5A85C] rounded-lg hover:bg-[#C5A85C]/20 transition-colors"
                  >
                    Reset All Filters
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="section-spacing bg-gradient-to-b from-[#1C2340] to-[#151A30]">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                A Living Wisdom
              </h2>
              <div className="gold-divider long mx-auto mb-8" />

              <p className="text-[#AAB3CF] leading-relaxed text-lg mb-8">
                The words of Dr. Kumar are preserved not only as statements to read but as
                reflections to contemplate. Each quote invites the reader to pause, observe
                the inner life, and rediscover the path of clarity, compassion, and ethical
                living.
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-[1px] bg-[#C5A85C]/40" />
                <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                  Contemplate · Reflect · Transform
                </span>
                <div className="w-12 h-[1px] bg-[#C5A85C]/40" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

