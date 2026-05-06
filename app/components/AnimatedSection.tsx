"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.8,
  once = true,
  className = "",
  threshold = 0.1,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const animationMap = {
    "fade-up": isVisible ? "animate-fade-in-up" : "opacity-0 translate-y-[30px]",
    "fade-in": isVisible ? "animate-fade-in" : "opacity-0",
    "slide-left": isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-[30px]",
    "slide-right": isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-[30px]",
  };

  return (
    <div
      ref={ref}
      className={`${animationMap[animation]} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}
