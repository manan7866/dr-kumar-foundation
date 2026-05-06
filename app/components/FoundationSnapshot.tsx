"use client";

import { useEffect, useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";

interface MetricCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

const startYear = 1957;
const currentYear = new Date().getFullYear();
const years = currentYear - startYear;

function MetricCard({ value, label, suffix = "", delay }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
    
  }, [value, hasAnimated]);

  return (
    <AnimatedSection delay={delay}>
      <div
        ref={cardRef}
        className="group relative h-full bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.15)] hover:-translate-y-2"
      >
        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl group-hover:border-[#C5A85C]/30 transition-colors duration-500" />
        
        <div className="text-5xl md:text-6xl font-serif text-[#C5A85C] mb-4 font-light">
          {count}
          {suffix && <span className="text-2xl ml-1">{suffix}</span>}
        </div>
        
        <div className="text-[#AAB3CF] text-sm uppercase tracking-widest leading-relaxed">
          {label}
        </div>

        <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/20 to-transparent group-hover:via-[#C5A85C]/40 transition-colors duration-500" />
      </div>
    </AnimatedSection>
  );
}

export default function FoundationSnapshot() {
  return (
    <section className="section-spacing bg-[#1C2340] relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C5A85C]/30 to-transparent" />

      <div className="container-premium">
        <AnimatedSection className="sm:text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Dr. Kumar Foundation USA
          </h2>
          <div className="gold-divider long sm:mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Dr. Ghulam Mohammad Kumar is a living spiritual guide, and the Foundation is the institutional expression of his continuing mission in knowledge, service, and ethical stewardship.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard value={years} label="Years of Legacy" suffix="+" delay={0.1} />
          <MetricCard value={12} label="Core Teaching Themes" delay={0.2} />
          <MetricCard value={7} label="Active Cultural Initiatives" suffix="+" delay={0.3} />
          <MetricCard value={150} label="Research Documents" suffix="+" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
