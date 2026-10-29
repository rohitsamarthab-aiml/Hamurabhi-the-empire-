"use client";

import React, { useState, useEffect, useRef } from "react";
import { retroAudio } from "./audioSynth";
import { Rocket, Gauge, Play, RotateCcw, AlertOctagon, CheckCircle2 } from "lucide-react";

export function LunarLanderGame() {
  // Lunar Lander physics constants (Jim Storer 1969 / David Ahl 1978)
  const GRAVITY_G = 0.001; // mi/s^2
  const THRUST_Z = 1.8; // mi/s exhaust velocity
  const DRY_MASS = 16500.0; // lbs

  const [altitude, setAltitude] = useState(120.0); // miles
  const [velocity, setVelocity] = useState(1.0); // miles/sec downward
  const [mass, setMass] = useState(33000.0); // total wet mass
  const [timeElapsed, setTimeElapsed] = useState(0.0); // seconds
  const [burnRate, setBurnRate] = useState(0); // 0 to 200 lbs/sec
  const [landed, setLanded] = useState(false);
  const [outcome, setOutcome] = useState<"PERFECT" | "GOOD" | "DAMAGED" | "CRASH" | null>(null);
  const [outcomeMsg, setOutcomeMsg] = useState("");
  const [history, setHistory] = useState<Array<{ t: number; alt: number; vel: number; fuel: number; burn: number }>>([]);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resetGame = () => {
    retroAudio.playBlip();
    setAltitude(120.0);
    setVelocity(1.0);
    setMass(33000.0);
    setTimeElapsed(0.0);
    setBurnRate(0);
    setLanded(false);
    setOutcome(null);
    setOutcomeMsg("");
    setHistory([]);
  };

  const fuel = Math.max(0, mass - DRY_MASS);
  const velocityMph = velocity * 3600.0;
  const altitudeFeet = altitude * 5280.0;

  // Taylor series 5th-order descent step
  const executeBurn = (kInput?: number) => {
    if (landed) return;
    const k = typeof kInput === "number" ? kInput : burnRate;
    retroAudio.playThrust();

    const t = 10.0; // 10 second cycle
    let a = altitude;
    let v = velocity;
    let m = mass;
    const n = DRY_MASS;
    const lTime = timeElapsed;

    // Record turn
    setHistory((prev) => [
      ...prev,
      { t: lTime, alt: a, vel: v * 3600, fuel: Math.max(0, m - n), burn: k },
    ]);

    // Fuel exhaustion check
    if (m - n < 1e-3 || (k <= 0 && m - n <= 0)) {
      // Free fall under lunar gravity
      const disc = v * v + 2.0 * a * GRAVITY_G;
      const s = (-v + Math.sqrt(Math.max(0, disc))) / GRAVITY_G;
      const finalV = v + GRAVITY_G * s;
      const finalW = finalV * 3600.0;
      evalTouchdown(finalW, lTime + s);
      return;
    }

    const s = m - n < t * k ? (m - n) / k : t;
    const q = (s * k) / m;

    // 5th order Taylor series
    const velJ = v + GRAVITY_G * s + THRUST_Z * (-q - Math.pow(q, 2) / 2 - Math.pow(q, 3) / 3 - Math.pow(q, 4) / 4 - Math.pow(q, 5) / 5);
    const altI = a - (GRAVITY_G * Math.pow(s, 2)) / 2 - v * s + THRUST_Z * s * (q / 2 + Math.pow(q, 2) / 6 + Math.pow(q, 3) / 12 + Math.pow(q, 4) / 20 + Math.pow(q, 5) / 30);

    if (altI <= 0.0) {
      // Touchdown reached during step
      let currA = a;
      let currV = v;
      let currM = m;
      let currL = lTime;
      let stepS = s;
      for (let i = 0; i < 8; i++) {
        if (stepS < 1e-3) break;
        const disc = currV * currV + 2.0 * currA * (GRAVITY_G - (THRUST_Z * k) / currM);
        const d = currV + Math.sqrt(Math.max(0, disc));
        stepS = d > 1e-5 ? (2.0 * currA) / d : 0.0;
        const qTest = (stepS * k) / currM;
        currV = currV + GRAVITY_G * stepS + THRUST_Z * (-qTest - Math.pow(qTest, 2) / 2 - Math.pow(qTest, 3) / 3);
        currM = Math.max(n, currM - stepS * k);
        currL += stepS;
      }
      evalTouchdown(currV * 3600.0, currL);
      return;
    }

    setAltitude(altI);
    setVelocity(velJ);
    setMass(Math.max(n, m - s * k));
    setTimeElapsed(lTime + s);
  };

  const evalTouchdown = (wMph: number, totalTime: number) => {
    setLanded(true);
    setAltitude(0);
    setVelocity(wMph / 3600.0);
    setTimeElapsed(totalTime);

    if (wMph <= 1.2) {
      setOutcome("PERFECT");
      setOutcomeMsg(`PERFECT LANDING! Touchdown at ${wMph.toFixed(2)} MPH. Welcome to Tranquility Base!`);
      retroAudio.playVictory();
    } else if (wMph <= 10.0) {
      setOutcome("GOOD");
      setOutcomeMsg(`GOOD LANDING! Touchdown at ${wMph.toFixed(1)} MPH. The LEM settled firmly on the landing pad.`);
      retroAudio.playVictory();
    } else if (wMph <= 60.0) {
      setOutcome("DAMAGED");
      setOutcomeMsg(`CRAFT DAMAGED! Impact at ${wMph.toFixed(1)} MPH. Stranded until rescue party arrives.`);
      retroAudio.playWarning();
    } else {
      const crater = (wMph * 0.227).toFixed(1);
      setOutcome("CRASH");
      setOutcomeMsg(`CRASH! Impact at ${wMph.toFixed(1)} MPH. Blasted a new lunar crater ${crater} feet deep!`);
      retroAudio.playExplosion();
    }
  };

  // Render animated lunar descent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let flamePhase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Starfield
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 35; i++) {
        const x = (i * 97) % canvas.width;
        const y = (i * 53) % (canvas.height - 40);
        ctx.fillRect(x, y, 1.5, 1.5);
      }

      // Moon surface
      ctx.fillStyle = "#334155";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 25);
      ctx.quadraticCurveTo(canvas.width / 4, canvas.height - 35, canvas.width / 2, canvas.height - 25);
      ctx.quadraticCurveTo((canvas.width * 3) / 4, canvas.height - 15, canvas.width, canvas.height - 25);
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // Craters on surface
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.ellipse(80, canvas.height - 18, 25, 6, 0, 0, Math.PI * 2);
      ctx.ellipse(260, canvas.height - 15, 40, 8, 0, 0, Math.PI * 2);
      ctx.ellipse(450, canvas.height - 20, 20, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Lander position (0 to 120 miles mapped to canvas height)
      const normAlt = Math.max(0, Math.min(1, altitude / 120));
      const lemY = (canvas.height - 60) - (1 - normAlt) * (canvas.height - 85);
      const lemX = canvas.width / 2;

      // Draw LEM
      ctx.save();
      ctx.translate(lemX, lemY);

      // Thruster flame
      if (burnRate > 0 && !landed) {
        flamePhase += 0.2;
        const flameLen = (burnRate / 200) * 25 + Math.sin(flamePhase) * 4;
        ctx.fillStyle = "rgba(245, 158, 11, 0.85)";
        ctx.beginPath();
        ctx.moveTo(-6, 12);
        ctx.lineTo(6, 12);
        ctx.lineTo(0, 12 + flameLen);
        ctx.closePath();
        ctx.fill();
      }

      // Lander descent stage (gold foil octagon)
      ctx.fillStyle = "#eab308";
      ctx.fillRect(-12, -2, 24, 14);

      // Ascent stage (silver crew cabin)
      ctx.fillStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.arc(0, -7, 10, 0, Math.PI * 2);
      ctx.fill();

      // Landing legs
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, 8);
      ctx.lineTo(-18, 20);
      ctx.moveTo(10, 8);
      ctx.lineTo(18, 20);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [altitude, burnRate, landed]);

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 bg-[#070b12] text-white font-mono select-none">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-cyan-400" />
          <h2 className="text-base sm:text-lg font-bold text-cyan-400">
            LUNAR LANDER (1969/1978)
          </h2>
          <span className="text-xs text-white/40 hidden sm:inline">
            Jim Storer / Apollo 11 LEM Descent Simulator
          </span>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Re-launch
        </button>
      </div>

      {/* Main Grid: Visual Canvas + Telemetry HUD */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Canvas Display */}
        <div className="md:col-span-7 bg-black/60 rounded-2xl border border-cyan-500/20 overflow-hidden relative shadow-lg aspect-[16/10] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={520}
            height={325}
            className="w-full h-full object-cover"
          />

          {/* Outcome Overlay */}
          {landed && outcome && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
              {outcome === "PERFECT" || outcome === "GOOD" ? (
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
              ) : (
                <AlertOctagon className="w-12 h-12 text-rose-500 mb-2 animate-pulse" />
              )}
              <h3 className="text-xl font-extrabold mb-1">
                {outcome === "PERFECT" && "TOUCHDOWN SUCCESSFUL"}
                {outcome === "GOOD" && "LANDING ACHIEVED"}
                {outcome === "DAMAGED" && "TOUCHDOWN WITH CRAFT DAMAGE"}
                {outcome === "CRASH" && "FATAL CRASH!"}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-sm mb-4">
                {outcomeMsg}
              </p>
              <button
                onClick={resetGame}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-lg"
              >
                Try Another Landing
              </button>
            </div>
          )}
        </div>

        {/* Telemetry Dashboard */}
        <div className="md:col-span-5 flex flex-col gap-3 bg-black/40 border border-white/10 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Gauge className="w-4 h-4" /> Live Flight Telemetry
          </div>

          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-white/40 block">Time Elapsed</span>
              <span className="text-sm sm:text-base font-bold text-white">
                {timeElapsed.toFixed(1)}s
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-white/40 block">Altitude</span>
              <span className="text-sm sm:text-base font-bold text-amber-400">
                {altitudeFeet > 1000
                  ? `${altitude.toFixed(2)} mi`
                  : `${altitudeFeet.toFixed(0)} ft`}
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-white/40 block">Descent Rate</span>
              <span
                className={`text-sm sm:text-base font-bold ${
                  velocityMph > 60
                    ? "text-rose-400"
                    : velocityMph > 10
                    ? "text-amber-400"
                    : "text-emerald-400"
                }`}
              >
                {velocityMph.toFixed(1)} MPH
              </span>
            </div>
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
              <span className="text-white/40 block">Fuel Remaining</span>
              <span className="text-sm sm:text-base font-bold text-cyan-300">
                {fuel.toFixed(0)} lbs
              </span>
            </div>
          </div>

          {/* Burn Rate Controls */}
          <div className="mt-2 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-white/70">Retro Burn Rate (K):</span>
              <span className="font-bold text-cyan-400">{burnRate} lbs/sec</span>
            </div>

            <input
              type="range"
              min={0}
              max={200}
              step={10}
              value={burnRate}
              disabled={landed}
              onChange={(e) => setBurnRate(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />

            <div className="flex justify-between gap-1">
              {[0, 50, 100, 150, 200].map((val) => (
                <button
                  key={val}
                  onClick={() => setBurnRate(val)}
                  disabled={landed}
                  className="px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] text-white/60 transition-colors"
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          {/* Burn Button */}
          <button
            onClick={() => executeBurn()}
            disabled={landed}
            className={`w-full mt-2 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              landed
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:scale-[1.02] shadow-lg shadow-cyan-500/25 glow-cyan"
            }`}
          >
            <Play className="w-4 h-4 fill-white" /> Execute 10s Burn
          </button>
        </div>
      </div>
    </div>
  );
}
