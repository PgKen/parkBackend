-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 06:32 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_buffet`
--

-- --------------------------------------------------------

--
-- Table structure for table `buffetround`
--

CREATE TABLE `buffetround` (
  `id` int(11) NOT NULL,
  `roundname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `buffetround`
--

INSERT INTO `buffetround` (`id`, `roundname`) VALUES
(1, '5 มิ.ย. 68 รอบที่ 1 16:30 - 17.00 น.'),
(2, '5 มิ.ย. 68 รอบที่ 2 17:30 - 18.00 น.'),
(3, '5 มิ.ย. 68 รอบที่ 3 18:30 - 19.00 น.'),
(4, '6 มิ.ย. 68 รอบที่ 1 16:30 - 17.00 น.'),
(5, '6 มิ.ย. 68 รอบที่ 2 17:30 - 18.00 น.'),
(6, '6 มิ.ย. 68 รอบที่ 3 18:30 - 19.00 น.');

-- --------------------------------------------------------

--
-- Table structure for table `countround`
--

CREATE TABLE `countround` (
  `id` int(11) NOT NULL,
  `numround` int(11) NOT NULL DEFAULT 0,
  `idbuffetround` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `countround`
--

INSERT INTO `countround` (`id`, `numround`, `idbuffetround`) VALUES
(1, 0, 1),
(2, 65, 2),
(3, 69, 3),
(4, 69, 4),
(5, 69, 5),
(6, 68, 6);

-- --------------------------------------------------------

--
-- Table structure for table `lasttime`
--

CREATE TABLE `lasttime` (
  `id` int(11) NOT NULL,
  `lastdate` date DEFAULT NULL,
  `lasttime` time DEFAULT NULL,
  `statustime` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lasttime`
--

INSERT INTO `lasttime` (`id`, `lastdate`, `lasttime`, `statustime`) VALUES
(1, '2025-05-30', '23:00:20', 0),
(2, '0000-00-00', '00:00:00', 0),
(3, '0000-00-00', '00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `id` int(11) NOT NULL,
  `bdate` date DEFAULT NULL,
  `btime` time DEFAULT NULL,
  `idround` int(11) NOT NULL,
  `idgroup` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `slip` varchar(255) NOT NULL,
  `confstatus` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`id`, `bdate`, `btime`, `idround`, `idgroup`, `name`, `tel`, `slip`, `confstatus`) VALUES
(5, '2025-05-30', '21:04:44', 2, '680a9c2b-8363-46bd-9416-14604307586d', 'test001', '01', '25_05_30_21_04_443200_.jpg', 0),
(6, '2025-05-30', '21:04:44', 2, '680a9c2b-8363-46bd-9416-14604307586d', 'test002', '02', '25_05_30_21_04_443200_.jpg', 0),
(7, '2025-05-30', '21:04:44', 2, '680a9c2b-8363-46bd-9416-14604307586d', 'คนที่ 3', '03', '25_05_30_21_04_443200_.jpg', 0),
(8, '2025-05-30', '21:04:44', 2, '680a9c2b-8363-46bd-9416-14604307586d', '5555444', '5555', '25_05_30_21_04_443200_.jpg', 0),
(9, '2025-05-30', '21:04:44', 2, '680a9c2b-8363-46bd-9416-14604307586d', '5555555', '05', '25_05_30_21_04_443200_.jpg', 4),
(10, '2025-05-30', '21:42:01', 3, '87f93046-06d1-4392-9b1d-69d7e6677e21', 'test รอบ 2', '01', '25_05_30_21_42_01man001.png', 0),
(13, '2025-05-30', '21:58:53', 6, '808c0b1d-ab73-4970-a022-0d4a5f2a7969', 'test 001', '01', '25_05_30_21_58_533500_1136.jpg', 0),
(14, '2025-05-30', '21:58:53', 6, '808c0b1d-ab73-4970-a022-0d4a5f2a7969', 'test 002', '022222', '25_05_30_21_58_533500_1136.jpg', 0),
(15, '2025-05-30', '22:16:44', 4, '1b65433a-aa61-4345-b3f5-dd6fa87e9c01', 'test new 1', '01', '25_05_30_22_16_443500_1136.jpg', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buffetround`
--
ALTER TABLE `buffetround`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `countround`
--
ALTER TABLE `countround`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `lasttime`
--
ALTER TABLE `lasttime`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buffetround`
--
ALTER TABLE `buffetround`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `countround`
--
ALTER TABLE `countround`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `lasttime`
--
ALTER TABLE `lasttime`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
