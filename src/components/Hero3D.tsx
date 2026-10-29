"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Play, Sparkles, Wifi, Cpu, ShieldCheck, Zap } from "lucide-react";
import { games } from "@/data/games";

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [rotX, setRotX] = useState(-8);
  const [rotY, setRotY] = useState(12);
  const [isHovered, setIsHovered] = useState(false);

  const featuredGame = games[0]; // Cyber Nexus 2088

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      // Check if mouse is roughly in the hero viewport
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const normX = (e.clientX - cx) / (window.innerWidth / 2);
      const normY = (e.clientY - cy) / (window.innerHeight / 2);

      // Smooth tilt angles
      setRotY(normX * 18);
      setRotX(-normY * 18);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] lg:h-[540px] flex items-center justify-center perspective-1500 select-none"
    >
      {/* 3D Hologram Projection Stage */}
      <div
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.4s ease-out",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center preserve-3d"
      >
        {/* Holographic Projection Base Cone / Light beam */}
        <div
          className="absolute -bottom-16 w-72 h-32 rounded-full blur-2xl pointer-events-none -z-10"
          style={{
            background: "radial-gradient(ellipse at center, rgba(34, 211, 238, 0.45) 0%, rgba(139, 92, 246, 0.3) 45%, transparent 75%)",
          }}
        />

        {/* Outer 3D Gyro Ring 1 */}
        <div
          aria-hidden="true"
          className="absolute w-[440px] h-[440px] rounded-full border border-nexus-cyan/30 pointer-events-none animate-gyro"
          style={{
            boxShadow: "0 0 30px rgba(34, 211, 238, 0.2), inset 0 0 20px rgba(34, 211, 238, 0.1)",
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-nexus-cyan glow-cyan" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-nexus-purple-light" />
        </div>

        {/* Counter-rotating 3D Gyro Ring 2 */}
        <div
          aria-hidden="true"
          className="absolute w-[360px] h-[360px] rounded-full border border-nexus-purple/40 pointer-events-none animate-gyro-reverse"
          style={{
            boxShadow: "0 0 30px rgba(139, 92, 246, 0.25), inset 0 0 25px rgba(139, 92, 246, 0.15)",
          }}
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-nexus-purple glow-purple" />
        </div>

        {/* Inner Pulsing Core Energy Orb */}
        <div
          aria-hidden="true"
          className="absolute w-44 h-44 rounded-full pointer-events-none blur-xl animate-neon-pulse"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.7) 0%, rgba(34, 211, 238, 0.5) 50%, transparent 80%)",
          }}
        />

        {/* 3D Holographic Card Stage (Main Floating Object) */}
        <div
          style={{
            transform: "translateZ(45px)",
          }}
          className="relative w-[300px] sm:w-[330px] rounded-3xl overflow-hidden glass border border-nexus-cyan/40 shadow-2xl shadow-cyan-500/20 preserve-3d group"
        >
          {/* Hologram Scanline Bar */}
          <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent pointer-events-none animate-holo-scan z-20" />

          {/* Card Visual Content */}
          <div
            className="h-52 relative overflow-hidden"
            style={{ background: featuredGame.coverGradient }}
          >
            {/* Cyber Matrix Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff20_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />

            {/* Glowing Accent Badge */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-nexus-cyan/40 text-[11px] font-bold text-nexus-cyan tracking-wide shadow-lg">
              <Zap className="w-3 h-3 fill-nexus-cyan" />
              FEATURED TITLE
            </div>

            <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-nexus-amber/90 text-black text-[11px] font-bold shadow-lg">
              ★ {featuredGame.rating}
            </div>

            {/* Floating Play Action Orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Link
                href={`/games/${featuredGame.slug}`}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-nexus-purple to-nexus-cyan flex items-center justify-center shadow-2xl shadow-cyan-500/40 hover:scale-110 transition-transform cursor-pointer group-hover:glow-cyan"
              >
                <Play className="w-7 h-7 text-white ml-1 fill-white" />
              </Link>
            </div>

            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-nexus-card to-transparent" />
          </div>

          {/* Hologram Metadata Section */}
          <div className="p-5 bg-nexus-card/90 backdrop-blur-xl border-t border-nexus-border/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-nexus-cyan">
                {featuredGame.categories.join(" • ")}
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-nexus-purple/20 text-nexus-purple-light font-bold">
                PRO PLATFORM
              </span>
            </div>

            <h4 className="text-xl font-black text-white font-[family-name:var(--font-display)] tracking-tight">
              {featuredGame.title}
            </h4>

            <p className="mt-1 text-xs text-nexus-text-muted line-clamp-2 leading-relaxed">
              {featuredGame.description}
            </p>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-nexus-border/40">
              <div className="flex items-center gap-2 text-xs text-nexus-text-muted">
                <Cpu className="w-3.5 h-3.5 text-nexus-purple-light" />
                <span>Ray-Tracing ON</span>
              </div>

              <Link
                href={`/games/${featuredGame.slug}`}
                className="text-xs font-bold text-nexus-cyan hover:underline flex items-center gap-1"
              >
                Launch Details →
              </Link>
            </div>
          </div>
        </div>

        {/* Orbiting 3D Floating Chip 1: Latency & Cloud (Z-depth 75px) */}
        <div
          style={{
            transform: "translate3d(-130px, -110px, 75px)",
          }}
          className="absolute top-1/2 left-1/2 px-3.5 py-2 rounded-xl glass border border-nexus-cyan/40 shadow-xl shadow-cyan-500/20 flex items-center gap-2 pointer-events-none hidden sm:flex animate-float"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-nexus-text-muted">Cloud Stream</div>
            <div className="text-xs font-black text-nexus-cyan tracking-wider">120 FPS • 4K HDR</div>
          </div>
        </div>

        {/* Orbiting 3D Floating Chip 2: Shield / Sync (Z-depth 85px) */}
        <div
          style={{
            transform: "translate3d(70px, 140px, 85px)",
            animationDelay: "1.5s",
          }}
          className="absolute top-1/2 left-1/2 px-3.5 py-2 rounded-xl glass border border-nexus-purple/40 shadow-xl shadow-purple-500/20 flex items-center gap-2 pointer-events-none hidden sm:flex animate-float"
        >
          <div className="w-7 h-7 rounded-lg bg-nexus-purple/30 flex items-center justify-center text-nexus-purple-light">
            <Wifi className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-nexus-text-muted">Cloud Save</div>
            <div className="text-xs font-black text-nexus-purple-light tracking-wide">Cross-Save Synced</div>
          </div>
        </div>

        {/* Orbiting 3D Floating Chip 3: Security & Anti-Cheat (Z-depth 90px) */}
        <div
          style={{
            transform: "translate3d(120px, -70px, 90px)",
            animationDelay: "0.75s",
          }}
          className="absolute top-1/2 left-1/2 px-3 py-1.5 rounded-xl glass border border-nexus-amber/40 shadow-lg shadow-amber-500/10 flex items-center gap-1.5 pointer-events-none hidden md:flex animate-float"
        >
          <ShieldCheck className="w-4 h-4 text-nexus-amber" />
          <span className="text-[11px] font-bold text-white tracking-wide">Nexus Sentinel Protected</span>
        </div>
      </div>
    </div>
  );
}
