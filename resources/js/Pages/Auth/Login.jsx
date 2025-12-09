import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card } from "@/Components/ui/card";
import { Checkbox } from "@/Components/ui/checkbox";
import InputError from '@/Components/InputError';
import { Music, Music2, Disc3, Guitar, Mic2 } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        window.location.href = route('auth.google');
    };

    return (
        <>
            <Head title="Masuk" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-heritage/10 via-background to-gold/10 px-4 relative overflow-hidden">
                {/* Colorful Background Blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-heritage/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />
                </div>

                {/* Musical Ornaments - Colorful Floating Icons */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-10 left-10 p-3 bg-heritage/80 rounded-full shadow-lg animate-bounce">
                        <Music className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-20 right-20 p-4 bg-gold/80 rounded-full shadow-lg animate-bounce delay-150">
                        <Music2 className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute bottom-20 left-16 p-3 bg-primary/80 rounded-full shadow-lg animate-bounce delay-300">
                        <Disc3 className="w-9 h-9 text-white" />
                    </div>
                    <div className="absolute bottom-32 right-12 p-5 bg-heritage/70 rounded-full shadow-lg animate-bounce delay-500">
                        <Guitar className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute top-1/2 left-8 p-2 bg-gold/70 rounded-full shadow-lg animate-bounce delay-700">
                        <Mic2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute top-1/3 right-16 p-2 bg-primary/70 rounded-full shadow-lg animate-bounce delay-1000">
                        <Music className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-10 right-32 p-3 bg-heritage/60 rounded-full shadow-lg animate-bounce delay-200">
                        <Disc3 className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute top-40 left-1/4 p-2 bg-gold/60 rounded-full shadow-lg animate-bounce delay-400">
                        <Music2 className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute bottom-40 right-1/4 p-3 bg-primary/60 rounded-full shadow-lg animate-bounce delay-600">
                        <Guitar className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Colorful Musical Staff Lines */}
                    <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-heritage/30 to-transparent" />
                    <div className="absolute top-1/4 mt-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="absolute top-1/4 mt-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                    <div className="absolute bottom-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-heritage/30 to-transparent" />
                    <div className="absolute bottom-1/4 mb-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="absolute bottom-1/4 mb-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                </div>

                <Card className="w-full max-w-md p-8 bg-card/95 backdrop-blur-xl border-2 border-heritage/20 shadow-2xl relative z-10 overflow-hidden">
                    {/* Card Background Decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/20 to-transparent rounded-bl-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-heritage/20 to-transparent rounded-tr-full" />
                    
                    {/* Header with Musical Icon */}
                    <div className="text-center mb-8 relative">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gradient-to-br from-heritage to-gold rounded-full shadow-lg animate-pulse">
                                <Music2 className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-heritage to-gold bg-clip-text text-transparent mb-2">
                            Masuk
                        </h1>
                        <p className="text-muted-foreground font-medium">
                            Museum Musik Indonesia
                        </p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="nama@email.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="username"
                                autoFocus
                                required
                            />
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Minimal 6 karakter"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox
                                    checked={data.remember}
                                    onCheckedChange={(checked) => setData('remember', checked)}
                                />
                                <span className="text-sm text-muted-foreground">
                                    Ingat saya
                                </span>
                            </label>

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Lupa password?
                                </Link>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                            variant="heritage"
                        >
                            {processing ? "Memproses..." : "Masuk"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Atau</span>
                        </div>
                    </div>

                    {/* Google Login Button */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Masuk dengan Google
                    </Button>

                    <div className="mt-6 text-center">
                        <Link
                            href={route('register')}
                            className="text-primary hover:underline"
                        >
                            Belum punya akun? Daftar
                        </Link>
                    </div>
                </Card>
            </div>
        </>
    );
}
