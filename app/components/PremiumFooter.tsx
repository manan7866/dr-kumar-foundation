"use client";

import Image from "next/image";
import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const foundationLinks: FooterLink[] = [
  { label: "About", href: "/foundation" },
  { label: "Governance", href: "/foundation#governance" },
  { label: "Mission", href: "/foundation#mission" },
  { label: "Objectives", href: "/foundation#objectives" },
  
];

const programsLinks: FooterLink[] = [
  { label: "Healing Initiatives", href: "/legacy-projects/healing" },
  { label: "Environmental", href: "/legacy-projects/environment" },
  { label: "Youth Engagement", href: "/legacy-projects/youth" },
  { label: "Interfaith", href: "/legacy-projects/interfaith-program" },
];

const teachingsLinks: FooterLink[] = [
  { label: "Core Principles", href: "/core-principles" },
  { label: "Self-Awareness", href: "/core-principles/self-awareness" },
  { label: "Inner Discipline", href: "/core-principles/inner-discipline" },
  { label: "Ethical Conduct", href: "/core-principles/ethical-conduct" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F1326] border-t border-[#C5A85C]/20">
      {/* Main Footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Column 1 - Foundation Identity */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              {/* <div className="w-10 h-10 border border-[#C5A85C]/40 flex items-center justify-center">
                <span className="text-[#C5A85C] font-serif text-xl font-bold">D</span>
              </div> */}
              <Image alt="LOGO" height={50} width={50} src="/dkf_logo_21.png" className="pt-2" />
              <div>
                <span className="text-white font-serif text-base block">
                  Dr.  Kumar
                </span>
                <span className="text-[#6B7299] text-xs uppercase tracking-widest block">
                Foundation - USA
                </span>
              </div>
            </Link>

            <p className="text-[#AAB3CF] text-sm leading-relaxed mb-6 max-w-sm">
            Dr. Kumar Foundation USA preserves a living spiritual and institutional mission through disciplined documentation, ethical stewardship, research, and structured participation.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 text-[#AAB3CF]">
                <svg className="w-4 h-4 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@drkumarfoundation.org" className="hover:text-[#C5A85C] transition-colors">
                info@dkf.sufisciencecenter.info
                </a>
              </div>
              <div className="flex items-center gap-3 text-[#AAB3CF]">
                <svg className="w-4 h-4 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Virginia, USA</span>
                <svg className="w-4 h-4 text-[#C5A85C]/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>California, USA</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.facebook.com/share/g/17u5dfeu1C/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C5A85C]/10 rounded-lg flex items-center justify-center text-[#C5A85C] hover:bg-[#C5A85C] hover:text-white transition-all duration-300"
                aria-label="Facebook Group"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 - Foundation */}
          <div >
            <h4 className="text-white font-serif  text-sm uppercase tracking-wider mb-6">
              Foundation
            </h4>
            <nav className="space-y-3 w-max">
              {foundationLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[#AAB3CF] text-sm hover:text-[#C5A85C] transition-colors relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
            
          </div>

          {/* Column 3 - Programs */}
          <div >
            <h4 className="text-white font-serif text-sm uppercase tracking-wider mb-6">
              Programs
            </h4>
            <nav className="space-y-3 w-max">
              {programsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[#AAB3CF] text-sm hover:text-[#C5A85C] transition-colors relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
            
          </div>

          {/* Column 4 - Research */}
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-wider mb-6">
              Teachings
            </h4>
            <nav className="space-y-3 w-max">
              {teachingsLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[#AAB3CF] text-sm hover:text-[#C5A85C] transition-colors relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </nav>
            
          </div>
        </div>
      </div>

      {/* Associates Platforms Section */}
      <div className="border-t border-[#C5A85C]/10">
        <div className="container-premium py-12">
          <div className="text-center mb-8">
            <h4 className="text-white font-serif text-xl mb-2">Dr. Kumar's Connected Platforms</h4>
            
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Sufi Science Center USA */}
            <a
              href="https://sufisciencecenter.info"
              target="_blank"
              rel="noopener noreferrer"
              className="group  border border-[#C5A85C]/15 rounded-xl p-6 hover:border-[#C5A85C]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h5 className="text-white font-serif text-base mb-2 group-hover:text-[#C5A85C] transition-colors">
                Sufi Science Center USA 
              </h5>
                
              </div>
              
              <p className="text-[#AAB3CF] text-sm">
                Research and documentation of Sufi philosophy, consciousness studies, and spiritual ecology.
              </p>
            </a>

            {/* SufiPulse */}
            <a
              href="https://sufipulse.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group  border border-[#C5A85C]/15 rounded-xl p-6 hover:border-[#C5A85C]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h5 className="text-white font-serif text-base mb-2 group-hover:text-[#C5A85C] transition-colors">
                SufiPulse 
              </h5>
              </div>
              
              <p className="text-[#AAB3CF] text-sm">
                Digital media platform preserving and sharing Sufi music, devotional content, and spiritual teachings.
              </p>
            </a>

            {/* Purple Soul Collective */}
            <a
              href="https://purplesoul.co"
              target="_blank"
              rel="noopener noreferrer"
              className="group  border border-[#C5A85C]/15 rounded-xl p-6 hover:border-[#C5A85C]/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h5 className="text-white font-serif text-base mb-2 group-hover:text-[#C5A85C] transition-colors">
                Purple Soul Collective 
              </h5>
              </div>
              
              <p className="text-[#AAB3CF] text-sm">
                Ethical commerce platform supporting artisans, heritage crafts, and sustainable economic practices.
              </p>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#C5A85C]/10">
        <div className="container-premium py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-[#6B7299] text-sm">
              © {currentYear} Dr.Kumar Foundation. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 md:gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#6B7299] text-sm hover:text-[#C5A85C] transition-colors"
                >
                  {index === 0 ? (
                    <>
                      <span className="hidden md:inline">{link.label}</span>
                      <span className="md:hidden">Privacy</span>
                    </>
                  ) : index === 1 ? (
                    <>
                      <span className="hidden md:inline">{link.label}</span>
                      <span className="md:hidden">Terms</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden md:inline">{link.label}</span>
                      <span className="md:hidden">Cookie</span>
                    </>
                  )}
                </Link>
              ))}
            </div>
            
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-[#6B7299] text-xs">
              Website designed, developed & maintained by{" "}
              <a
                href="https://primelogicsol.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C5A85C]/60 hover:text-[#C5A85C] transition-colors inline-flex items-center gap-1"
              >
                <span>Prime Logic Solutions USA</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Development Credit */}
      
    </footer>
  );
}
