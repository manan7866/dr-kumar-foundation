"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface QuoteArchiveCardProps {
  id: string;
  slug: string;
  title?: string;
  excerpt?: string;
  text: string;
  primaryCategory?: string;
  isFeatured?: boolean;
  delay?: number;
}

export default function QuoteArchiveCard({
  id,
  slug,
  title,
  excerpt,
  text,
  primaryCategory,
  isFeatured,
  delay = 0,
}: QuoteArchiveCardProps) {
  // Generate excerpt from text if not provided
  const displayExcerpt = excerpt || (text.length > 120 ? text.slice(0, 120) + "..." : text);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link href={`/teachings/quotes/${slug}`} className="block h-full">
        <div className="bg-[#232B52] border border-[#C5A85C]/10 rounded-xl p-5 hover:border-[#C5A85C]/30 transition-all duration-500 h-full flex flex-col">
          {/* Featured Badge */}
          {isFeatured && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-[10px] uppercase tracking-widest rounded-full">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </span>
            </div>
          )}

          {/* Title */}
          {title && (
            <h3 className="font-serif text-lg text-white mb-2 line-clamp-2 group-hover:text-[#C5A85C] transition-colors">
              {title}
            </h3>
          )}

          {/* Opening Quote Mark */}
          <div className="text-[#C5A85C]/20 text-2xl font-serif mb-2">"</div>

          {/* Excerpt */}
          <p className="font-serif text-sm text-[#F1F3F8] leading-relaxed mb-4 line-clamp-3 flex-grow">
            {displayExcerpt}
          </p>

          {/* Category & Author */}
          <div className="pt-3 border-t border-[#C5A85C]/8">
            <div className="flex items-center justify-between">
              {primaryCategory && (
                <span className="inline-block px-2 py-0.5 bg-[#C5A85C]/8 text-[#C5A85C] text-[10px] uppercase tracking-widest rounded-full">
                  {primaryCategory}
                </span>
              )}
              <span className="text-[#C5A85C] text-xs font-medium ml-auto">
                Dr. Kumar
              </span>
            </div>
          </div>

          {/* Read More Indicator */}
          <div className="mt-3 flex items-center gap-2 text-[#AAB3CF] text-xs group-hover:text-[#C5A85C] transition-colors">
            <span>Open Reflection</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
