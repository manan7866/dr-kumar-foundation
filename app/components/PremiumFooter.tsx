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
  { label: "Research", href: "/research" },
];

const researchLinks: FooterLink[] = [
  { label: "Publications", href: "/research" },
  { label: "Archives", href: "/archives" },
  { label: "Core Principles", href: "/core-principles" },
  { label: "The Circle", href: "/the-circle" },
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
              A structured institutional framework established to document
              continuity, preserve disciplined orientation, and support
              responsible participation across regions.
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
          </div>

          {/* Column 2 - Foundation */}
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-wider mb-6">
              Foundation
            </h4>
            <nav className="space-y-3">
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
          <div>
            <h4 className="text-white font-serif text-sm uppercase tracking-wider mb-6">
              Programs
            </h4>
            <nav className="space-y-3">
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
              Research
            </h4>
            <nav className="space-y-3">
              {researchLinks.map((link) => (
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
