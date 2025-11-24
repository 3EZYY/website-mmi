-- Hapus tabel anak (Child) dulu
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `tickets`;

-- Hapus tabel independen
DROP TABLE IF EXISTS `news`;
DROP TABLE IF EXISTS `music_collections`;
DROP TABLE IF EXISTS `souvenirs`;

-- Note: Tabel 'users' tidak dihapus karena itu tabel bawaan sistem/auth