"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  RefreshCw,
  AlertTriangle,
  Loader2,
  Gamepad2,
} from "lucide-react";
import type { Game } from "@/data/games";
import { RetroArcade } from "@/components/retro/RetroArcade";

interface Props {
  game: Game;
}

type PlayerState = "loading" | "ready" | "error";

export default function PlayerClient({ game }: Props) {
  const [state, setState] = useState<PlayerState>("loading");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setState("ready");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRetry = () => {
    setState("loading");
    setTimeout(() => setState("ready"), 2000);
  };

  const simulateError = () => {
    setState("error");
  };

  return (
    <div className={`pt-16 min-h-screen ${isFullscreen ? "fixed inset-0 z-50 pt-0 bg-black" : ""}`}>
      {/* Top bar */}
      <div className={`flex items-center justify-between px-4 py-3 bg-nexus-surface border-b border-nexus-border ${isFullscreen ? "absolute top-0 left-0 right-0 z-10" : ""}`}>
        <div className="flex items-center gap-4">
          <Link
            href={`/games/${game.slug}`}
            className="flex items-center gap-2 text-sm text-nexus-text-muted hover:text-nexus-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <span className="text-sm font-medium text-nexus-text">
            {game.title}
          </span>
          {state === "loading" && (
            <span className="flex items-center gap-1 text-xs text-nexus-amber">
              <Loader2 className="w-3 h-3 animate-spin" /> Loading...
            </span>
          )}
          {state === "ready" && (
            <span className="flex items-center gap-1 text-xs text-nexus-green">
              <span className="w-2 h-2 rounded-full bg-nexus-green" /> Ready
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg text-nexus-text-muted hover:text-nexus-text hover:bg-white/5 transition-all"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg text-nexus-text-muted hover:text-nexus-text hover:bg-white/5 transition-all"
            aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize className="w-4 h-4" />
            ) : (
              <Maximize className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Player area */}
      <div
        className={`relative bg-black ${
          isFullscreen ? "h-[calc(100%-52px)] mt-[52px]" : "max-w-7xl mx-auto aspect-video"
        }`}
      >
        {state === "loading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center animate-pulse-glow">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <p className="text-nexus-text font-medium">Loading {game.title}</p>
              <p className="text-sm text-nexus-text-muted mt-1">
                Preparing game engine...
              </p>
            </div>
            <div className="w-48 h-1 rounded-full bg-nexus-border overflow-hidden">
              <div className="h-full bg-gradient-to-r from-nexus-purple to-nexus-cyan rounded-full animate-shimmer" />
            </div>
          </div>
        )}

        {state === "ready" && (
          <div className="absolute inset-0">
            <RetroArcade initialGameId={game.slug} />
          </div>
        )}

        {state === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-nexus-bg">
            <div className="w-16 h-16 rounded-2xl bg-nexus-red/20 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-nexus-red" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-nexus-text">
                Failed to load game
              </p>
              <p className="text-sm text-nexus-text-muted mt-1">
                Something went wrong while loading the game. Please try again.
              </p>
            </div>
            <button
              onClick={handleRetry}
              className="px-6 py-2 rounded-lg bg-nexus-purple text-white text-sm font-medium hover:bg-nexus-purple-dark transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
