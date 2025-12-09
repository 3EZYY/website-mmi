import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import Hero from '@/Components/Hero';
import About from '@/Components/About';
import Stats from '@/Components/Stats';
import Experience from '@/Components/Experience';
import Visit from '@/Components/Visit';
import NewsEvents from '@/Components/NewsEvents';
import Collections from '@/Components/Collections';

export default function Welcome({ auth, news = [] }) {
    return (
        <PublicLayout>
            <Head title="Beranda - Museum Musik Indonesia" />

            {/* Hero Section (Banner Utama) */}
            <Hero />

            {/* About Museum */}
            <About />

            {/* Statistik Museum */}
            <Stats />

            {/* Preview Koleksi */}
            <Collections />

            {/* Info Kunjungan */}
            <Visit />

            {/* Experience / Aktivitas */}
            <Experience />

            {/* Berita & Event Terbaru */}
            <NewsEvents news={news} />

        </PublicLayout>
    );
}