import { Award, Music2, Users, Calendar } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Music2,
      number: "40.000+",
      label: "Koleksi Musik",
      description: "Item dari berbagai era",
    },
    {
      icon: Calendar,
      number: "15+",
      label: "Tahun Beroperasi",
      description: "Sejak 2009",
    },
    {
      icon: Users,
      number: "Ribuan",
      label: "Pengunjung Tahunan",
      description: "Dari berbagai kalangan",
    },
    {
      icon: Award,
      number: "Tipe B",
      label: "Sertifikasi Museum",
      description: "Kemendikbud 2020",
    },
  ];

  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-primary-foreground animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-primary-foreground/80">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
