"use client";

import { useState } from "react";
import { MoonStar, AlertCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getHoroscope = async (sign: string) => {
    setSelectedSign(sign);
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    try {
      // Dummy API call
      const res = await fetch("/api/horoscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sign }),
      });
      if (!res.ok) throw new Error("Failed to fetch horoscope.");
      const data = await res.json();
      setPrediction(data);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text flex items-center justify-center gap-3">
          <MoonStar className="w-10 h-10 text-secondary" /> Daily Horoscope
        </h1>
        <p className="text-gray-400 text-lg">Select your zodiac sign to read your personalized AI daily prediction.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full mb-12">
        {zodiacSigns.map((sign) => (
          <button
            key={sign}
            onClick={() => getHoroscope(sign)}
            className={`p-4 rounded-2xl glass-panel text-center transition-all duration-300 ${
              selectedSign === sign
                ? 'bg-secondary/20 border-secondary scale-105 shadow-[0_0_15px_rgba(255,0,255,0.3)]'
                : 'hover:bg-white/10 hover:border-white/20'
            }`}
          >
            <span className="font-bold text-gray-200">{sign}</span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="w-full max-w-2xl text-center py-12">
           <div className="animate-spin text-secondary mx-auto mb-4 w-8 h-8 rounded-full border-b-2 border-secondary"></div>
           <p className="text-gray-400 animate-pulse">Reading the stars for {selectedSign}...</p>
        </div>
      )}

      {error && (
        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 mb-8">
          <AlertCircle />
          <p>{error}</p>
        </div>
      )}

      {prediction && !isLoading && (
        <GlassCard className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

          <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-pink-500">
              {String(prediction.sign)}
            </h2>
            <span className="text-sm text-gray-500">{String(prediction.date)}</span>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-lg text-gray-300 leading-relaxed italic border-l-4 border-secondary pl-4">
                &quot;{String(prediction.dailyMessage)}&quot;
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div className="bg-black/30 p-3 rounded-lg text-center border border-white/5">
                 <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Lucky Color</span>
                 <span className="font-semibold text-gray-200">{String(prediction.luckyColor)}</span>
               </div>
               <div className="bg-black/30 p-3 rounded-lg text-center border border-white/5">
                 <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Lucky Number</span>
                 <span className="font-semibold text-gray-200">{String(prediction.luckyNumber)}</span>
               </div>
               <div className="bg-black/30 p-3 rounded-lg text-center border border-white/5">
                 <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Mood</span>
                 <span className="font-semibold text-gray-200">{String(prediction.mood)}</span>
               </div>
               <div className="bg-black/30 p-3 rounded-lg text-center border border-white/5">
                 <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Compatibility</span>
                 <span className="font-semibold text-gray-200">{String(prediction.compatibility)}</span>
               </div>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
