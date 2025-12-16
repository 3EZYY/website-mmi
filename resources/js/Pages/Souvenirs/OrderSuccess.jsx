import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, MapPin, Phone, Calendar, Package, CreditCard } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const OrderSuccess = ({ order, clientKey }) => {
  const { toast } = useToast();
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  if (!order) {
    useEffect(() => {
      router.visit("/souvenirs");
    }, []);
    return null;
  }

  const handlePayment = () => {
    if (!order.snap_token) {
      toast({
        title: "Error",
        description: "Token pembayaran tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentLoading(true);

    window.snap.pay(order.snap_token, {
      onSuccess: function(result) {
        toast({
          title: "Pembayaran Berhasil!",
          description: "Terima kasih, pesanan Anda sedang diproses.",
        });
        // Reload to get updated order status
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
            <h1 className="text-4xl font-bold text-foreground mb-2">Pesanan Berhasil!</h1>
            <p className="text-muted-foreground">
              Terima kasih atas pemesanan Anda. Pesanan sedang diproses.
            </p>
          </div>

          {/* Order Details */}
          <Card className="p-6 bg-card border-border mb-6">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Nomor Pesanan</p>
                <p className="font-mono font-semibold text-foreground">#{order.id.slice(0, 8).toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  order.status === "pending" 
                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                    : order.status === "paid"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {order.status === "pending" ? "Menunggu Pembayaran" : 
                   order.status === "paid" ? "Sudah Dibayar" : order.status}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Item Pesanan</h2>
              <div className="space-y-4">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gradient-accent rounded-lg overflow-hidden flex-shrink-0">
                      {item.souvenirs.image_url ? (
                        <img
                          src={item.souvenirs.image_url}
                          alt={item.souvenirs.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.souvenirs.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x Rp {item.price.toLocaleString()}
                      </p>
                      <p className="font-semibold text-primary">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-foreground">Total Pembayaran</span>
                <span className="text-2xl font-bold text-primary">
                  Rp {order.total_amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="space-y-3 bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-3">Informasi Pengiriman</h3>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Alamat</p>
                  <p className="text-sm text-muted-foreground">{order.shipping_address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Nomor Telepon</p>
                  <p className="text-sm text-muted-foreground">{order.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Tanggal Pesanan</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {order.status === "pending" && order.snap_token && (
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
              variant={order.status === "pending" ? "outline" : "heritage"}
              size="lg"
              className="flex-1"
              onClick={() => router.visit("/souvenirs")}
            >
              Belanja Lagi
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

        </div>
      </main>
    </PublicLayout>
  );
};

export default OrderSuccess;
