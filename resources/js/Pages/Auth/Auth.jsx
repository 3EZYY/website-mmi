import { useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Music, Music2, Disc3, Guitar, Mic2 } from "lucide-react";
import { z } from "zod";

// Schema validasi diperbarui (tambah nama optional biar gak error pas login)
const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const Auth = () => { // Hapus props {auth} kalau tidak dipakai
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(""); // State baru untuk Nama
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!isLogin && !name) {
       toast({ title: "Error", description: "Nama harus diisi", variant: "destructive" });
       return;
    }

    const validation = authSchema.safeParse({ email, password });
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
      isLogin ? "/login" : "/register",
      { 
        email, 
        password,
        ...( !isLogin && { name, password_confirmation: password } ) // Kirim Nama & Konfirmasi Password saat Daftar
      },
      {
        onSuccess: () => {
          toast({
            title: isLogin ? "Berhasil masuk!" : "Berhasil mendaftar!",
            description: isLogin ? "Selamat datang kembali" : "Akun berhasil dibuat",
          });
        },
        onError: (errors) => {
          toast({
            title: "Gagal",
            description: errors.email || errors.password || "Terjadi kesalahan sistem",
            variant: "destructive",
          });
          setLoading(false);
        },
        onFinish: () => setLoading(false),
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-heritage/10 via-background to-gold/10 px-4 relative overflow-hidden">
      {/* ... (BAGIAN BACKGROUND SAMA SEPERTI SEBELUMNYA, TIDAK DIUBAH) ... */}
      
      {/* ... (BAGIAN ANIMASI MUSIK SAMA SEPERTI SEBELUMNYA) ... */}

      <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-xl border-2 border-heritage/20 shadow-2xl relative z-10 overflow-hidden">
        {/* Dekorasi Card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-heritage/20 to-transparent rounded-tr-full" />
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-heritage to-gold rounded-full shadow-lg animate-pulse">
              <Music2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-heritage to-gold bg-clip-text text-transparent mb-2">
            {isLogin ? "Masuk" : "Daftar"}
          </h1>
          <p className="text-muted-foreground font-medium">Museum Musik Indonesia</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* INPUT NAMA (Hanya Muncul saat Daftar) */}
          {!isLogin && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading} variant="heritage">
            {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
          </Button>
        </form>

        {/* Tombol Ganti Mode */}
        <div className="mt-6 text-center">
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? "Belum punya akun? Daftar" : "Sudah punya akun? Masuk"}
          </button>
        </div>
        
        {/* Tombol Google Login */}
        <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Atau</span>
            </div>
        </div>
        
        <div className="mt-6">
            <a href="/auth/google"> 
                <Button variant="outline" className="w-full" type="button">
                    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                    Masuk dengan Google
                </Button>
            </a>
        </div>

      </Card>
    </div>
  );
};

export default Auth;