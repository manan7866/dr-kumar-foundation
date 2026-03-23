"use client";

import { motion } from "framer-motion";
import QuoteArchiveCard from "./QuoteArchiveCard";

interface Quote {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  text: string;
  primaryCategory?: string;
  isFeatured?: boolean;
}

interface RecommendedQuotesSectionProps {
  quotes: Quote[];
  category?: string;
  title?: string;
}

export default function RecommendedQuotesSection({
  quotes,
  category,
  title,
}: RecommendedQuotesSectionProps) {
  if (quotes.length === 0) return null;

  const displayTitle = title || (
    category ? `Continue in ${category}` : "Related Reflections"
  );

  return (
    <section className="mt-16 pt-10 border-t border-[#C5A85C]/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[1px] bg-[#C5A85C]/40" />
          <h2 className="font-serif text-xl text-white">{displayTitle}</h2>
        </div>
        <p className="text-sm text-[#AAB3CF]">
          Continue your journey through these related teachings
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {quotes.map((quote, index) => (
          <QuoteArchiveCard
            key={quote.id}
            {...quote}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
}
