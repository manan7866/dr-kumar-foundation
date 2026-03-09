"use client"
import { useState, useEffect } from "react"

interface Region {
  id: string;
  continent: string;
  name: string;
  countries: string;
}

export default function Accordion() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [open, setOpen] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/global-presence/regions')
      .then(res => res.json())
      .then(data => {
        setRegions(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch regions:', err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {regions.map((region, index) => {
        const countries = JSON.parse(region.countries);
        return (
          <div key={region.id} className="border-b border-[#C5A85C]/10 pb-4">
            <button
              onClick={() => setOpen(open === index ? null : index)}
              className="w-full flex justify-between items-center text-left text-lg text-white hover:text-[#C5A85C] transition-colors"
            >
              <span>{region.name}</span>
              <span className="text-[#C5A85C]">{open === index ? "−" : "+"}</span>
            </button>

            {open === index && (
              <ul className="mt-4 text-[#AAB3CF] space-y-2">
                {countries.map((country: string, i: number) => (
                  <li key={i}>• {country}</li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}