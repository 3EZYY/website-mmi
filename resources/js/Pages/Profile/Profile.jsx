import { router } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, Calendar, Package, Ticket, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PublicLayout from "@/Layouts/PublicLayout";

const Profile = ({ user, orders = [], tickets = [] }) => {
  const { toast } = useToast();

  const handleSignOut = () => {
    router.post("/logout", {}, {
      onSuccess: () => {
        toast({
          title: "Signed out successfully",
          description: "You have been logged out of your account",
        });
      }
    });
  };

  const handleDeleteOrder = (orderId) => {
    if (confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
      router.delete(`/orders/${orderId}`, {
        onSuccess: () => {
          toast({
            title: "Pesanan Dihapus",
            description: "Pesanan berhasil dihapus",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Gagal menghapus pesanan",
            variant: "destructive",
          });
        }
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Menunggu",
        className: "bg-amber-100 text-amber-800 hover:bg-amber-100"
      },
      paid: {
        label: "Dibayar",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      },
      completed: {
        label: "Selesai",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      },
      confirmed: {
        label: "Selesai",
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      },
      cancelled: {
        label: "Dibatalkan",
        className: "bg-red-100 text-red-700 hover:bg-red-100"
      },
    };
    const config = statusConfig[status] || { label: status, className: "" };
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <PublicLayout>
      <main className="flex-1 container mx-auto px-4 py-12 mt-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Profile Header */}
          <Card className="border-none shadow-lg bg-gradient-to-br from-card to-card/50 backdrop-blur">
            <CardHeader className="pb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary/20 shadow-xl">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                      Profil Saya
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2 text-base">
                      <Mail className="h-4 w-4" />
                      {user?.email}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Member since {new Date(user?.created_at || "").toLocaleDateString('id-ID', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                <Button variant="outline" onClick={handleSignOut} className="md:self-start">
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Orders & Tickets Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
              <TabsTrigger value="orders" className="py-3 data-[state=active]:shadow-md">
                <Package className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Pesanan Souvenir</span>
                <span className="sm:hidden">Orders</span>
                <Badge variant="secondary" className="ml-2">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="py-3 data-[state=active]:shadow-md">
                <Ticket className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Pesan Tiket</span>
                <span className="sm:hidden">Tickets</span>
                <Badge variant="secondary" className="ml-2">{tickets.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4 mt-6">
              {orders.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <CardTitle className="mb-2">Belum ada pesanan</CardTitle>
                    <CardDescription className="mb-4">
                      Kunjungi toko souvenir kami untuk membuat pembelian pertama Anda!
                    </CardDescription>
                    <Button onClick={() => router.visit("/souvenirs")}>
                      Beli Souvenir
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg font-semibold">
                              Order #{order.id.substring(0, 8).toUpperCase()}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(order.created_at).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </CardDescription>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Payment Method</span>
                            <p className="text-sm font-semibold capitalize">{order.payment_method}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Total Amount</span>
                            <p className="text-lg font-bold text-primary">Rp {order.total_amount.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                        <Separator />
                        
                        {/* Order Items Detail */}
                        {order.order_items && order.order_items.length > 0 && (
                          <div className="space-y-2">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Item Pesanan</span>
                            <div className="space-y-2">
                              {order.order_items.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                  <div className="flex items-center gap-3">
                                    {item.souvenirs?.image_url && (
                                      <img 
                                        src={item.souvenirs.image_url} 
                                        alt={item.souvenirs?.name} 
                                        className="w-12 h-12 object-cover rounded"
                                      />
                                    )}
                                    <div>
                                      <p className="text-sm font-medium">{item.souvenirs?.name || 'Item'}</p>
                                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                    </div>
                                  </div>
                                  <p className="text-sm font-semibold">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <Separator />
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase">Alamat Pengiriman</span>
                          <p className="text-sm leading-relaxed">{order.shipping_address}</p>
                        </div>
                        
                        {/* Delete Button for Pending Orders */}
                        {order.status === 'pending' && (
                          <div className="pt-2">
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteOrder(order.id)}
                              className="w-full sm:w-auto"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Hapus Pesanan
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="tickets" className="space-y-4 mt-6">
              {tickets.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <CardTitle className="mb-2">Belum ada pemesanan tiket</CardTitle>
                    <CardDescription className="mb-4">
                      Booking tiket museum hari ini!
                    </CardDescription>
                    <Button onClick={() => router.visit("/tickets")}>
                      Booking Tiket
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {tickets.map((ticket) => (
                    <Card key={ticket.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-heritage">
                      <CardHeader className="pb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                              <Ticket className="h-5 w-5" />
                              {ticket.visitor_name}
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <Calendar className="h-3 w-3" />
                              Visit: {new Date(ticket.visit_date).toLocaleDateString('id-ID', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </CardDescription>
                          </div>
                          {getStatusBadge(ticket.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Quantity</span>
                            <p className="text-sm font-semibold">{ticket.quantity} Ticket{ticket.quantity > 1 ? 's' : ''}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-medium text-muted-foreground uppercase">Total Price</span>
                            <p className="text-lg font-bold text-heritage">Rp {ticket.total_price.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="text-xs text-muted-foreground">
                          Booked on {new Date(ticket.created_at).toLocaleDateString('id-ID', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Profile;
