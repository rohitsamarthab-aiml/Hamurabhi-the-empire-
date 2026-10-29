"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
} from "lucide-react";
import { GameCard } from "@/components/GameCard";
import {
  filterGames,
  allCategories,
  type GameCategory,
  type AccessTier,
  type DeliveryMode,
} from "@/data/games";

type SortBy = "title" | "rating" | "releaseDate";

function ExploreContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as GameCategory | null;

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<GameCategory | "">(
    initialCategory || ""
  );
  const [accessTier, setAccessTier] = useState<AccessTier | "">("");
  const [deliveryMode, setDeliveryMode] = useState<DeliveryMode | "">("");
  const [sortBy, setSortBy] = useState<SortBy>("rating");
  const [showFilters, setShowFilters] = useState(false);

  // Update category when URL param changes
  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const filtered = useMemo(
    () =>
      filterGames({
        query: query || undefined,
        category: category || undefined,
        accessTier: (accessTier as AccessTier) || undefined,
        deliveryMode: (deliveryMode as DeliveryMode) || undefined,
        sortBy,
      }),
    [query, category, accessTier, deliveryMode, sortBy]
  );

  const activeFilterCount = [category, accessTier, deliveryMode].filter(
    Boolean
  ).length;

  const clearFilters = () => {
    setCategory("");
    setAccessTier("");
    setDeliveryMode("");
    setQuery("");
  };

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeInUp">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-display)]">
            Explore <span className="gradient-text">Games</span>
          </h1>
          <p className="mt-2 text-nexus-text-muted">
            Discover your next favourite game from our catalogue
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-8 space-y-4 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          <div className="flex gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                type="text"
                placeholder="Search games, genres, developers..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-nexus-card border border-nexus-border text-nexus-text placeholder:text-nexus-text-dim focus:border-nexus-purple/50 focus:outline-none transition-colors"
                aria-label="Search games"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-nexus-text-dim hover:text-nexus-text"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl border flex items-center gap-2 font-medium text-sm transition-all ${
                showFilters || activeFilterCount > 0
                  ? "bg-nexus-purple/20 border-nexus-purple/40 text-nexus-purple-light"
                  : "bg-nexus-card border-nexus-border text-nexus-text-muted hover:border-nexus-border-light"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-nexus-purple text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter panel */}
          {showFilters && (
            <div className="p-4 rounded-xl bg-nexus-card border border-nexus-border animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-nexus-text-muted uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value as GameCategory | "")
                      }
                      className="w-full px-3 py-2 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text appearance-none cursor-pointer focus:border-nexus-purple/50 focus:outline-none"
                    >
                      <option value="">All Categories</option>
                      {allCategories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-dim pointer-events-none" />
                  </div>
                </div>

                {/* Access */}
                <div>
                  <label className="block text-xs font-medium text-nexus-text-muted uppercase tracking-wider mb-2">
                    Access
                  </label>
                  <div className="relative">
                    <select
                      value={accessTier}
                      onChange={(e) =>
                        setAccessTier(e.target.value as AccessTier | "")
                      }
                      className="w-full px-3 py-2 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text appearance-none cursor-pointer focus:border-nexus-purple/50 focus:outline-none"
                    >
                      <option value="">All</option>
                      <option value="free">Free</option>
                      <option value="premium">Premium</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-dim pointer-events-none" />
                  </div>
                </div>

                {/* Platform */}
                <div>
                  <label className="block text-xs font-medium text-nexus-text-muted uppercase tracking-wider mb-2">
                    Platform
                  </label>
                  <div className="relative">
                    <select
                      value={deliveryMode}
                      onChange={(e) =>
                        setDeliveryMode(e.target.value as DeliveryMode | "")
                      }
                      className="w-full px-3 py-2 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text appearance-none cursor-pointer focus:border-nexus-purple/50 focus:outline-none"
                    >
                      <option value="">All Platforms</option>
                      <option value="browser">Browser</option>
                      <option value="download">PC Download</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-dim pointer-events-none" />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-xs font-medium text-nexus-text-muted uppercase tracking-wider mb-2">
                    Sort By
                  </label>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortBy)}
                      className="w-full px-3 py-2 rounded-lg bg-nexus-surface border border-nexus-border text-sm text-nexus-text appearance-none cursor-pointer focus:border-nexus-purple/50 focus:outline-none"
                    >
                      <option value="rating">Highest Rated</option>
                      <option value="releaseDate">Newest First</option>
                      <option value="title">A – Z</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nexus-text-dim pointer-events-none" />
                  </div>
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-nexus-purple-light hover:text-nexus-purple transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-nexus-text-muted">
            Showing{" "}
            <span className="text-nexus-text font-medium">
              {filtered.length}
            </span>{" "}
            {filtered.length === 1 ? "game" : "games"}
          </p>
        </div>

        {/* Game grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stagger-children">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-nexus-text-dim mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-nexus-text">
              No games found
            </h3>
            <p className="mt-2 text-nexus-text-muted">
              Try adjusting your search or filters
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 rounded-lg bg-nexus-purple/20 text-nexus-purple-light hover:bg-nexus-purple/30 transition-colors text-sm font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-nexus-purple border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ExploreContent />
    </Suspense>
  );
}

