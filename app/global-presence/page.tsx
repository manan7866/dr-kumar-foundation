"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Accordion from "../components/Accordion"
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import TeachingHero from "../components/TeachingHero";
import GatheringsCard from "../components/GatheringsCard";

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  region_name: string;
  description: string;
}

export default function GlobalPresence() {
  const [gatheringsByRegion, setGatheringsByRegion] = useState<Record<string, Gathering[]>>({});

  useEffect(() => {
    fetch('/api/admin/global-presence/gatherings')
      .then(res => res.json())
      .then(data => {
        // Group gatherings by region
        const grouped: Record<string, Gathering[]> = {};
        data.forEach((g: Gathering) => {
          if (!grouped[g.region_name]) {
            grouped[g.region_name] = [];
          }
          grouped[g.region_name].push(g);
        });
        setGatheringsByRegion(grouped);
      })
      .catch(err => console.error('Failed to fetch gatherings:', err));
  }, []);

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
            {Object.entries(gatheringsByRegion).map(([region, gatherings], index) => (
              <GatheringsCard
                key={region}
                region={region}
                gatherings={gatherings}
                delay={0.1 * (index + 1)}
              />
            ))}
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