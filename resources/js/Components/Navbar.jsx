import { useState, useEffect } from "react";
import { Music2, Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage, router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { auth } = usePage().props;
    const { toast } = useToast();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        router.post(
            "/logout",
            {},
            {
                onSuccess: () => {
                    toast({ title: "Berhasil Keluar" });
                },
            }
        );
    };

    const navLinks = [
        { label: "Beranda", path: "/" },
        { label: "Galeri Koleksi", path: "/collections" },
        { label: "Berita", path: "/news" },
        { label: "Pesan Tiket", path: "/tickets" },
        { label: "Souvenir", path: "/souvenirs" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? "bg-background/95 backdrop-blur-md shadow-medium"
                    : "bg-black/15 backdrop-blur-sm"
            }`}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link href="/" className="flex items-center gap-2">
                        <Music2
                            className={`w-8 h-8 transition-colors ${
                                isScrolled ? "text-primary" : "text-gold"
                            }`}
                        />
                        <span
                            className={`text-xl font-bold transition-colors ${
                                isScrolled
                                    ? "text-foreground"
                                    : "text-white"
                            }`}
                        >
                            MMI
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className={`font-medium transition-all duration-300 ease-in-out hover:scale-105 hover:font-bold ${isScrolled
                                        ? "text-foreground hover:text-[#BD3C28]"
                                        : "text-white hover:text-[#BD3C28]"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {auth?.user ? (
                            <div className="flex items-center gap-3">
                                <Link href="/profile">
                                    <Button
                                        variant={
                                            isScrolled ? "outline" : "ghost"
                                        }
                                        size="sm"
                                        as="span"
                                        className={!isScrolled ? "text-white/90 hover:text-white hover:bg-white/10" : ""}
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Profil
                                    </Button>
                                </Link>
                                <Button
                                    variant={isScrolled ? "heritage" : "gold"}
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Keluar
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button
                                    variant={isScrolled ? "heritage" : "gold"}
                                    size="sm"
                                    as="span"
                                >
                                    <User className="w-4 h-4 mr-2" />
                                    Masuk
                                </Button>
                            </Link>
                        )}
                    </div>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X
                                className={`w-6 h-6 ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                }`}
                            />
                        ) : (
                            <Menu
                                className={`w-6 h-6 ${
                                    isScrolled
                                        ? "text-foreground"
                                        : "text-primary-foreground"
                                }`}
                            />
                        )}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-6 animate-fade-in transition-all duration-300 ease-in-out">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-left font-medium text-foreground hover:text-primary transition-colors duration-300 ease-in-out hover:scale-105 py-2"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                    >
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            as="span"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Profile
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="heritage"
                                        className="w-full"
                                        onClick={handleLogout}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Keluar
                                    </Button>
                                </>
                            ) : (
                                <Link href="/login">
                                    <Button
                                        variant="heritage"
                                        className="w-full"
                                        as="span"
                                    >
                                        <User className="w-4 h-4 mr-2" />
                                        Masuk
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
