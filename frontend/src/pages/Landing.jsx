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

      {/* Floating gradient orbs (light leaks) */}
      <div className="light-leak bg-amber-500/25 w-[500px] h-[500px] top-[20%] -left-40" />
      <div className="light-leak bg-orange-600/20 w-[600px] h-[600px] top-[80%] right-[-100px]" />
      <div className="light-leak bg-amber-400/10 w-[700px] h-[700px] top-[160%] left-[30%]" />

      <Header />
      <main className="relative z-10">
        <Hero />
        <StoryHighlights />
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
    </div>
  );
}
