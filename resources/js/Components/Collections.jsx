import { Disc3, Music, BookOpen, Camera } from "lucide-react";
import { Card } from "@/Components/ui/card";

const Collections = () => {
  const collections = [
    {
      icon: Disc3,
      title: "Media Rekaman",
      description: "Piringan hitam, kaset pita, CD, vinyl, VCD, dan DVD dari berbagai era",
      image: "/img/collections-vinyl.webp",
    },
    {
      icon: Music,
      title: "Alat Musik",
      description: "Beragam instrumen musik tradisional dan modern dari seluruh nusantara",
      image: "/img/instruments-traditional.webp",
    },
    {
      icon: BookOpen,
      title: "Dokumen Bersejarah",
      description: "Majalah, buku, dan dokumentasi musik yang bernilai historis",
      image: "/img/dokumen-bersejarah.webp",
    },
    {
      icon: Camera,
      title: "Koleksi Digital",
      description: "Foto-foto musisi legendar dan dokumentasi digital",
      image: "/img/koleksi-digital.webp",
    },
  ];

  return (
    <section id="collections" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Koleksi Museum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Puluhan ribu koleksi musik dari berbagai era, sebagian besar dari sumbangan masyarakat
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((item, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-medium transition-smooth bg-card border-border group"
            >
              {item.image ? (
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
              ) : (
                <div className="h-64 bg-gradient-accent flex items-center justify-center">
                  <item.icon className="w-24 h-24 text-primary/30" />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {item.title}
                  </h3>
                </div>
                
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-card rounded-2xl p-8 border border-border shadow-soft">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Fokus Lokal Malang Raya
              </h3>
              <p className="text-muted-foreground">
                Museum memiliki area khusus yang memajang foto dan memorabilia 
                musisi-musisi legendaris dari Malang Raya, menghormati kontribusi 
                mereka dalam perkembangan musik Indonesia.
              </p>
            </div>
            <div className="w-full md:w-48 h-32 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Camera className="w-16 h-16 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;
