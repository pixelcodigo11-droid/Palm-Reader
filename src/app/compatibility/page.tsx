"use client";

import { useState } from "react";
import { HeartHandshake, AlertCircle, Sparkles } from "lucide-react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { GlassCard } from "@/components/ui/GlassCard";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

interface Result {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export default function Compatibility() {
  const [sign1, setSign1] = useState<string | null>(null);
  const [sign2, setSign2] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateCompatibility = async () => {
    if (!sign1 || !sign2) return;
    setIsCalculating(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/compatibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign1, sign2 }),
      });
      if (!res.ok) throw new Error("Failed to calculate compatibility.");
      const data = await res.json();
      setResult(data as Result);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unexpected error occurred.");
      }
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text flex items-center justify-center gap-3">
          <HeartHandshake className="w-10 h-10 text-pink-500" /> Cosmic Compatibility
        </h1>
        <p className="text-gray-400 text-lg">Select two signs to reveal your AI-powered relationship analysis.</p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <GlassCard>
            <h3 className="text-xl font-bold mb-4 text-center text-primary">Your Sign</h3>
            <div className="grid grid-cols-3 gap-2">
                {zodiacSigns.map((sign) => (
                <button
                    key={sign}
                    onClick={() => setSign1(sign)}
                    className={`p-2 rounded-xl text-sm transition-all duration-200 ${
                    sign1 === sign
                        ? 'bg-primary/30 border border-primary text-white shadow-[0_0_10px_rgba(138,43,226,0.5)]'
                        : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10'
                    }`}
                >
                    {sign}
                </button>
                ))}
            </div>
        </GlassCard>

        <GlassCard>
            <h3 className="text-xl font-bold mb-4 text-center text-secondary">Partner&apos;s Sign</h3>
            <div className="grid grid-cols-3 gap-2">
                {zodiacSigns.map((sign) => (
                <button
                    key={sign}
                    onClick={() => setSign2(sign)}
                    className={`p-2 rounded-xl text-sm transition-all duration-200 ${
                    sign2 === sign
                        ? 'bg-secondary/30 border border-secondary text-white shadow-[0_0_10px_rgba(255,0,255,0.5)]'
                        : 'bg-white/5 border border-transparent text-gray-400 hover:bg-white/10'
                    }`}
                >
                    {sign}
                </button>
                ))}
            </div>
        </GlassCard>
      </div>

      <div className="mb-12">
         <GlowingButton
            onClick={calculateCompatibility}
            disabled={!sign1 || !sign2 || isCalculating}
            className={`flex items-center gap-2 ${(!sign1 || !sign2) ? 'opacity-50 cursor-not-allowed' : ''}`}
         >
            {isCalculating ? "Analyzing cosmic bonds..." : "Calculate Compatibility"}
         </GlowingButton>
      </div>

      {error && (
        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 mb-8">
          <AlertCircle />
          <p>{error}</p>
        </div>
      )}

      {result && !isCalculating && (
        <GlassCard className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
             <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                   <circle
                      cx="50" cy="50" r="40" fill="transparent"
                      stroke="url(#gradient)" strokeWidth="8"
                      strokeDasharray={`${(result.score / 100) * 251.2} 251.2`}
                      className="transition-all duration-1000 ease-out"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#8a2be2" />
                        <stop offset="100%" stopColor="#ff00ff" />
                      </linearGradient>
                    </defs>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                   <span className="text-4xl font-bold glow-text">{result.score}%</span>
                   <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">Match</span>
                </div>
             </div>

             <div>
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-white">
                   <Sparkles className="text-accent" /> {sign1} + {sign2}
                </h2>
                <p className="text-gray-300 leading-relaxed italic">
                   &quot;{result.summary}&quot;
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
             <div>
                <h4 className="text-green-400 font-bold mb-3 uppercase text-sm tracking-wider">Strengths</h4>
                <ul className="space-y-2">
                   {result.strengths.map((s, i) => (
                       <li key={i} className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {s}
                       </li>
                   ))}
                </ul>
             </div>
             <div>
                <h4 className="text-red-400 font-bold mb-3 uppercase text-sm tracking-wider">Weaknesses</h4>
                <ul className="space-y-2">
                   {result.weaknesses.map((w, i) => (
                       <li key={i} className="flex items-center gap-2 text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> {w}
                       </li>
                   ))}
                </ul>
             </div>
          </div>

          <div className="mt-8 bg-black/30 p-4 rounded-xl border border-white/5">
              <h4 className="font-semibold text-accent mb-2">AI Recommendation</h4>
              <p className="text-gray-400 text-sm">{result.recommendation}</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
