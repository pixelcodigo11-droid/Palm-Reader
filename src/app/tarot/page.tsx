"use client";

import { useState } from "react";
import { Sparkles, AlertCircle } from "lucide-react";
import { GlowingButton } from "@/components/ui/GlowingButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { motion } from "framer-motion";

interface Card {
  name: string;
  position: string;
  meaning: string;
}

interface Result {
  cards: Card[];
  aiInterpretation: string;
}

export default function TarotReading() {
  const [question, setQuestion] = useState("");
  const [isReading, setIsReading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const drawCards = async () => {
    setIsReading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/tarot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) throw new Error("Failed to consult the cards.");
      const data = await res.json();
      setResult(data as Result);
    } catch (err: Error | unknown) {
      if (err instanceof Error) {
          setError(err.message);
      } else {
          setError("An unexpected error occurred.");
      }
    } finally {
      setIsReading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-yellow-400" /> Interactive Tarot
        </h1>
        <p className="text-gray-400 text-lg">Focus on a question and draw 3 cards for a past, present, and future reading.</p>
      </div>

      <GlassCard className="w-full max-w-2xl mb-12">
         <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="What is your question? (Optional)"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary transition-colors"
            />
            <GlowingButton onClick={drawCards} disabled={isReading} className="w-full">
               {isReading ? "Consulting the deck..." : "Draw 3 Cards"}
            </GlowingButton>
         </div>
      </GlassCard>

      {error && (
        <div className="w-full max-w-2xl bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-400 mb-8">
          <AlertCircle />
          <p>{error}</p>
        </div>
      )}

      {isReading && (
         <div className="flex gap-4 mb-12">
            {[1, 2, 3].map((i) => (
                <motion.div
                   key={i}
                   animate={{ y: [0, -20, 0] }}
                   transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                   className="w-24 h-36 md:w-32 md:h-48 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-purple-900 to-indigo-900 shadow-[0_0_15px_rgba(138,43,226,0.3)]"
                />
            ))}
         </div>
      )}

      {result && !isReading && (
        <div className="w-full flex flex-col items-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
               {result.cards.map((card, index) => (
                   <motion.div
                      key={index}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.3 }}
                   >
                       <GlassCard className="h-full text-center flex flex-col items-center">
                          <span className="text-xs uppercase tracking-widest text-primary mb-2 font-bold">{card.position}</span>
                          <div className="w-full aspect-[2/3] bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center border border-white/5">
                              <span className="text-xl font-serif glow-text">{card.name}</span>
                          </div>
                          <p className="text-sm text-gray-400 italic">&quot;{card.meaning}&quot;</p>
                       </GlassCard>
                   </motion.div>
               ))}
            </div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.2, duration: 0.8 }}
               className="w-full"
            >
               <GlassCard className="w-full bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-accent">
                     <Sparkles /> AI Interpretation
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                     {result.aiInterpretation}
                  </p>
               </GlassCard>
            </motion.div>
        </div>
      )}
    </div>
  );
}
