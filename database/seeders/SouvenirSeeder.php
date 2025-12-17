<?php

namespace Database\Seeders;

use App\Models\Souvenir;
use Illuminate\Database\Seeder;

class SouvenirSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $souvenirData = [
            [
                'name' => 'Gantungan Kunci Biola Mini',
                'description' => 'Gantungan kunci berbentuk biola mini yang detail dan elegan. Terbuat dari logam berkualitas dengan finishing gold/silver. Cocok untuk pecinta musik klasik.',
                'category' => 'Aksesoris',
                'price' => 25000,
                'stock' => 85,
            ],
            [
                'name' => 'Totebag Motif Kaset Retro',
                'description' => 'Totebag kanvas premium dengan desain kaset tape retro era 80-90an. Bahan tebal dan kuat, cocok untuk sehari-hari. Tersedia dalam warna hitam dan cream.',
                'category' => 'Fashion',
                'price' => 75000,
                'stock' => 45,
            ],
            [
                'name' => 'Stiker Pack Band Lawas Indonesia',
                'description' => 'Set stiker berisi 10 lembar dengan desain band-band legendaris Indonesia seperti Koes Plus, God Bless, GIGI, dan lainnya. Bahan vinyl waterproof.',
                'category' => 'Merchandise',
                'price' => 20000,
                'stock' => 120,
            ],
            [
                'name' => 'Pin Gitar Akustik Enamel',
                'description' => 'Pin enamel berbentuk gitar akustik dengan detail memukau. Ukuran 3cm, cocok untuk jaket, tas, atau topi. Limited edition MMI.',
                'category' => 'Aksesoris',
                'price' => 15000,
                'stock' => 100,
            ],
            [
                'name' => 'Notebook Musik A5 Hardcover',
                'description' => 'Notebook hardcover ukuran A5 dengan cover motif not balok dan alat musik. 100 halaman kertas berkualitas, cocok untuk journaling atau menulis lirik.',
                'category' => 'Stationery',
                'price' => 45000,
                'stock' => 60,
            ],
            [
                'name' => 'Mug Keramik Piano Keys',
                'description' => 'Mug keramik dengan desain tuts piano yang unik. Kapasitas 350ml, microwave & dishwasher safe. Packaging eksklusif untuk hadiah.',
                'category' => 'Peralatan',
                'price' => 55000,
                'stock' => 40,
            ],
            [
                'name' => 'Kaos MMI Logo Official',
                'description' => 'Kaos official Museum Musik Indonesia dengan logo premium. Bahan cotton combed 30s, tersedia ukuran S-XXL. Warna hitam dan putih.',
                'category' => 'Fashion',
                'price' => 95000,
                'stock' => 75,
            ],
            [
                'name' => 'Magnet Kulkas Angklung',
                'description' => 'Magnet kulkas berbentuk angklung khas Indonesia. Terbuat dari resin berkualitas dengan detail warna yang cantik. Oleh-oleh khas museum.',
                'category' => 'Souvenir',
                'price' => 18000,
                'stock' => 90,
            ],
            [
                'name' => 'Poster Vintage Musik Indonesia',
                'description' => 'Poster ukuran A2 dengan desain vintage musik Indonesia era 70-80an. Dicetak di kertas art paper 260gsm. Tersedia berbagai desain.',
                'category' => 'Dekorasi',
                'price' => 35000,
                'stock' => 55,
            ],
            [
                'name' => 'Topi Baseball Vinyl Record',
                'description' => 'Topi baseball dengan bordir piringan hitam vinyl di bagian depan. Adjustable strap, one size fits all. Warna hitam dengan aksen emas.',
                'category' => 'Fashion',
                'price' => 65000,
                'stock' => 35,
            ],
        ];

        foreach ($souvenirData as $souvenir) {
            Souvenir::create([
                'name' => $souvenir['name'],
                'description' => $souvenir['description'],
                'price' => $souvenir['price'],
                'image_url' => 'https://placehold.co/400x400/6366f1/ffffff/png?text=' . urlencode($souvenir['name']),
                'category' => $souvenir['category'],
                'stock' => $souvenir['stock'],
            ]);
        }
    }
}
