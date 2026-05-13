"use client";

import { motion } from 'framer-motion';
import { GlowingButton } from '../ui/GlowingButton';
import { ScanFace, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 text-accent text-sm font-medium">
          <Sparkles size={16} />
          <span>Next-Gen AI Fortune Teller</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Discover Your Future with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent glow-text">
            Spiritual Intelligence
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Unlock hidden secrets in your palm, analyze your aura, and predict your destiny using cutting-edge AI and ancient wisdom.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <GlowingButton className="flex items-center gap-2 text-lg">
            <ScanFace size={20} />
            Scan Your Palm Now
          </GlowingButton>
          <GlowingButton variant="secondary" className="text-lg">
            Get Daily Horoscope
          </GlowingButton>
        </div>
      </motion.div>

      {/* Decorative floating elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-1/4 opacity-30 text-6xl"
      >
        ✨
      </motion.div>
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 md:right-1/4 opacity-30 text-6xl"
      >
        🔮
      </motion.div>
    </section>
  );
}
