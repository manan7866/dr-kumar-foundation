import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

interface CircleHeroProps {
  ctaDirectory?: string;
  ctaRegister?: string;
}

export default function CircleHero({ ctaDirectory = "/the-circle/members-directory", ctaRegister = "/the-circle/registration" }: CircleHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        style={{
          animation: "float 10s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:text-center">
        <AnimatedSection animation="fade-in" delay={0.3}>
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent sm:mx-auto mb-8" style={{ width: "8rem" }} />
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.5}>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
            The
            <span className="gradient-gold"> Circle</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={0.8}>
          <p className="text-[#AAB3CF] text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
            A structured archive documenting individuals who have engaged with the
            preserved life and orientation of the Foundation. All records are
            moderated and presented with clarity and responsibility.
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={1.1}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ctaDirectory}
              className="group inline-flex items-center justify-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Explore Directory</span>
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
            </Link>

            <Link
              href={ctaRegister}
              className="group inline-flex items-center justify-center px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] hover:-translate-y-1"
            >
              Submit Registration
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
