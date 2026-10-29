"use client";

import React, { useState, useEffect, useRef } from "react";
import { retroAudio } from "./audioSynth";
import { Landmark, Users, Wheat, Award, AlertTriangle, ArrowRight, Sparkles, RefreshCw } from "lucide-react";

interface AdvisorRecommendation {
  buy: number;
  sell: number;
  feed: number;
  plant: number;
  tip: string;
}

export function HammurabiGame() {
  const [year, setYear] = useState(1);
  const [population, setPopulation] = useState(100);
  const [bushels, setBushels] = useState(2800);
  const [acres, setAcres] = useState(1000);
  const [landPrice, setLandPrice] = useState(19);

  // Turn orders
  const [tradeAcres, setTradeAcres] = useState(0); // positive = buy, negative = sell
  const [feedBushels, setFeedBushels] = useState(2000);
  const [plantAcres, setPlantAcres] = useState(1000);

  // Turn outcomes
  const [starvedThisYear, setStarvedThisYear] = useState(0);
  const [starvedTotal, setStarvedTotal] = useState(0);
  const [immigrants, setImmigrants] = useState(5);
  const [harvestYield, setHarvestYield] = useState(3);
  const [ratsAte, setRatsAte] = useState(200);
  const [plagueStruck, setPlagueStruck] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverReason, setGameOverReason] = useState<"IMPEACHED" | "COMPLETED" | null>(null);
  const [evaluation, setEvaluation] = useState("");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const resetGame = () => {
    retroAudio.playBlip();
    setYear(1);
    setPopulation(100);
    setBushels(2800);
    setAcres(1000);
    setLandPrice(Math.floor(Math.random() * 10) + 17);
    setTradeAcres(0);
    setFeedBushels(2000);
    setPlantAcres(1000);
    setStarvedThisYear(0);
    setStarvedTotal(0);
    setImmigrants(5);
    setHarvestYield(3);
    setRatsAte(200);
    setPlagueStruck(false);
    setGameOver(false);
    setGameOverReason(null);
    setEvaluation("");
  };

  // Advisors calculate recommended balanced allocations
  const advisor: AdvisorRecommendation = {
    buy: bushels > 2500 ? Math.min(50, Math.floor((bushels - 2200) / landPrice)) : 0,
    sell: 0,
    feed: population * 20,
    plant: Math.min(acres, population * 10, bushels - population * 20),
    tip: `Feed ${population * 20} bu (20 bu/citizen) and plant up to ${Math.min(acres, population * 10)} acres.`,
  };

  const applyAdvice = () => {
    retroAudio.playSelect();
    setTradeAcres(advisor.buy);
    setFeedBushels(Math.max(0, advisor.feed));
    setPlantAcres(Math.max(0, advisor.plant));
  };

  const submitYear = () => {
    if (gameOver) return;
    retroAudio.playSelect();

    // 1. Process Land Trade
    let currentBushels = bushels;
    let currentAcres = acres;
    if (tradeAcres > 0) {
      const cost = tradeAcres * landPrice;
      if (cost > currentBushels) {
        alert(`Cannot buy ${tradeAcres} acres! You only have ${currentBushels} bushels.`);
        return;
      }
      currentBushels -= cost;
      currentAcres += tradeAcres;
    } else if (tradeAcres < 0) {
      const sellAmount = Math.abs(tradeAcres);
      if (sellAmount > currentAcres) {
        alert(`Cannot sell more acres than you own (${currentAcres})!`);
        return;
      }
      currentAcres -= sellAmount;
      currentBushels += sellAmount * landPrice;
    }

    // 2. Process Feeding
    if (feedBushels > currentBushels) {
      alert(`Cannot feed ${feedBushels} bushels! Only ${currentBushels} remain.`);
      return;
    }
    currentBushels -= feedBushels;
    const fedPeople = Math.floor(feedBushels / 20);
    const starved = Math.max(0, population - fedPeople);
    const starvedPct = population > 0 ? (starved / population) * 100 : 0;

    // Check Impeachment (>45% starved)
    if (starvedPct > 45.0) {
      setStarvedThisYear(starved);
      setStarvedTotal((prev) => prev + starved);
      setGameOver(true);
      setGameOverReason("IMPEACHED");
      setEvaluation(`You starved ${starved} people in one year (${starvedPct.toFixed(1)}%)! You are impeached and thrown out of office!`);
      retroAudio.playExplosion();
      return;
    }

    let survivingPop = population - starved;

    // 3. Process Planting
    const maxPlantable = Math.min(currentAcres, survivingPop * 10, currentBushels);
    const actualPlant = Math.min(plantAcres, maxPlantable);
    currentBushels -= actualPlant;

    // 4. Harvest yield (1-5 bu/acre)
    const yieldPerAcre = Math.floor(Math.random() * 5) + 1;
    const harvested = actualPlant * yieldPerAcre;
    currentBushels += harvested;

    // 5. Rats eating grain (1 in 5 chance or 0-200 bu)
    let ratDamage = 0;
    if (Math.random() < 0.4) {
      ratDamage = Math.floor(Math.random() * Math.min(currentBushels, 250));
      currentBushels -= ratDamage;
    }

    // 6. Plague (15% chance halving population)
    let hadPlague = false;
    if (Math.random() < 0.15) {
      hadPlague = true;
      survivingPop = Math.floor(survivingPop / 2);
      retroAudio.playWarning();
    }

    // 7. Immigrants
    const newcomers = Math.floor((Math.random() * 5 * (20 * currentAcres + currentBushels)) / (survivingPop * 100) + 1);
    const newPopulation = survivingPop + newcomers;

    // 8. Next year land price
    const nextPrice = Math.floor(Math.random() * 10) + 17;

    setYear((prev) => prev + 1);
    setPopulation(newPopulation);
    setBushels(currentBushels);
    setAcres(currentAcres);
    setLandPrice(nextPrice);
    setStarvedThisYear(starved);
    setStarvedTotal((prev) => prev + starved);
    setImmigrants(newcomers);
    setHarvestYield(yieldPerAcre);
    setRatsAte(ratDamage);
    setPlagueStruck(hadPlague);

    // Auto preset next year
    setTradeAcres(0);
    setFeedBushels(newPopulation * 20);
    setPlantAcres(Math.min(currentAcres, newPopulation * 10));

    // End of 10-year term
    if (year >= 10) {
      setGameOver(true);
      setGameOverReason("COMPLETED");
      const acresPerPerson = currentAcres / newPopulation;
      if (acresPerPerson >= 10 && starvedTotal < 15) {
        setEvaluation(`CHARLEMAGNE CLASS! A fantastic performance! ${currentAcres} acres owned (${acresPerPerson.toFixed(1)}/person) and only ${starvedTotal} starved.`);
        retroAudio.playVictory();
      } else if (acresPerPerson >= 7) {
        setEvaluation(`MEDIOCRE GOVERNOR: Your term was heavy-handed but acceptable. ${acresPerPerson.toFixed(1)} acres per citizen.`);
        retroAudio.playSelect();
      } else {
        setEvaluation(`NERO CLASS: Your citizens call you a despot. Only ${acresPerPerson.toFixed(1)} acres per citizen.`);
        retroAudio.playWarning();
      }
    }
  };

  // Render animated ancient Sumerian scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let waveOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveOffset += 0.04;

      // 1. Sky & Sun
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.5);
      skyGrad.addColorStop(0, "#0f172a");
      skyGrad.addColorStop(1, "#334155");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height * 0.5);

      // Sun
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(canvas.width - 70, 45, 18, 0, Math.PI * 2);
      ctx.fill();

      // 2. Zagros Mountain silhouettes
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.5);
      ctx.lineTo(80, canvas.height * 0.35);
      ctx.lineTo(180, canvas.height * 0.5);
      ctx.lineTo(300, canvas.height * 0.3);
      ctx.lineTo(420, canvas.height * 0.5);
      ctx.lineTo(canvas.width, canvas.height * 0.4);
      ctx.lineTo(canvas.width, canvas.height * 0.5);
      ctx.fill();

      // 3. Ground / Fields
      ctx.fillStyle = "#78350f";
      ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

      // Wheat crops on fields
      ctx.fillStyle = "#d97706";
      for (let i = 10; i < canvas.width; i += 18) {
        ctx.fillRect(i, canvas.height * 0.55, 3, 16);
        ctx.fillRect(i + 4, canvas.height * 0.62, 3, 14);
      }

      // 4. Flowing Euphrates River
      ctx.fillStyle = "#0284c7";
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.75);
      for (let x = 0; x <= canvas.width; x += 20) {
        const y = canvas.height * 0.75 + Math.sin(x * 0.02 + waveOffset) * 4;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fill();

      // 5. Ziggurat of Ur
      ctx.fillStyle = "#b45309";
      ctx.fillRect(canvas.width - 150, canvas.height * 0.38, 120, 25);
      ctx.fillRect(canvas.width - 135, canvas.height * 0.32, 90, 20);
      ctx.fillRect(canvas.width - 120, canvas.height * 0.26, 60, 20);

      // Ziggurat temple top & torch flame
      ctx.fillStyle = "#f97316";
      ctx.beginPath();
      ctx.arc(canvas.width - 90, canvas.height * 0.24, 5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 bg-[#0c0f17] text-white font-mono select-none overflow-y-auto">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-500" />
          <h2 className="text-base sm:text-lg font-bold text-amber-400">
            HAMMURABI: REIMAGINED (1978)
          </h2>
          <span className="text-xs text-white/40 hidden sm:inline">
            Doug Dyment (1968) / David H. Ahl (Creative Computing)
          </span>
        </div>
        <button
          onClick={resetGame}
          className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 text-xs rounded-lg transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Restart Reign
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        {/* Left: Animated Sumerian World & Annual Report */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="bg-black/60 rounded-2xl border border-amber-900/30 overflow-hidden relative shadow-lg aspect-[16/9]">
            <canvas
              ref={canvasRef}
              width={520}
              height={292}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-3 bg-black/70 px-2.5 py-1 rounded text-xs text-amber-300 font-bold border border-amber-500/30">
              YEAR {year} OF 10
            </div>
            {plagueStruck && (
              <div className="absolute top-2 right-3 bg-rose-950/80 text-rose-300 px-2.5 py-1 rounded text-xs font-bold border border-rose-500/30 animate-pulse">
                A HORRIBLE PLAGUE STRUCK!
              </div>
            )}
          </div>

          {/* Annual Ledger Report */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-xs space-y-2">
            <h3 className="text-amber-400 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5">
              <Wheat className="w-4 h-4" /> Sumerian Granary & Census Report
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px]">CITIZENS</span>
                <span className="text-sm font-bold text-white">{population}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px]">GRAIN SILOS</span>
                <span className="text-sm font-bold text-amber-400">{bushels} bu</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px]">ACRES OWNED</span>
                <span className="text-sm font-bold text-emerald-400">{acres}</span>
              </div>
              <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                <span className="text-white/40 block text-[10px]">LAND PRICE</span>
                <span className="text-sm font-bold text-cyan-400">{landPrice} bu/ac</span>
              </div>
            </div>

            {year > 1 && (
              <div className="text-[11px] text-white/70 pt-1 border-t border-white/5">
                In Year {year - 1}: {starvedThisYear} citizens starved, {immigrants} immigrants arrived, harvest was {harvestYield} bu/acre, rats destroyed {ratsAte} bushels.
              </div>
            )}
          </div>
        </div>

        {/* Right: Decree Orders & Royal Advisors */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* Royal Advisors Card */}
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Royal Council of Advisors
              </span>
              <button
                onClick={applyAdvice}
                className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded font-semibold transition-colors text-[11px]"
              >
                Apply Advice
              </button>
            </div>
            <p className="text-white/70 text-[11px] leading-relaxed">
              {advisor.tip}
            </p>
          </div>

          {/* Decree Form */}
          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 text-xs space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Royal Decrees for Year {year}
              </h4>

              {/* Trade land */}
              <div>
                <label className="text-white/70 block mb-1">
                  Buy (+) or Sell (-) Land (Acres):
                </label>
                <input
                  type="number"
                  value={tradeAcres}
                  onChange={(e) => setTradeAcres(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-amber-400 outline-none"
                />
              </div>

              {/* Feed citizens */}
              <div>
                <label className="text-white/70 block mb-1">
                  Bushels to Feed Citizens (20 bu/person):
                </label>
                <input
                  type="number"
                  value={feedBushels}
                  onChange={(e) => setFeedBushels(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-amber-400 outline-none"
                />
              </div>

              {/* Plant seed */}
              <div>
                <label className="text-white/70 block mb-1">
                  Acres to Plant with Seed (1 bu/acre):
                </label>
                <input
                  type="number"
                  value={plantAcres}
                  onChange={(e) => setPlantAcres(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white font-mono text-xs focus:border-amber-400 outline-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitYear}
              disabled={gameOver}
              className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2 ${
                gameOver
                  ? "bg-white/5 text-white/30 cursor-not-allowed"
                  : "bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:scale-[1.02] shadow-lg shadow-amber-500/20"
              }`}
            >
              Seal Decrees & Advance Year <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-nexus-card border border-amber-500/40 rounded-2xl p-6 max-w-md w-full text-center shadow-2xl">
            {gameOverReason === "COMPLETED" ? (
              <Award className="w-12 h-12 text-amber-400 mx-auto mb-2 animate-bounce" />
            ) : (
              <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-2 animate-pulse" />
            )}
            <h3 className="text-xl font-bold mb-2">
              {gameOverReason === "COMPLETED" ? "TERM CONCLUDED" : "IMPEACHED!"}
            </h3>
            <p className="text-sm text-white/80 leading-relaxed mb-5">
              {evaluation}
            </p>
            <button
              onClick={resetGame}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl font-bold text-black text-sm hover:opacity-90 transition-opacity"
            >
              Start New 10-Year Reign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
