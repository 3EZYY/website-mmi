import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "@/Layouts/PublicLayout";

const NewsDetail = ({ news }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.excerpt,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link Disalin!",
        description: "Link berita telah disalin ke clipboard.",
      });
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Kerjasama": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      "Media Partner": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
      "Event": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      "Pengumuman": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  if (!news) return null;

  return (
    <PublicLayout>
      <main className="flex-1 pt-20 pb-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <Button
            variant="outline"
            onClick={() => router.visit("/news")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Berita
          </Button>

          {/* Article */}
          <Card className="overflow-hidden bg-card border-border">
            {/* Featured Image */}
            {news.image_url && (
              <div className="w-full h-96 overflow-hidden bg-gradient-accent">
                <img
                  src={news.image_url}
                  alt={news.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Category Badge */}
              <Badge className={`${getCategoryColor(news.category)} mb-4`}>
                {news.category}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {news.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{news.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(news.published_date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="ml-auto"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Bagikan
                </Button>
              </div>

              {/* Excerpt */}
              <p className="text-lg text-muted-foreground font-medium mb-6 italic">
                {news.excerpt}
              </p>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none text-foreground">
                {news.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Contact CTA */}
              {(news.category === "Kerjasama" || news.category === "Media Partner") && (
                <Card className="mt-12 p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    Tertarik untuk {news.category === "Kerjasama" ? "Bekerjasama" : "Menjadi Media Partner"}?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Hubungi kami untuk informasi lebih lanjut dan diskusi kerjasama.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="heritage"
                      onClick={() => window.location.href = 'mailto:kerjasama@museummusik.id'}
                    >
                      Email: kerjasama@museummusik.id
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open('https://wa.me/6281234567890', '_blank')}
                    >
                      WhatsApp: 0812-3456-7890
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        </div>
      </main>
    </PublicLayout>
  );
};

export default NewsDetail;
