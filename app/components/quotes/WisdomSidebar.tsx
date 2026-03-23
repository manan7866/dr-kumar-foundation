"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  _count?: {
    quotes: number;
  };
}

interface WisdomSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  readingType: string;
  onReadingTypeChange: (type: string) => void;
  onReset: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const READING_TYPES = [
  { value: "", label: "All Reflections" },
  { value: "featured", label: "Featured Reflections" },
  { value: "short", label: "Short Reflections" },
  { value: "deep", label: "Deep Reflections" },
];

export default function WisdomSidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  readingType,
  onReadingTypeChange,
  onReset,
  isOpen = true,
  onClose,
}: WisdomSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="pb-4 border-b border-[#C5A85C]/20">
        <div className="flex items-center justify-between">
          <h4 className="font-serif text-lg text-white">Wisdom Navigator</h4>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-[#AAB3CF] hover:text-white transition-colors"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto py-4 space-y-6">
        {/* Themes Section */}
        <div>
          <h4 className="text-[#C5A85C] uppercase tracking-widest text-xs font-medium mb-3">
            Themes
          </h4>
          <div className="space-y-1">
            <button
              onClick={() => {
                onCategorySelect("All");
                onClose?.();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === "All"
                  ? "bg-[#C5A85C]/10 text-[#C5A85C]"
                  : "text-[#AAB3CF] hover:bg-[#232B52] hover:text-white"
              }`}
            >
              <span>All Quotes</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  onCategorySelect(category.name);
                  onClose?.();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                  selectedCategory === category.name
                    ? "bg-[#C5A85C]/10 text-[#C5A85C]"
                    : "text-[#AAB3CF] hover:bg-[#232B52] hover:text-white"
                }`}
              >
                <span>{category.name}</span>
                {category._count && (
                  <span className="text-xs opacity-60">{category._count.quotes}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Reading Type Section */}
        <div>
          <h4 className="text-[#C5A85C] uppercase tracking-widest text-xs font-medium mb-3">
            Reading Type
          </h4>
          <div className="space-y-1">
            {READING_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => {
                  onReadingTypeChange(type.value);
                  onClose?.();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  readingType === type.value
                    ? "bg-[#C5A85C]/10 text-[#C5A85C]"
                    : "text-[#AAB3CF] hover:bg-[#232B52] hover:text-white"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-[#C5A85C]/20">
        <button
          onClick={() => {
            onReset();
            onClose?.();
          }}
          className="w-full px-4 py-2.5 text-sm text-[#AAB3CF] border border-[#C5A85C]/30 rounded-lg hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  // Desktop sidebar
  return (
    <>
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-8 bg-[#1C2340] border border-[#C5A85C]/10 rounded-xl p-4">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && onClose && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 bg-[#1C2340] z-50 lg:hidden shadow-2xl"
            >
              <div className="p-4 h-full">
                {sidebarContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
