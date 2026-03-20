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

export default function Home() {
  return (
    // one main div with background color and min height to cover the screen
    <div className="bg-[#1C2340] min-h-screen">
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
