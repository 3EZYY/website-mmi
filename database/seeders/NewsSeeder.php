<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Carbon\Carbon;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $newsData = [
            // Upcoming Events (Future dates)
            [
                'title' => 'Malang Jazz Festival 2025: Kolaborasi Musisi Nusantara',
                'category' => 'Event',
                'excerpt' => 'Festival jazz tahunan kembali hadir dengan lineup spektakuler dari berbagai penjuru Indonesia.',
                'content' => 'Malang Jazz Festival 2025 akan digelar di Lapangan Rampal pada tanggal 15-16 Maret 2025. Festival ini menghadirkan kolaborasi unik antara musisi jazz senior dan talenta muda berbakat. Beberapa nama besar seperti Indra Lesmana, Tompi, dan Andien dipastikan tampil. Tersedia juga workshop dan masterclass bagi pecinta musik jazz.',
                'author' => 'Tim Redaksi MMI',
                'is_published' => true,
                'days_offset' => 88, // Future
            ],
            [
                'title' => 'Festival Kampung Cempluk: Seni dan Musik Tradisional',
                'category' => 'Event',
                'excerpt' => 'Kampung Cempluk kembali menggelar festival seni tahunan dengan tema musik tradisional Jawa Timur.',
                'content' => 'Festival Kampung Cempluk akan berlangsung selama 3 hari penuh dengan berbagai pertunjukan musik tradisional, gamelan, dan keroncong. Pengunjung dapat menikmati kuliner khas sambil menyaksikan penampilan seniman lokal. Festival ini juga mengadakan lomba cipta lagu berbahasa Jawa.',
                'author' => 'Tim Redaksi MMI',
                'is_published' => true,
                'days_offset' => 45, // Future
            ],
            [
                'title' => 'Konser Musik Kayutangan: Nostalgia Era 80an',
                'category' => 'Event',
                'excerpt' => 'Jalan Kayutangan Heritage akan dipenuhi alunan musik 80an dalam konser nostalgia spektakuler.',
                'content' => 'Kawasan heritage Kayutangan akan menjadi panggung konser outdoor dengan tema Nostalgia Era 80an. Berbagai band lawas akan tampil membawakan lagu-lagu hits yang masih dikenang hingga kini. Diharapkan acara ini dapat mengedukasi generasi muda tentang sejarah musik Indonesia.',
                'author' => 'Koordinator Event',
                'is_published' => true,
                'days_offset' => 30, // Future
            ],
            [
                'title' => 'Workshop Pembuatan Gitar Akustik Bersama Maestro',
                'category' => 'Workshop',
                'excerpt' => 'Kesempatan langka belajar merakit gitar akustik dari pengrajin legendaris Malang.',
                'content' => 'Museum Musik Indonesia bekerja sama dengan Pak Slamet, pengrajin gitar legendaris dari Kota Batu, mengadakan workshop pembuatan gitar akustik. Peserta akan belajar dari awal hingga finishing. Kuota terbatas hanya 20 orang.',
                'author' => 'Divisi Edukasi MMI',
                'is_published' => true,
                'days_offset' => 14, // Future
            ],
            [
                'title' => 'Pameran Alat Musik Kuno: Warisan Budaya Nusantara',
                'category' => 'Pameran',
                'excerpt' => 'Koleksi alat musik antik dari berbagai daerah di Indonesia akan dipamerkan selama sebulan penuh.',
                'content' => 'Pameran ini menampilkan lebih dari 100 alat musik kuno dari berbagai daerah di Indonesia, mulai dari Sabang hingga Merauke. Pengunjung dapat melihat langsung sasando, tifa, angklung kuno, dan berbagai alat musik langka lainnya. Tersedia juga tur guided dengan penjelasan sejarah.',
                'author' => 'Kurator Museum',
                'is_published' => true,
                'days_offset' => 7, // Future
            ],

            // Recent/Current News
            [
                'title' => 'Koleksi Terbaru: Piano Antik Abad ke-19 dari Belanda',
                'category' => 'Koleksi',
                'excerpt' => 'Museum menerima donasi piano antik bersejarah dari keluarga keturunan Belanda di Malang.',
                'content' => 'Sebuah piano antik buatan tahun 1875 dari Belanda resmi menjadi koleksi terbaru Museum Musik Indonesia. Piano ini memiliki sejarah panjang dan pernah dimainkan oleh musisi-musisi terkenal pada era kolonial. Proses restorasi telah selesai dan piano dapat dilihat di galeri utama.',
                'author' => 'Kurator Museum',
                'is_published' => true,
                'days_offset' => -3, // Past (3 days ago)
            ],
            [
                'title' => 'Kunjungan 1000 Siswa SD se-Malang Raya ke Museum',
                'category' => 'Berita',
                'excerpt' => 'Program edukasi musik untuk sekolah dasar sukses menarik ribuan siswa dalam sebulan.',
                'content' => 'Sepanjang bulan ini, Museum Musik Indonesia telah menerima kunjungan dari lebih dari 1000 siswa SD dari berbagai sekolah di Malang Raya. Program ini bertujuan mengenalkan alat musik tradisional kepada generasi muda sejak dini.',
                'author' => 'Humas MMI',
                'is_published' => true,
                'days_offset' => -7, // Past
            ],
            [
                'title' => 'Peluncuran Aplikasi Tur Virtual Museum Musik Indonesia',
                'category' => 'Teknologi',
                'excerpt' => 'Kini pengunjung dapat menjelajahi museum secara virtual melalui aplikasi smartphone.',
                'content' => 'Museum Musik Indonesia resmi meluncurkan aplikasi tur virtual yang memungkinkan pengunjung dari seluruh Indonesia menjelajahi koleksi museum tanpa harus datang langsung. Aplikasi ini dilengkapi dengan fitur audio guide dalam bahasa Indonesia dan Inggris.',
                'author' => 'Tim IT MMI',
                'is_published' => true,
                'days_offset' => -14, // Past
            ],
            [
                'title' => 'Penghargaan Museum Terbaik Jawa Timur 2024',
                'category' => 'Penghargaan',
                'excerpt' => 'Museum Musik Indonesia meraih penghargaan bergengsi dari Dinas Kebudayaan Provinsi.',
                'content' => 'Dalam ajang Museum Award Jawa Timur 2024, Museum Musik Indonesia berhasil meraih penghargaan sebagai Museum Terbaik kategori Seni dan Budaya. Penghargaan ini menjadi motivasi untuk terus meningkatkan kualitas layanan dan koleksi.',
                'author' => 'Direktur Museum',
                'is_published' => true,
                'days_offset' => -21, // Past
            ],
            [
                'title' => 'Komunitas Gamelan Malang Adakan Latihan Rutin di Museum',
                'category' => 'Komunitas',
                'excerpt' => 'Ruang latihan museum kini tersedia untuk komunitas seni dan musik lokal.',
                'content' => 'Komunitas Gamelan Malang resmi menjadikan Museum Musik Indonesia sebagai tempat latihan rutin setiap akhir pekan. Pengunjung dapat menyaksikan langsung proses latihan dan belajar tentang gamelan Jawa.',
                'author' => 'Koordinator Komunitas',
                'is_published' => true,
                'days_offset' => -30, // Past
            ],

            // Archived News
            [
                'title' => 'Rekaman Historis: Suara Musik Malang Era 1960an',
                'category' => 'Sejarah',
                'excerpt' => 'Tim museum berhasil mendigitalisasi rekaman musik langka dari era 1960an.',
                'content' => 'Proyek digitalisasi arsip musik historis telah berhasil menyelamatkan puluhan rekaman musik Malang dari era 1960an. Rekaman ini mencakup pertunjukan keroncong, orkes melayu, dan musik daerah yang sangat langka.',
                'author' => 'Tim Arsip',
                'is_published' => true,
                'days_offset' => -45, // Past
            ],
            [
                'title' => 'Donasi Koleksi Vinyl dari Kolektor Senior Malang',
                'category' => 'Donasi',
                'excerpt' => 'Lebih dari 500 piringan hitam dari berbagai era memperkaya koleksi museum.',
                'content' => 'Bapak Soetrisno, kolektor vinyl senior asal Malang, menyumbangkan lebih dari 500 piringan hitam ke museum. Koleksi ini mencakup album-album langka dari musisi Indonesia legendaris seperti Koes Plus, Bimbo, dan Panbers.',
                'author' => 'Kurator Museum',
                'is_published' => true,
                'days_offset' => -60, // Past
            ],
            [
                'title' => 'Program Magang Musik untuk Mahasiswa Se-Malang',
                'category' => 'Edukasi',
                'excerpt' => 'Museum membuka kesempatan magang bagi mahasiswa jurusan musik dan seni.',
                'content' => 'Museum Musik Indonesia membuka program magang selama 3 bulan bagi mahasiswa dari berbagai universitas di Malang. Peserta akan belajar tentang kurasi museum, preservasi alat musik, dan penyelenggaraan event seni.',
                'author' => 'Divisi Edukasi MMI',
                'is_published' => true,
                'days_offset' => -75, // Past
            ],
            [
                'title' => 'Renovasi Galeri Musik Tradisional Selesai',
                'category' => 'Fasilitas',
                'excerpt' => 'Galeri musik tradisional tampil lebih modern dengan pencahayaan dan display baru.',
                'content' => 'Setelah 2 bulan renovasi, galeri musik tradisional kini tampil lebih modern dengan sistem pencahayaan LED yang ramah lingkungan dan display interaktif. Pengunjung dapat mendengarkan sampel suara setiap alat musik yang dipamerkan.',
                'author' => 'Tim Fasilitas',
                'is_published' => true,
                'days_offset' => -90, // Past
            ],
            [
                'title' => 'Perayaan HUT ke-5 Museum Musik Indonesia',
                'category' => 'Event',
                'excerpt' => 'Museum merayakan 5 tahun berkarya dengan berbagai acara spesial sepanjang minggu.',
                'content' => 'Museum Musik Indonesia merayakan hari jadi ke-5 dengan serangkaian acara spesial termasuk konser gratis, diskon tiket masuk, dan pembagian merchandise eksklusif. Terima kasih kepada seluruh pengunjung yang telah mendukung museum selama ini.',
                'author' => 'Direktur Museum',
                'is_published' => true,
                'days_offset' => -120, // Past
            ],

            // ========== KERJASAMA ==========
            [
                'title' => 'Kerjasama MMI dengan Universitas Brawijaya untuk Riset Musik Tradisional',
                'category' => 'Kerjasama',
                'excerpt' => 'MoU resmi ditandatangani untuk pengembangan riset dan dokumentasi musik tradisional Jawa Timur.',
                'content' => 'Museum Musik Indonesia menjalin kerjasama strategis dengan Fakultas Ilmu Budaya Universitas Brawijaya dalam bidang riset musik tradisional. Program ini mencakup dokumentasi alat musik langka, penelitian sejarah musik daerah, dan penerbitan jurnal akademik. Mahasiswa FIB UB juga berkesempatan magang di museum.',
                'author' => 'Direktur Museum',
                'is_published' => true,
                'days_offset' => -5,
            ],
            [
                'title' => 'Kolaborasi dengan Dinas Pariwisata Kota Malang',
                'category' => 'Kerjasama',
                'excerpt' => 'Museum masuk dalam paket wisata edukasi resmi Kota Malang destinasi unggulan.',
                'content' => 'Dinas Pariwisata Kota Malang resmi memasukkan Museum Musik Indonesia dalam paket wisata edukasi unggulan. Kerjasama ini meliputi promosi bersama, integrasi tiket wisata, dan pengembangan program city tour yang mencakup kunjungan ke museum. Diharapkan dapat meningkatkan kunjungan wisatawan domestik maupun mancanegara.',
                'author' => 'Humas MMI',
                'is_published' => true,
                'days_offset' => -15,
            ],
            [
                'title' => 'Partnership dengan Yamaha Music Indonesia untuk Program Edukasi',
                'category' => 'Kerjasama',
                'excerpt' => 'Yamaha Indonesia menyediakan alat musik untuk program workshop dan edukasi museum.',
                'content' => 'Yamaha Music Indonesia resmi menjadi partner edukasi Museum Musik Indonesia. Dalam kerjasama ini, Yamaha menyediakan berbagai alat musik modern untuk kegiatan workshop, demo produk, dan program edukasi musik bagi pengunjung. Tersedia juga kelas musik gratis setiap bulan untuk anak-anak.',
                'author' => 'Koordinator Kerjasama',
                'is_published' => true,
                'days_offset' => -35,
            ],

            // ========== MEDIA PARTNER ==========
            [
                'title' => 'Radio Elfara FM Jadi Media Partner Resmi MMI',
                'category' => 'Media Partner',
                'excerpt' => 'Elfara 99.9 FM akan menyiarkan program musik dan event museum secara berkala.',
                'content' => 'Radio Elfara FM resmi menjadi media partner Museum Musik Indonesia. Kerjasama ini mencakup penyiaran program musik mingguan, liputan event museum, dan promosi tiket. Pendengar Elfara FM juga berkesempatan mendapat tiket gratis melalui kuis on-air.',
                'author' => 'Tim Marketing',
                'is_published' => true,
                'days_offset' => -8,
            ],
            [
                'title' => 'Kolaborasi Konten dengan Travel Blogger Malang',
                'category' => 'Media Partner',
                'excerpt' => 'Komunitas travel blogger akan mempromosikan museum melalui konten digital.',
                'content' => 'Museum Musik Indonesia menggandeng Komunitas Travel Blogger Malang untuk kampanye digital. Para blogger akan membuat konten foto, video, dan artikel tentang pengalaman berkunjung ke museum. Konten akan disebarkan di berbagai platform media sosial untuk menjangkau audiens yang lebih luas.',
                'author' => 'Tim Digital Marketing',
                'is_published' => true,
                'days_offset' => -20,
            ],
            [
                'title' => 'Malang Times Dukung Publikasi Event Museum',
                'category' => 'Media Partner',
                'excerpt' => 'Portal berita Malang Times akan meliput seluruh kegiatan dan event museum.',
                'content' => 'Malang Times resmi menjadi media partner online Museum Musik Indonesia. Semua event, pameran, dan kegiatan museum akan diliput dan dipublikasikan di portal berita tersebut. Kerjasama ini juga mencakup penulisan artikel feature tentang koleksi museum dan sejarah musik di Malang.',
                'author' => 'Tim Humas',
                'is_published' => true,
                'days_offset' => -40,
            ],

            // ========== PENGUMUMAN ==========
            [
                'title' => 'Pengumuman: Perubahan Jam Operasional Museum Mulai Januari 2025',
                'category' => 'Pengumuman',
                'excerpt' => 'Museum akan memperpanjang jam operasional pada akhir pekan mulai tahun depan.',
                'content' => 'Mulai 1 Januari 2025, Museum Musik Indonesia akan menyesuaikan jam operasional. Hari Selasa-Jumat: 09.00-16.00 WIB, Sabtu-Minggu: 09.00-18.00 WIB. Museum tutup setiap hari Senin. Perubahan ini untuk mengakomodasi pengunjung yang datang di akhir pekan.',
                'author' => 'Manajemen Museum',
                'is_published' => true,
                'days_offset' => -2,
            ],
            [
                'title' => 'Pengumuman: Lowongan Kerja Staff Museum 2025',
                'category' => 'Pengumuman',
                'excerpt' => 'Museum membuka rekrutmen untuk posisi tour guide dan staff administrasi.',
                'content' => 'Museum Musik Indonesia membuka lowongan kerja untuk posisi: 1) Tour Guide (2 orang), 2) Staff Administrasi (1 orang), 3) Staff Kebersihan (2 orang). Persyaratan: Min. SMA/SMK, usia max 30 tahun, berdomisili di Malang Raya. Kirim lamaran ke email: hrd@mmi.co.id sebelum 31 Januari 2025.',
                'author' => 'HRD Museum',
                'is_published' => true,
                'days_offset' => -10,
            ],
            [
                'title' => 'Pengumuman: Tiket Online Kini Tersedia di Website Resmi',
                'category' => 'Pengumuman',
                'excerpt' => 'Pengunjung dapat membeli tiket secara online tanpa perlu antre di lokasi.',
                'content' => 'Kabar gembira! Kini pengunjung dapat membeli tiket masuk museum secara online melalui website resmi kami. Pembayaran dapat dilakukan via transfer bank, e-wallet, atau QRIS. Tiket online berlaku untuk kunjungan hingga 30 hari setelah pembelian. Nikmati kemudahan tanpa antre!',
                'author' => 'Tim IT MMI',
                'is_published' => true,
                'days_offset' => -25,
            ],
        ];

        foreach ($newsData as $news) {
            $publishedAt = Carbon::now()->addDays($news['days_offset']);
            $slug = Str::slug($news['title']);

            News::updateOrCreate(
                ['slug' => $slug], // Find by slug
                [
                    'title' => $news['title'],
                    'excerpt' => $news['excerpt'],
                    'content' => $news['content'],
                    'image_url' => 'https://placehold.co/800x450/1e3a8a/ffffff/png?text=' . urlencode(Str::limit($news['title'], 20)),
                    'category' => $news['category'],
                    'author' => $news['author'],
                    'published_at' => $publishedAt,
                    'is_published' => $news['is_published'],
                ]
            );
        }
    }
}
