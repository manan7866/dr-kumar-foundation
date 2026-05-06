"use client";

import { useState, useEffect } from "react";
import GatheringsCard from "../components/GatheringsCard";
import AnimatedSection from "../components/AnimatedSection";

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  region_name: string;
  description: string;
}

export default function ClientGatheringsSection() {
  const [gatheringsByRegion, setGatheringsByRegion] = useState<Record<string, Gathering[]>>({});

  useEffect(() => {
    fetch('/api/admin/global-presence/gatherings')
      .then(res => res.json())
      .then(data => {
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
    <section id="gatherings" className="section-spacing bg-[#151A30] relative">
      <div className="container-premium">
        <AnimatedSection className="sm:text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Gatherings</h2>
          <div className="gold-divider long sm:mx-auto mb-12" />
        </AnimatedSection>

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
  );
}
