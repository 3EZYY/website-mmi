import { router } from "@inertiajs/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LogOut, Mail, Calendar, Package, Ticket } from "lucide-react";
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

  const getStatusBadge = (status) => {
    const variants = {
      pending: "secondary",
      paid: "default",
      completed: "default",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
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
                      My Profile
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
                  Sign Out
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Orders & Tickets Tabs */}
          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted/50">
              <TabsTrigger value="orders" className="py-3 data-[state=active]:shadow-md">
                <Package className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Souvenir Orders</span>
                <span className="sm:hidden">Orders</span>
                <Badge variant="secondary" className="ml-2">{orders.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="tickets" className="py-3 data-[state=active]:shadow-md">
                <Ticket className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Ticket Bookings</span>
                <span className="sm:hidden">Tickets</span>
                <Badge variant="secondary" className="ml-2">{tickets.length}</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4 mt-6">
              {orders.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="py-16 text-center">
                    <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                    <CardTitle className="mb-2">No Orders Yet</CardTitle>
                    <CardDescription className="mb-4">
                      Visit our souvenir shop to make your first purchase!
                    </CardDescription>
                    <Button onClick={() => router.visit("/souvenirs")}>
                      Browse Souvenirs
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
                        <div className="space-y-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase">Shipping Address</span>
                          <p className="text-sm leading-relaxed">{order.shipping_address}</p>
                        </div>
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
                    <CardTitle className="mb-2">No Ticket Bookings Yet</CardTitle>
                    <CardDescription className="mb-4">
                      Book your visit to the museum today!
                    </CardDescription>
                    <Button onClick={() => router.visit("/tickets")}>
                      Book Tickets
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
