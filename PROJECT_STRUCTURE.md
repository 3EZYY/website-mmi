# Dokumentasi Struktur Folder Proyek MMI Website

Proyek ini adalah aplikasi web berbasis Laravel yang dikembangkan untuk website MMI (Museum Musik Indonesia). Berikut adalah dokumentasi struktur folder proyek ini, yang menjelaskan fungsi dan isi dari setiap folder dan file utama.

## Struktur Folder Utama

```
mmi-website/
├── app/                          # Kode aplikasi utama Laravel
│   ├── Http/
│   │   ├── Controllers/          # Controller untuk menangani request HTTP
│   │   ├── Middleware/           # Middleware untuk pemrosesan request
│   │   └── Requests/             # Form request classes
│   ├── Models/                   # Model Eloquent untuk database
│   │   └── User.php              # Model User
│   └── Providers/                # Service providers
│       └── AppServiceProvider.php
├── bootstrap/                    # Bootstrap aplikasi Laravel
│   ├── app.php
│   ├── providers.php
│   └── cache/
│       ├── packages.php
│       └── services.php
├── config/                       # File konfigurasi aplikasi
│   ├── app.php                   # Konfigurasi aplikasi umum
│   ├── auth.php                  # Konfigurasi autentikasi
│   ├── cache.php                 # Konfigurasi cache
│   ├── database.php              # Konfigurasi database
│   ├── filesystems.php           # Konfigurasi filesystem
│   ├── logging.php               # Konfigurasi logging
│   ├── mail.php                  # Konfigurasi email
│   ├── queue.php                 # Konfigurasi queue
│   ├── services.php              # Konfigurasi layanan eksternal
│   └── session.php               # Konfigurasi session
├── database/                     # Database-related files
│   ├── factories/                # Model factories untuk testing
│   │   └── UserFactory.php
│   ├── migrations/               # Database migrations
│   │   ├── 2014_10_12_000000_create_users_table.php
│   │   ├── 2025_01_01_000001_create_souvenirs_table.php
│   │   ├── 2025_01_01_000002_create_music_collections_table.php
│   │   ├── 2025_01_01_000003_create_news_table.php
│   │   ├── 2025_01_01_000004_create_tickets_table.php
│   │   ├── 2025_01_01_000005_create_orders_table.php.php
│   │   └── 2025_01_01_000006_create_order_items_table.php.php
│   ├── db/                       # File database (mungkin backup atau seed)
│   └── seeders/                  # Database seeders
│       └── DatabaseSeeder.php
├── project-structure/            # Folder duplikat struktur proyek (mungkin untuk dokumentasi)
├── public/                       # File publik yang dapat diakses web
│   ├── index.php                 # Entry point aplikasi
│   ├── robots.txt                # File robots untuk SEO
│   └── build/                    # Asset build (dari Vite)
│       ├── manifest.json
│       └── assets/
├── resources/                    # Resource files
│   ├── css/                      # File CSS
│   │   └── app.css
│   ├── js/                       # File JavaScript
│   │   ├── app.jsx               # Main React app
│   │   ├── bootstrap.js          # Bootstrap JS
│   │   ├── Components/           # Komponen React
│   │   ├── Layouts/              # Layout components
│   │   └── Pages/                # Halaman React
│   └── views/                    # Blade templates
│       └── app.blade.php
├── routes/                       # Definisi routes
│   ├── auth.php                  # Routes autentikasi
│   ├── console.php               # Console commands
│   └── web.php                   # Web routes
├── storage/                      # File penyimpanan
│   ├── app/                      # App-specific storage
│   │   ├── private/              # Private files
│   │   └── public/               # Public files
│   ├── framework/                # Framework storage
│   │   ├── cache/                # Cache files
│   │   ├── sessions/             # Session files
│   │   ├── testing/              # Testing files
│   │   └── views/                # Compiled views
│   └── logs/                     # Log files
├── tests/                        # Test cases
│   ├── TestCase.php              # Base test case
│   ├── Feature/                  # Feature tests
│   │   ├── ExampleTest.php
│   │   ├── ProfileTest.php
│   │   └── Auth/
│   └── Unit/                     # Unit tests
│       └── ExampleTest.php
├── vendor/                       # Dependencies dari Composer
│   ├── autoload.php
│   └── [vendor packages]         # Package vendor
├── artisan                       # Laravel Artisan CLI
├── composer.json                 # Konfigurasi Composer
├── jsconfig.json                 # Konfigurasi JavaScript
├── museum/                       # Folder khusus untuk museum (mungkin assets atau data)
├── package.json                  # Konfigurasi npm/yarn
├── phpunit.xml                   # Konfigurasi PHPUnit
├── postcss.config.js             # Konfigurasi PostCSS
├── README.md                     # Dokumentasi proyek
├── tailwind.config.js            # Konfigurasi Tailwind CSS
└── vite.config.js                # Konfigurasi Vite
```

## Penjelasan Detail Folder

### app/
Folder ini berisi kode inti aplikasi Laravel. Termasuk:
- **Http/Controllers/**: Controller yang menangani request HTTP dan mengembalikan response.
- **Http/Middleware/**: Middleware untuk memproses request sebelum mencapai controller.
- **Http/Requests/**: Custom form request classes untuk validasi.
- **Models/**: Model Eloquent yang merepresentasikan tabel database.
- **Providers/**: Service providers untuk mendaftarkan layanan ke container.

### bootstrap/
Berisi file bootstrap untuk memulai aplikasi Laravel, termasuk cache providers.

### config/
File konfigurasi untuk berbagai aspek aplikasi seperti database, cache, email, dll.

### database/
Berisi file terkait database:
- **migrations/**: Script untuk membuat/mengubah struktur database.
- **seeders/**: Script untuk mengisi data awal ke database.
- **factories/**: Factory untuk membuat data dummy untuk testing.

### public/
Folder yang dapat diakses langsung dari web. Berisi entry point (index.php) dan assets statis.

### resources/
Berisi resource files yang akan diproses:
- **css/**: File CSS (akan dikompilasi oleh build tool).
- **js/**: File JavaScript/React (akan dikompilasi oleh Vite).
- **views/**: Template Blade untuk server-side rendering.

### routes/
Definisi routes aplikasi:
- **web.php**: Routes untuk web interface.
- **auth.php**: Routes untuk autentikasi.
- **console.php**: Routes untuk console commands.

### storage/
Folder untuk file penyimpanan:
- **app/**: File aplikasi (private/public).
- **framework/**: File framework Laravel (cache, sessions, dll.).
- **logs/**: File log aplikasi.

### tests/
Berisi test cases untuk aplikasi, dibagi menjadi Feature tests dan Unit tests.

### vendor/
Dependencies yang diinstall via Composer. Jangan diedit manual.

## File Konfigurasi Utama

- **composer.json**: Mengelola dependencies PHP.
- **package.json**: Mengelola dependencies JavaScript.
- **vite.config.js**: Konfigurasi build tool Vite untuk frontend.
- **tailwind.config.js**: Konfigurasi Tailwind CSS.
- **phpunit.xml**: Konfigurasi testing framework PHPUnit.
- **artisan**: Command line interface Laravel.

## Teknologi yang Digunakan

- **Backend**: Laravel (PHP Framework)
- **Frontend**: React (dengan JSX), Tailwind CSS
- **Build Tool**: Vite
- **Database**: MySQL/PostgreSQL (berdasarkan migrations)
- **Testing**: PHPUnit

## Catatan Khusus

- Folder `museum/` tampaknya berisi assets atau data khusus museum.
- Folder `project-structure/` mungkin duplikat struktur untuk keperluan dokumentasi.
- Aplikasi ini menggunakan Inertia.js (berdasarkan struktur dan dependencies) untuk menghubungkan Laravel dengan React.

Dokumentasi ini dapat diperbarui seiring perkembangan proyek.