import { useState } from "react";
import { router } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ChevronRight } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const News = ({ news = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "Kerjasama", "Media Partner", "Event", "Pengumuman"];

  const filteredNews = selectedCategory === "Semua"
    ? news
    : news.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category) => {
    const colors = {
      "Kerjasama": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Media Partner": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      "Event": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Pengumuman": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  return (
    <PublicLayout>
      <main className="flex-1 pt-20 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Berita & Informasi
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Informasi terbaru tentang kerjasama, event, dan pengumuman dari Museum Musik Indonesia
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "heritage" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* News Grid */}
          {filteredNews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Belum ada berita untuk kategori ini.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <Card
                  key={item.id}
                  className="group overflow-hidden hover:shadow-elegant transition-all duration-300 cursor-pointer bg-card border-border"
                  onClick={() => router.visit(`/news/${item.id}`)}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gradient-accent">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-primary/30" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(item.published_date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>{item.author}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-gradient-primary text-white border-none">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Tertarik Bekerjasama?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Kami membuka peluang kerjasama untuk institusi, komunitas, dan media. 
                Mari bersama-sama melestarikan warisan musik Indonesia.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = 'mailto:kerjasama@museummusik.id'}
                >
                  Email Kami
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                  onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                >
                  WhatsApp
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default News;
