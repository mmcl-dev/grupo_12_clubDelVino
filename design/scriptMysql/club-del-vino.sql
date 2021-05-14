DROP DATABASE IF EXISTS club_del_vino;
CREATE DATABASE club_del_vino;
USE club_del_vino;


--
-- Table structure for pivot table user-product
--
DROP TABLE IF EXISTS `user_product`;

CREATE TABLE `user_product` (
  `id` int(10) unsigned AUTO_INCREMENT NOT NULL,
  `createdAt` timestamp NULL,
  `updatedAt` timestamp NULL,
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity`  int(10) unsigned,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table  - users
--
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id_user` int(10) unsigned AUTO_INCREMENT NOT NULL,
  `createdAt` timestamp NULL,
  `updatedAt` timestamp NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `categories`
--
DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id_category` int(10) unsigned AUTO_INCREMENT NOT NULL,
  `createdAt` timestamp NULL,
  `updatedAt` timestamp NULL,
  `category_name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_category`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `products`
--
DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `id_product` int(10) unsigned AUTO_INCREMENT NOT NULL,
  `createdAt` timestamp NULL,
  `updatedAt` timestamp NULL,
  `product_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `wine_family` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `year`  int(10) unsigned NOT NULL,
  `price`  decimal(10,2) unsigned NOT NULL,
  `offer`  tinyint(1) DEFAULT '0' NOT NULL,
  `offer_price`  decimal(10,2) unsigned NOT NULL,
  `image`  varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_product`)
) ENGINE=InnoDB CHARSET=utf8 COLLATE=utf8_unicode_ci;


USE club_del_vino;
-- FK de products a user_product
ALTER TABLE `products` ADD FOREIGN KEY (category_id) REFERENCES categories(id_category);

-- FK de user_product a products y users
ALTER TABLE `user_product` ADD FOREIGN KEY (product_id) REFERENCES products(id_product);
ALTER TABLE `user_product` ADD FOREIGN KEY (user_id) REFERENCES users(id_user);
