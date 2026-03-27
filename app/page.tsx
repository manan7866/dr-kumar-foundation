import type { Metadata } from "next";
import PremiumHeader from "./components/PremiumHeader";
import PremiumHero from "./components/PremiumHero";
import FoundationSnapshot from "./components/FoundationSnapshot";
import InstitutionalPillars from "./components/InstitutionalPillars";
import TimelinePreview from "./components/TimelinePreview";
import FeaturedTeaching from "./components/FeaturedTeaching";
import LegacyProjects from "./components/LegacyProjects";
import EcosystemConnection from "./components/EcosystemConnection";
import PremiumCTA from "./components/PremiumCTA";
import PremiumFooter from "./components/PremiumFooter";
import { generatePageSEO, pageSEO, generateHomeSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageSEO(pageSEO.home);

export default function Home() {
  const structuredData = generateHomeSchema();
  
  return (
    // one main div with background color and min height to cover the screen
    <div className="bg-[#1C2340] min-h-screen">
      {/* Structured Data for Search Engines & AI */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <PremiumHeader />
      <main>
        <PremiumHero />
        <FoundationSnapshot />
        <InstitutionalPillars />
        <TimelinePreview />
        <FeaturedTeaching />
        <LegacyProjects />
        {/* <ResearchDocumentation /> */}
        <EcosystemConnection />
        <PremiumCTA />
      </main>
      <PremiumFooter />
    </div>
  );
}
