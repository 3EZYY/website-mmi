import { Headphones, GraduationCap, Guitar, Heart } from "lucide-react";
import { Card } from "@/Components/ui/card";

const Experience = () => {
  const experiences = [
    {
      icon: GraduationCap,
      title: "Edukasi Musik",
      description: "Pelajari kronologi sejarah musik nusantara dan mancanegara secara komprehensif",
    },
    {
      icon: Headphones,
      title: "Sesi Mendengarkan",
      description: "Dengarkan koleksi musik langsung dengan bantuan staf museum yang ramah",
    },
    {
      icon: Guitar,
      title: "Persewaan Alat Musik",
      description: "Coba mainkan berbagai alat musik yang tersedia untuk pengunjung",
    },
    {
      icon: Heart,
      title: "Nostalgia",
      description: "Kenang masa lalu melalui koleksi musik jadul dari berbagai era",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pengalaman di Museum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nikmati berbagai aktivitas dan pengalaman interaktif yang kami tawarkan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-6">
              {experiences.map((item, index) => (
                <Card 
                  key={index}
                  className="p-6 hover:shadow-medium transition-smooth bg-card border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-medium">
              <img 
  src="/img/experience-listening.webp" 
  alt="Listening Experience"
  className="w-full h-full object-cover"
/>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-primary text-primary-foreground p-8 md:p-12 border-none">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">
              Wisata Edukasi yang Berkesan
            </h3>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
              Museum Musik Indonesia bukan hanya tempat untuk melihat koleksi, 
              tetapi juga ruang interaktif di mana pengunjung dapat mendengarkan, 
              belajar, dan merasakan langsung perjalanan musik Indonesia. 
              Sempurna untuk wisata keluarga, pelajar, dan pencinta musik dari segala usia.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Experience;
