"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import AuthModal from "./auth/AuthModal";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About the Foundation", href: "/foundation" },
      { label: "Dr. Kumar's Life & Work", href: "/life-and-work" },
      { label: "Governance", href: "/about/governance" },
      { label: "Visit the Darbar", href: "/about/visit-the-darbar" },
      { label: "Official Public Notice", href: "/about/official-public-notice" },
    ],
  },
  {
    label: "Teachings",
    href: "/core-principles",
    children: [
      { label: "Core Principles", href: "/core-principles" },
      { label: "Self-Awareness", href: "/core-principles/self-awareness" },
      { label: "Inner Discipline", href: "/core-principles/inner-discipline" },
      { label: "Ethical Conduct", href: "/core-principles/ethical-conduct" },
      { label: "Quotes", href: "/teachings/quotes" },
    ],
  },
  {
    label: "Legacy Projects",
    href: "/legacy-projects",
    children: [
      { label: "Healing Initiatives", href: "/legacy-projects/healing" },
      { label: "Environmental Programs", href: "/legacy-projects/environment" },
      { label: "Youth Engagement", href: "/legacy-projects/youth" },
      { label: "Sufi Music", href: "/legacy-projects/sufi-music" },
      { label: "Sufi Ecommerce", href: "/legacy-projects/sufi-ecommerce" },
      { label: "Sufi Science", href: "/legacy-projects/sufi-science" },
      { label: "Interfaith Program", href: "/legacy-projects/interfaith-program" },
    ],
  },
  { label: "The Circle", href: "/the-circle" },
  // { label: "Global Presence", href: "/global-presence" },
  { label: "Contact", href: "/contact" },
];

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"signin" | "signup">("signin");
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check for user session on mount
  useEffect(() => {
    const checkSession = async () => {
      // First check localStorage
      const localSession = localStorage.getItem("user_session");
      if (localSession) {
        try {
          const userData = JSON.parse(localSession); if (userData && userData.id) { setUser(userData); }
          return;
        } catch {
          localStorage.removeItem("user_session");
        }
      }
      
      // Then check server session
      try {
        const response = await fetch("/api/auth/session");
        if (response.ok) { const userData = await response.json(); if (userData && userData.id) { setUser(userData);
          localStorage.setItem("user_session", JSON.stringify(userData)); } }
      } catch {
        // Not logged in
      }
    };
    checkSession();
  }, []);

  const handleAvatarClick = () => {
    if (user) {
      setIsUserMenuOpen(!isUserMenuOpen);
    } else { setAuthInitialTab("signin");
      setIsAuthModalOpen(true);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear localStorage
      localStorage.removeItem("user_session");
      setUser(undefined);
      // Force reload to clear all component states
      window.location.reload();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#1C2340]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4 group">
              {/* <div className="w-12 h-12 border border-[#C5A85C]/40 flex items-center justify-center transition-all duration-300 group-hover:border-[#C5A85C]">
                <span className="text-[#C5A85C] font-serif text-2xl font-bold">D</span>
                
              </div> */}
              <Image alt="LOGO" height={50} width={50} src="/dkf_logo_21.png" className="pt-2" />
              <div className="hidden md:block">
                <span className="text-white font-serif text-lg tracking-wide block">
                Dr. Kumar Foundation
                </span>
                <span className="text-[#AAB3CF] text-xs tracking-widest uppercase block">
                Global Circle - USA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex text-[16px] items-center space-x-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <>
                      <button className="flex items-center space-x-1 px-4 py-2 text-[16px] text-[#F1F3F8] hover:text-[#C5A85C] transition-colors">
                        <span>{item.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 pt-2"
                          >
                            <div className="bg-[#1C2340]/98 backdrop-blur-md border border-[#C5A85C]/20 rounded-lg shadow-xl min-w-[240px] overflow-hidden">
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  className="block px-5 py-3 text-[16px] text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-all border-l-2 border-transparent hover:border-[#C5A85C]"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-[16px] text-[#F1F3F8] hover:text-[#C5A85C] transition-colors relative group"
                    >
                      <span>{item.label}</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1px] bg-[#C5A85C] w-0 group-hover:w-3/4 transition-all duration-300" />
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side: User Auth & Avatar */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              {/* User Auth Section */}
              {user ? (
                <>
                  {/* Notification Bell - Hidden on small mobile, shown on md+ */}
                  {notifications > 0 && (
                    <button className="relative p-2 text-[#F1F3F8] hover:text-[#C5A85C] transition-colors hidden md:block">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications > 9 ? '9+' : notifications}
                      </span>
                    </button>
                  )}

                  {/* User Info - Avatar + Name - Desktop */}
                  <div className="hidden lg:flex items-center space-x-3">
                    <button
                      onClick={handleAvatarClick}
                      className="relative w-10 h-10 rounded-full border border-[#C5A85C]/40 hover:border-[#C5A85C] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,168,92,0.3)] overflow-hidden bg-[#1C2340]"
                    >
                      {user?.avatar_url ? (
                        <img
                          src={user.avatar_url}
                          alt={user?.full_name || "User"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-[#C5A85C] font-serif text-sm font-bold">
                            {user?.full_name?.split(" ")?.map(n => n[0])?.join("")?.toUpperCase()?.slice(0, 2)}
                          </span>
                        </div>
                      )}
                    </button>
                    <span className="text-[#F1F3F8] text-sm font-medium">{user?.full_name || "User"}</span>
                  </div>

                  {/* Mobile/Tablet Avatar Only */}
                  <button
                    onClick={handleAvatarClick}
                    className="lg:hidden relative w-10 h-10 rounded-full border border-[#C5A85C]/40 hover:border-[#C5A85C] transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,168,92,0.3)] overflow-hidden bg-[#1C2340] flex-shrink-0"
                  >
                    {user?.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user?.full_name || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#C5A85C] font-serif text-sm font-bold">
                          {user?.full_name?.split(" ")?.map(n => n[0])?.join("")?.toUpperCase()?.slice(0, 2)}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Mobile Notification Badge on Avatar */}
                  {notifications > 0 && (
                    <span className="lg:hidden absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center flex-shrink-0">
                      {notifications > 9 ? '9+' : notifications}
                    </span>
                  )}

                  {/* User Dropdown Menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <>
                        {/* Backdrop for mobile */}
                        <div 
                          className="fixed inset-0 z-[999] lg:hidden"
                          onClick={() => setIsUserMenuOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute  top-full mt-2 pt-2 lg:z-[1001] z-[1000]"
                        >
                          <div className="bg-[#1C2340]/98 backdrop-blur-md border border-[#C5A85C]/20 rounded-lg shadow-xl min-w-[200px] overflow-hidden">
                          {/* User Info */}
                          <div className="px-4 py-3 border-b border-[#C5A85C]/10">
                            <p className="text-white font-medium text-sm">{user?.full_name}</p>
                            <p className="text-[#AAB3CF] text-xs">{user?.email}</p>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Dashboard
                            </Link>
                            <Link
                              href="/profile"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Profile Settings
                            </Link>
                            <Link
                              href="/security"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                              Security
                            </Link>
                            <Link
                              href="/activity"
                              className="flex items-center gap-3 px-4 py-2 text-sm text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              My Activity
                            </Link>
                          </div>

                          {/* Logout */}
                          <div className="py-2 border-t border-[#C5A85C]/10">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Logout
                            </button>
                          </div>
                        </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                /* Sign In Button for Logged Out Users */
                <button
                  onClick={() => {
                    setAuthInitialTab("signin");
                    setIsAuthModalOpen(true);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-0.5 text-sm"
                >
                  Sign In
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-[#F1F3F8] hover:text-[#C5A85C] transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-md bg-[#1C2340] z-50 overflow-y-auto"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#C5A85C]/20">
                <span className="text-white font-serif text-xl">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[#F1F3F8] hover:text-[#C5A85C] transition-colors"
                  aria-label="Close menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <nav className="p-6 space-y-2">
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.label}
                    item={item}
                    onClose={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authInitialTab}
      />
    </>
  );
}

// Mobile Nav Item Component
function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (item.children) {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] rounded-lg transition-all"
        >
          <span>{item.label}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {item.children.map((child) => (
              <Link
                key={child.label}
                href={child.href}
                onClick={onClose}
                className="block px-4 py-2 text-sm text-[#AAB3CF] hover:text-[#C5A85C] transition-colors"
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className="block px-4 py-3 text-[#F1F3F8] hover:bg-[#C5A85C]/10 hover:text-[#C5A85C] rounded-lg transition-all"
    >
      {item.label}
    </Link>
  );
}
