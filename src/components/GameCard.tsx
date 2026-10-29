"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Star, Play, Download, Crown, Globe } from "lucide-react";
import type { Game } from "@/data/games";

interface GameCardProps {
  game: Game;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function GameCard({ game, size = "md", className = "" }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState(false);

  const heights = {
    sm: "h-40",
    md: "h-56",
    lg: "h-72",
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Smooth tilt angles
    const rotX = (y - 0.5) * -16;
    const rotY = (x - 0.5) * 16;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: x * 100,
      y: y * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 ${className}`}
    >
      <Link
        href={`/games/${game.slug}`}
        prefetch={false}
        style={{
          transform: isHovered
            ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.035, 1.035, 1.035)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transition: isHovered
            ? "transform 0.1s ease-out, box-shadow 0.2s ease-out, border-color 0.2s"
            : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s, border-color 0.5s",
        }}
        className={`group relative block rounded-2xl overflow-hidden bg-nexus-card border transition-all duration-300 preserve-3d ${
          isHovered
            ? "border-nexus-purple/60 shadow-2xl shadow-nexus-purple/25"
            : "border-nexus-border hover:border-nexus-border-light shadow-lg shadow-black/40"
        }`}
      >
        {/* Real-time Dynamic Specular Glare */}
        <div
          className="absolute inset-0 z-30 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 35%, rgba(0, 0, 0, 0) 70%)`,
          }}
        />

        {/* Ambient 3D Neon Backlight */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10"
          style={{
            background:
              game.deliveryMode === "browser"
                ? "linear-gradient(135deg, rgba(34,211,238,0.3), rgba(139,92,246,0.3))"
                : "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(236,72,153,0.3))",
          }}
        />

        {/* Cover Art Layer */}
        <div
          className={`${heights[size]} relative overflow-hidden preserve-3d`}
          style={{
            background: game.coverGradient,
            transform: isHovered ? "translateZ(12px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          {/* Subtle grid pattern inside cover */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Action icon popup on hover (Z-depth 40px) */}
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-all duration-300 flex items-center justify-center">
            <div
              style={{
                transform: isHovered ? "translateZ(42px) scale(1)" : "translateZ(10px) scale(0.7)",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="opacity-0 group-hover:opacity-100"
            >
              {game.deliveryMode === "browser" ? (
                <div className="w-14 h-14 rounded-full bg-nexus-cyan/95 flex items-center justify-center shadow-lg shadow-nexus-cyan/50 glow-cyan">
                  <Play className="w-6 h-6 text-black ml-0.5 fill-black" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-nexus-purple to-nexus-cyan flex items-center justify-center shadow-lg shadow-nexus-purple/50 glow-purple">
                  <Download className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Floating Badges Layer (Z-depth 28px) */}
          <div
            className="absolute top-3 left-3 flex gap-2"
            style={{
              transform: isHovered ? "translateZ(28px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            {game.accessTier === "premium" && (
              <span className="px-2.5 py-0.5 rounded-full bg-nexus-amber/90 backdrop-blur-md text-[11px] font-bold text-black flex items-center gap-1 shadow-md">
                <Crown className="w-3 h-3 fill-black" /> Premium
              </span>
            )}
            {game.accessTier === "free" && (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-[11px] font-bold text-white shadow-md">
                Free
              </span>
            )}
          </div>

          <div
            className="absolute top-3 right-3"
            style={{
              transform: isHovered ? "translateZ(28px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          >
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-medium text-nexus-text flex items-center gap-1 border border-white/10 shadow-md">
              {game.deliveryMode === "browser" ? (
                <>
                  <Globe className="w-3 h-3 text-nexus-cyan" /> Browser
                </>
              ) : (
                <>
                  <Download className="w-3 h-3 text-nexus-purple-light" /> PC
                </>
              )}
            </span>
          </div>

          {/* Bottom vignette */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-nexus-card to-transparent" />
        </div>

        {/* Info Content Layer (Z-depth 20px) */}
        <div
          className="p-4 relative bg-nexus-card"
          style={{
            transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <h3 className="font-bold text-base text-nexus-text group-hover:text-nexus-cyan transition-colors line-clamp-1 font-[family-name:var(--font-display)]">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-nexus-text-muted line-clamp-2 leading-relaxed">
            {game.description}
          </p>

          <div className="mt-3.5 flex items-center justify-between pt-2 border-t border-nexus-border/60">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-nexus-amber fill-nexus-amber" />
              <span className="text-xs font-bold text-white tracking-wide">
                {game.rating.toFixed(1)}
              </span>
            </div>

            <div className="flex gap-1">
              {game.categories.slice(0, 2).map((cat) => (
                <span
                  key={cat}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-nexus-surface border border-nexus-border text-nexus-text-muted group-hover:text-nexus-purple-light group-hover:border-nexus-purple/30 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
