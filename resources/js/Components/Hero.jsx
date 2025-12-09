import { Music2, MapPin } from "lucide-react";
import { Button } from "@/Components/ui/button";

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/img/hero-museum.webp')" }}
      >
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Gradient overlay at top for navbar visibility */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        <div className="flex justify-center mb-6">
          <Music2 className="w-16 h-16 text-gold animate-fade-in" />
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          Museum Musik Indonesia
        </h1>

        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto animate-fade-in">
          Museum Musik Pertama di Indonesia
        </p>

        <div className="flex items-center justify-center gap-2 text-primary-foreground/80 mb-10 animate-fade-in">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">Malang, Jawa Timur</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <Button
            variant="gold"
            size="lg"
            onClick={() => scrollToSection("visit")}
          >
            Rencanakan Kunjungan
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("about")}
            className="bg-background/10 backdrop-blur-sm border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            Tentang Museum
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
