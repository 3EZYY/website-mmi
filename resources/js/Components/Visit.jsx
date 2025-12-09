import { MapPin, Clock, Ticket, Phone } from "lucide-react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

const Visit = () => {
  const visitInfo = [
    {
      icon: MapPin,
      title: "Lokasi",
      details: [
        "Gedung Kesenian Gajayana, Lantai 2",
        "Jl. Nusakambangan No. 19",
        "Kota Malang, Jawa Timur",
      ],
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: [
        "Setiap Hari",
        "10.00 - 17.00 WIB",
        "Termasuk Hari Libur",
      ],
    },
    {
      icon: Ticket,
      title: "Harga Tiket",
      details: [
        "Rp 5.000 / orang",
        "Harga Terjangkau",
        "Untuk Semua Kalangan",
      ],
    },
  ];

  return (
    <section id="visit" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Informasi Kunjungan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Rencanakan kunjungan Anda ke Museum Musik Indonesia
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {visitInfo.map((item, index) => (
            <Card 
              key={index}
              className="p-8 text-center hover:shadow-medium transition-smooth bg-card border-border"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              
              {item.details.map((detail, idx) => (
                <p key={idx} className="text-muted-foreground mb-1">
                  {detail}
                </p>
              ))}
            </Card>
          ))}
        </div>

        <div className="bg-gradient-accent rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Cara Menuju Museum
              </h3>
              <p className="text-muted-foreground mb-6">
                Museum Musik Indonesia terletak di pusat Kota Malang, mudah diakses 
                dengan berbagai moda transportasi. Gedung Kesenian Gajayana berada 
                di lokasi strategis yang dapat dijangkau dari berbagai penjuru kota.
              </p>
              <Button asChild variant="heritage" size="lg">
                <a
                  href="https://maps.app.goo.gl/nNfPJVhmbBrfL3mu7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center"
                >
                  <MapPin className="mr-2" />
                  Buka di Google Maps
                </a>
              </Button>
            </div>

            <Card className="p-6 bg-card border-border">
              <h4 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                Tips Berkunjung
              </h4>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Datang lebih awal untuk menikmati koleksi dengan tenang</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Jangan ragu bertanya kepada staf untuk memutarkan koleksi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Cocok untuk wisata keluarga dan edukasi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tersedia persewaan alat musik</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Visit;
