import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, User, Mail, Phone, Calendar, Ticket, CreditCard } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const TicketSuccess = ({ ticket, clientKey }) => {
  const { toast } = useToast();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  if (!ticket) {
    useEffect(() => {
      router.visit("/tickets");
    }, []);
    return null;
  }

  const handlePayment = () => {
    if (!ticket.snap_token) {
      toast({
        title: "Error",
        description: "Token pembayaran tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentLoading(true);

    window.snap.pay(ticket.snap_token, {
      onSuccess: function(result) {
        toast({
          title: "Pembayaran Berhasil!",
          description: "Terima kasih, tiket Anda sudah dikonfirmasi.",
        });
        router.reload();
      },
      onPending: function(result) {
        toast({
          title: "Menunggu Pembayaran",
          description: "Silakan selesaikan pembayaran Anda.",
        });
        setIsPaymentLoading(false);
      },
      onError: function(result) {
        toast({
          title: "Pembayaran Gagal",
          description: "Silakan coba lagi atau pilih metode pembayaran lain.",
          variant: "destructive",
        });
        setIsPaymentLoading(false);
      },
      onClose: function() {
        setIsPaymentLoading(false);
      }
    });
  };

  return (
    <PublicLayout>
      <main className="flex-1 pt-40 pb-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Pemesanan Tiket Berhasil!</h1>
            <p className="text-muted-foreground">
              {ticket.status === "pending" 
                ? "Silakan selesaikan pembayaran untuk mengkonfirmasi tiket Anda."
                : "Terima kasih atas pemesanan Anda. Simpan konfirmasi ini untuk ditunjukkan saat kunjungan."}
            </p>
          </div>

          {/* Ticket Details */}
          <Card className="p-6 bg-card border-border mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nomor Tiket</p>
                <p className="font-mono font-semibold text-foreground">#{ticket.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  ticket.status === "pending"
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    : ticket.status === "confirmed" || ticket.status === "paid"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {ticket.status === "pending" ? "Menunggu Pembayaran" : 
                   ticket.status === "confirmed" || ticket.status === "paid" ? "Dikonfirmasi" : ticket.status}
                </span>
              </div>
            </div>

            {/* Visitor Info */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Informasi Pengunjung</h2>
              <div className="space-y-3 bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Nama Pengunjung</p>
                    <p className="text-sm text-muted-foreground">{ticket.visitor_name}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <p className="text-sm text-muted-foreground">{ticket.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Nomor Telepon</p>
                    <p className="text-sm text-muted-foreground">{ticket.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Tanggal Kunjungan</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ticket.visit_date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Ticket className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Jumlah Tiket</p>
                    <p className="text-sm text-muted-foreground">{ticket.quantity} tiket</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total Pembayaran</span>
                <span className="text-2xl font-bold text-primary">
                  Rp {ticket.total_price.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {ticket.status === "pending" && ticket.snap_token && (
              <Button
                variant="heritage"
                size="lg"
                className="flex-1"
                onClick={handlePayment}
                disabled={isPaymentLoading}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                {isPaymentLoading ? "Memproses..." : "Bayar Sekarang"}
              </Button>
            )}
            <Button
              variant={ticket.status === "pending" ? "outline" : "heritage"}
              size="lg"
              className="flex-1"
              onClick={() => router.visit("/tickets")}
            >
              Pesan Tiket Lagi
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => router.visit("/")}
            >
              Kembali ke Beranda
            </Button>
          </div>

          {/* Important Information */}
          <Card className="p-6 bg-card border-border">
            <h3 className="font-semibold text-foreground mb-3">Informasi Penting</h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
              <li>Simpan nomor tiket ini untuk ditunjukkan saat kunjungan</li>
              <li>Harap datang 15 menit sebelum waktu kunjungan</li>
              <li>Tiket yang sudah dibeli tidak dapat dibatalkan atau dikembalikan</li>
              <li>Tunjukkan konfirmasi ini (cetak atau digital) di loket tiket</li>
              <li>Untuk pertanyaan lebih lanjut, hubungi kami di 0812-3456-7890</li>
            </ul>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Dipesan pada: {new Date(ticket.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </p>
            </div>
          </Card>
        </div>
      </main>
    </PublicLayout>
  );
};

export default TicketSuccess;
