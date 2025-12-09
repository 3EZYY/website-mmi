import { Music2, MapPin, Clock, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
        <footer className="bg-heritage text-heritage-foreground">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <Music2 className="w-8 h-8 text-gold" />
                            <span className="text-2xl font-bold">
                                Museum Musik Indonesia
                            </span>
                        </div>
                        <p className="text-heritage-foreground/80 mb-4">
                            Museum musik pertama di Indonesia yang berdedikasi
                            untuk melestarikan dan mendokumentasikan sejarah
                            musik nusantara.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/MMIMuseumMusikIndonesia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Kunjungi Facebook Museum Musik Indonesia (buka di tab baru)"
                                className="w-10 h-10 rounded-full bg-heritage-foreground/10 flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-smooth"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/museummusikindonesia/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Kunjungi Instagram Museum Musik Indonesia (buka di tab baru)"
                                className="w-10 h-10 rounded-full bg-heritage-foreground/10 flex items-center justify-center hover:bg-gold hover:text-gold-foreground transition-smooth"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Kontak</h3>
                        <ul className="space-y-3 text-heritage-foreground/80">
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>
                                    Gedung Kesenian Gajayana Lt. 2<br />
                                    Jl. Nusakambangan No. 19
                                    <br />
                                    Malang, Jawa Timur
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock className="w-5 h-5 flex-shrink-0" />
                                <span>Setiap Hari, 10.00 - 17.00 WIB</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Navigasi</h3>
                        <ul className="space-y-2 text-heritage-foreground/80">
                            <li>
                                <Link
                                    href="/#about"
                                    className="hover:text-gold transition-smooth"
                                >
                                    Tentang Museum
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/collections"
                                    className="hover:text-gold transition-smooth"
                                >
                                    Koleksi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tickets"
                                    className="hover:text-gold transition-smooth"
                                >
                                    Kunjungan
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#experience"
                                    className="hover:text-gold transition-smooth"
                                >
                                    Pengalaman
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-heritage-foreground/20 mt-8 pt-8 text-center text-heritage-foreground/60">
                    <p>
                        &copy; 2024 Museum Musik Indonesia. Semua hak cipta
                        dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
