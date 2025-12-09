import { Calendar, Award, Building2 } from "lucide-react";
import { Card } from "@/Components/ui/card";

const About = () => {
  const timeline = [
    {
      year: "2009",
      title: "Berdirinya GMB",
      description: "Didirikan sebagai Galeri Malang Bernyanyi oleh para pecinta musik",
      icon: Calendar,
    },
    {
      year: "2015",
      title: "Transformasi",
      description: "GMB bertransformasi menjadi Museum Musik Indonesia",
      icon: Building2,
    },
    {
      year: "2016",
      title: "Peresmian",
      description: "Diresmikan pada 19 November di Gedung Kesenian Gajayana",
      icon: Building2,
    },
    {
      year: "2020",
      title: "Sertifikasi",
      description: "Mendapat sertifikasi Museum Tipe B dari Kemendikbud",
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sejarah Museum
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perjalanan Museum Musik Indonesia dari koleksi pribadi hingga menjadi 
            pusat dokumentasi musik nasional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {timeline.map((item, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-medium transition-smooth bg-card border-border hover:border-primary/50"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <div className="text-3xl font-bold text-primary mb-2">
                  {item.year}
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-accent rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Misi Kami
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Museum Musik Indonesia berkomitmen menjadi pusat dokumentasi dan pelestarian 
              sejarah musik Indonesia. Dengan koleksi puluhan ribu item dari berbagai era, 
              kami berupaya menjaga warisan musik nusantara dan memberikan pengalaman 
              edukatif yang berkesan bagi setiap pengunjung.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
