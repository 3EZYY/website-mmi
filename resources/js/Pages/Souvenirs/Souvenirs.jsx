import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const Souvenirs = ({ souvenirs = [], auth }) => {
  const [cart, setCart] = useState({});
  const { toast } = useToast();

  const updateCart = (id, change) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const newValue = current + change;
      if (newValue <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: newValue };
    });
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [id, quantity]) => {
      const souvenir = souvenirs.find((s) => s.id === id);
      return total + (souvenir?.price || 0) * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    if (!auth.user) {
      toast({
        title: "Perlu Login",
        description: "Silakan login terlebih dahulu untuk membeli souvenir",
      });
      router.visit("/login");
      return;
    }

    if (Object.keys(cart).length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan item ke keranjang terlebih dahulu",
      });
      return;
    }

    router.visit("/checkout", {
      data: { cart, souvenirs },
      preserveState: true,
    });
  };

  return (
    <PublicLayout>
      <main className="flex-1 pt-32 pb-16 bg-gradient-to-br from-muted/30 via-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Souvenir Museum
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Koleksi merchandise dan souvenir eksklusif Museum Musik Indonesia
            </p>
          </div>

          {souvenirs.length === 0 ? (
            <Card className="p-12 text-center bg-card">
              <p className="text-muted-foreground">Belum ada souvenir tersedia</p>
            </Card>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {souvenirs.map((souvenir) => (
                  <Card key={souvenir.id} className="overflow-hidden bg-card border-border group hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-72 bg-gradient-accent overflow-hidden">
                      {souvenir.image_url ? (
                        <img
                          src={souvenir.image_url}
                          alt={souvenir.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                          <ShoppingCart className="w-24 h-24 text-primary/30" />
                        </div>
                      )}
                      {souvenir.stock < 10 && souvenir.stock > 0 && (
                        <div className="absolute top-4 right-4 bg-heritage text-heritage-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-soft">
                          Stok Terbatas
                        </div>
                      )}
                      {souvenir.stock === 0 && (
                        <div className="absolute inset-0 bg-foreground/80 flex items-center justify-center">
                          <span className="text-background text-xl font-bold">Stok Habis</span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-xl font-bold text-foreground leading-tight">
                            {souvenir.name}
                          </h3>
                          <span className="px-2 py-1 bg-gold/10 text-gold text-xs font-medium rounded-md whitespace-nowrap">
                            {souvenir.category}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {souvenir.description}
                        </p>
                      </div>
                      
                      <div className="flex items-baseline gap-2">
                        <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                          Rp {souvenir.price.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          • {souvenir.stock} tersedia
                        </p>
                      </div>

                      <div className="pt-4 border-t border-border">
                        {cart[souvenir.id] > 0 ? (
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCart(souvenir.id, -1)}
                                className="h-9 w-9 p-0"
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-bold text-lg text-foreground">
                                {cart[souvenir.id]}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCart(souvenir.id, 1)}
                                disabled={cart[souvenir.id] >= souvenir.stock}
                                className="h-9 w-9 p-0"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-sm font-semibold text-primary">
                              Rp {((souvenir.price || 0) * cart[souvenir.id]).toLocaleString()}
                            </p>
                          </div>
                        ) : (
                          <Button
                            onClick={() => updateCart(souvenir.id, 1)}
                            disabled={souvenir.stock === 0}
                            variant="heritage"
                            className="w-full"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Tambah ke Keranjang
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {Object.keys(cart).length > 0 && (
                <Card className="p-8 bg-gradient-to-r from-card to-card/95 border-primary/20 sticky bottom-4 shadow-medium backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-soft">
                        <ShoppingCart className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Total Pembelian</p>
                        <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                          Rp {getTotalPrice().toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {Object.values(cart).reduce((a, b) => a + b, 0)} item dalam keranjang
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleCheckout} variant="heritage" size="lg" className="text-lg px-8 py-6 shadow-soft hover:shadow-medium transition-all">
                      Lanjut ke Checkout
                    </Button>
                  </div>
                </Card>
              )}
            </>
          )}
        </div>
      </main>
    </PublicLayout>
  );
};

export default Souvenirs;
