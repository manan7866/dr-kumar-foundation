import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import TeachingHero from "../components/TeachingHero";
import AnimatedSection from "../components/AnimatedSection";
import ClientGatheringsSection from "./ClientGatheringsSection";

export default function GlobalPresence() {
  return (
    <main className="bg-[#1C2340] min-h-screen">
      <PremiumHeader/>

      <TeachingHero
        title={
          <>
            Global
            <br />
            <span className="gradient-gold">Presence</span>
          </>
        }
        subtitle="Participants are located across multiple regions through documented meetings and structured engagement. Geographic continuity is preserved through archival records."
        ctaLink="#gatherings"
        ctaText="View Gatherings"
      />

      <section id="overview" className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <AnimatedSection className="sm:text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Overview</h2>
            <div className="gold-divider long sm:mx-auto mb-8" />
            <p className="text-[#AAB3CF] leading-relaxed max-w-3xl mx-auto">
              Engagement is distributed. Individuals across regions have connected
              through documented participation and coordinated discussion. This
              section records geographic presence without hierarchy or scale emphasis.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <ClientGatheringsSection />

      <section className="py-16 bg-[#1C2340] border-t border-[#C5A85C]/10">
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

            <Link
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
            </Link>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </main>
  )
}
