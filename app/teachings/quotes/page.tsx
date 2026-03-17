"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import TeachingHero from "../../components/TeachingHero";
import QuoteCard from "../../components/QuoteCard";
import QuoteBlock from "../../components/QuoteBlock";

interface Quote {
  id: string;
  text: string;
  category: string;
  is_featured: boolean;
}

const CATEGORIES = [
  "All",
  "Compassion",
  "Self Awareness",
  "Inner Discipline",
  "Ethical Conduct",
  "Human Unity",
  "Peace and Reflection",
];

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const quotesPerSlide = 6;

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/api/admin/quotes?is_active=true");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((quote) => {
      const matchesCategory = selectedCategory === "All" || quote.category === selectedCategory;
      const matchesSearch = searchQuery === "" ||
        quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, quotes]);

  // Slider navigation
  const totalSlides = Math.ceil(filteredQuotes.length / quotesPerSlide);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const getCurrentQuotes = () => {
    const start = currentSlide * quotesPerSlide;
    return filteredQuotes.slice(start, start + quotesPerSlide);
  };

  const featuredQuote = quotes.find((q) => q.is_featured) || quotes[0];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <TeachingHero
        title={
          <>
            Wisdom of
            <br />
            <span className="gradient-gold">Dr. Kumar</span>
          </>
        }
        subtitle="A collection of reflections and teachings drawn from the life and spiritual insight of Dr. Kumar. These words invite seekers toward awareness, compassion, and ethical living."
        ctaLink="#quotes"
        ctaText="Explore Wisdom"
      />

      {/* Featured Quote Section */}
      {isLoading ? (
        <section className="section-spacing bg-[#151A30] relative">
          <div className="container-premium">
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          </div>
        </section>
      ) : featuredQuote && (
        <section className="section-spacing bg-[#151A30] relative">
          <div className="container-premium">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                Featured Reflection
              </h2>
              <div className="gold-divider long mx-auto mb-6" />
            </motion.div>

            <QuoteBlock quote={featuredQuote.text} attribution="Dr. Kumar" />
          </div>
        </section>
      )}

      {/* Category Filter & Search Section */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Search Field */}
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teachings or themes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60"
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
            </div>

            {/* Category Filter Dropdown */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <label htmlFor="category-filter" className="text-[#AAB3CF] text-sm font-medium whitespace-nowrap">
                Filter by Theme:
              </label>
              <div className="relative w-full sm:w-auto">
                <select
                  id="category-filter"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-64 bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 px-4 pr-10 text-white focus:outline-none focus:border-[#C5A85C]/40 transition-colors appearance-none cursor-pointer hover:border-[#C5A85C]/40"
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category === "All" ? "All Themes" : category}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quotes Slider Section */}
      <section id="quotes" className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
                  Collection of Wisdom
                </h2>
                <div className="gold-divider long mx-auto mb-6" />
                <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
                  {filteredQuotes.length} {filteredQuotes.length === 1 ? "teaching" : "teachings"} available for reflection
                </p>
              </motion.div>

              {filteredQuotes.length > 0 ? (
                <div className="relative">
                  {/* Quotes Grid Slide */}
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getCurrentQuotes().map((quote, index) => (
                        <QuoteCard
                          key={quote.id}
                          quote={quote.text}
                          category={quote.category}
                          delay={index * 0.05}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Navigation Arrows - Right Side */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                    {/* Previous Arrow */}
                    <button
                      onClick={prevSlide}
                      className="w-12 h-12 bg-[#C5A85C]/90 hover:bg-[#C5A85C] text-[#1C2340] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#C5A85C]/30 transition-all duration-300 group"
                      aria-label="Previous slide"
                    >
                      <svg className="w-6 h-6 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </button>

                    {/* Next Arrow */}
                    <button
                      onClick={nextSlide}
                      className="w-12 h-12 bg-[#C5A85C]/90 hover:bg-[#C5A85C] text-[#1C2340] rounded-full flex items-center justify-center shadow-lg hover:shadow-[#C5A85C]/30 transition-all duration-300 group"
                      aria-label="Next slide"
                    >
                      <svg className="w-6 h-6 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-[#C5A85C] w-8'
                            : 'bg-[#C5A85C]/30 hover:bg-[#C5A85C]/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Slide Counter */}
                  <div className="text-center mt-4 text-[#AAB3CF] text-sm">
                    Slide {currentSlide + 1} of {totalSlides} ({filteredQuotes.length} quotes)
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-[#AAB3CF] text-lg">
                    No teachings found matching your search. Try a different category or keyword.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Closing Reflection Section */}
      <section className="section-spacing bg-[#1C2340] relative">
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

      {/* Navigation CTA */}
      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Core Principles</span>
            </a>

            <a
              href="/the-circle"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>View The Circle</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
