"use client";

import Link from "next/link";
import {
  Play,
  Download,
  ChevronRight,
  Crown,
  Zap,
  Shield,
  Gamepad2,
  Star,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { GameCard } from "@/components/GameCard";
import { Hero3D } from "@/components/Hero3D";
import {
  games,
  featuredGames,
  trendingGames,
  newGames,
  allCategories,
} from "@/data/games";

/* ─── Category icons mapping ─────────────────────────── */
const categoryIcons: Record<string, string> = {
  Action: "⚔️",
  Adventure: "🗺️",
  RPG: "🧙",
  Strategy: "♟️",
  Puzzle: "🧩",
  Racing: "🏎️",
  Sports: "⚽",
  Simulation: "🏗️",
  Horror: "👻",
  Multiplayer: "👥",
  Indie: "💎",
  Shooter: "🎯",
};

export default function HomePage() {
  const heroGame = featuredGames[0];

  return (
    <div className="pt-16">
      {/* ─── Hero Section ──────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Ambient Gradient Background */}
        <div
          className="absolute inset-0"
          style={{ background: heroGame.heroGradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-bg via-nexus-bg/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 animate-fadeInUp">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-nexus-purple/20 text-nexus-purple-light text-xs sm:text-sm font-semibold border border-nexus-purple/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-nexus-cyan" />
                  Featured Showcase
                </span>
                <span className="px-3 py-1 rounded-full bg-nexus-amber/20 text-nexus-amber text-xs sm:text-sm font-semibold border border-nexus-amber/30 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 fill-nexus-amber" />
                  Premium Access
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-[family-name:var(--font-display)] leading-[1.08] tracking-tight text-white">
                <span className="gradient-text">{heroGame.title}</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-nexus-text-muted leading-relaxed max-w-xl">
                {heroGame.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-nexus-text-muted">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <Star className="w-4 h-4 text-nexus-amber fill-nexus-amber" />
                  {heroGame.rating} Rating
                </span>
                <span>•</span>
                <span className="text-nexus-cyan">{heroGame.categories.join(", ")}</span>
                <span>•</span>
                <span>{heroGame.players}</span>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`/games/${heroGame.slug}`}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white font-bold text-base hover:opacity-95 transition-all shadow-xl shadow-nexus-purple/30 glow-purple flex items-center gap-2.5 hover:scale-[1.02]"
                >
                  {heroGame.deliveryMode === "browser" ? (
                    <>
                      <Play className="w-5 h-5 fill-white" /> Play Instantly
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" /> Download PC
                    </>
                  )}
                </Link>
                <Link
                  href={`/games/${heroGame.slug}`}
                  className="px-7 py-3.5 rounded-xl border border-nexus-border glass text-nexus-text font-semibold text-base hover:bg-white/5 hover:border-nexus-purple/50 transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  Explore Details <ChevronRight className="w-4 h-4 text-nexus-cyan" />
                </Link>
              </div>
            </div>

            {/* Right 3D Interactive Holographic Showcase */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>


      {/* ─── Featured Games ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
              <Sparkles className="w-6 h-6 inline mr-2 text-nexus-purple" />
              Featured Games
            </h2>
            <p className="mt-1 text-nexus-text-muted">
              Hand-picked titles we love
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm text-nexus-purple-light hover:text-nexus-purple flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {featuredGames.map((game) => (
            <GameCard key={game.id} game={game} size="lg" />
          ))}
        </div>
      </section>

      {/* ─── Trending Games ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
              <TrendingUp className="w-6 h-6 inline mr-2 text-nexus-cyan" />
              Trending Now
            </h2>
            <p className="mt-1 text-nexus-text-muted">
              Most popular this week
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm text-nexus-purple-light hover:text-nexus-purple flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {trendingGames.map((game) => (
            <GameCard key={game.id} game={game} size="md" />
          ))}
        </div>
      </section>

      {/* ─── Recently Added ────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
              <Zap className="w-6 h-6 inline mr-2 text-nexus-green" />
              Recently Added
            </h2>
            <p className="mt-1 text-nexus-text-muted">
              Fresh titles just dropped
            </p>
          </div>
          <Link
            href="/explore"
            className="text-sm text-nexus-purple-light hover:text-nexus-purple flex items-center gap-1 transition-colors"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {newGames.map((game) => (
            <GameCard key={game.id} game={game} size="md" />
          ))}
        </div>
      </section>

      {/* ─── Categories ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-[family-name:var(--font-display)]">
            <Gamepad2 className="w-6 h-6 inline mr-2 text-nexus-pink" />
            Browse by Category
          </h2>
          <p className="mt-1 text-nexus-text-muted">
            Find your next favourite game
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 stagger-children">
          {allCategories.map((cat) => (
            <Link
              key={cat}
              href={`/explore?category=${cat}`}
              className="group p-4 rounded-xl bg-nexus-card border border-nexus-border hover:border-nexus-purple/40 hover:bg-nexus-card-hover transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-2">{categoryIcons[cat]}</div>
              <span className="text-sm font-medium text-nexus-text-muted group-hover:text-nexus-purple-light transition-colors">
                {cat}
              </span>
              <div className="mt-1 text-xs text-nexus-text-dim">
                {games.filter((g) => g.categories.includes(cat)).length} games
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Premium CTA ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-nexus-purple-dark via-nexus-purple to-nexus-cyan opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoLTJ2LTZoMnptMC0zMHY2aC0yVjRoMnptMjQgMjR2Nmgtc3YtNmgxem0tNjAgMHY2aC0ydi02aDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

          <div className="relative px-8 py-16 sm:px-16 text-center">
            <Crown className="w-12 h-12 text-nexus-amber mx-auto mb-4 animate-float" />
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-white">
              Unlock Premium Gaming
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Get access to all premium titles, PC downloads, exclusive
              content, and more. Try{" "}
              <span className="font-bold text-white">
                3 months free
              </span>{" "}
              — no credit card required.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/membership"
                className="px-8 py-3 rounded-xl bg-white text-nexus-purple-dark font-bold text-lg hover:bg-white/90 transition-all flex items-center gap-2"
              >
                <Crown className="w-5 h-5" /> Start Free Trial
              </Link>
              <Link
                href="/membership"
                className="px-8 py-3 rounded-xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all"
              >
                Compare Plans
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-white/60">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4" /> Cancel anytime
              </span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4" /> Instant access
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4" /> 100+ premium games
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
