"use client";

import { useState } from "react";
import { Upload, ScanLine, Sparkles, AlertCircle } from "lucide-react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { GlassCard } from "@/components/ui/GlassCard";

interface Result {
  scores: {
    life: number;
    heart: number;
    career: number;
  };
  details: {
    life: string;
    heart: string;
    career: string;
  };
  summary: string;
}

export default function PalmScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!imagePreview) return;
    setIsScanning(true);
    setError(null);
    try {
      // Dummy API call
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imagePreview }),
      });
      if (!res.ok) throw new Error("Failed to analyze image");
      const data = await res.json();
      setResult(data as Result);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unexpected error occurred.");
      }
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">AI Palm Scanner</h1>
        <p className="text-gray-400 text-lg">Upload a clear photo of your dominant hand to reveal hidden truths.</p>
      </div>

      <GlassCard className="w-full max-w-2xl mb-8 flex flex-col items-center">
        {!imagePreview ? (
          <label className="w-full h-64 border-2 border-dashed border-primary/50 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors group">
            <Upload className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <span className="text-lg font-medium text-gray-300">Click to upload your palm photo</span>
            <span className="text-sm text-gray-500 mt-2">JPEG, PNG, or WebP</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
          </label>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden mb-6 border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Palm Preview" className="w-full h-full object-cover" />
              {isScanning && (
                <>
                  <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent shadow-[0_0_15px_rgba(0,255,255,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full font-bold animate-pulse text-accent">
                        <ScanLine className="animate-spin" /> Analyzing lines...
                     </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-4">
               <button
                 onClick={() => { setImagePreview(null); setResult(null); }}
                 disabled={isScanning}
                 className="px-6 py-2 rounded-full border border-gray-600 hover:bg-white/5 transition disabled:opacity-50"
               >
                 Change Image
               </button>
               <GlowingButton onClick={startScan} disabled={isScanning}>
                 {isScanning ? "Scanning..." : "Reveal Destiny"}
               </GlowingButton>
            </div>
          </div>
        )}
      </GlassCard>

      {error && (
        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 mb-8">
          <AlertCircle />
          <p>{error}</p>
        </div>
      )}

      {result && (
        <GlassCard className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-accent">
            <Sparkles /> Your Palm Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="font-semibold text-primary mb-1">Life Line Score</h3>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{ width: `${result.scores.life}%` }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{result.details.life}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="font-semibold text-secondary mb-1">Heart Line Score</h3>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-secondary to-pink-500 h-2 rounded-full" style={{ width: `${result.scores.heart}%` }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{result.details.heart}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="font-semibold text-accent mb-1">Career Line Score</h3>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-accent to-blue-500 h-2 rounded-full" style={{ width: `${result.scores.career}%` }}></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{result.details.career}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl flex flex-col justify-center h-full">
                 <h3 className="font-semibold mb-2 text-gray-300">Summary</h3>
                 <p className="text-sm text-gray-400 leading-relaxed italic">&quot;{result.summary}&quot;</p>
              </div>
            </div>
          </div>
        </GlassCard>
      )}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
      `}} />
    </div>
  );
}
