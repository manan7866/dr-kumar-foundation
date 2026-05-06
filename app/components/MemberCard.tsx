import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

interface MemberCardProps {
  id: string;
  name: string;
  country: string;
  city? : string;
  profession: string;
  yearConnected: number;
  delay: number;
}

export default function MemberCard({ id, name, country, profession, yearConnected, delay ,city }: MemberCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <Link
        href={`/the-circle/members-directory/${id}`}
        className="group block bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)] relative"
      >
        <h4 className="font-serif text-xl text-white mb-3 group-hover:text-[#C5A85C] transition-colors duration-300">
          {name}
        </h4>

        <div className="space-y-2 text-[#AAB3CF] text-sm">
          <p>{country}{city ? `: ${city}` : "" }</p>
          <p>{profession}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-[#C5A85C]/20">
          <p className="text-[#C5A85C] text-xs">
            Connected {yearConnected}
          </p>
        </div>

        <div className="absolute top-3 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl transition-colors duration-500" />
      </Link>
    </AnimatedSection>
  );
}
