"use client";

import Link from "next/link";
import { Library as LibraryIcon, Search, Download, Play, Gamepad2 } from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { mockUser, getGameById } from "@/data/games";
import { useState, useMemo } from "react";

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const libraryGames = useMemo(() => {
    const all = mockUser.library
      .map((id) => getGameById(id))
      .filter(Boolean) as NonNullable<ReturnType<typeof getGameById>>[];
    if (!search) return all;
    const lower = search.toLowerCase();
    return all.filter(
      (g) =>
        g.title.toLowerCase().includes(lower) ||
        g.categories.some((c) => c.toLowerCase().includes(lower))
    );
  }, [search]);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] flex items-center gap-3">
            <LibraryIcon className="w-8 h-8 text-nexus-purple" />
            My <span className="gradient-text">Library</span>
          </h1>
          <p className="mt-2 text-nexus-text-muted">
            {libraryGames.length} games in your collection
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-md animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
          <input
            type="text"
            placeholder="Search your library..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-nexus-card border border-nexus-border text-nexus-text placeholder:text-nexus-text-dim focus:border-nexus-purple/50 focus:outline-none transition-colors"
            aria-label="Search library"
          />
        </div>

        {/* Games */}
        {libraryGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {libraryGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : mockUser.library.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 className="w-16 h-16 text-nexus-text-dim mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-nexus-text">
              Your library is empty
            </h3>
            <p className="mt-2 text-nexus-text-muted">
              Games you play or download will appear here
            </p>
            <Link
              href="/explore"
              className="mt-4 inline-flex px-6 py-2 rounded-lg bg-nexus-purple/20 text-nexus-purple-light hover:bg-nexus-purple/30 transition-colors text-sm font-medium"
            >
              Browse Games
            </Link>
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-nexus-text-dim mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-nexus-text">
              No matching games
            </h3>
            <p className="mt-2 text-nexus-text-muted">
              Try a different search term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
