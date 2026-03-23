"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import PremiumHeader from "@/app/components/PremiumHeader";
import PremiumFooter from "@/app/components/PremiumFooter";
import {
  QuoteDetailHero,
  QuoteReflectionBlock,
  RecommendedQuotesSection,
} from "@/app/components/quotes";

interface Quote {
  id: string;
  slug: string;
  title?: string;
  text: string;
  excerpt?: string;
  reflection?: string;
  author?: string;
  primaryCategory?: string;
  source?: string;
  isFeatured?: boolean;
  categories?: { category: { name: string } }[];
  tags?: { tag: { name: string } }[];
}

export default function QuoteDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [quote, setQuote] = useState<Quote | null>(null);
  const [recommendations, setRecommendations] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch quote details
        const quoteResponse = await fetch(`/api/quotes/${slug}`);
        if (!quoteResponse.ok) {
          throw new Error("Quote not found");
        }
        const quoteData = await quoteResponse.json();
        setQuote(quoteData);

        // Fetch recommendations
        const recResponse = await fetch(`/api/quotes/${slug}/recommendations`);
        if (recResponse.ok) {
          const recData = await recResponse.json();
          setRecommendations(recData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load quote");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchQuote();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="bg-[#1C2340] min-h-screen">
        <PremiumHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
        </div>
        <PremiumFooter />
      </div>
    );
  }

  if (error || !quote) {
    return (
      <div className="bg-[#1C2340] min-h-screen">
        <PremiumHeader />
        <div className="container-premium py-20">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C5A85C]/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="font-serif text-2xl text-white mb-4">Teaching Not Found</h1>
            <p className="text-[#AAB3CF] mb-8">
              The teaching you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <a
              href="/teachings/quotes"
              className="inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] transition-all"
            >
              Back to Collection
            </a>
          </div>
        </div>
        <PremiumFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Main Content */}
      <section className="section-spacing bg-gradient-to-b from-[#151A30] to-[#1C2340]">
        <div className="container-premium">
          <QuoteDetailHero
            title={quote.title}
            text={quote.text}
            author={quote.author || "Dr. Kumar"}
            primaryCategory={quote.primaryCategory || quote.categories?.[0]?.category.name}
            source={quote.source}
          />

          {/* Reflection Block */}
          <QuoteReflectionBlock reflection={quote.reflection} />

          {/* Metadata */}
          {(quote.categories || quote.tags) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto mt-12"
            >
              <div className="flex flex-wrap gap-3">
                {quote.categories?.map(({ category }) => (
                  <span
                    key={category.name}
                    className="inline-block px-3 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-xs uppercase tracking-widest rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
                {quote.tags?.map(({ tag }) => (
                  <span
                    key={tag.name}
                    className="inline-block px-3 py-1 bg-[#232B52] text-[#AAB3CF] text-xs uppercase tracking-widest rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Recommended Quotes */}
          <RecommendedQuotesSection
            quotes={recommendations}
            category={quote.primaryCategory}
            title="Continue in This Path"
          />
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-12 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a
              href="/teachings/quotes"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Collection of Wisdom</span>
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
