import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import StatCard from "../components/StatCard";
import PillarCard from "../components/PillarCard";
import AnimatedSection from "../components/AnimatedSection";

export default function FoundationOverviewPage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6">
              Foundation
              <br />
              <span className="gradient-gold">Architecture & Purpose</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={0.8}>
            <p className="text-[#AAB3CF] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12">
              A structured institution preserving legacy through research,
              documentation, and cultural stewardship.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fade-up" delay={1.1}>
            <Link
              href="#mission"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Explore Foundation</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      <section id="mission" className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-left">
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Mission & Charter
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  The Dr. Ghulam Mohammad Kumar Foundation was established as an
                  institutional body to preserve and document the continuity of a
                  life dedicated to disciplined surrender and ethical clarity.
                </p>
                <p>
                  Its formation marks a transition from individual practice to
                  structured engagement—ensuring that documented practices, ethical
                  orientations, and participatory structures remain accessible to
                  future generations.
                </p>
                <p>
                  The Foundation operates under defined governance structures and
                  legal frameworks, ensuring transparency, accountability, and
                  sustained purpose across generations.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/foundation#mission"
                  className="text-[#C5A85C] font-medium inline-flex items-center group/link"
                >
                  <span className="transition-all duration-300 group-hover/link:translate-x-2">
                    Read Full Mission Statement
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
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
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slide-right" delay={0.2}>
              <div className="relative">
                <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-10 relative">
                  <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

                  <div className="relative z-10">
                    <div className="text-[#C5A85C] text-sm uppercase tracking-widest mb-4">
                      Institutional Statement
                    </div>

                    <blockquote className="font-serif text-xl text-white leading-relaxed mb-8">
                      "Continuity is preserved not through proclamation, but through
                      disciplined documentation and responsible participation."
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <div className="gold-divider hidden sm:block " />
                      <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                        Founding Principle
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <AnimatedSection className="sm:text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Institutional Pillars
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Five foundational areas of work that guide the Foundation's mission
              and activities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              }
              title="Legacy Preservation"
              description="Documenting and archiving materials related to the life, work, and principles developed through a lifetime of disciplined inquiry."
              delay={0.1}
            />

            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              }
              title="Teaching Documentation"
              description="Systematic preservation of core principles and their practical applications in contemporary contexts."
              delay={0.2}
            />

            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              title="Community Projects"
              description="Supporting regional gatherings and documented engagement across diverse contexts through structured frameworks."
              delay={0.3}
            />

            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              }
              title="Research & Analysis"
              description="Academic examination of principles, practices, and their applications in contemporary spiritual and ethical contexts."
              delay={0.4}
            />

            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              }
              title="Media Archiving"
              description="Digital preservation of recorded talks, discussions, and institutional documentation for future accessibility."
              delay={0.5}
            />

            <PillarCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Global Engagement"
              description="Connecting individuals across regions through structured documentation and cultural exchange initiatives."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <AnimatedSection className="sm:text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Impact Dashboard
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Quantified overview of the Foundation's reach and activities.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={50} label="Years Active" suffix="+" delay={0.1} />
            <StatCard value={25} label="Projects Initiated" suffix="+" delay={0.2} />
            <StatCard value={150} label="Research Outputs" suffix="+" delay={0.3} />
            <StatCard value={30} label="Countries Reached" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/life-and-work"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>His Life</span>
              </Link>
              <Link
                href="/foundation#governance"
                className="group inline-flex items-center px-6 py-3 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                <span>Governance</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}
