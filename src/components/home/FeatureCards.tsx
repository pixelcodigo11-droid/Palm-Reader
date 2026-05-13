"use client";

import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Hand, MoonStar, HeartHandshake, Eye, Sparkles, Binary } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    title: "AI Palm Reading",
    description: "Upload a photo of your palm and let our AI analyze your life, heart, and career lines with high precision.",
    icon: <Hand className="w-10 h-10 text-primary mb-4" />,
    link: "/palm-scanner"
  },
  {
    title: "Daily Horoscopes",
    description: "Get personalized daily, weekly, and monthly insights based on your exact birth chart and planetary alignments.",
    icon: <MoonStar className="w-10 h-10 text-secondary mb-4" />,
    link: "/horoscope"
  },
  {
    title: "Zodiac Compatibility",
    description: "Analyze the energetic and emotional connection between you and your partner using advanced AI matching.",
    icon: <HeartHandshake className="w-10 h-10 text-pink-500 mb-4" />,
    link: "/compatibility"
  },
  {
    title: "Aura & Face Reading",
    description: "Upload a selfie to detect your current aura color, emotional state, and hidden personality traits.",
    icon: <Eye className="w-10 h-10 text-accent mb-4" />,
    link: "/face-reading"
  },
  {
    title: "Interactive Tarot",
    description: "Draw cards from a mystical digital deck and receive instant, AI-guided interpretations for your life questions.",
    icon: <Sparkles className="w-10 h-10 text-yellow-400 mb-4" />,
    link: "/tarot"
  },
  {
    title: "Numerology & Angles",
    description: "Discover your life path number and decode the secret meanings behind the angel numbers you keep seeing.",
    icon: <Binary className="w-10 h-10 text-green-400 mb-4" />,
    link: "/numerology"
  }
];

export function FeatureCards() {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Unlock the Mystical Universe</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">Explore our suite of AI-powered spiritual tools designed to give you clarity, guidance, and a glimpse into your future.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard className="h-full flex flex-col cursor-pointer group">
              <div className="flex-1">
                {feature.icon}
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
              <div className="mt-6">
                <Link href={feature.link} className="text-accent font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Try it now &rarr;
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
