-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2018 at 07:21 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `photography_club`
--

-- --------------------------------------------------------

--
-- Table structure for table `albums`
--

CREATE TABLE `albums` (
  `id` int(11) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `location` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `date_last_upload` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `albums`
--

INSERT INTO `albums` (`id`, `name`, `date`, `location`, `date_created`, `date_last_upload`, `user_id`, `status`) VALUES
(1, 'Pixel Art', '0000-00-00', '', '2018-01-03 03:28:02', '2018-01-03 03:28:02', 1, 1),
(2, 'Tiến Coffee', '2018-01-12', '', '2018-01-04 15:33:16', '2018-01-04 15:33:16', 1, 1),
(3, 'Vớ vẩns', '2017-09-22', 'Ho&agrave;i Đức, H&agrave; Nội', '2018-01-05 22:51:35', '2018-01-05 22:51:35', 1, 1),
(9, 'OK! :)', '1997-10-20', '', '2018-01-05 23:29:16', '2018-01-05 23:29:16', 1, 1),
(10, '<script>alert("XSS")</script>', '0051-05-04', '', '2018-01-06 00:43:55', '2018-01-06 00:43:55', 1, 1),
(11, 'Hotgirl''s', '1997-10-20', 'Tokyo', '2018-01-06 02:14:13', '2018-01-06 02:14:13', 1, 1),
(12, 'Động vật :)', '0001-01-01', 'Châu Phi, Trái Đất', '2018-01-10 20:29:31', '2018-01-10 20:29:31', 1, 1),
(13, 's', '2018-01-26', '', '2018-01-11 12:25:10', '2018-01-11 12:25:10', 1, 1),
(14, 'Khác...', '2018-01-19', 'X', '2018-01-11 12:45:59', '2018-01-11 12:45:59', 1, 1),
(15, 'e            w                        edw', '2017-10-31', 'Rừng Amazon', '2018-01-11 13:49:24', '2018-01-11 13:49:24', 1, 1),
(16, 'test.test', '0000-00-00', 'qweqwe', '2018-01-11 17:18:08', '2018-01-11 17:18:08', 1, 1),
(17, 'hihi', '2018-01-11', 'Dubai', '2018-01-11 17:26:59', '2018-01-11 17:26:59', 1, 1),
(18, 'Du lịch', '0000-00-00', 'Bãi biển Sầm Sơn.', '2018-01-11 17:29:07', '2018-01-11 17:29:07', 1, 1),
(19, 'Không tên', '0000-00-00', 'Không biết', '2018-01-11 17:30:56', '2018-01-11 17:30:56', 1, 1),
(20, 'asdasd', '0000-00-00', 'qwew', '2018-01-11 17:32:35', '2018-01-11 17:32:35', 1, 1),
(21, 'asdawd', '2018-01-11', '', '2018-01-11 17:38:41', '2018-01-11 17:38:41', 1, 1),
(22, '123123', '2017-01-11', 'rt', '2018-01-11 17:44:11', '2018-01-11 17:44:11', 1, 1),
(23, '@', '0000-00-00', '', '2018-01-11 17:44:40', '2018-01-11 17:44:40', 1, 1),
(24, 'huhu23', '0000-00-00', 'aw', '2018-01-11 17:47:05', '2018-01-11 17:47:05', 1, 1),
(25, 'kraken', '2003-05-08', 'water', '2018-01-11 17:51:13', '2018-01-11 17:51:13', 1, 1),
(26, 'why?', '2018-01-11', '', '2018-01-11 17:52:23', '2018-01-11 17:52:23', 1, 1),
(27, 'awd', '2018-01-11', '', '2018-01-11 17:52:38', '2018-01-11 17:52:38', 1, 1),
(28, 'awdd', '2018-01-11', '', '2018-01-11 17:53:11', '2018-01-11 17:53:11', 1, 1),
(29, '123', '2018-01-11', '', '2018-01-11 17:53:37', '2018-01-11 17:53:37', 1, 1),
(30, '333', '2018-01-11', '', '2018-01-11 17:53:53', '2018-01-11 17:53:53', 1, 1),
(31, 'Tiens', '2018-01-11', 'Hà Nội', '2018-01-11 18:12:51', '2018-01-11 18:12:51', 1, 1),
(32, 'cxcx', '2018-01-11', '', '2018-01-11 18:14:29', '2018-01-11 18:14:29', 1, 1),
(33, 'sad', '2018-01-11', '', '2018-01-11 18:15:12', '2018-01-11 18:15:12', 1, 1),
(34, 'papa', '1982-12-11', '111', '2018-01-11 18:18:07', '2018-01-11 18:18:07', 1, 1),
(35, 'eye', '0000-00-00', '', '2018-01-11 18:18:35', '2018-01-11 18:18:35', 1, 1),
(36, 'Album đầu tiên', '2016-01-15', 'Trái Đất', '2018-01-11 18:32:20', '2018-01-11 18:32:20', 3, 1),
(37, '789123', '2018-01-11', 'Andromeda Galaxy', '2018-01-11 18:33:04', '2018-01-11 18:33:04', 3, 1),
(38, 'EMPTY', '1996-12-24', '', '2018-01-11 18:37:20', '2018-01-11 18:37:20', 3, 1),
(39, 'www', '2018-01-13', '', '2018-01-13 11:02:05', '2018-01-13 11:02:05', 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `imgs`
--

CREATE TABLE `imgs` (
  `id` int(11) NOT NULL,
  `name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `album_id` int(11) NOT NULL,
  `date_upload` datetime NOT NULL,
  `type` enum('png','jpg','jpeg','gif') COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `imgs`
--

INSERT INTO `imgs` (`id`, `name`, `album_id`, `date_upload`, `type`, `status`) VALUES
(1, 'pixel_art_001', 1, '2018-01-04 10:56:08', 'jpg', 1),
(2, '077ee6094b0ffcf4b2c38d466743c928-d5ccss3.png', 2, '2018-01-05 22:40:18', 'png', 1),
(3, '90ed4e06d23cf4a3b1ba6dca7386041d-d5bks9i.png', 2, '2018-01-05 22:40:18', 'png', 1),
(4, '361.jpg', 2, '2018-01-05 22:40:18', 'jpg', 1),
(14, '2 anh em xem cái gì thế', 9, '2018-01-06 00:31:09', 'jpg', 1),
(15, '3a374e518ad3d80cc8e0fc46a941515b-d546ojj', 9, '2018-01-06 00:31:09', 'png', 1),
(16, '12717322_218646491820315_3605869932693262622_n', 9, '2018-01-06 00:31:09', 'jpg', 1),
(17, '7ffd038066ca68fb8c25e40c805e28d1-d51e5x2', 9, '2018-01-06 00:36:38', 'png', 1),
(18, '7ffd038066ca68fb8c25e40c805e28d1-d51e5x2', 9, '2018-01-06 00:41:33', 'png', 1),
(19, '7ffd038066ca68fb8c25e40c805e28d1-d51e5x2', 9, '2018-01-06 00:42:13', 'png', 1),
(20, '10850254_10202736700457004_4723595387139237364_n', 9, '2018-01-06 02:10:17', 'jpg', 1),
(21, '6f6df5bf40a2372a44939feb0774cdbb-d49565q', 11, '2018-01-06 02:14:43', 'png', 1),
(22, '90ed4e06d23cf4a3b1ba6dca7386041d-d5bks9i', 11, '2018-01-06 02:14:43', 'png', 1),
(23, '23795329_543966899274166_5538209146831885495_n', 11, '2018-01-06 02:15:41', 'jpg', 1),
(24, '23032914_833149320224954_2437957948385198808_n', 3, '2018-01-06 02:19:15', 'jpg', 1),
(25, '1-140GG155390-L', 3, '2018-01-06 02:19:51', 'jpg', 1),
(26, '16730402_960670757401878_8246450761626446642_n', 3, '2018-01-06 02:20:34', 'jpg', 1),
(27, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:25:43', 'jpg', 1),
(28, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:25:52', 'jpg', 1),
(29, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:25:56', 'jpg', 1),
(30, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:25:58', 'jpg', 1),
(31, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:00', 'jpg', 1),
(32, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:00', 'jpg', 1),
(33, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:01', 'jpg', 1),
(34, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:01', 'jpg', 1),
(35, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:07', 'jpg', 1),
(36, '20729431_1939490526338828_7811941605659910158_n', 2, '2018-01-06 02:26:13', 'jpg', 1),
(37, '13895252_1162831100440267_6962865104325050366_n', 12, '2018-01-10 20:56:07', 'jpg', 1),
(38, 'African_lion_4574', 12, '2018-01-10 20:56:07', 'jpg', 1),
(39, 'ec24f8a3ff87868b33d8cc057cbc9d84', 12, '2018-01-10 20:56:07', 'jpg', 1),
(40, 'nhin-hinh-doan-tinh-cach-5-ohay-ohay-tv-34216', 14, '2018-01-11 14:24:16', 'jpg', 1),
(41, 'xyrrxkz-1456117562101', 14, '2018-01-11 14:24:16', 'gif', 1),
(42, 'nhin-hinh-doan-tinh-cach-5-ohay-ohay-tv-34216', 14, '2018-01-11 14:41:18', 'jpg', 1),
(43, 'xyrrxkz-1456117562101', 14, '2018-01-11 14:41:18', 'gif', 1),
(44, '18057646_731268270384270_8275491527375969635_n', 12, '2018-01-11 14:42:22', 'jpg', 1),
(45, '18057646_731268270384270_8275491527375969635_n', 12, '2018-01-11 14:43:50', 'jpg', 1),
(46, '18057646_731268270384270_8275491527375969635_n', 12, '2018-01-11 14:44:11', 'jpg', 1),
(47, '18057646_731268270384270_8275491527375969635_n', 12, '2018-01-11 14:45:02', 'jpg', 1),
(48, 'Bambusicola_fytchii_-short_grass-8', 14, '2018-01-11 14:46:48', 'jpg', 1),
(49, 'B-BLACK-BG', 14, '2018-01-11 14:46:48', 'jpg', 1),
(50, 'BeachGate-GTA4-ShinnecockAvenue', 14, '2018-01-11 14:46:48', 'jpg', 1),
(51, 'Bengalese_Eagle_Owl', 14, '2018-01-11 14:46:48', 'jpg', 1),
(52, 'Blue_tiger', 14, '2018-01-11 14:46:48', 'jpg', 1),
(53, 'animals-wallpaper-tigers-lions-leopard-prowling-pictures', 14, '2018-01-11 14:46:48', 'jpg', 1),
(54, 'b1dac0470bdf2f7cc0c559599fba19f9', 14, '2018-01-11 14:46:49', 'jpg', 1),
(55, 'baby-black-panther-drawing-wallpaper-4', 14, '2018-01-11 14:46:49', 'jpg', 1),
(56, 'baby-squirrel-10938460', 14, '2018-01-11 14:46:49', 'jpg', 1),
(57, 'background', 14, '2018-01-11 14:46:49', 'png', 1),
(58, 'background-wallpapers-26_HgdHzBm', 14, '2018-01-11 14:46:49', 'jpg', 1),
(59, 'Bambusicola_fytchii_-short_grass-8', 15, '2018-01-11 14:48:35', 'jpg', 1),
(60, 'B-BLACK-BG', 15, '2018-01-11 14:48:35', 'jpg', 1),
(61, 'BeachGate-GTA4-ShinnecockAvenue', 15, '2018-01-11 14:48:35', 'jpg', 1),
(62, 'Bengalese_Eagle_Owl', 15, '2018-01-11 14:48:35', 'jpg', 1),
(63, 'Blue_tiger', 15, '2018-01-11 14:48:35', 'jpg', 1),
(64, 'animals-wallpaper-tigers-lions-leopard-prowling-pictures', 15, '2018-01-11 14:48:36', 'jpg', 1),
(65, 'b1dac0470bdf2f7cc0c559599fba19f9', 15, '2018-01-11 14:48:36', 'jpg', 1),
(66, 'baby-black-panther-drawing-wallpaper-4', 15, '2018-01-11 14:48:36', 'jpg', 1),
(67, 'baby-squirrel-10938460', 15, '2018-01-11 14:48:36', 'jpg', 1),
(68, 'background', 15, '2018-01-11 14:48:36', 'png', 1),
(69, 'background-wallpapers-26_HgdHzBm', 15, '2018-01-11 14:48:36', 'jpg', 1),
(70, '13895252_1162831100440267_6962865104325050366_n', 36, '2018-01-11 18:32:46', 'jpg', 1),
(71, 'African_lion_4574', 36, '2018-01-11 18:32:46', 'jpg', 1),
(72, 'ec24f8a3ff87868b33d8cc057cbc9d84', 36, '2018-01-11 18:32:46', 'jpg', 1),
(73, '15181409_1802488860023211_4159700492973103357_n', 37, '2018-01-11 18:33:44', 'jpg', 1),
(74, 'CHFZU', 37, '2018-01-11 18:33:44', 'gif', 1),
(75, 'nomansskyheader', 37, '2018-01-11 18:33:44', 'jpg', 1),
(76, 'world-commodities-map_536bebb20436a.0', 37, '2018-01-11 18:33:44', 'png', 1),
(77, 'CHFZU', 37, '2018-01-11 18:34:26', 'gif', 1),
(78, '14641966_991859324269732_4770770717945666321_n', 24, '2018-01-11 20:12:49', 'jpg', 1),
(79, 'BeachGate-GTA4-ShinnecockAvenue', 9, '2018-01-13 03:42:57', 'jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `upload_histories`
--

CREATE TABLE `upload_histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `date_created` date NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `first_name`, `last_name`, `email`, `date_created`, `status`) VALUES
(1, 'tiencoffee', 'e10adc3949ba59abbe56e057f20f883e', 'Trần Quang', 'Tiến', '', '0000-00-00', 1),
(2, 'tiencoffee4', 'e10adc3949ba59abbe56e057f20f883e', 'Trần Quang', 'Tiến', '', '0000-00-00', 1),
(3, 'tiencoffee1', 'e10adc3949ba59abbe56e057f20f883e', 'Trần Quang', 'Tiến', '', '0000-00-00', 1),
(4, 'tiencoffee5', 'e10adc3949ba59abbe56e057f20f883e', 'tien', 'coffee', '', '0000-00-00', 1),
(5, 'tiencoffee66', 'e10adc3949ba59abbe56e057f20f883e', 'tien', 'coffee', '', '0000-00-00', 1),
(6, 'tiencoffee6666', 'e10adc3949ba59abbe56e057f20f883e', 'Eqwe', '123W', '', '0000-00-00', 1),
(7, 'tiencoffee123', '4297f44b13955235245b2497399d7a93', 'Đăng ký', 'Đăng ký', '', '0000-00-00', 1),
(8, 'tttttt', 'ff2f24f8b6d253bb5a8bc55728ca7372', 'sd', 'ww', '', '0000-00-00', 1),
(9, 'wadawdawd', '40242266612576fcf0fc16a08b58a833', 'ađă', 'ăđă', '', '0000-00-00', 1),
(10, 'qweqweqwe', 'e10adc3949ba59abbe56e057f20f883e', 'tien', 'coffee', 'tiensuitie@gmail.com', '2018-01-07', 1),
(11, 'mr-bug', 'efe6398127928f1b2e9ef3207fb82663', 'Tại', 'Sao?', '', '2018-01-07', 1),
(12, 'tiencoffee2', '4297f44b13955235245b2497399d7a93', '123', '456', '', '2018-01-07', 1),
(13, 'qaqaqa', 'b71128711b0fa7047b40a23eb1f0bd4c', 'qqq', 'qaqa', '', '2018-01-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users_setting`
--

CREATE TABLE `users_setting` (
  `user_id` int(11) UNSIGNED NOT NULL,
  `optimize_contrast` tinyint(1) NOT NULL DEFAULT '1',
  `motion_effect` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_setting`
--

INSERT INTO `users_setting` (`user_id`, `optimize_contrast`, `motion_effect`) VALUES
(1, 1, 1),
(2, 1, 1),
(3, 1, 1),
(4, 1, 1),
(5, 1, 1),
(6, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgs`
--
ALTER TABLE `imgs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `upload_histories`
--
ALTER TABLE `upload_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_setting`
--
ALTER TABLE `users_setting`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `imgs`
--
ALTER TABLE `imgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;
--
-- AUTO_INCREMENT for table `upload_histories`
--
ALTER TABLE `upload_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `users_setting`
--
ALTER TABLE `users_setting`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
