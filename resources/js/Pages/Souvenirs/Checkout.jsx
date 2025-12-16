import { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Package } from "lucide-react";
import PublicLayout from "@/Layouts/PublicLayout";

const Checkout = ({ cart, souvenirs, auth }) => {
    const { toast } = useToast();

    const [shipping, setShipping] = useState({
        name: "",
        phone: "",
        address: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("qris");
    const [loading, setLoading] = useState(false);

    const cartItems = Object.entries(cart)
        .map(([id, quantity]) => {
            const souvenir = souvenirs.find((s) => s.id === id);
            return { souvenir, quantity };
        })
        .filter((item) => item.souvenir);

    const totalAmount = cartItems.reduce((total, item) => {
        const price = item.souvenir?.price || 0;
        return total + price * item.quantity;
    }, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!shipping.name || !shipping.phone || !shipping.address) {
            toast({
                title: "Data Tidak Lengkap",
                description: "Mohon lengkapi semua data pengiriman",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);

        const orderItems = cartItems.map((item) => ({
            souvenir_id: item.souvenir?.id,
            quantity: item.quantity,
            price: item.souvenir?.price || 0,
        }));

        router.post(
            "/checkout",
            {
                total_amount: totalAmount,
                phone: shipping.phone,
                shipping_address: `${shipping.name}, ${shipping.address}`,
                payment_method: paymentMethod,
                order_items: orderItems,
            },
            {
                onSuccess: () => {
                    toast({
                        title: "Pesanan Berhasil!",
                        description:
                            "Pesanan Anda telah dibuat. Silakan lakukan pembayaran.",
                    });
                },
                onError: (errors) => {
                    toast({
                        title: "Error",
                        description: errors.message || "Gagal membuat pesanan",
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
                <div className="container mx-auto px-6 max-w-4xl">
                    <Button
                        variant="ghost"
                        onClick={() => router.visit("/souvenirs")}
                        className="mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali
                    </Button>

                    <h1 className="text-4xl font-bold text-foreground mb-8">
                        Checkout
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Order Summary */}
                        <Card className="p-6 bg-card border-border h-fit">
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Ringkasan Pesanan
                            </h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.souvenir?.id}
                                        className="flex gap-4"
                                    >
                                        <div className="w-20 h-20 bg-gradient-accent rounded-lg overflow-hidden flex-shrink-0">
                                            {item.souvenir?.image_url ? (
                                                <img
                                                    src={
                                                        item.souvenir.image_url
                                                    }
                                                    alt={item.souvenir.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Package className="w-8 h-8 text-primary/30" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground">
                                                {item.souvenir?.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                {/* Pakai pengaman ( || 0 ) */}
                                                {item.quantity} x Rp{" "}
                                                {(
                                                    item.souvenir?.price || 0
                                                ).toLocaleString()}
                                            </p>
                                            <p className="font-semibold text-primary mt-1">
                                                {/* Pakai pengaman lagi */}
                                                Rp{" "}
                                                {(
                                                    (item.souvenir?.price ||
                                                        0) * item.quantity
                                                ).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-border pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-foreground">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-primary">
                                        Rp {totalAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </Card>

                        {/* Shipping Form */}
                        <Card className="p-6 bg-card border-border">
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Data Pengiriman
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nama Lengkap</Label>
                                    <Input
                                        id="name"
                                        value={shipping.name}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Masukkan nama lengkap"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Nomor Telepon</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={shipping.phone}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                phone: e.target.value,
                                            })
                                        }
                                        placeholder="Contoh: 081234567890"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="address">
                                        Alamat Lengkap
                                    </Label>
                                    <textarea
                                        id="address"
                                        value={shipping.address}
                                        onChange={(e) =>
                                            setShipping({
                                                ...shipping,
                                                address: e.target.value,
                                            })
                                        }
                                        placeholder="Masukkan alamat lengkap untuk pengiriman"
                                        className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-foreground"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label className="text-base font-semibold">
                                        Metode Pembayaran
                                    </Label>
                                    <div className="grid grid-cols-2 gap-3 mt-3">
                                        {[
                                            { id: "qris", name: "QRIS", desc: "Scan & Pay", icon: "/icon-payment/checkout/QRIS.webp" },
                                            { id: "bca", name: "BCA", desc: "Virtual Account", icon: "/icon-payment/checkout/bca.webp" },
                                            { id: "gopay", name: "GoPay", desc: "E-Wallet", icon: "/icon-payment/checkout/gopay (1).webp" },
                                            { id: "ovo", name: "OVO", desc: "E-Wallet", icon: "/icon-payment/checkout/ovo.webp" },
                                            { id: "dana", name: "DANA", desc: "E-Wallet", icon: "/icon-payment/checkout/dana.webp" },
                                            { id: "shopeepay", name: "ShopeePay", desc: "E-Wallet", icon: "/icon-payment/checkout/shopeepay.webp" },
                                        ].map((method) => (
                                            <button
                                                key={method.id}
                                                type="button"
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                                                    paymentMethod === method.id
                                                        ? "border-primary bg-primary/10"
                                                        : "border-border bg-card hover:border-primary/50"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                                                        <img 
                                                            src={method.icon} 
                                                            alt={method.name} 
                                                            className="w-full h-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {method.name}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            {method.desc}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="heritage"
                                    size="lg"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Memproses..."
                                        : "Lanjut ke Pembayaran"}
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </main>
        </PublicLayout>
    );
};

export default Checkout;
