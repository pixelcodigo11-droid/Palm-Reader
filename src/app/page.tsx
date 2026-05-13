import { Hero } from "@/components/home/Hero";
import { FeatureCards } from "@/components/home/FeatureCards";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <Hero />
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent my-10"></div>
      <FeatureCards />
    </div>
  );
}
