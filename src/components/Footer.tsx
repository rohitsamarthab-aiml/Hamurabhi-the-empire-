import Link from "next/link";
import { Gamepad2, Github, Twitter, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-nexus-surface border-t border-nexus-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-display)] gradient-text">
                NEXUS
              </span>
            </Link>
            <p className="text-sm text-nexus-text-muted leading-relaxed">
              Your premium gaming destination. Discover, play, and download
              the best games all in one place.
            </p>
            <div className="flex gap-3">
              {[Twitter, Youtube, Github].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg bg-nexus-card border border-nexus-border flex items-center justify-center text-nexus-text-muted hover:text-nexus-purple-light hover:border-nexus-purple/40 transition-all"
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold text-sm text-nexus-text uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/explore", label: "Browse Games" },
                { href: "/membership", label: "Membership" },
                { href: "/library", label: "My Library" },
                { href: "/profile", label: "Profile" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-nexus-text-muted hover:text-nexus-purple-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-sm text-nexus-text uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {["Action", "Adventure", "RPG", "Strategy", "Puzzle", "Racing"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/explore?category=${cat}`}
                      className="text-sm text-nexus-text-muted hover:text-nexus-purple-light transition-colors"
                    >
                      {cat}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-sm text-nexus-text uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-nexus-text-muted mb-4">
              Get the latest game releases and platform updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-nexus-card border border-nexus-border text-sm text-nexus-text placeholder:text-nexus-text-dim focus:border-nexus-purple/50 focus:outline-none transition-colors"
                aria-label="Email for newsletter"
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white text-sm font-medium hover:opacity-90 transition-opacity">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-nexus-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-nexus-text-dim">
            © {new Date().getFullYear()} Nexus Gaming. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <button
                key={item}
                className="text-xs text-nexus-text-dim hover:text-nexus-text-muted transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
