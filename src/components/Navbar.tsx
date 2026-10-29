"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Gamepad2,
  Search,
  Menu,
  X,
  User,
  Library,
  Crown,
  LayoutDashboard,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/membership", label: "Membership" },
  { href: "/library", label: "Library" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Nexus Gaming Home"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold font-[family-name:var(--font-display)] gradient-text hidden sm:block">
              NEXUS
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "bg-nexus-purple/20 text-nexus-purple-light"
                    : "text-nexus-text-muted hover:text-nexus-text hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/explore"
              className="p-2 rounded-lg text-nexus-text-muted hover:text-nexus-cyan hover:bg-white/5 transition-all"
              aria-label="Search games"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/admin"
              className="p-2 rounded-lg text-nexus-text-muted hover:text-nexus-amber hover:bg-white/5 transition-all"
              aria-label="Admin dashboard"
            >
              <LayoutDashboard className="w-5 h-5" />
            </Link>
            <Link
              href="/profile"
              className="p-2 rounded-lg text-nexus-text-muted hover:text-nexus-purple-light hover:bg-white/5 transition-all"
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-nexus-text-muted hover:text-nexus-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "bg-nexus-purple/20 text-nexus-purple-light"
                      : "text-nexus-text-muted hover:text-nexus-text hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <hr className="border-nexus-border my-2" />
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-nexus-text-muted hover:text-nexus-text hover:bg-white/5 flex items-center gap-2"
              >
                <User className="w-4 h-4" /> Profile
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-lg text-sm font-medium text-nexus-text-muted hover:text-nexus-text hover:bg-white/5 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Admin
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-2 mx-4 px-4 py-3 rounded-lg text-sm font-medium text-center bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
