"use client";

import { useEffect, useState, useRef } from "react";
import AnimatedSection from "./AnimatedSection";

interface StatCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

function StatCard({ value, label, suffix = "", delay }: StatCardProps) {
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
        className="group relative bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.15)] hover:-translate-y-2"
      >
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

export default StatCard;
