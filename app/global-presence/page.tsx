"use client";

import { motion } from "framer-motion";
import Accordion from "../components/Accordion"
import MapPreview from "../components/MapPreview"
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import TeachingHero from "../components/TeachingHero";
import GatheringsCard from "../components/GatheringsCard";

export default function GlobalPresence() {
  return (

    <main className="bg-[#1C2340] min-h-screen">
      <PremiumHeader/>

      {/* Hero Section */}
      <TeachingHero
        title={
          <>
            Global
            <br />
            <span className="gradient-gold">Presence</span>
          </>
        }
        subtitle="Participants are located across multiple regions through documented meetings and structured engagement. Geographic continuity is preserved through archival records."
        ctaLink="#regions"
        ctaText="Explore Regions"
      />

      {/* OVERVIEW */}
      <section id="overview" className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Overview</h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] leading-relaxed max-w-3xl mx-auto">
              Engagement is distributed. Individuals across regions have connected
              through documented participation and coordinated discussion. This
              section records geographic presence without hierarchy or scale emphasis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* REGIONS */}
      <section id="regions" className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Regions</h2>
            <div className="gold-divider long mx-auto mb-12" />
          </motion.div>

          <Accordion />
        </div>
      </section>

      {/* GLOBAL MAP PLACEHOLDER */}
      {/* <section id="global-map" className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-serif text-white mb-4">Global Map</h2>
          <div className="w-16 h-[1px] bg-[#C5A85C] mx-auto mb-12" />

          <div className="border border-[#C5A85C]/20 bg-[#1a203a] p-12">
            <p className="text-[#C9CCD6]">
              Interactive world map will be integrated here.
            </p>
          </div>
        </div>
      </section> */}

      {/* GATHERINGS */}
      <section id="gatherings" className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Gatherings</h2>
            <div className="gold-divider long mx-auto mb-12" />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <GatheringsCard
              region="United States"
              gatherings={[
                {
                  year: "2024",
                  location: "Washington D.C., United States",
                  description: "Circle discussion on documenting contemporary spiritual reflections."
                },
                {
                  year: "2023",
                  location: "New York, United States",
                  description: "Regional gathering of seekers exploring knowledge and ethics."
                },
                {
                  year: "2022",
                  location: "California, United States",
                  description: "Small circle meeting on preserving teachings through structured archives."
                }
              ]}
              delay={0.1}
            />

            <GatheringsCard
              region="India"
              gatherings={[
                {
                  year: "2024",
                  location: "Srinagar, India",
                  description: "Reflection gathering with seekers reviewing archival work."
                },
                {
                  year: "2023",
                  location: "New Delhi, India",
                  description: "Dialogue on knowledge, spirituality, and contemporary society."
                },
                {
                  year: "2022",
                  location: "Srinagar, India",
                  description: "Structured meeting on documentation of teachings."
                }
              ]}
              delay={0.2}
            />

            <GatheringsCard
              region="Europe"
              gatherings={[
                {
                  year: "2024",
                  location: "Paris, France",
                  description: "Regional dialogue on spiritual traditions and modern inquiry."
                },
                {
                  year: "2023",
                  location: "London, United Kingdom",
                  description: "Documented regional dialogue session."
                },
                {
                  year: "2022",
                  location: "Berlin, Germany",
                  description: "Gathering of seekers reflecting on knowledge and responsibility."
                }
              ]}
              delay={0.3}
            />

            <GatheringsCard
              region="Middle East"
              gatherings={[
                {
                  year: "2024",
                  location: "Dubai, United Arab Emirates",
                  description: "Circle discussion on spiritual knowledge and global participation."
                },
                {
                  year: "2023",
                  location: "Doha, Qatar",
                  description: "Regional meeting of seekers and contributors."
                },
                {
                  year: "2022",
                  location: "Istanbul, Türkiye",
                  description: "Dialogue on Sufi tradition and intellectual heritage."
                }
              ]}
              delay={0.4}
            />

            <GatheringsCard
              region="Australia"
              gatherings={[
                {
                  year: "2024",
                  location: "Sydney, Australia",
                  description: "Regional gathering of seekers documenting reflections."
                },
                {
                  year: "2023",
                  location: "Melbourne, Australia",
                  description: "Discussion on preserving spiritual teachings across continents."
                },
                {
                  year: "2022",
                  location: "Brisbane, Australia",
                  description: "Circle meeting on knowledge and community engagement."
                }
              ]}
              delay={0.5}
            />

            <GatheringsCard
              region="South America"
              gatherings={[
                {
                  year: "2024",
                  location: "São Paulo, Brazil",
                  description: "Regional dialogue among seekers and scholars."
                },
                {
                  year: "2023",
                  location: "Buenos Aires, Argentina",
                  description: "Gathering focused on cross-cultural spiritual dialogue."
                },
                {
                  year: "2022",
                  location: "Santiago, Chile",
                  description: "Circle meeting discussing documentation of teachings."
                }
              ]}
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#1C2340] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <a
              href="/"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
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
    </main>

  )
}