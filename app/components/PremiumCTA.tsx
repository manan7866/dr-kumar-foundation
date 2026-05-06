import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function PremiumCTA() {
  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] to-[#151A30]" />

      <div className="container-premium relative z-10">
        <div className="max-w-3xl mx-auto sm:text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
              Engage With the Foundation
            </h2>
            <div className="gold-divider long sm:mx-auto mb-8" />
            <p className="text-[#AAB3CF] text-lg leading-relaxed mb-12">
              Whether for institutional collaboration, research inquiries, or
              general information, we welcome structured engagement aligned
              with our mission and values.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 text-center bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span className="relative z-10">Contact the Foundation</span>
            </Link>

            <Link
              href="/foundation"
              className="px-8 py-4 border text-center border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] hover:-translate-y-1"
            >
              Institutional Collaboration
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border text-center border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:-translate-y-1"
            >
              Media Inquiry
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.4} className="mt-12">
            <p className="text-[#6B7299] text-sm">
              For urgent matters, please email{" "}
              <a
                href="mailto:info@drkumarfoundation.org"
                className="text-[#C5A85C] hover:underline"
              >
                info@dkf.sufisciencecenter.info
              </a>
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
