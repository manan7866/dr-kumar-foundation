"use client";

import dynamic from "next/dynamic";

const LazyFooter = dynamic(() => import("./PremiumFooter"), {
  loading: () => (
    <footer className="bg-[#0F1326] border-t border-[#C5A85C]/20 min-h-[400px]" />
  ),
  ssr: true,
});

export default function LazyFooterWrapper() {
  return <LazyFooter />;
}
