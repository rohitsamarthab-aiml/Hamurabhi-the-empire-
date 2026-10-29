"use client";

import React, { useState, useEffect } from "react";
import { retroAudio } from "./audioSynth";
import { Trophy, RefreshCw, Sparkles, Brain, Flame } from "lucide-react";

interface TurnRecord {
  turnIndex: number;
  player: "HUMAN" | "COMPUTER";
  matchesTaken: number;
  matchesRemaining: number;
}

export function MatchesGame() {
  const [matches, setMatches] = useState(23);
  const [currentPlayer, setCurrentPlayer] = useState<"HUMAN" | "COMPUTER">("HUMAN");
  const [aiMode, setAiMode] = useState<"CLASSIC_1978" | "OPTIMAL">("CLASSIC_1978");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<"HUMAN" | "COMPUTER" | null>(null);
  const [history, setHistory] = useState<TurnRecord[]>([]);
  const [computerThinking, setComputerThinking] = useState(false);
  const [lastMove, setLastMove] = useState<number | null>(null);

  const resetGame = () => {
    retroAudio.playBlip();
    setMatches(23);
    setCurrentPlayer("HUMAN");
    setGameOver(false);
    setWinner(null);
    setHistory([]);
    setComputerThinking(false);
    setLastMove(null);
  };

  const handleHumanTake = (num: number) => {
    if (gameOver || currentPlayer !== "HUMAN" || num > matches) return;
    retroAudio.playSelect();

    const newRemaining = matches - num;
    setLastMove(num);

    const record: TurnRecord = {
      turnIndex: history.length + 1,
      player: "HUMAN",
      matchesTaken: num,
      matchesRemaining: newRemaining,
    };
    setHistory((prev) => [...prev, record]);
    setMatches(newRemaining);

    if (newRemaining <= 0) {
      // Human took the last match -> Human loses (Misère)
      setGameOver(true);
      setWinner("COMPUTER");
      retroAudio.playExplosion();
      return;
    }

    setCurrentPlayer("COMPUTER");
    setComputerThinking(true);
  };

  // Computer turn
  useEffect(() => {
    if (currentPlayer === "COMPUTER" && !gameOver && matches > 0) {
      const timer = setTimeout(() => {
        let take = 1;
        const N = matches;

        if (N === 1) {
          take = 1;
        } else if (aiMode === "CLASSIC_1978") {
          // Bob Albrecht 1978 rule: 4 - last_human_move
          if (lastMove !== null) {
            const z1 = 4 - lastMove;
            if (z1 >= 1 && z1 <= 3 && z1 <= N) {
              if (N - z1 === 0 && N > 1) {
                take = Math.min(3, Math.max(1, N - 1));
              } else {
                take = z1;
              }
            } else {
              take = Math.min(3, Math.max(1, (N - 1) % 4 || 1));
            }
          } else {
            take = Math.min(3, Math.max(1, (N - 1) % 4 || 1));
          }
        } else {
          // OPTIMAL modular Misère Nim: target (N - 1) % 4 === 0
          const r = (N - 1) % 4;
          if (r >= 1 && r <= 3 && r <= N) {
            take = r;
          } else {
            take = 1; // stalled position
          }
        }

        take = Math.min(take, matches);
        const newRemaining = matches - take;

        const record: TurnRecord = {
          turnIndex: history.length + 1,
          player: "COMPUTER",
          matchesTaken: take,
          matchesRemaining: newRemaining,
        };

        retroAudio.playBlip();
        setHistory((prev) => [...prev, record]);
        setMatches(newRemaining);
        setComputerThinking(false);

        if (newRemaining <= 0) {
          // Computer took last match -> Human wins!
          setGameOver(true);
          setWinner("HUMAN");
          retroAudio.playVictory();
        } else {
          setCurrentPlayer("HUMAN");
        }
      }, 900);

      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameOver, matches, aiMode, lastMove, history.length]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 bg-[#0c1017] text-white select-none font-mono">
      {/* Header Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <h2 className="text-base sm:text-lg font-bold text-amber-400">
            23 MATCHES (1978)
          </h2>
          <span className="text-xs text-white/50 hidden sm:inline">
            Bob Albrecht / David H. Ahl (Creative Computing)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Mode selector */}
          <div className="flex items-center bg-black/40 border border-white/10 rounded-lg p-0.5 text-xs">
            <button
              onClick={() => {
                setAiMode("CLASSIC_1978");
                resetGame();
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                aiMode === "CLASSIC_1978"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Classic 1978 AI
            </button>
            <button
              onClick={() => {
                setAiMode("OPTIMAL");
                resetGame();
              }}
              className={`px-2.5 py-1 rounded-md transition-all ${
                aiMode === "OPTIMAL"
                  ? "bg-amber-500/20 text-amber-300 font-semibold"
                  : "text-white/60 hover:text-white"
              }`}
            >
              Master AI
            </button>
          </div>

          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-all"
            title="Reset match board"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="w-full flex-1 flex flex-col items-center justify-center my-4 relative">
        {/* Status Banner */}
        <div className="mb-4 text-center">
          <p className="text-xs tracking-wider uppercase text-amber-400/80 mb-1">
            Misère Nim Rules: The player forced to take the last match LOSES!
          </p>
          <div className="text-2xl sm:text-3xl font-extrabold flex items-center justify-center gap-3">
            <span className="text-amber-400">{matches}</span>
            <span className="text-white/60 text-base font-normal">
              {matches === 1 ? "match remaining" : "matches remaining"}
            </span>
          </div>
        </div>

        {/* Matches Display Board */}
        <div className="w-full max-w-2xl bg-black/50 border border-amber-900/30 rounded-2xl p-6 shadow-inner flex flex-wrap items-center justify-center gap-2 sm:gap-3 min-h-[140px]">
          {Array.from({ length: 23 }).map((_, idx) => {
            const isRemaining = idx < matches;
            return (
              <div
                key={idx}
                className={`relative flex flex-col items-center transition-all duration-300 ${
                  isRemaining
                    ? "opacity-100 scale-100"
                    : "opacity-15 scale-75 grayscale blur-[0.5px]"
                }`}
              >
                {/* Matchstick sulfur flame / head */}
                <div
                  className={`w-3 h-4 rounded-full transition-all duration-300 ${
                    isRemaining
                      ? "bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 shadow-[0_0_8px_#f59e0b] animate-pulse"
                      : "bg-neutral-800"
                  }`}
                />
                {/* Matchstick wooden body */}
                <div
                  className={`w-1.5 h-14 sm:h-16 rounded-b-sm transition-all duration-300 ${
                    isRemaining ? "bg-[#d4a373]" : "bg-neutral-700"
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* Turn Status Message */}
        <div className="mt-4 h-8 flex items-center justify-center">
          {gameOver ? (
            <div className="flex items-center gap-2 text-base font-bold animate-bounce">
              {winner === "HUMAN" ? (
                <span className="text-emerald-400 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-emerald-400" /> YOU WON! The Computer took the last match!
                </span>
              ) : (
                <span className="text-rose-400 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-rose-500" /> YOU LOST! You were forced to take the last match.
                </span>
              )}
            </div>
          ) : computerThinking ? (
            <div className="flex items-center gap-2 text-sm text-cyan-400 animate-pulse">
              <Brain className="w-4 h-4 animate-spin" /> Computer is calculating strategic move...
            </div>
          ) : (
            <div className="text-sm text-emerald-400 font-semibold">
              YOUR TURN: Choose how many matches to remove (1, 2, or 3)
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons & Turn History */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4">
        {/* Move Buttons */}
        <div className="flex items-center gap-3">
          {[1, 2, 3].map((num) => {
            const disabled = gameOver || currentPlayer !== "HUMAN" || num > matches;
            return (
              <button
                key={num}
                onClick={() => handleHumanTake(num)}
                disabled={disabled}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
                  disabled
                    ? "bg-white/5 text-white/30 cursor-not-allowed border border-white/5"
                    : "bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20 glow-amber"
                }`}
              >
                Take {num} {num === 1 ? "Match" : "Matches"}
              </button>
            );
          })}
        </div>

        {/* History ticker */}
        <div className="text-xs text-white/50 max-h-12 overflow-y-auto text-right">
          {history.length > 0 ? (
            <span>
              Last: {history[history.length - 1].player === "HUMAN" ? "You" : "Computer"} took{" "}
              {history[history.length - 1].matchesTaken} match(es) ({history[history.length - 1].matchesRemaining} left)
            </span>
          ) : (
            <span>Table ready. Human moves first.</span>
          )}
        </div>
      </div>
    </div>
  );
}
