import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StoryHighlights from "@/components/StoryHighlights";
import Products from "@/components/Products";
import Atmosphere from "@/components/Atmosphere";
import AboutTorben from "@/components/AboutTorben";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import LocationHours from "@/components/LocationHours";
import ContactNewsletter from "@/components/ContactNewsletter";
import Footer from "@/components/Footer";
import MouseGlow from "@/components/MouseGlow";
import Particles from "@/components/Particles";
import AmbientSound from "@/components/AmbientSound";
import HyggeStatus from "@/components/HyggeStatus";
import TonightAtLarsen from "@/components/TonightAtLarsen";
import HyggeEasterEgg from "@/components/HyggeEasterEgg";
import WeatherSync from "@/components/WeatherSync";

export default function Landing() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-50" data-testid="landing-root">
      {loading && <Loader />}
      <MouseGlow />
      <Particles />

      {/* Floating gradient orbs (light leaks) — fixed so they don't extend scroll */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="light-leak bg-amber-500/25 w-[500px] h-[500px] top-[20%] -left-40" />
        <div className="light-leak bg-orange-600/20 w-[600px] h-[600px] top-[80%] right-[-100px]" />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero />
        <StoryHighlights />
        <TonightAtLarsen />
        <Products />
        <Atmosphere />
        <AboutTorben />
        <Reviews />
        <Gallery />
        <LocationHours />
        <ContactNewsletter />
      </main>
      <Footer />
      <AmbientSound />
      <HyggeStatus />
      <HyggeEasterEgg />
      <WeatherSync />
    </div>
  );
}
