import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import CircleHero from "../components/CircleHero";
import AnimatedSection from "../components/AnimatedSection";
import { dummyMembersFour } from "../../dumpdata/circle-members";
import ClientMembersSection from "./ClientMembersSection";

export default function TheCirclePage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      <CircleHero />

      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slide-left">
              <h2 className="font-serif text-3xl text-white mb-6">
                Overview
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  The Circle exists as a documented archive of engagement. It is
                  neither hierarchical nor promotional. Each record reflects
                  structured documentation of first encounter, resonated qualities,
                  and continuing participation.
                </p>
                <p>
                  All submissions undergo moderation before publication. This ensures
                  clarity of language, accuracy of representation, and alignment with
                  the Foundation&apos;s standards for responsible documentation.
                </p>
                <p>
                  The Circle is maintained through the stewardship of the Foundation
                  and represents a living archive of individuals engaged with this
                  orientation across diverse contexts and regions.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/the-circle/members-directory"
                  className="group inline-flex items-center text-[#C5A85C] font-medium"
                >
                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    View Full Directory
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                <MetricCard value={150} label="Members Documented" suffix="+" delay={0.3} />
                <MetricCard value={30} label="Countries Represented" suffix="+" delay={0.4} />
                <MetricCard value={10} label="Years of Continuity" suffix="+" delay={0.5} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <ClientMembersSection />

      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <AnimatedSection className="max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Participation Guidelines
            </h2>
            <div className="gold-divider long mb-8" />

            <ul className="space-y-4 text-[#AAB3CF]">
              {[
                "Maintain clarity of language in all documentation",
                "Avoid exaggeration or mystical claims",
                "No hierarchical claims or status distinctions",
                "Respect structured documentation format",
                "All submissions subject to moderation",
              ].map((item, index) => (
                <AnimatedSection
                  key={item}
                  animation="slide-left"
                  delay={0.1 * index}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#C5A85C] mt-1">•</span>
                  <span>{item}</span>
                </AnimatedSection>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="/the-circle/participation-guidelines"
                className="text-[#C5A85C] font-medium inline-flex items-center group"
              >
                <span className="transition-all duration-300 group-hover:translate-x-2">
                  Read Full Guidelines
                </span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </section>

      <section className="py-24 bg-[#1C2340] relative">
        <div className="container-premium">
          <AnimatedSection className="sm:text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Submit for Inclusion
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Individuals seeking inclusion must submit structured documentation.
              All submissions undergo review prior to publication.
            </p>
            <Link
              href="/the-circle/registration"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Register for The Circle</span>
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
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Core Principles</span>
            </Link>

            <Link
              href="/global-presence"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Global Presence</span>
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
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

function MetricCard({ value, label, suffix = "", delay }: { value: number; label: string; suffix?: string; delay: number }) {
  return (
    <AnimatedSection delay={delay}>
      <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-6 text-center hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.15)]">
        <div className="text-4xl md:text-5xl font-serif text-[#C5A85C] mb-3 font-light">
          {value}
          {suffix && <span className="text-xl ml-1">{suffix}</span>}
        </div>
        <div className="text-[#AAB3CF] text-xs uppercase tracking-widest">
          {label}
        </div>
        <div className="w-12 h-[1px] bg-[#C5A85C]/30 mx-auto mt-3" />
      </div>
    </AnimatedSection>
  );
}
