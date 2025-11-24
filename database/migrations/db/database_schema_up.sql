-- 1. Tabel Souvenirs
CREATE TABLE `souvenirs` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price` INT NOT NULL,
  `image_url` TEXT NULL,
  `category` VARCHAR(255) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 2. Tabel Music Collections
CREATE TABLE `music_collections` (
  `id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `origin` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `history` TEXT NULL,
  `image_url` TEXT NULL,
  `year` INT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 3. Tabel News
CREATE TABLE `news` (
  `id` CHAR(36) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT NOT NULL,
  `content` TEXT NOT NULL,
  `image_url` TEXT NULL,
  `category` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `published_date` DATE NOT NULL DEFAULT (CURRENT_DATE),
  `is_published` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- 4. Tabel Tickets
CREATE TABLE `tickets` (
  `id` CHAR(36) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL, -- Sesuaikan dengan tipe ID di tabel users (biasanya BIGINT di Laravel)
  `visitor_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `visit_date` DATE NOT NULL,
  `quantity` INT NOT NULL DEFAULT 1,
  `total_price` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'gopay',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tickets_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- 5. Tabel Orders
CREATE TABLE `orders` (
  `id` CHAR(36) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL, -- Sesuaikan dengan tipe ID di tabel users
  `total_amount` INT NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
  `shipping_address` TEXT NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `payment_method` VARCHAR(50) NOT NULL DEFAULT 'gopay',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);

-- 6. Tabel Order Items
CREATE TABLE `order_items` (
  `id` CHAR(36) NOT NULL,
  `order_id` CHAR(36) NOT NULL,
  `souvenir_id` CHAR(36) NOT NULL,
  `quantity` INT NOT NULL,
  `price` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_order_items_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_order_items_souvenir` FOREIGN KEY (`souvenir_id`) REFERENCES `souvenirs` (`id`) ON DELETE CASCADE
);