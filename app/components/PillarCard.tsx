import AnimatedSection from "./AnimatedSection";
import { ReactNode } from "react";

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function PillarCard({ icon, title, description, delay }: PillarCardProps) {
  return (
    <AnimatedSection delay={delay}>
      <div className="group relative bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)]">
        <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#AAB3CF] leading-relaxed">{description}</p>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-[#C5A85C]/0 group-hover:border-[#C5A85C]/20 rounded-br-2xl transition-colors duration-500" />
      </div>
    </AnimatedSection>
  );
}
