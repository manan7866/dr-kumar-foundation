"use client"
import { useState } from "react"

const regions = [
  {
    name: "South Asia",
    countries: [
      "India",
      "Pakistan",
      
    ]
  },
  {
    name: "Middle East",
    countries: [
      "Saudi Arabia",
      "United Arab Emirates",
      "Qatar",
      "Kuwait",
      "Bahrain",
      "Oman",
      "Jordan",
      "Turkey",
      "Iran"
    ]
  },
  {
    name: "Europe",
    countries: [
      "United Kingdom",
      "France",
      "Germany",
      "Italy",
      "Spain",
      "Netherlands",
      "Belgium",
      "Sweden",
      "Norway",
      "Denmark"
    ]
  },
  {
    name: "North America",
    countries: [
      "United States",
      "Canada",
      "Mexico"
    ]
  },
  {
    name: "Africa",
    countries: [
      "Morocco",
      "Algeria",
      "Tunisia",
      "Egypt",
      "Libya",
      "Mali",
      "Mauritania"
    ]
  },
  {
    name: "Southeast Asia",
    countries: [
      "Indonesia",
      "Malaysia",
      "Brunei",     
      "Singapore",
      "Thailand",
      "Philippines"
    ]
  },
  {
    name: "Central Asia",
    countries: [
      "Kazakhstan",
      "Uzbekistan",
      "Kyrgyzstan",
      "Tajikistan",
      "Turkmenistan",
      "Azerbaijan"
    ]
  },
  {
    name: "South America",
    countries: [
      "Brazil",
      "Argentina",
      "Chile",
      "Colombia",
      "Peru"
    ]
  },
  {
    name: "Oceania",
    countries: [
      "Australia",
      "New Zealand"
    ]
  }
]

export default function Accordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {regions.map((region, index) => (
        <div key={index} className="border-b border-gray-700 pb-4">
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="w-full flex justify-between text-left text-lg"
          >
            {region.name}
            <span>{open === index ? "-" : "+"}</span>
          </button>

          {open === index && (
            <ul className="mt-4 text-gray-400 space-y-2">
              {region.countries.map((country, i) => (
                <li key={i}>{country}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}