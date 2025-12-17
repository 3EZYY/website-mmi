<?php

namespace Database\Seeders;

use App\Models\MusicCollection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Disable foreign key checks to allow truncate
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        MusicCollection::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // ========== TRADITIONAL INSTRUMENTS (20) ==========
        $traditionalInstruments = [
            [
                'name' => 'Angklung',
                'origin' => 'Jawa Barat',
                'description' => 'Alat musik bambu yang dimainkan dengan cara digoyangkan, menghasilkan nada unik yang merdu.',
                'history' => 'Angklung telah diakui UNESCO sebagai Warisan Budaya Tak Benda sejak tahun 2010. Alat musik ini berasal dari Sunda dan digunakan dalam berbagai upacara adat dan pertunjukan musik tradisional.',
                'year' => 1850,
            ],
            [
                'name' => 'Gamelan Jawa',
                'origin' => 'Jawa Tengah',
                'description' => 'Orkestra tradisional yang terdiri dari gong, kenong, saron, dan berbagai instrumen perkusi logam.',
                'history' => 'Gamelan Jawa telah ada sejak abad ke-8 dan merupakan bagian integral dari budaya keraton Jawa. Musik gamelan sering mengiringi pertunjukan wayang dan tari tradisional.',
                'year' => 1780,
            ],
            [
                'name' => 'Sasando',
                'origin' => 'Nusa Tenggara Timur',
                'description' => 'Alat musik petik khas Rote dengan resonator dari daun lontar yang menghasilkan suara etnik.',
                'history' => 'Sasando adalah kebanggaan masyarakat Rote dan konon sudah ada sejak abad ke-7. Nama sasando berasal dari kata "sasandu" yang berarti bergetar atau berbunyi.',
                'year' => 1700,
            ],
            [
                'name' => 'Tifa',
                'origin' => 'Papua',
                'description' => 'Gendang tradisional Papua yang terbuat dari kayu dan kulit binatang, digunakan dalam upacara adat.',
                'history' => 'Tifa adalah simbol persatuan masyarakat Papua dan Maluku. Alat musik ini tidak hanya sebagai pengiring tarian tetapi juga sebagai alat komunikasi antar kampung.',
                'year' => 1600,
            ],
            [
                'name' => 'Kecapi Sunda',
                'origin' => 'Jawa Barat',
                'description' => 'Alat musik petik berbentuk perahu dengan 18-20 senar yang menghasilkan nada lembut dan merdu.',
                'history' => 'Kecapi Sunda biasanya dimainkan berpasangan dengan suling dalam pertunjukan Tembang Sunda Cianjuran, salah satu bentuk seni vokal tertinggi dari Tatar Sunda.',
                'year' => 1820,
            ],
            [
                'name' => 'Suling Sunda',
                'origin' => 'Jawa Barat',
                'description' => 'Seruling bambu dengan 4 lubang nada yang menghasilkan melodi khas musik Sunda yang menyejukkan.',
                'history' => 'Suling Sunda menggunakan tangga nada pelog atau salendro dan menjadi instrumen melodi utama dalam berbagai genre musik tradisional Sunda.',
                'year' => 1800,
            ],
            [
                'name' => 'Kolintang',
                'origin' => 'Sulawesi Utara',
                'description' => 'Alat musik perkusi berbilah kayu yang dimainkan dengan pemukul, khas Minahasa.',
                'history' => 'Kolintang awalnya digunakan sebagai alat komunikasi dan bagian dari ritual adat Minahasa. Kini menjadi alat musik ensembel yang populer di Sulawesi Utara.',
                'year' => 1750,
            ],
            [
                'name' => 'Talempong',
                'origin' => 'Sumatera Barat',
                'description' => 'Gong kecil dari kuningan yang dimainkan secara berkelompok dalam musik Minangkabau.',
                'history' => 'Talempong merupakan bagian penting dari adat Minangkabau dan sering dimainkan dalam acara batagak penghulu, pernikahan, dan festival budaya.',
                'year' => 1650,
            ],
            [
                'name' => 'Rebab',
                'origin' => 'Jawa',
                'description' => 'Alat musik gesek berdawai dua yang menjadi pemimpin melodi dalam orkestra gamelan.',
                'history' => 'Rebab masuk ke Nusantara melalui jalur perdagangan dari Timur Tengah dan menjadi bagian penting dari gamelan sejak era kerajaan Majapahit.',
                'year' => 1400,
            ],
            [
                'name' => 'Bonang',
                'origin' => 'Jawa',
                'description' => 'Rangkaian gong kecil yang ditaruh horizontal, bagian penting dari gamelan Jawa.',
                'history' => 'Bonang memiliki peran sebagai balungan atau kerangka melodi dalam gamelan dan dimainkan dengan teknik khusus yang membutuhkan latihan bertahun-tahun.',
                'year' => 1500,
            ],
            [
                'name' => 'Kendang',
                'origin' => 'Jawa',
                'description' => 'Gendang dua sisi yang berperan sebagai pemimpin irama dalam gamelan dan pertunjukan tari.',
                'history' => 'Kendang adalah "jantung" dari gamelan yang mengatur tempo dan dinamika. Pemain kendang (pengendang) harus memiliki kepekaan tinggi terhadap penari dan musik.',
                'year' => 1550,
            ],
            [
                'name' => 'Siter',
                'origin' => 'Jawa',
                'description' => 'Alat musik petik bersenar kawat dengan kotak resonansi, dimainkan dengan kedua tangan.',
                'history' => 'Siter diperkenalkan ke gamelan pada era kesultanan Yogyakarta dan Solo sebagai instrumen pengisi melodi dengan karakter suara yang khas.',
                'year' => 1880,
            ],
            [
                'name' => 'Saron',
                'origin' => 'Jawa',
                'description' => 'Metalofon dengan bilah-bilah perunggu yang menghasilkan nada dasar melodi gamelan.',
                'history' => 'Saron adalah tulang punggung melodi gamelan dengan teknik tabuhan yang sederhana namun membutuhkan ketepatan timing yang presisi.',
                'year' => 1600,
            ],
            [
                'name' => 'Calung',
                'origin' => 'Jawa Barat',
                'description' => 'Alat musik bambu mirip angklung tapi dipukul dengan pemukul kayu.',
                'history' => 'Calung berkembang di wilayah Banyumas dan sekitarnya sebagai variasi dari angklung dengan cara bermain yang berbeda.',
                'year' => 1900,
            ],
            [
                'name' => 'Aramba',
                'origin' => 'Sumatera Utara',
                'description' => 'Gong besar khas Nias yang digunakan dalam upacara adat dan tarian perang.',
                'history' => 'Aramba merupakan simbol kekuasaan dan status sosial dalam masyarakat Nias tradisional, sering disimpan sebagai pusaka keluarga.',
                'year' => 1550,
            ],
            [
                'name' => 'Sape',
                'origin' => 'Kalimantan',
                'description' => 'Alat musik petik tradisional suku Dayak dengan badan dari kayu utuh.',
                'history' => 'Sape dulunya hanya boleh dimainkan oleh kaum pria dalam ritual adat. Suaranya yang menenangkan konon dapat memanggil roh leluhur.',
                'year' => 1700,
            ],
            [
                'name' => 'Sitar India',
                'origin' => 'India',
                'description' => 'Alat musik petik dengan resonator labu dan senar simpati yang menghasilkan drone khas.',
                'history' => 'Sitar menjadi terkenal di dunia Barat melalui Ravi Shankar dan kolaborasinya dengan The Beatles pada tahun 1960-an.',
                'year' => 1800,
            ],
            [
                'name' => 'Erhu',
                'origin' => 'Tiongkok',
                'description' => 'Biola Tiongkok berdawai dua yang menghasilkan suara melankolis dan ekspresif.',
                'history' => 'Erhu telah ada lebih dari seribu tahun dan menjadi instrumen solo maupun orkestra dalam musik tradisional Tiongkok.',
                'year' => 1850,
            ],
            [
                'name' => 'Shamisen',
                'origin' => 'Jepang',
                'description' => 'Lute Jepang berdawai tiga yang mengiringi teater Kabuki dan Bunraku.',
                'history' => 'Shamisen diperkenalkan ke Jepang dari Okinawa pada abad ke-16 dan berkembang menjadi berbagai genre musik.',
                'year' => 1750,
            ],
            [
                'name' => 'Bagpipe Skotlandia',
                'origin' => 'Skotlandia',
                'description' => 'Instrumen tiup dengan kantong udara yang menghasilkan drone berkelanjutan dan melodi.',
                'history' => 'Great Highland Bagpipe adalah simbol nasional Skotlandia yang digunakan dalam upacara militer dan perayaan.',
                'year' => 1820,
            ],
        ];

        // ========== MODERN INSTRUMENTS (20) ==========
        $modernInstruments = [
            [
                'name' => 'Fender Stratocaster',
                'origin' => 'Amerika Serikat',
                'description' => 'Gitar elektrik ikonik dengan tiga pickup single-coil dan tremolo arm yang legendaris.',
                'history' => 'Didesain oleh Leo Fender pada 1954, Stratocaster menjadi pilihan legenda seperti Jimi Hendrix, Eric Clapton, dan Stevie Ray Vaughan.',
                'year' => 1954,
            ],
            [
                'name' => 'Gibson Les Paul',
                'origin' => 'Amerika Serikat',
                'description' => 'Gitar elektrik solid body dengan humbucker yang menghasilkan tone tebal dan sustain panjang.',
                'history' => 'Dinamai dari musisi Les Paul yang berkolaborasi dengan Gibson menciptakan desain revolusioner pada 1952.',
                'year' => 1952,
            ],
            [
                'name' => 'Moog Synthesizer',
                'origin' => 'Amerika Serikat',
                'description' => 'Synthesizer analog pionir yang mengubah lanskap musik elektronik modern.',
                'history' => 'Robert Moog memperkenalkan Minimoog pada 1970 yang menjadi standar industri synthesizer analog.',
                'year' => 1970,
            ],
            [
                'name' => 'Roland TR-808',
                'origin' => 'Jepang',
                'description' => 'Drum machine legendaris dengan suara kick dan hi-hat yang mendefinisikan hip-hop.',
                'history' => 'Awalnya dianggap gagal karena suara tidak realistis, TR-808 kemudian menjadi fondasi musik hip-hop dan electronic.',
                'year' => 1980,
            ],
            [
                'name' => 'Yamaha DX7',
                'origin' => 'Jepang',
                'description' => 'Synthesizer digital FM yang mendominasi suara musik pop tahun 80-an.',
                'history' => 'DX7 adalah synthesizer digital pertama yang sukses massal dengan lebih dari 200.000 unit terjual.',
                'year' => 1983,
            ],
            [
                'name' => 'Pearl Drum Kit',
                'origin' => 'Jepang',
                'description' => 'Set drum profesional dengan shell maple yang menghasilkan tone hangat dan proyeksi kuat.',
                'history' => 'Pearl didirikan tahun 1946 dan berkembang menjadi salah satu produsen drum terbesar di dunia.',
                'year' => 1985,
            ],
            [
                'name' => 'Fender Jazz Bass',
                'origin' => 'Amerika Serikat',
                'description' => 'Bass elektrik dengan dua pickup single-coil dan neck yang slim untuk permainan cepat.',
                'history' => 'Diperkenalkan 1960, Jazz Bass menjadi pilihan utama untuk genre jazz, funk, dan fusion.',
                'year' => 1960,
            ],
            [
                'name' => 'Selmer Mark VI Saxophone',
                'origin' => 'Prancis',
                'description' => 'Saxophone alto legendaris yang dianggap sebagai holy grail oleh saxophonist profesional.',
                'history' => 'Diproduksi 1954-1974, Mark VI dimainkan oleh John Coltrane, Cannonball Adderley, dan banyak legenda jazz.',
                'year' => 1965,
            ],
            [
                'name' => 'Steinway Grand Piano',
                'origin' => 'Jerman/Amerika',
                'description' => 'Piano grand premium dengan aksi responsif dan tone yang kaya dan kompleks.',
                'history' => 'Steinway & Sons didirikan 1853 dan pianonya menjadi standar untuk konser klasik di seluruh dunia.',
                'year' => 1920,
            ],
            [
                'name' => 'Hammond B3 Organ',
                'origin' => 'Amerika Serikat',
                'description' => 'Organ elektrik dengan tonewheel yang menghasilkan suara khas jazz, blues, dan rock.',
                'history' => 'Hammond B3 dengan speaker Leslie menjadi suara ikonik dalam musik Jimmy Smith, Keith Emerson, dan Jon Lord.',
                'year' => 1955,
            ],
            [
                'name' => 'Pioneer CDJ-2000',
                'origin' => 'Jepang',
                'description' => 'DJ player profesional yang menjadi standar industri di club dan festival.',
                'history' => 'Pioneer CDJ series mendefinisikan standar DJing digital dan digunakan di hampir semua venue profesional.',
                'year' => 2009,
            ],
            [
                'name' => 'Native Instruments Maschine',
                'origin' => 'Jerman',
                'description' => 'Groovebox digital yang menggabungkan hardware controller dengan software produksi.',
                'history' => 'Maschine merevolusi produksi beat dengan workflow yang intuitif menggabungkan sampling dan sequencing.',
                'year' => 2009,
            ],
            [
                'name' => 'Theremin',
                'origin' => 'Rusia',
                'description' => 'Instrumen elektronik yang dimainkan tanpa sentuhan, menggunakan dua antena.',
                'history' => 'Ditemukan oleh Leon Theremin 1920, menjadi instrumen pertama yang sepenuhnya elektronik.',
                'year' => 1920,
            ],
            [
                'name' => 'Korg Minilogue',
                'origin' => 'Jepang',
                'description' => 'Synthesizer analog polifonik 4 suara yang terjangkau untuk pemula dan profesional.',
                'history' => 'Minilogue membawa synthesizer analog berkualitas tinggi ke harga yang lebih terjangkau pada 2016.',
                'year' => 2016,
            ],
            [
                'name' => 'Ableton Push',
                'origin' => 'Jerman',
                'description' => 'Controller untuk Ableton Live dengan 64 pad velocity-sensitive untuk produksi musik.',
                'history' => 'Push mengubah cara musisi berinteraksi dengan DAW, memungkinkan produksi tanpa melihat layar.',
                'year' => 2013,
            ],
            [
                'name' => 'Marshall JCM800 Amplifier',
                'origin' => 'Inggris',
                'description' => 'Amplifier gitar legendaris yang mendefinisikan suara rock dan metal.',
                'history' => 'JCM800 digunakan oleh Slash, Zakk Wylde, dan menjadi suara standar hard rock tahun 80-an.',
                'year' => 1981,
            ],
            [
                'name' => 'Rhodes Electric Piano',
                'origin' => 'Amerika Serikat',
                'description' => 'Piano elektrik dengan tine yang menghasilkan suara bell-like yang hangat dan soulful.',
                'history' => 'Fender Rhodes menjadi suara definitif soul, jazz, dan R&B dari Stevie Wonder hingga Herbie Hancock.',
                'year' => 1965,
            ],
            [
                'name' => 'Akai MPC2000',
                'origin' => 'Jepang',
                'description' => 'Sampler dan sequencer yang menjadi tulang punggung produksi hip-hop.',
                'history' => 'MPC series menciptakan sound hip-hop dari J Dilla, DJ Premier, hingga Kanye West.',
                'year' => 1997,
            ],
            [
                'name' => 'Violin Stradivarius',
                'origin' => 'Italia',
                'description' => 'Biola legendaris buatan Antonio Stradivari dengan kualitas suara yang tak tertandingi.',
                'history' => 'Hanya sekitar 650 instrumen Stradivarius yang masih ada, dengan harga mencapai jutaan dollar.',
                'year' => 1720,
            ],
            [
                'name' => 'Taylor 814ce Acoustic',
                'origin' => 'Amerika Serikat',
                'description' => 'Gitar akustik premium dengan top Sitka spruce dan pickup Expression System.',
                'history' => 'Taylor Guitars dikenal dengan inovasi seperti NT neck dan bracing V-Class yang modern.',
                'year' => 2010,
            ],
        ];

        // Insert Traditional Instruments
        foreach ($traditionalInstruments as $instrument) {
            MusicCollection::create([
                'name' => $instrument['name'],
                'category' => 'Traditional',
                'origin' => $instrument['origin'],
                'description' => $instrument['description'],
                'history' => $instrument['history'],
                'image_url' => 'https://placehold.co/600x400/8b5a2b/ffffff/png?text=' . urlencode($instrument['name']),
                'year' => $instrument['year'],
            ]);
        }

        // Insert Modern Instruments
        foreach ($modernInstruments as $instrument) {
            MusicCollection::create([
                'name' => $instrument['name'],
                'category' => 'Modern',
                'origin' => $instrument['origin'],
                'description' => $instrument['description'],
                'history' => $instrument['history'],
                'image_url' => 'https://placehold.co/600x400/1e3a8a/ffffff/png?text=' . urlencode($instrument['name']),
                'year' => $instrument['year'],
            ]);
        }
    }
}
