import { Link } from "@inertiajs/react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { Calendar, ArrowRight, Newspaper } from "lucide-react";

const NewsEvents = ({ news = [] }) => {

  const getCategoryColor = (category) => {
    const colors = {
      Event: "bg-gradient-to-r from-purple-500 to-pink-500",
      Workshop: "bg-gradient-to-r from-blue-500 to-cyan-500",
      Kerjasama: "bg-gradient-to-r from-green-500 to-emerald-500",
      "Media Partner": "bg-gradient-to-r from-orange-500 to-red-500",
      Kegiatan: "bg-gradient-to-r from-yellow-500 to-amber-500",
    };
    return colors[category] || "bg-gradient-to-r from-gray-500 to-slate-500";
  };

  if (!news || news.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Newspaper className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Berita & Event</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Kabar Terbaru
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ikuti berbagai event, workshop, dan kegiatan menarik dari Museum Musik Indonesia
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {news.map((item, index) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Card
                className="group cursor-pointer overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
              <div className="relative h-48 overflow-hidden">
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <Newspaper className="w-16 h-16 text-primary/30" />
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(item.category)} text-white border-0 shadow-lg`}>
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(item.published_date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.excerpt}
                </p>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link href="/news">
            <Button
              size="lg"
              className="group gap-2 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Lihat Semua Berita
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;