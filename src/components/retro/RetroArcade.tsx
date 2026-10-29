"use client";

import React, { useState } from "react";
import { MatchesGame } from "./MatchesGame";
import { LunarLanderGame } from "./LunarLanderGame";
import { HammurabiGame } from "./HammurabiGame";
import { retroAudio } from "./audioSynth";
import {
  Gamepad2,
  Tv,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Info,
} from "lucide-react";

export type RetroGameId =
  | "hammurabi"
  | "23-matches"
  | "lunar-lander"
  | "oregon-trail"
  | "hunt-the-wumpus"
  | "super-star-trek";

interface RetroArcadeProps {
  initialGameId?: string;
}

export function RetroArcade({ initialGameId = "hammurabi" }: RetroArcadeProps) {
  // Normalize slug
  const normalizedId: RetroGameId =
    initialGameId === "23-matches" || initialGameId === "matches"
      ? "23-matches"
      : initialGameId === "lunar-lander" || initialGameId === "lander"
      ? "lunar-lander"
      : initialGameId === "oregon-trail" || initialGameId === "oregon"
      ? "oregon-trail"
      : initialGameId === "hunt-the-wumpus" || initialGameId === "wumpus"
      ? "hunt-the-wumpus"
      : initialGameId === "super-star-trek" || initialGameId === "trek"
      ? "super-star-trek"
      : "hammurabi";

  const [activeGame, setActiveGame] = useState<RetroGameId>(normalizedId);
  const [crtEffect, setCrtEffect] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    retroAudio.enabled = next;
    if (next) retroAudio.playBlip();
  };

  const toggleCrt = () => {
    retroAudio.playBlip();
    setCrtEffect(!crtEffect);
  };

  return (
    <div
      className={`w-full h-full flex flex-col bg-[#05080f] select-none text-white relative overflow-hidden ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none" : "rounded-2xl"
      }`}
    >
      {/* Universal CRT Scanlines Overlay */}
      {crtEffect && (
        <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-70" />
      )}

      {/* Arcade Bar: Game Switcher & Controls */}
      <div className="flex flex-wrap items-center justify-between px-4 py-2.5 bg-black/80 border-b border-white/10 z-20 gap-2">
        {/* Game Switcher Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs py-0.5">
          {[
            { id: "hammurabi" as RetroGameId, label: "Hammurabi (1978)" },
            { id: "23-matches" as RetroGameId, label: "23 Matches" },
            { id: "lunar-lander" as RetroGameId, label: "Lunar Lander" },
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => {
                retroAudio.playSelect();
                setActiveGame(g.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeGame === g.id
                  ? "bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white shadow-md font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" /> {g.label}
            </button>
          ))}
        </div>

        {/* Master Controls */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            onClick={toggleCrt}
            className={`px-2.5 py-1.5 rounded-lg border transition-all flex items-center gap-1 ${
              crtEffect
                ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                : "bg-white/5 text-white/50 border-white/10"
            }`}
            title="Toggle CRT Monitor Scanlines Effect"
          >
            <Tv className="w-3.5 h-3.5" /> CRT
          </button>

          <button
            onClick={toggleSound}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
            title={soundEnabled ? "Mute 8-Bit Audio" : "Enable 8-Bit Audio"}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-nexus-cyan" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all border border-white/10"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Arcade"}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Game Window Stage */}
      <div className="flex-1 w-full relative z-10 overflow-hidden flex items-center justify-center">
        {activeGame === "hammurabi" && <HammurabiGame />}
        {activeGame === "23-matches" && <MatchesGame />}
        {activeGame === "lunar-lander" && <LunarLanderGame />}
      </div>
    </div>
  );
}
