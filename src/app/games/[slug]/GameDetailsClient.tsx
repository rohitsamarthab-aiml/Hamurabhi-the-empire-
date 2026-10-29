"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Play,
  Download,
  Star,
  Crown,
  Globe,
  Users,
  Calendar,
  HardDrive,
  Monitor,
  Cpu,
  MemoryStick,
  ChevronRight,
} from "lucide-react";
import type { Game } from "@/data/games";

interface Props {
  game: Game;
}

export default function GameDetailsClient({ game }: Props) {
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <div className="pt-16 pb-16 min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: game.heroGradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg via-nexus-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-bg/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 relative z-10">
        {/* Back button */}
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-sm text-nexus-text-muted hover:text-nexus-text mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Games
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8 animate-fadeInUp">
            {/* Title area */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                {game.accessTier === "premium" ? (
                  <span className="px-3 py-1 rounded-lg bg-nexus-amber/20 text-nexus-amber text-sm font-semibold flex items-center gap-1 border border-nexus-amber/30">
                    <Crown className="w-3.5 h-3.5" /> Premium
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-lg bg-nexus-green/20 text-nexus-green text-sm font-semibold border border-nexus-green/30">
                    Free
                  </span>
                )}
                <span className="px-3 py-1 rounded-lg bg-white/5 text-nexus-text-muted text-sm flex items-center gap-1 border border-nexus-border">
                  {game.deliveryMode === "browser" ? (
                    <>
                      <Globe className="w-3.5 h-3.5" /> Browser
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" /> PC Download
                    </>
                  )}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)]">
                {game.title}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-nexus-text-muted">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-nexus-amber fill-nexus-amber" />
                  <span className="text-nexus-text font-medium">
                    {game.rating}
                  </span>
                  / 5
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {game.players}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />{" "}
                  {new Date(game.releaseDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <div
                className="rounded-xl overflow-hidden h-64 sm:h-80 mb-3"
                style={{
                  background: game.screenshots[activeScreenshot]?.gradient,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm">
                  {game.screenshots[activeScreenshot]?.alt}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {game.screenshots.map((ss, i) => (
                  <button
                    key={ss.id}
                    onClick={() => setActiveScreenshot(i)}
                    className={`rounded-lg overflow-hidden h-16 sm:h-20 transition-all ${
                      i === activeScreenshot
                        ? "ring-2 ring-nexus-purple scale-105"
                        : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ background: ss.gradient }}
                    aria-label={`View screenshot: ${ss.alt}`}
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                About This Game
              </h2>
              <p className="text-nexus-text-muted leading-relaxed">
                {game.longDescription}
              </p>
            </div>

            {/* Genres */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {game.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/explore?category=${cat}`}
                    className="px-4 py-2 rounded-lg bg-nexus-card border border-nexus-border text-sm text-nexus-text-muted hover:text-nexus-purple-light hover:border-nexus-purple/40 transition-all"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* System requirements (for download games) */}
            {game.systemRequirements && (
              <div>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                  System Requirements
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: Monitor,
                      label: "OS",
                      value: game.systemRequirements.os,
                    },
                    {
                      icon: Cpu,
                      label: "Processor",
                      value: game.systemRequirements.processor,
                    },
                    {
                      icon: MemoryStick,
                      label: "Memory",
                      value: game.systemRequirements.memory,
                    },
                    {
                      icon: Monitor,
                      label: "Graphics",
                      value: game.systemRequirements.graphics,
                    },
                    {
                      icon: HardDrive,
                      label: "Storage",
                      value: game.systemRequirements.storage,
                    },
                  ].map((req) => (
                    <div
                      key={req.label}
                      className="p-4 rounded-lg bg-nexus-card border border-nexus-border"
                    >
                      <div className="flex items-center gap-2 text-nexus-text-dim text-xs uppercase tracking-wider mb-1">
                        <req.icon className="w-3.5 h-3.5" />
                        {req.label}
                      </div>
                      <div className="text-sm text-nexus-text">{req.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            {/* Cover */}
            <div
              className="rounded-xl h-48 overflow-hidden"
              style={{ background: game.coverGradient }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-white/20">
                  {game.title}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              {game.deliveryMode === "browser" ? (
                <Link
                  href={`/play/${game.slug}`}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-nexus-cyan-dark to-nexus-cyan text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-cyan"
                >
                  <Play className="w-5 h-5" /> Play Now
                </Link>
              ) : (
                <Link
                  href={`/download/${game.slug}`}
                  className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-nexus-purple-dark to-nexus-purple text-white font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all glow-purple"
                >
                  <Download className="w-5 h-5" /> Download
                </Link>
              )}
            </div>

            {/* Info card */}
            <div className="rounded-xl bg-nexus-card border border-nexus-border p-4 space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider text-nexus-text-muted">
                Game Info
              </h3>
              {[
                { label: "Developer", value: game.developer },
                { label: "Publisher", value: game.publisher },
                { label: "Version", value: game.version },
                { label: "Size", value: game.fileSize },
                {
                  label: "Released",
                  value: new Date(game.releaseDate).toLocaleDateString(),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex justify-between items-center"
                >
                  <span className="text-sm text-nexus-text-dim">
                    {item.label}
                  </span>
                  <span className="text-sm text-nexus-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
