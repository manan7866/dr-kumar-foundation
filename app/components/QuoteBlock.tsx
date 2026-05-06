import AnimatedSection from "./AnimatedSection";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <AnimatedSection className="max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C5A85C]/5 to-transparent rounded-2xl blur-xl" />
        
        <div className="relative bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 md:p-12">
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/40 rounded-br-2xl" />

          <div className="relative z-10">
            <div className="text-[#C5A85C]/20 text-5xl md:text-6xl font-serif mb-6">"</div>

            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-[#F1F3F8] leading-relaxed mb-8">
              {quote}
            </blockquote>

            <div className="text-[#C5A85C]/20 text-5xl md:text-6xl font-serif mb-8">"</div>

            {attribution && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] hidden sm:block bg-[#C5A85C]/50" />
                <span className="text-[#C5A85C] uppercase tracking-[0.15em] text-xs font-medium">
                  {attribution}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
