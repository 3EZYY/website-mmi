import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Calendar } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CollectionsGallery = ({ collections = [], currentFilter = 'all' }) => {
  const [selectedCollection, setSelectedCollection] = useState(null);

  const filters = [
    { key: 'all', label: 'Semua Koleksi' },
    { key: 'Traditional', label: 'Tradisional' },
    { key: 'Modern', label: 'Modern' },
  ];

  const handleFilter = (category) => {
    const url = category === 'all' ? '/collections' : `/collections?category=${category}`;
    router.get(url, {}, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <PublicLayout>
      <Head title="Galeri Koleksi Alat Musik" />

      <main className="flex-1 pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Galeri Koleksi Alat Musik
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Jelajahi koleksi alat musik tradisional dan modern dari seluruh nusantara
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={currentFilter === filter.key ? "default" : "outline"}
                  onClick={() => handleFilter(filter.key)}
                  className={`transition-all duration-300 ${
                    currentFilter === filter.key
                      ? "bg-primary text-primary-foreground shadow-lg scale-105"
                      : "hover:bg-primary/10"
                  }`}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {collections.length === 0 ? (
            <Card className="p-12 text-center bg-card">
              <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Belum ada koleksi tersedia</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {collections.map((collection) => (
                <Card
                  key={collection.id}
                  className="overflow-hidden bg-card border-border group cursor-pointer hover:shadow-medium transition-smooth"
                  onClick={() => setSelectedCollection(collection)}
                >
                  <div className="h-64 bg-gradient-accent overflow-hidden">
                    {collection.thumbnail ? (
                      <img
                        src={collection.thumbnail}
                        alt={collection.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-24 h-24 text-primary/30" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {collection.name}
                      </h3>
                      {collection.year && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {collection.year}
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {collection.category}
                      </span>
                    </div>

                    {collection.origin && (
                      <p className="text-sm text-muted-foreground mb-2">
                        Asal: {collection.origin}
                      </p>
                    )}

                    <p className="text-muted-foreground line-clamp-2">
                      {collection.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedCollection} onOpenChange={() => setSelectedCollection(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedCollection?.name}</DialogTitle>
            <DialogDescription>
              {selectedCollection?.category} • {selectedCollection?.origin}
            </DialogDescription>
          </DialogHeader>

          {selectedCollection && (
            <div className="space-y-4">
              {selectedCollection.thumbnail && (
                <div className="w-full h-96 rounded-lg overflow-hidden">
                  <img
                    src={selectedCollection.thumbnail}
                    alt={selectedCollection.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="font-bold text-lg mb-2">Deskripsi</h4>
                <p className="text-muted-foreground">{selectedCollection.description}</p>
              </div>

              {selectedCollection.history && (
                <div>
                  <h4 className="font-bold text-lg mb-2">Sejarah</h4>
                  <p className="text-muted-foreground">{selectedCollection.history}</p>
                </div>
              )}

              {selectedCollection.year && (
                <div>
                  <h4 className="font-bold text-lg mb-2">Tahun</h4>
                  <p className="text-muted-foreground">{selectedCollection.year}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PublicLayout>
  );
};

export default CollectionsGallery;
