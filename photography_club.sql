-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 08, 2018 at 11:18 AM
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
(1, 'Hotgirl''s', '2017-10-20', 'Hà Nội 2', '2018-01-14 09:39:26', '2018-02-02 14:16:52', 1, 1),
(2, 'Động vật :)', '2018-01-13', 'Vườn thú Thủ Lệ, Đường vào Thủ Lệ, Ngọc Khánh, Hà Nội, Việt Nam', '2017-07-14 09:40:36', '2018-01-30 10:54:20', 1, 1),
(3, 'Ảnh vui :3', '0000-00-00', '', '2018-01-14 10:59:05', '2018-01-30 10:09:11', 2, 1),
(4, 'Programmer', '2015-09-13', 'Silicon valley, California, USA', '2018-01-30 10:22:23', '2018-01-30 10:40:17', 3, 1),
(5, 'games', '2018-01-30', '', '2018-01-30 10:51:47', '2018-01-30 10:51:50', 3, 1),
(6, 'Phong cảnh', '2018-01-29', '', '2018-01-30 11:02:33', '2018-01-30 13:59:19', 1, 1),
(7, 'Phong cảnh', '2018-01-30', '', '2018-01-30 14:38:49', '2018-01-30 14:38:52', 3, 1),
(8, 'Vũ trụ', '2018-02-02', 'University City, Missouri, Hoa Kỳ', '2018-02-02 18:27:44', '2018-02-02 18:45:00', 1, 1),
(9, '@Delete@@', '2018-02-02', '', '2018-02-02 18:43:29', '2018-02-02 18:46:50', 1, 0),
(10, 'adsadsads', '2018-02-02', '', '2018-02-02 18:53:04', '2018-02-02 18:53:04', 2, 0),
(11, '213123123', '2018-02-02', 'Trondheim, Na Uy', '2018-02-02 18:55:15', '2018-02-02 18:55:15', 2, 0),
(12, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type a', '2018-02-02', 'Karnataka, Ấn Độ', '2018-02-02 20:18:54', '2018-02-02 20:31:20', 3, 1),
(13, '123', '2018-02-02', '', '2018-02-02 20:27:00', '2018-02-02 20:27:00', 3, 0),
(14, '777', '2018-02-02', '', '2018-02-02 20:28:21', '2018-02-02 20:28:21', 3, 0),
(15, 'wqe', '2018-02-02', '', '2018-02-02 20:28:41', '2018-02-02 20:28:41', 3, 0),
(16, 'cuuciucucc', '2018-02-02', 'Reno, Nevada, Hoa Kỳ', '2018-02-02 20:29:15', '2018-02-02 20:29:15', 3, 1),
(17, 'error!!!', '2018-02-02', '', '2018-02-02 20:29:40', '2018-02-02 20:29:40', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `histories_copy_img`
--

CREATE TABLE `histories_copy_img` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `insert_img_id` int(11) NOT NULL,
  `img_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `from_album_id` int(11) NOT NULL,
  `from_album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `to_album_id` int(11) NOT NULL,
  `to_album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_copy_img`
--

INSERT INTO `histories_copy_img` (`id`, `user_id`, `img_id`, `insert_img_id`, `img_name`, `from_album_id`, `from_album_name`, `to_album_id`, `to_album_name`, `date`, `time`) VALUES
(1, 1, 23, 29, 'New York', 6, 'Phong cảnh', 6, 'Phong cảnh', '2018-02-02', '16:28:54');

-- --------------------------------------------------------

--
-- Table structure for table `histories_create_album`
--

CREATE TABLE `histories_create_album` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_create_album`
--

INSERT INTO `histories_create_album` (`id`, `user_id`, `album_id`, `album_name`, `date`, `time`) VALUES
(1, 1, 1, 'Hotgirl''s', '2018-01-14', '09:39:26'),
(2, 1, 2, 'Động vật :)', '2017-07-14', '09:40:36'),
(3, 2, 3, 'Ảnh vui :3', '2018-01-14', '10:59:05'),
(4, 3, 4, 'Programmer', '2018-01-30', '10:22:23'),
(5, 3, 5, 'game', '2018-01-30', '10:51:47'),
(6, 1, 6, 'Phong cảnh', '2018-01-30', '11:02:33'),
(7, 3, 7, 'Phong cảnh', '2018-01-30', '14:38:49'),
(8, 1, 8, 'Cuckoo :v', '2018-02-02', '18:27:44'),
(9, 1, 9, '@Delete@@', '2018-02-02', '18:43:29'),
(10, 2, 10, 'adsadsads', '2018-02-02', '18:53:04'),
(11, 2, 11, '213123123', '2018-02-02', '18:55:15'),
(12, 3, 12, '45', '2018-02-02', '20:18:54'),
(13, 3, 13, '123', '2018-02-02', '20:27:00'),
(14, 3, 14, '777', '2018-02-02', '20:28:21'),
(15, 3, 15, 'wqe', '2018-02-02', '20:28:41'),
(16, 3, 16, 'cuuciucucc', '2018-02-02', '20:29:15'),
(17, 3, 17, 'error!!!', '2018-02-02', '20:29:40');

-- --------------------------------------------------------

--
-- Table structure for table `histories_delete_album`
--

CREATE TABLE `histories_delete_album` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_delete_album`
--

INSERT INTO `histories_delete_album` (`id`, `user_id`, `album_id`, `album_name`, `date`, `time`) VALUES
(1, 1, 9, '@Delete@@', '2018-02-02', '18:47:28'),
(2, 2, 11, '213123123', '2018-02-02', '18:55:34'),
(3, 2, 10, 'adsadsads', '2018-02-02', '18:55:38'),
(4, 3, 13, '123', '2018-02-02', '20:36:10'),
(5, 3, 15, 'wqe', '2018-02-02', '20:36:14'),
(6, 3, 14, '777', '2018-02-02', '20:36:20'),
(7, 3, 17, 'error!!!', '2018-02-02', '20:36:36');

-- --------------------------------------------------------

--
-- Table structure for table `histories_delete_img`
--

CREATE TABLE `histories_delete_img` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `img_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_delete_img`
--

INSERT INTO `histories_delete_img` (`id`, `user_id`, `img_id`, `img_name`, `date`, `time`) VALUES
(1, 1, 14, 'ec24f8a3ff87868b33d8cc057cbc9d84', '2018-02-01', '08:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `histories_move_img`
--

CREATE TABLE `histories_move_img` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `img_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `from_album_id` int(11) NOT NULL,
  `from_album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `to_album_id` int(11) NOT NULL,
  `to_album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_move_img`
--

INSERT INTO `histories_move_img` (`id`, `user_id`, `img_id`, `img_name`, `from_album_id`, `from_album_name`, `to_album_id`, `to_album_name`, `date`, `time`) VALUES
(1, 1, 28, '12342604_1529797694008884_2253820872118604586_n', 1, 'Hotgirl''s', 2, 'Động vật :)', '2018-02-02', '14:49:40'),
(2, 1, 37, '13524392_305678876431941_4926734575888041975_n', 8, 'Vũ trụ', 9, '@Delete@@', '2018-02-02', '18:45:15');

-- --------------------------------------------------------

--
-- Table structure for table `histories_rename_album`
--

CREATE TABLE `histories_rename_album` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `old_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `new_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_rename_album`
--

INSERT INTO `histories_rename_album` (`id`, `user_id`, `album_id`, `old_name`, `new_name`, `date`, `time`) VALUES
(1, 3, 5, 'game', 'games', '2018-02-02', '03:38:31'),
(2, 1, 8, 'Cuckoo :v', 'Vũ trụ', '2018-02-02', '18:35:56'),
(3, 3, 12, '45', 'Đẹp', '2018-02-02', '20:31:34'),
(4, 3, 12, 'Đẹp', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type a', '2018-02-02', '20:32:02');

-- --------------------------------------------------------

--
-- Table structure for table `histories_rename_img`
--

CREATE TABLE `histories_rename_img` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `old_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `new_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_rename_img`
--

INSERT INTO `histories_rename_img` (`id`, `user_id`, `img_id`, `old_name`, `new_name`, `date`, `time`) VALUES
(1, 1, 16, 'joyce-chu', 'Joyce Chu', '2018-02-02', '02:11:16'),
(2, 3, 39, '24909856_1978266972412141_6598167134582782564_n', 'Vũ trụ.', '2018-02-02', '20:32:57');

-- --------------------------------------------------------

--
-- Table structure for table `histories_upload`
--

CREATE TABLE `histories_upload` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `album_name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `img_id` int(11) NOT NULL,
  `img_name` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `histories_upload`
--

INSERT INTO `histories_upload` (`id`, `user_id`, `album_id`, `album_name`, `img_id`, `img_name`, `date`, `time`) VALUES
(1, 1, 2, 'Động vật :)', 12, '13895252_1162831100440267_6962865104325050366_n', '2017-08-30', '02:39:00'),
(2, 1, 2, 'Động vật :)', 13, 'African_lion_4574', '2018-01-03', '02:39:00'),
(3, 1, 2, 'Động vật :)', 14, 'ec24f8a3ff87868b33d8cc057cbc9d84', '2018-01-03', '02:39:00'),
(4, 1, 1, 'Hotgirl''s', 15, 'Thung Lũng Silicon', '2018-01-14', '22:40:28'),
(5, 1, 1, 'Hotgirl''s', 16, 'joyce-chu', '2018-01-30', '02:41:08'),
(6, 2, 3, 'Ảnh vui :3', 17, 'CHFZU', '2018-01-30', '10:07:39'),
(7, 2, 3, 'Ảnh vui :3', 18, '14721635_1733989156865314_29867228318290717_n', '2018-01-30', '10:09:11'),
(8, 3, 4, 'Programmer', 19, '2131-07-08-2017-11-21-24', '2018-01-30', '10:40:17'),
(9, 3, 5, 'game', 20, '3ddgh-custom-cloud', '2018-01-30', '10:51:50'),
(10, 1, 2, 'Động vật :)', 21, 'Leopard.LW', '2018-01-30', '10:54:20'),
(11, 1, 6, 'Phong cảnh', 22, '22222069_800319393462693_810738573507100016_n', '2018-01-30', '11:02:38'),
(12, 1, 6, 'Phong cảnh', 23, 'New York', '2018-01-30', '11:02:38'),
(13, 1, 6, 'Phong cảnh', 24, 'White_sturgeon_farming_california', '2018-01-30', '11:02:38'),
(14, 1, 6, 'Phong cảnh', 25, 'Green-Lawn-And-Trees-Photos', '2018-01-30', '13:56:52'),
(15, 1, 6, 'Phong cảnh', 26, 'Tokyo View', '2018-01-30', '13:59:19'),
(16, 3, 7, 'Phong cảnh', 27, 'Green-Lawn-And-Trees-Photos', '2018-01-30', '14:38:52'),
(17, 1, 1, 'Hotgirl''s', 28, '12342604_1529797694008884_2253820872118604586_n', '2018-02-02', '14:16:52'),
(18, 1, 8, 'Cuckoo :v', 34, '24993358_1978266455745526_8563561596763192010_n', '2018-02-02', '18:35:20'),
(19, 1, 8, 'Cuckoo :v', 35, '25158117_1978266449078860_3625009308586374126_n', '2018-02-02', '18:35:20'),
(20, 1, 8, 'Cuckoo :v', 36, '24909856_1978266972412141_6598167134582782564_n', '2018-02-02', '18:35:20'),
(21, 1, 8, 'Vũ trụ', 37, '13524392_305678876431941_4926734575888041975_n', '2018-02-02', '18:45:00'),
(22, 1, 9, '@Delete@@', 38, '15871834_198991817232013_8206583478386560323_n', '2018-02-02', '18:46:50'),
(23, 3, 12, '45', 39, '24909856_1978266972412141_6598167134582782564_n', '2018-02-02', '20:31:20');

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
(12, '13895252_1162831100440267_6962865104325050366_n', 2, '2017-08-30 02:39:00', 'jpg', 1),
(13, 'African_lion_4574', 2, '2018-01-03 02:39:00', 'jpg', 1),
(14, 'ec24f8a3ff87868b33d8cc057cbc9d84', 2, '2018-01-03 02:39:00', 'jpg', 0),
(15, 'Thung Lũng Silicon', 1, '2018-01-14 22:40:28', 'jpg', 1),
(16, 'Joyce Chu', 1, '2018-01-30 02:41:08', 'jpg', 1),
(17, 'CHFZU', 3, '2018-01-30 10:07:39', 'gif', 1),
(18, '14721635_1733989156865314_29867228318290717_n', 3, '2018-01-30 10:09:11', 'jpg', 1),
(19, '2131-07-08-2017-11-21-24', 4, '2018-01-30 10:40:17', 'jpg', 1),
(20, '3ddgh-custom-cloud', 5, '2018-01-30 10:51:50', 'jpg', 1),
(21, 'Leopard.LW', 2, '2018-01-30 10:54:20', 'jpg', 1),
(22, '22222069_800319393462693_810738573507100016_n', 6, '2018-01-30 11:02:38', 'jpg', 1),
(23, 'New York', 6, '2018-01-30 11:02:38', 'jpg', 1),
(24, 'White_sturgeon_farming_california', 6, '2018-01-30 11:02:38', 'jpg', 1),
(25, 'Green-Lawn-And-Trees-Photos', 6, '2018-01-30 13:56:52', 'jpg', 1),
(26, 'Tokyo View', 6, '2018-01-30 13:59:19', 'jpg', 1),
(27, 'Green-Lawn-And-Trees-Photos', 7, '2018-01-30 14:38:52', 'jpg', 1),
(28, '12342604_1529797694008884_2253820872118604586_n', 2, '2018-02-02 14:16:52', 'jpg', 1),
(29, 'New York', 6, '2018-01-30 11:02:38', 'jpg', 1),
(34, '24993358_1978266455745526_8563561596763192010_n', 8, '2018-02-02 18:35:20', 'jpg', 1),
(35, '25158117_1978266449078860_3625009308586374126_n', 8, '2018-02-02 18:35:20', 'jpg', 1),
(36, '24909856_1978266972412141_6598167134582782564_n', 8, '2018-02-02 18:35:20', 'jpg', 1),
(37, '13524392_305678876431941_4926734575888041975_n', 9, '2018-02-02 18:45:00', 'jpg', 0),
(38, '15871834_198991817232013_8206583478386560323_n', 9, '2018-02-02 18:46:50', 'jpg', 0),
(39, 'Vũ trụ.', 12, '2018-02-02 20:31:20', 'jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `date_created` date NOT NULL,
  `money` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `first_name`, `last_name`, `email`, `date_created`, `money`, `status`) VALUES
(1, 'tiencoffee', 'b656ee4eb330f88c08554ad0395846a3', 'Trần Quang', 'Tiến', 'tiencoffee4@gmail.com', '2018-01-13', 0, 1),
(2, 'barack-obama', 'bf166701e09be1ddc752dc4f7ad123d4', 'Barack', 'Obama', '', '2018-01-14', 0, 1),
(3, '742Cutiefly', '9fa57a07946b9eb4f1ffd333a87d5366', 'Cutie', 'Fly', 'cutiefly742@yahoo.com', '2018-01-30', 0, 1);

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
(3, 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_copy_img`
--
ALTER TABLE `histories_copy_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_create_album`
--
ALTER TABLE `histories_create_album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_delete_album`
--
ALTER TABLE `histories_delete_album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_delete_img`
--
ALTER TABLE `histories_delete_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_move_img`
--
ALTER TABLE `histories_move_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_rename_album`
--
ALTER TABLE `histories_rename_album`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_rename_img`
--
ALTER TABLE `histories_rename_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `histories_upload`
--
ALTER TABLE `histories_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imgs`
--
ALTER TABLE `imgs`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `histories_copy_img`
--
ALTER TABLE `histories_copy_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `histories_create_album`
--
ALTER TABLE `histories_create_album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `histories_delete_album`
--
ALTER TABLE `histories_delete_album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `histories_delete_img`
--
ALTER TABLE `histories_delete_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `histories_move_img`
--
ALTER TABLE `histories_move_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `histories_rename_album`
--
ALTER TABLE `histories_rename_album`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `histories_rename_img`
--
ALTER TABLE `histories_rename_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `histories_upload`
--
ALTER TABLE `histories_upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `imgs`
--
ALTER TABLE `imgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users_setting`
--
ALTER TABLE `users_setting`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
