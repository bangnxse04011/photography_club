-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2018 at 10:33 AM
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
(1, 'Hotgirl''s', '2017-10-20', 'Hà Nội 2', '2018-01-14 09:39:26', '2018-01-20 16:16:53', 1, 1),
(2, 'Động vật :)', '2018-01-14', 'Vườn thú Thủ Lệ', '2018-01-14 09:40:36', '2018-01-14 09:40:36', 1, 1),
(3, 'Ảnh vui :3', '0000-00-00', '', '2018-01-14 10:59:05', '2018-01-20 00:36:56', 2, 1);

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
(7, '23032914_833149320224954_2437957948385198808_n', 1, '2018-01-14 09:39:57', 'jpg', 1),
(8, 'Thung Lũng Silicon', 1, '2018-01-14 09:39:57', 'jpg', 1),
(9, 'joyce-chu', 1, '2018-01-14 09:39:57', 'jpg', 1),
(10, '13895252_1162831100440267_6962865104325050366_n', 2, '2018-01-14 09:41:18', 'jpg', 1),
(11, 'African_lion_4574', 2, '2018-01-14 09:41:18', 'jpg', 1),
(12, 'ec24f8a3ff87868b33d8cc057cbc9d84', 2, '2018-01-14 09:41:19', 'jpg', 1),
(13, '23795329_543966899274166_5538209146831885495_n', 1, '2018-01-14 09:41:56', 'jpg', 1),
(14, '13734645_10153581115716123_928890277_n', 3, '2018-01-14 11:00:10', 'gif', 1),
(15, '24232908_1739256639478765_7068831560123078511_n', 3, '2018-01-20 00:00:00', 'jpg', 1),
(16, '14721635_1733989156865314_29867228318290717_n', 3, '2018-01-20 00:36:56', 'jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `upload_histories`
--

CREATE TABLE `upload_histories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `act` enum('download','upload','','') COLLATE utf8_unicode_ci NOT NULL,
  `album_id` int(11) NOT NULL,
  `img_id` int(11) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `status` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `first_name`, `last_name`, `email`, `date_created`, `status`) VALUES
(1, 'tiencoffee', 'b656ee4eb330f88c08554ad0395846a3', 'Trần Quang', 'Tiến', 'tiencoffee4@gmail.com', '2018-01-13', 1),
(2, 'barack-obama', 'bf166701e09be1ddc752dc4f7ad123d4', 'Barack', 'Obama', '', '2018-01-14', 1);

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
(2, 1, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `imgs`
--
ALTER TABLE `imgs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `upload_histories`
--
ALTER TABLE `upload_histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `users_setting`
--
ALTER TABLE `users_setting`
  MODIFY `user_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
