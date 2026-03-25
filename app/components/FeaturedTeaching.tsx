"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Quote {
  id: string;
  text: string;
  category: string;
  is_featured?: boolean;
}

export default function FeaturedTeaching() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/admin/quotes?is_active=true');
        if (response.ok) {
          const data = await response.json();
          // Get featured quotes first, then random quotes
          const featuredQuotes = data.filter((q: Quote) => q.is_featured);
          const otherQuotes = data.filter((q: Quote) => !q.is_featured);
          setQuotes([...featuredQuotes, ...otherQuotes]);
        }
      } catch (error) {
        console.error('Failed to fetch quotes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  // Auto-scroll every 3 seconds
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (quotes.length <= 1) return;

    const timer = setInterval(() => {
      setIsScrolling(true);
      
      setCurrentIndex((prev) => {
        const newIndex = prev >= quotes.length - 3 ? 0 : prev + 1;
        return newIndex;
      });

      // Reset scrolling state after animation completes
      setTimeout(() => setIsScrolling(false), 500);
    }, 3000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pattern-subtle opacity-20" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#C5A85C]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#C5A85C]/5 rounded-full blur-[100px]" />

      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Dr. Kumar's Quotes
            </h2>
            <div className="gold-divider long mx-auto" />
          </motion.div>

          {/* Quote Card with Auto-Scroll */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Left Gold Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C5A85C] via-[#C5A85C]/60 to-[#C5A85C]/30 rounded-full" />

            {/* Content with Hidden Scrollbar */}
            <div className="pl-10 py-8">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
                </div>
              ) : quotes.length > 0 ? (
                <div className="max-h-[500px] overflow-hidden">
                  <motion.div
                    animate={{ y: -currentIndex * 300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="space-y-12"
                  >
                    {quotes.map((quote, index) => {
                      // Only blur during scroll animation, sharp when stopped
                      const blur = isScrolling ? '4px' : '0px';
                      
                      return (
                        <motion.div
                          key={`${quote.id}-${currentIndex}`}
                          animate={{ 
                            filter: `blur(${blur})`
                          }}
                          transition={{ 
                            duration: 0.5, 
                            ease: "easeInOut"
                          }}
                          style={{ minHeight: '280px' }}
                        >
                          {/* Floating Animation Wrapper */}
                          <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {/* Opening Quote Mark */}
                            <div className="text-[#C5A85C]/30 text-6xl font-serif mb-4">"</div>

                            {/* Quote Text */}
                            <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8">
                              {quote.text}
                            </blockquote>

                            {/* Closing Quote Mark */}
                            <div className="text-[#C5A85C]/30 text-6xl font-serif mb-6">"</div>
                          </motion.div>

                          {/* Attribution */}
                          <div className="flex items-center gap-4 mb-8">
                            <div className="gold-divider" />
                            <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                              Dr. Ghulam Mohammad Kumar
                            </span>
                            {quote.category && (
                              <>
                                <div className="w-2 h-2 rounded-full bg-[#C5A85C]/40" />
                                <span className="text-[#AAB3CF] text-sm">
                                  {quote.category}
                                </span>
                              </>
                            )}
                          </div>

                          {/* Teaching Context */}
                          <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-[#AAB3CF] leading-relaxed text-lg"
                          >
                            This teaching reflects the core understanding that authentic change
                            emerges from sustained inner work. The emphasis is not on external
                            achievement or recognition, but on the quality of attention brought
                            to each moment. Through disciplined self-observation and ethical
                            conduct, one develops the capacity to engage with the world from a
                            place of clarity rather than reaction.
                          </motion.p>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#AAB3CF]">No quotes available</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* View All Quotes Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/teachings/quotes"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] group"
            >
              <span>View All Quotes</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2"
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
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
