import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Ticket, User } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";
import { z } from "zod";

const ticketSchema = z.object({
  visitor_name: z.string().min(3, "Nama minimal 3 karakter"),
  email: z.string().email("Email tidak valid"),
  phone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  visit_date: z.string().min(1, "Tanggal kunjungan harus diisi"),
  quantity: z.number().min(1, "Minimal 1 tiket"),
});

const Tickets = ({ auth }) => {
  const [formData, setFormData] = useState({
    visitor_name: "",
    email: auth.user?.email || "",
    phone: "",
    visit_date: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const TICKET_PRICE = 10000;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = ticketSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        title: "Error",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    router.post(
      "/tickets",
      {
        visitor_name: formData.visitor_name,
        email: formData.email,
        phone: formData.phone,
        visit_date: formData.visit_date,
        quantity: formData.quantity,
        total_price: formData.quantity * TICKET_PRICE,
      },
      {
        onSuccess: () => {
          toast({
            title: "Berhasil!",
            description: "Tiket berhasil dipesan.",
          });
        },
        onError: (errors) => {
          toast({
            title: "Error",
            description: errors.message || "Gagal memesan tiket",
            variant: "destructive",
          });
        },
        onFinish: () => {
          setLoading(false);
        },
      }
    );
  };

  return (
    <PublicLayout>
      <main className="flex-1 pt-32 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pesan Tiket Museum
            </h1>
            <p className="text-lg text-muted-foreground">
              Harga tiket: Rp {TICKET_PRICE.toLocaleString()} per orang
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              🕐 Jam Operasional: Setiap hari, 10:00 - 17:00 WIB
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="p-8 bg-card border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="visitor_name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nama Pengunjung
                  </Label>
                  <Input
                    id="visitor_name"
                    value={formData.visitor_name}
                    onChange={(e) => setFormData({ ...formData, visitor_name: e.target.value })}
                    placeholder="Nama lengkap"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="nama@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor Telepon</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visit_date" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Tanggal Kunjungan
                  </Label>
                  <Input
                    id="visit_date"
                    type="date"
                    value={formData.visit_date}
                    onChange={(e) => setFormData({ ...formData, visit_date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity" className="flex items-center gap-2">
                    <Ticket className="w-4 h-4" />
                    Jumlah Tiket
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    required
                  />
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Pembayaran:</span>
                    <span className="text-primary">
                      Rp {(formData.quantity * TICKET_PRICE).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  variant="heritage"
                >
                  {loading ? "Memproses..." : "Pesan Tiket"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Tickets;
