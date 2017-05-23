-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 23, 2017 at 06:48 AM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbfamous`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', '$2y$10$bxC7bLeSywa8r.AgHt30FuBBCQY.CmhaGJlG/o3/d6AiG8aPLOIjK');

-- --------------------------------------------------------

--
-- Table structure for table `inventory_data`
--

CREATE TABLE `inventory_data` (
  `id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `reduction_or_increase` int(11) NOT NULL,
  `updated_stock` int(11) NOT NULL,
  `max_stock_quantity` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `year` int(11) NOT NULL,
  `time` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `inventory_data`
--

INSERT INTO `inventory_data` (`id`, `item_id`, `item_name`, `reduction_or_increase`, `updated_stock`, `max_stock_quantity`, `day`, `month`, `year`, `time`) VALUES
(445, 132, 'apple |  Fruitas', -12, 38, 50, 25, 'Apr', 2017, '12:27 PM'),
(447, 132, 'apple | Fruitas', 1, 40, 50, 25, 'Apr', 2017, '12:48 PM'),
(448, 132, 'apple | Fruitas', -35, 5, 50, 25, 'Apr', 2017, '09:36 PM'),
(449, 132, 'apple | Fruitas', 10, 15, 50, 25, 'Apr', 2017, '09:53 PM'),
(450, 117, 'Claw Hammer | Warrior', -20, 30, 50, 25, 'Apr', 2017, '10:49 PM'),
(451, 117, 'Claw Hammer |  Warrior', -1, 29, 50, 26, 'Apr', 2017, '09:13 AM'),
(452, 131, 'White T-Shirt | Blue Corner', 20, 27, 100, 26, 'Apr', 2017, '09:51 AM'),
(453, 131, 'White T-Shirt | Blue Corner', -20, 7, 100, 26, 'Apr', 2017, '09:51 AM'),
(454, 116, 'Electrical Tape |  Scotch', -12, 30, 50, 26, 'Apr', 2017, '10:04 AM'),
(455, 138, 'Elektekpan |  Standard', -10, 30, 50, 26, 'Apr', 2017, '10:05 AM'),
(456, 117, 'Claw Hammer |  Warrior', -1, 28, 50, 26, 'Apr', 2017, '10:05 AM'),
(457, 130, 'Skate Shoes | Vans', -20, 8, 30, 26, 'Apr', 2017, '11:24 AM'),
(458, 130, 'Skate Shoes | Vans', -5, 3, 30, 26, 'Apr', 2017, '11:25 AM'),
(459, 117, 'Claw Hammer | Warrior', 5, 33, 50, 27, 'Apr', 2017, '12:27 AM'),
(460, 154, 'Claw Hammer | Warrior', -19, 1, 20, 27, 'Apr', 2017, '11:32 AM'),
(461, 154, 'Claw Hammer | Warrior', 18, 19, 20, 27, 'Apr', 2017, '11:33 AM'),
(462, 154, 'Claw Hammer | Warrior', -15, 4, 20, 27, 'Apr', 2017, '11:51 AM'),
(463, 107, 'Latex Paint 2L | Rain or Shine', -35, 5, 50, 27, 'Apr', 2017, '05:36 PM'),
(464, 115, 'Latex Paint 2L | Boysen', -20, 4, 30, 27, 'Apr', 2017, '05:37 PM'),
(465, 16, 'Latex Paint 4L | Boysen', -20, 5, 30, 27, 'Apr', 2017, '05:37 PM'),
(466, 18, 'Latex Paint 4L | Rain or Shine', -20, 5, 30, 27, 'Apr', 2017, '05:37 PM'),
(467, 107, 'Latex Paint 2L |  Rain or Shine', -3, 2, 50, 27, 'Apr', 2017, '08:15 PM'),
(468, 107, 'Latex Paint 2L | Rain or Shine', 40, 42, 50, 27, 'Apr', 2017, '08:16 PM'),
(469, 115, 'Latex Paint 2L | Boysen', 20, 24, 30, 27, 'Apr', 2017, '08:17 PM'),
(470, 16, 'Latex Paint 4L | Boysen', 20, 25, 30, 27, 'Apr', 2017, '08:17 PM'),
(471, 154, 'Claw Hammer | Warrior', 15, 19, 20, 27, 'Apr', 2017, '08:19 PM'),
(472, 154, 'Claw Hammer | Warrior', -15, 4, 20, 28, 'Apr', 2017, '05:07 PM'),
(473, 107, 'Latex Paint 2L |  Rain or Shine', -1, 41, 50, 28, 'Apr', 2017, '05:08 PM'),
(474, 115, 'Latex Paint 2L |  Boysen', -20, 4, 30, 28, 'Apr', 2017, '05:10 PM'),
(475, 18, 'Latex Paint 4L | Rain or Shine', 20, 25, 30, 28, 'Apr', 2017, '05:12 PM'),
(476, 154, 'Claw Hammer | Warrior', 15, 19, 20, 28, 'Apr', 2017, '07:15 PM'),
(477, 115, 'Latex Paint 2L | Boysen', 20, 24, 30, 28, 'Apr', 2017, '07:15 PM'),
(478, 154, 'Claw Hammer | Warrior', -10, 9, 20, 28, 'Apr', 2017, '07:21 PM'),
(479, 154, 'Claw Hammer | Warrior', -5, 4, 20, 28, 'Apr', 2017, '07:21 PM'),
(480, 154, 'Claw Hammer | Warrior', 15, 19, 20, 28, 'Apr', 2017, '11:59 PM'),
(481, 154, 'Claw Hammer | Warrior', -10, 9, 20, 29, 'Apr', 2017, '12:28 AM'),
(482, 154, 'Claw Hammer | Warrior', -5, 4, 20, 29, 'Apr', 2017, '12:28 AM'),
(597, 18, 'Latex Paint 4L | Rain or Shine', -2, 28, 30, 2, 'May', 2017, '05:46 PM'),
(598, 154, 'Claw Hammer | Warrior', -2, 18, 20, 2, 'May', 2017, '05:46 PM'),
(599, 154, 'Claw Hammer | Warrior', -15, 3, 20, 2, 'May', 2017, '09:17 PM'),
(600, 154, 'Claw Hammer | Warrior', 10, 13, 20, 2, 'May', 2017, '09:17 PM'),
(601, 16, 'Latex Paint 4L | Boysen', -1, 29, 30, 2, 'May', 2017, '10:48 PM'),
(602, 154, 'Claw Hammer | Warrior', -2, 11, 20, 2, 'May', 2017, '10:50 PM'),
(603, 107, 'Latex Paint 2L | Rain or Shine', -3, 47, 50, 2, 'May', 2017, '11:05 PM'),
(604, 154, 'Claw Hammer | Warrior', -1, 10, 20, 3, 'May', 2017, '02:15 AM'),
(605, 154, 'Claw Hammer | Warrior', -8, 2, 20, 3, 'May', 2017, '03:37 AM'),
(606, 155, 'adobo | Pinoy', -1, 19, 20, 3, 'May', 2017, '06:53 AM'),
(607, 154, 'Claw Hammer | Warrior', 15, 17, 20, 3, 'May', 2017, '06:59 AM'),
(608, 16, 'Latex Paint 4L | Boysen', -2, 27, 30, 3, 'May', 2017, '09:13 AM'),
(609, 115, 'Latex Paint 2L | Boysen', -1, 29, 30, 3, 'May', 2017, '09:13 AM'),
(610, 154, 'Claw Hammer | Warrior', -3, 14, 20, 3, 'May', 2017, '09:13 AM'),
(611, 154, 'Claw Hammer | Warrior', -10, 4, 20, 3, 'May', 2017, '09:46 AM'),
(612, 162, 'brush 1 | Warrior', -2, 28, 30, 3, 'May', 2017, '05:01 PM'),
(613, 166, 'Claw Hammer | Oxford', -2, 8, 10, 4, 'May', 2017, '06:58 AM'),
(614, 162, 'brush 1 | Warrior', -2, 26, 30, 4, 'May', 2017, '06:58 AM'),
(615, 163, 'Brush 2 | Warrior', -3, 27, 30, 4, 'May', 2017, '06:59 AM'),
(616, 166, 'Claw Hammer | Oxford', -1, 7, 10, 4, 'May', 2017, '07:01 AM'),
(617, 162, 'brush 1 | Warrior', -1, 25, 30, 4, 'May', 2017, '07:07 AM'),
(618, 166, 'Claw Hammer | Oxford', -1, 6, 10, 4, 'May', 2017, '07:08 AM'),
(619, 166, 'Claw Hammer | Oxford', -1, 5, 10, 4, 'May', 2017, '07:09 AM'),
(620, 163, 'Brush 2 | Warrior', -1, 26, 30, 4, 'May', 2017, '07:11 AM'),
(621, 162, 'brush 1 | Warrior', -1, 24, 30, 4, 'May', 2017, '07:15 AM'),
(622, 162, 'brush 1 | Warrior', -1, 23, 30, 4, 'May', 2017, '07:17 AM'),
(623, 162, 'brush 1 | Warrior', -1, 22, 30, 4, 'May', 2017, '08:22 AM'),
(624, 162, 'brush 1 | Warrior', -1, 21, 30, 4, 'May', 2017, '08:25 AM'),
(625, 166, 'Claw Hammer | Oxford', -1, 4, 10, 4, 'May', 2017, '08:26 AM'),
(626, 162, 'brush 1 | Warrior', -1, 20, 30, 4, 'May', 2017, '08:28 AM'),
(627, 162, 'brush 1 | Warrior', -1, 19, 30, 4, 'May', 2017, '08:31 AM'),
(628, 162, 'brush 1 | Warrior', -1, 18, 30, 4, 'May', 2017, '08:37 AM'),
(629, 162, 'brush 1 | Warrior', -1, 17, 30, 4, 'May', 2017, '08:54 AM'),
(630, 162, 'brush 1 | Warrior', -1, 16, 30, 4, 'May', 2017, '08:54 AM'),
(631, 161, 'Brush 4 | Warrior', -1, 19, 30, 4, 'May', 2017, '09:50 AM'),
(632, 163, 'Brush 2 | Warrior', -12, 14, 30, 4, 'May', 2017, '09:50 AM'),
(633, 162, 'brush 1 | Warrior', -1, 15, 30, 4, 'May', 2017, '09:53 AM'),
(634, 154, 'Claw Hammer | Warrior', 5, 9, 20, 4, 'May', 2017, '06:12 PM'),
(635, 163, 'Brush 2 | Warrior', -2, 12, 30, 5, 'May', 2017, '07:04 AM'),
(636, 166, 'Claw Hammer | Oxford', -2, 2, 10, 5, 'May', 2017, '07:04 AM'),
(637, 162, 'brush 1 | Warrior', -10, 5, 30, 5, 'May', 2017, '08:27 AM'),
(638, 162, 'brush 1 | Warrior', 10, 15, 30, 5, 'May', 2017, '08:27 AM'),
(639, 166, 'Claw Hammer | Oxford', 8, 10, 10, 5, 'May', 2017, '08:28 AM'),
(640, 163, 'Brush 2 | Warrior', -10, 2, 30, 5, 'May', 2017, '08:31 AM'),
(641, 163, 'Brush 2 | Warrior', 10, 12, 30, 5, 'May', 2017, '08:32 AM'),
(642, 115, 'Latex Paint 2L | Boysen', -2, 27, 30, 6, 'May', 2017, '02:17 PM'),
(643, 154, 'Claw Hammer | Warrior', -2, 7, 20, 6, 'May', 2017, '06:40 PM'),
(644, 154, 'Claw Hammer | Warrior', -5, 2, 20, 6, 'May', 2017, '09:31 PM'),
(645, 154, 'Claw Hammer | Warrior', 15, 17, 20, 6, 'May', 2017, '09:31 PM'),
(646, 163, 'Brush 2 | Warrior', -10, 2, 30, 6, 'May', 2017, '09:31 PM'),
(647, 163, 'Brush 2 | Warrior', 10, 12, 30, 6, 'May', 2017, '09:43 PM'),
(648, 163, 'Brush 2 | Warrior', -8, 4, 30, 6, 'May', 2017, '09:43 PM'),
(649, 115, 'Latex Paint 2L | Boysen', -3, 24, 30, 8, 'May', 2017, '04:16 PM'),
(650, 154, 'Claw Hammer | Warrior', -2, 15, 20, 8, 'May', 2017, '04:16 PM'),
(651, 161, 'Brush 4 | Warrior', -12, 7, 30, 9, 'May', 2017, '03:58 PM'),
(652, 154, 'Claw Hammer | Warrior', -3, 12, 20, 9, 'May', 2017, '03:58 PM'),
(653, 161, 'Brush 4 | Warrior', -5, 2, 30, 9, 'May', 2017, '04:41 PM'),
(654, 161, 'Brush 4 | Warrior', 20, 22, 30, 9, 'May', 2017, '05:19 PM'),
(655, 163, 'Brush 2 | Warrior', 10, 14, 30, 9, 'May', 2017, '05:19 PM'),
(656, 163, 'Brush 2 | Warrior', -10, 4, 30, 9, 'May', 2017, '05:21 PM'),
(657, 163, 'Brush 2 | Warrior', 10, 14, 30, 9, 'May', 2017, '05:24 PM'),
(658, 163, 'Brush 2 | Warrior', -10, 4, 30, 9, 'May', 2017, '05:26 PM'),
(659, 163, 'Brush 2 | Warrior', 10, 14, 30, 9, 'May', 2017, '05:27 PM'),
(660, 163, 'Brush 2 | Warrior', -10, 4, 30, 9, 'May', 2017, '05:28 PM'),
(661, 163, 'Brush 2 | Warrior', 10, 14, 30, 9, 'May', 2017, '05:29 PM'),
(662, 162, 'brush 1 | Warrior', -10, 5, 30, 9, 'May', 2017, '05:30 PM'),
(663, 162, 'brush 1 | Warrior', 10, 15, 30, 9, 'May', 2017, '05:30 PM'),
(664, 154, 'Claw Hammer | Warrior', -10, 2, 20, 9, 'May', 2017, '05:30 PM'),
(665, 154, 'Claw Hammer | Warrior', 10, 12, 20, 9, 'May', 2017, '05:30 PM'),
(666, 162, 'brush 1 | Warrior', -10, 5, 30, 9, 'May', 2017, '05:31 PM'),
(667, 154, 'Claw Hammer | Warrior', -10, 2, 20, 9, 'May', 2017, '05:31 PM'),
(668, 154, 'Claw Hammer | Warrior', 10, 12, 20, 9, 'May', 2017, '05:31 PM'),
(669, 154, 'Claw Hammer | Warrior', -10, 2, 20, 9, 'May', 2017, '05:46 PM'),
(670, 154, 'Claw Hammer | Warrior', 10, 12, 20, 9, 'May', 2017, '05:46 PM'),
(671, 162, 'brush 1 | Warrior', 10, 15, 30, 9, 'May', 2017, '06:24 PM'),
(672, 162, 'brush 1 | Warrior', -10, 5, 30, 9, 'May', 2017, '06:54 PM'),
(673, 162, 'brush 1 | Warrior', 10, 15, 30, 9, 'May', 2017, '08:31 PM'),
(674, 162, 'brush 1 | Warrior', -10, 5, 30, 9, 'May', 2017, '09:49 PM'),
(675, 154, 'Claw Hammer | Warrior', -10, 2, 20, 9, 'May', 2017, '10:09 PM'),
(676, 107, 'Latex Paint 2L | Rain or Shine', -5, 42, 50, 10, 'May', 2017, '07:24 AM'),
(677, 162, 'brush 1 | Warrior', -2, 3, 30, 11, 'May', 2017, '05:55 PM'),
(678, 16, 'Latex Paint 4L | Boysen', -2, 25, 30, 11, 'May', 2017, '05:57 PM'),
(679, 166, 'Claw Hammer | Oxford', -3, 7, 10, 11, 'May', 2017, '06:00 PM'),
(680, 162, 'brush 1 | Boysen', 10, 13, 30, 11, 'May', 2017, '06:10 PM'),
(681, 107, 'Latex Paint 2L | Rain or Shine', -1, 41, 50, 11, 'May', 2017, '07:08 PM'),
(682, 162, 'brush 1 | Boysen', -5, 8, 30, 11, 'May', 2017, '07:08 PM'),
(683, 162, 'brush 1 | Boysen', 10, 18, 30, 11, 'May', 2017, '07:15 PM'),
(684, 163, 'Brush 2 | Warrior', -1, 13, 30, 11, 'May', 2017, '07:21 PM'),
(685, 18, 'Latex Paint 4L | Rain or Shine', -5, 23, 30, 11, 'May', 2017, '07:22 PM'),
(686, 163, 'Brush 2 | Warrior', -10, 3, 30, 11, 'May', 2017, '07:29 PM'),
(687, 162, 'brush 1 | Boysen', -1, 17, 30, 12, 'May', 2017, '11:03 AM'),
(688, 107, 'Latex Paint 2L | Rain or Shine', -1, 40, 50, 12, 'May', 2017, '11:03 AM'),
(689, 115, 'Latex Paint 2L | Boysen', -2, 22, 30, 12, 'May', 2017, '11:03 AM'),
(690, 163, 'Brush 2 | Warrior', 10, 13, 30, 13, 'May', 2017, '12:59 PM'),
(691, 154, 'Claw Hammer | Warrior', 10, 12, 20, 13, 'May', 2017, '07:13 PM'),
(692, 107, 'Latex Paint 2L | Rain or Shine', -2, 38, 50, 18, 'May', 2017, '10:59 AM'),
(693, 107, 'Latex Paint 2L | Rain or Shine', -2, 36, 50, 18, 'May', 2017, '10:59 AM'),
(694, 154, 'Claw Hammer | Warrior', -2, 10, 20, 18, 'May', 2017, '11:03 AM'),
(695, 154, 'Claw Hammer | Warrior', -2, 8, 20, 18, 'May', 2017, '11:03 AM'),
(696, 164, 'brush 3 | Warrior', -1, 29, 30, 18, 'May', 2017, '11:05 AM'),
(697, 164, 'brush 3 | Warrior', -1, 28, 30, 18, 'May', 2017, '11:05 AM'),
(698, 163, 'Brush 2 | Warrior', -1, 12, 30, 18, 'May', 2017, '11:08 AM'),
(699, 163, 'Brush 2 | Warrior', -1, 11, 30, 18, 'May', 2017, '11:08 AM'),
(700, 163, 'Brush 2 | Warrior', -1, 10, 30, 18, 'May', 2017, '11:10 AM'),
(701, 163, 'Brush 2 | Warrior', -1, 9, 30, 18, 'May', 2017, '11:10 AM'),
(702, 167, 'screw nut | aluminum', -1, 19, 20, 18, 'May', 2017, '11:11 AM'),
(703, 167, 'screw nut | aluminum', -1, 18, 20, 18, 'May', 2017, '11:11 AM'),
(704, 163, 'Brush 2 | Warrior', -1, 8, 30, 18, 'May', 2017, '11:12 AM'),
(705, 163, 'Brush 2 | Warrior', -1, 7, 30, 18, 'May', 2017, '11:12 AM'),
(706, 154, 'Claw Hammer | Warrior', -1, 7, 20, 18, 'May', 2017, '11:13 AM'),
(707, 167, 'screw nut | aluminum', -5, 13, 20, 18, 'May', 2017, '11:14 AM'),
(708, 163, 'Brush 2 | Warrior', -1, 6, 30, 18, 'May', 2017, '11:18 AM'),
(709, 163, 'Brush 2 | Warrior', -1, 5, 30, 18, 'May', 2017, '11:19 AM'),
(710, 163, 'Brush 2 | Warrior', -1, 4, 30, 18, 'May', 2017, '11:25 AM'),
(711, 163, 'Brush 2 | Warrior', -1, 3, 30, 18, 'May', 2017, '11:25 AM'),
(712, 163, 'Brush 2 | Warrior', -2, 1, 30, 18, 'May', 2017, '11:26 AM'),
(713, 163, 'Brush 2 | Warrior', -1, 0, 30, 18, 'May', 2017, '11:27 AM'),
(714, 161, 'Brush 4 | Warrior', -1, 21, 30, 18, 'May', 2017, '11:28 AM'),
(715, 161, 'Brush 4 | Warrior', -1, 20, 30, 18, 'May', 2017, '11:29 AM'),
(716, 166, 'Claw Hammer | Oxford', -5, 2, 10, 18, 'May', 2017, '11:34 AM'),
(717, 164, 'brush 3 | Warrior', -1, 27, 30, 18, 'May', 2017, '11:41 AM'),
(718, 163, 'Brush 2 | Warrior', 10, 10, 30, 18, 'May', 2017, '11:46 AM'),
(719, 166, 'Claw Hammer | Oxford', 8, 10, 10, 21, 'May', 2017, '08:38 PM'),
(720, 18, 'Latex Paint 4L | Rain or Shine', -3, 20, 30, 22, 'May', 2017, '07:51 AM'),
(721, 163, 'Brush 2 | Warrior', -2, 8, 30, 22, 'May', 2017, '11:12 AM'),
(722, 107, 'Latex Paint 2L | Rain or Shine', -1, 35, 50, 22, 'May', 2017, '11:33 AM'),
(723, 115, 'Latex Paint 2L | Boysen', -2, 20, 30, 23, 'May', 2017, '05:48 AM'),
(724, 154, 'Claw Hammer | Warrior', -1, 6, 20, 23, 'May', 2017, '05:48 AM');

-- --------------------------------------------------------

--
-- Table structure for table `product_info`
--

CREATE TABLE `product_info` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `brand` varchar(135) NOT NULL,
  `category` varchar(150) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `availability` varchar(135) NOT NULL,
  `stock` int(11) NOT NULL,
  `max_stock_quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_info`
--

INSERT INTO `product_info` (`item_id`, `item_name`, `brand`, `category`, `price`, `availability`, `stock`, `max_stock_quantity`) VALUES
(16, 'Latex Paint 4L', 'Boysen', 'Paints and Sundries', '1000.00', 'yes', 25, 30),
(18, 'Latex Paint 4L', 'Rain or Shine', 'Paints and Sundries', '960.00', 'yes', 20, 30),
(107, 'Latex Paint 2L', 'Rain or Shine', 'Paints and Sundries', '500.25', 'yes', 35, 50),
(115, 'Latex Paint 2L', 'Boysen', 'Paints and Sundries', '500.00', 'yes', 20, 30),
(154, 'Claw Hammer', 'Warrior', 'Tools', '250.00', 'yes', 6, 20),
(161, 'Brush 4', 'Warrior', 'Paints and Sundries', '45.00', 'yes', 20, 30),
(162, 'brush 1', 'Boysen', 'Paints and Sundries', '15.25', 'yes', 17, 30),
(163, 'Brush 2', 'Warrior', 'Paints and Sundries', '25.00', 'yes', 8, 30),
(164, 'brush 3', 'Warrior', 'Paints and Sundries', '35.00', 'yes', 27, 30),
(166, 'Claw Hammer', 'Oxford', 'Tools', '500.00', 'yes', 10, 10),
(167, 'screw nut', 'aluminum', 'Tools', '20.00', 'yes', 13, 20);

-- --------------------------------------------------------

--
-- Table structure for table `sales_transaction`
--

CREATE TABLE `sales_transaction` (
  `transaction_id` int(11) NOT NULL,
  `item_name` varchar(150) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sales_amount` decimal(15,2) NOT NULL,
  `day` int(11) NOT NULL,
  `month` varchar(150) NOT NULL,
  `year` int(11) NOT NULL,
  `time` varchar(150) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sales_transaction`
--

INSERT INTO `sales_transaction` (`transaction_id`, `item_name`, `quantity`, `sales_amount`, `day`, `month`, `year`, `time`, `item_id`) VALUES
(160, 'Claw Hammer', 2, '300.00', 8, 'Apr', 2017, '10:05 PM', 117),
(161, 'Skate Shoes', 1, '4500.00', 8, 'Apr', 2017, '10:11 PM', 130),
(162, 'Electrical Tape', 2, '50.00', 8, 'Apr', 2017, '10:24 PM', 116),
(163, 'Electrical Tape', 1, '25.00', 8, 'Apr', 2017, '10:25 PM', 116),
(164, 'Electrical Tape', 1, '25.00', 8, 'Apr', 2017, '10:26 PM', 116),
(165, 'Latex Paint 2L', 1, '500.87', 8, 'Apr', 2017, '11:47 PM', 107),
(166, 'Latex Paint 4L', 1, '960.00', 9, 'Apr', 2017, '01:39 AM', 18),
(167, 'Skate Shoes', 1, '4500.00', 9, 'Apr', 2017, '01:39 AM', 130),
(168, 'apple', 5, '100.00', 9, 'Apr', 2017, '12:10 PM', 132),
(169, 'White T-Shirt', 2, '320.00', 9, 'Apr', 2017, '12:30 PM', 131),
(170, 'Latex Paint 4L', 1, '960.00', 10, 'Apr', 2017, '01:40 PM', 18),
(171, 'Claw Hammer', 2, '300.00', 11, 'Apr', 2017, '12:23 AM', 117),
(172, 'Electrical Tape', 4, '100.00', 11, 'Apr', 2017, '12:27 AM', 116),
(173, 'White T-Shirt', 1, '160.00', 11, 'Apr', 2017, '12:28 AM', 131),
(174, 'Electrical Tape', 1, '25.00', 11, 'Apr', 2017, '08:10 AM', 116),
(175, 'Electrical Tape', 1, '25.00', 11, 'Apr', 2017, '08:12 AM', 116),
(176, 'Claw Hammer', 1, '150.00', 11, 'Apr', 2017, '08:18 AM', 117),
(177, 'Electrical Tape', 1, '25.00', 11, 'Apr', 2017, '08:18 AM', 116),
(178, 'Electrical Tape2', 1, '25.00', 11, 'Apr', 2017, '08:53 AM', 116),
(179, 'Latex Paint 2L', 1, '500.50', 11, 'Apr', 2017, '08:54 AM', 107),
(180, 'asd', 1, '12.00', 11, 'Apr', 2017, '08:56 AM', 133),
(181, 'asd', 2, '24.00', 11, 'Apr', 2017, '09:06 AM', 133),
(182, 'Claw Hammer', 2, '300.00', 11, 'Apr', 2017, '09:14 AM', 117),
(183, 'Claw Hammer', 1, '150.00', 11, 'Apr', 2017, '09:19 AM', 117),
(184, 'Claw Hammer |  Warrior', 5, '750.00', 20, 'Apr', 2017, '11:09 AM', 117),
(185, 'Claw Hammer |  Warrior', 15, '2250.00', 20, 'Apr', 2017, '11:19 AM', 117),
(186, 'Latex Paint 2L |  Boysen', 1, '500.00', 20, 'Apr', 2017, '12:20 PM', 115),
(187, 'Claw Hammer |  Warrior', 25, '3750.00', 21, 'Apr', 2017, '11:38 AM', 117),
(188, 'Latex Paint 2L |  Rain or Shine', 25, '12512.50', 21, 'Apr', 2017, '11:39 AM', 107),
(189, 'Claw Hammer |  Warrior', 3, '450.00', 21, 'Apr', 2017, '11:40 AM', 117),
(190, 'Claw Hammer |  Warrior', 1, '150.00', 22, 'Apr', 2017, '01:51 PM', 117),
(191, 'apple |  Fruitas', 1, '20.00', 22, 'Apr', 2017, '02:03 PM', 132),
(192, 'White T-Shirt |  Blue Corner', 1, '160.00', 22, 'Apr', 2017, '02:05 PM', 131),
(193, 'White T-Shirt |  Blue Corner', 1, '160.00', 22, 'Apr', 2017, '02:06 PM', 131),
(194, 'apple |  Fruitas', 1, '20.00', 22, 'Apr', 2017, '02:16 PM', 132),
(195, 'Latex Paint 2L |  Boysen', 5, '2500.00', 22, 'Apr', 2017, '02:24 PM', 115),
(196, 'Latex Paint 2L |  Rain or Shine', 2, '1001.00', 22, 'Apr', 2017, '02:25 PM', 107),
(197, 'Latex Paint 4L |  Rain or Shine', 1, '960.00', 22, 'Apr', 2017, '02:30 PM', 18),
(198, 'Skate Shoes |  Vans', 1, '4000.00', 22, 'Apr', 2017, '03:30 PM', 130),
(199, 'apple |  Fruitas', 1, '20.00', 22, 'Apr', 2017, '04:40 PM', 132),
(200, 'apple |  Fruitas', 1, '20.00', 22, 'Apr', 2017, '04:46 PM', 132),
(201, 'Elektekpan |  Standard', 1, '500.00', 22, 'Apr', 2017, '04:48 PM', 138),
(202, 'Elektekpan |  Standard', 1, '500.00', 22, 'Apr', 2017, '04:48 PM', 138),
(203, 'apple |  Fruitas', 1, '20.00', 22, 'Apr', 2017, '04:49 PM', 132),
(204, 'Skate Shoes |  Vans', 1, '4000.00', 22, 'Apr', 2017, '04:50 PM', 130),
(205, 'White T-Shirt |  Blue Corner', 2, '320.00', 22, 'Apr', 2017, '11:04 PM', 131),
(206, 'Elektekpan |  Standard', 2, '1000.00', 23, 'Apr', 2017, '08:20 AM', 138),
(207, 'apple |  Fruitas', 2, '40.00', 23, 'Apr', 2017, '09:56 AM', 132),
(209, 'White T-Shirt |  Blue Corner', 2, '320.00', 23, 'Apr', 2017, '11:18 PM', 131),
(210, 'Elektekpan |  Standard', 1, '500.00', 23, 'Apr', 2017, '11:18 PM', 138),
(211, 'White T-Shirt |  Blue Corner', 1, '160.00', 23, 'Apr', 2017, '11:25 PM', 131),
(212, 'Bulb |  Liwanag', 1, '30.00', 23, 'Apr', 2017, '11:25 PM', 134),
(213, 'Bulb |  Liwanag', 20, '600.00', 23, 'Apr', 2017, '11:25 PM', 134),
(214, 'Bulb |  Liwanag', 20, '600.00', 23, 'Apr', 2017, '11:25 PM', 134),
(215, 'White T-Shirt |  Blue Corner', 6, '960.00', 23, 'Apr', 2017, '11:27 PM', 131),
(216, 'Electrical Tape |  Scotch', 1, '25.00', 24, 'Apr', 2017, '09:18 AM', 116),
(217, 'Claw Hammer |  Warrior', 2, '300.00', 24, 'Apr', 2017, '06:23 PM', 117),
(218, 'Latex Paint 2L |  Rain or Shine', 1, '500.50', 24, 'Apr', 2017, '06:36 PM', 107),
(219, 'White T-Shirt |  Blue Corner', 1, '160.00', 24, 'Apr', 2017, '08:48 PM', 131),
(220, 'Skate Shoes |  Vans', 1, '4000.00', 25, 'Apr', 2017, '11:50 AM', 130),
(221, 'Claw Hammer |  Warrior', 1, '150.00', 25, 'Apr', 2017, '11:53 AM', 117),
(222, 'apple |  Fruitas', 12, '240.00', 25, 'Apr', 2017, '12:27 PM', 132),
(223, 'Claw Hammer |  Warrior', 1, '150.00', 26, 'Apr', 2017, '09:13 AM', 117),
(224, 'Electrical Tape |  Scotch', 12, '300.00', 26, 'Apr', 2017, '10:04 AM', 116),
(225, 'Elektekpan |  Standard', 10, '5000.00', 26, 'Apr', 2017, '10:05 AM', 138),
(226, 'Claw Hammer |  Warrior', 1, '150.00', 26, 'Apr', 2017, '10:05 AM', 117),
(227, 'Latex Paint 2L |  Rain or Shine', 3, '1501.50', 27, 'Apr', 2017, '08:15 PM', 107),
(228, 'Latex Paint 2L |  Rain or Shine', 1, '500.50', 28, 'Apr', 2017, '05:08 PM', 107),
(229, 'Latex Paint 2L |  Boysen', 20, '10000.00', 28, 'Apr', 2017, '05:10 PM', 115),
(387, 'Latex Paint 4L | Rain or Shine', 2, '1920.00', 2, 'May', 2017, '05:46 PM', 18),
(388, 'Claw Hammer | Warrior', 2, '500.00', 2, 'May', 2017, '05:46 PM', 154),
(389, 'Latex Paint 4L | Boysen', 1, '1000.00', 2, 'May', 2017, '10:48 PM', 16),
(390, 'Claw Hammer | Warrior', 2, '500.00', 2, 'May', 2017, '10:50 PM', 154),
(391, 'Latex Paint 2L | Rain or Shine', 3, '1500.75', 2, 'May', 2017, '11:05 PM', 107),
(392, 'Claw Hammer | Warrior', 1, '250.00', 3, 'May', 2017, '02:15 AM', 154),
(393, 'adobo | Pinoy', 1, '150.00', 3, 'May', 2017, '06:53 AM', 155),
(394, 'Latex Paint 4L | Boysen', 2, '2000.00', 3, 'May', 2017, '09:13 AM', 16),
(395, 'Latex Paint 2L | Boysen', 1, '500.00', 3, 'May', 2017, '09:13 AM', 115),
(396, 'Claw Hammer | Warrior', 3, '750.00', 3, 'May', 2017, '09:13 AM', 154),
(397, 'brush 1 | Warrior', 2, '30.00', 3, 'May', 2017, '05:01 PM', 162),
(398, 'Claw Hammer | Oxford', 2, '1000.00', 4, 'May', 2017, '06:58 AM', 166),
(399, 'brush 1 | Warrior', 2, '30.00', 4, 'May', 2017, '06:58 AM', 162),
(400, 'Brush 2 | Warrior', 3, '75.00', 4, 'May', 2017, '06:59 AM', 163),
(401, 'Claw Hammer | Oxford', 1, '500.00', 4, 'May', 2017, '07:01 AM', 166),
(402, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '07:07 AM', 162),
(403, 'Claw Hammer | Oxford', 1, '500.00', 4, 'May', 2017, '07:08 AM', 166),
(404, 'Claw Hammer | Oxford', 1, '500.00', 4, 'May', 2017, '07:09 AM', 166),
(405, 'Brush 2 | Warrior', 1, '25.00', 4, 'May', 2017, '07:11 AM', 163),
(406, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '07:15 AM', 162),
(407, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '07:17 AM', 162),
(408, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:22 AM', 162),
(409, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:25 AM', 162),
(410, 'Claw Hammer | Oxford', 1, '500.00', 4, 'May', 2017, '08:26 AM', 166),
(411, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:28 AM', 162),
(412, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:31 AM', 162),
(413, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:37 AM', 162),
(414, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:54 AM', 162),
(415, 'brush 1 | Warrior', 1, '15.00', 4, 'May', 2017, '08:54 AM', 162),
(416, 'Brush 4 | Warrior', 1, '45.00', 4, 'May', 2017, '09:50 AM', 161),
(417, 'Brush 2 | Warrior', 12, '300.00', 4, 'May', 2017, '09:50 AM', 163),
(418, 'brush 1 | Warrior', 1, '15.25', 4, 'May', 2017, '09:53 AM', 162),
(419, 'Brush 2 | Warrior', 2, '50.00', 5, 'May', 2017, '07:04 AM', 163),
(420, 'Claw Hammer | Oxford', 2, '1000.00', 5, 'May', 2017, '07:04 AM', 166),
(421, 'Latex Paint 2L | Boysen', 2, '1000.00', 6, 'May', 2017, '02:17 PM', 115),
(422, 'Claw Hammer | Warrior', 2, '500.00', 6, 'May', 2017, '06:40 PM', 154),
(423, 'Latex Paint 2L | Boysen', 3, '1500.00', 8, 'May', 2017, '04:16 PM', 115),
(424, 'Claw Hammer | Warrior', 2, '500.00', 8, 'May', 2017, '04:16 PM', 154),
(425, 'Brush 4 | Warrior', 12, '540.00', 9, 'May', 2017, '03:58 PM', 161),
(426, 'Claw Hammer | Warrior', 3, '750.00', 9, 'May', 2017, '03:58 PM', 154),
(427, 'Latex Paint 2L | Rain or Shine', 5, '2501.25', 10, 'May', 2017, '07:24 AM', 107),
(428, 'brush 1 | Warrior', 2, '30.50', 11, 'May', 2017, '05:55 PM', 162),
(429, 'Latex Paint 4L | Boysen', 2, '2000.00', 11, 'May', 2017, '05:57 PM', 16),
(430, 'Claw Hammer | Oxford', 3, '1500.00', 11, 'May', 2017, '06:00 PM', 166),
(431, 'Latex Paint 2L | Rain or Shine', 1, '500.25', 11, 'May', 2017, '07:08 PM', 107),
(432, 'brush 1 | Boysen', 5, '76.25', 11, 'May', 2017, '07:08 PM', 162),
(433, 'Brush 2 | Warrior', 1, '25.00', 11, 'May', 2017, '07:21 PM', 163),
(434, 'Latex Paint 4L | Rain or Shine', 5, '4800.00', 11, 'May', 2017, '07:22 PM', 18),
(435, 'brush 1 | Boysen', 1, '15.25', 12, 'May', 2017, '11:03 AM', 162),
(436, 'Latex Paint 2L | Rain or Shine', 1, '500.25', 12, 'May', 2017, '11:03 AM', 107),
(437, 'Latex Paint 2L | Boysen', 2, '1000.00', 12, 'May', 2017, '11:03 AM', 115),
(438, 'Latex Paint 2L | Rain or Shine', 2, '1000.50', 18, 'May', 2017, '10:59 AM', 107),
(439, 'Latex Paint 2L | Rain or Shine', 2, '1000.50', 18, 'May', 2017, '10:59 AM', 107),
(440, 'Claw Hammer | Warrior', 2, '500.00', 18, 'May', 2017, '11:03 AM', 154),
(441, 'Claw Hammer | Warrior', 2, '500.00', 18, 'May', 2017, '11:03 AM', 154),
(442, 'brush 3 | Warrior', 1, '35.00', 18, 'May', 2017, '11:05 AM', 164),
(443, 'brush 3 | Warrior', 1, '35.00', 18, 'May', 2017, '11:05 AM', 164),
(444, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:08 AM', 163),
(445, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:08 AM', 163),
(446, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:10 AM', 163),
(447, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:10 AM', 163),
(448, 'screw nut | aluminum', 1, '20.00', 18, 'May', 2017, '11:11 AM', 167),
(449, 'screw nut | aluminum', 1, '20.00', 18, 'May', 2017, '11:11 AM', 167),
(450, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:12 AM', 163),
(451, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:12 AM', 163),
(452, 'Claw Hammer | Warrior', 1, '250.00', 18, 'May', 2017, '11:13 AM', 154),
(453, 'screw nut | aluminum', 5, '100.00', 18, 'May', 2017, '11:14 AM', 167),
(454, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:18 AM', 163),
(455, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:19 AM', 163),
(456, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:25 AM', 163),
(457, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:25 AM', 163),
(458, 'Brush 2 | Warrior', 2, '50.00', 18, 'May', 2017, '11:26 AM', 163),
(459, 'Brush 2 | Warrior', 1, '25.00', 18, 'May', 2017, '11:27 AM', 163),
(460, 'Brush 4 | Warrior', 1, '45.00', 18, 'May', 2017, '11:28 AM', 161),
(461, 'Brush 4 | Warrior', 1, '45.00', 18, 'May', 2017, '11:29 AM', 161),
(462, 'Claw Hammer | Oxford', 5, '2500.00', 18, 'May', 2017, '11:34 AM', 166),
(463, 'brush 3 | Warrior', 1, '35.00', 18, 'May', 2017, '11:41 AM', 164),
(464, 'Latex Paint 4L | Rain or Shine', 3, '2880.00', 22, 'May', 2017, '07:51 AM', 18),
(465, 'Brush 2 | Warrior', 2, '50.00', 22, 'May', 2017, '11:12 AM', 163),
(466, 'Latex Paint 2L | Rain or Shine', 1, '500.25', 22, 'May', 2017, '11:33 AM', 107),
(467, 'Latex Paint 2L | Boysen', 2, '1000.00', 23, 'May', 2017, '05:48 AM', 115),
(468, 'Claw Hammer | Warrior', 1, '250.00', 23, 'May', 2017, '05:48 AM', 154);

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(11) NOT NULL,
  `username` varchar(150) NOT NULL,
  `password` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `username`, `password`) VALUES
(1, 'staff', '$2y$10$53QRHny.QD.IjhuOe4GFceVLT8eoohxqdpQwvCd4HbMShHu6Ihzpu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory_data`
--
ALTER TABLE `inventory_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_info`
--
ALTER TABLE `product_info`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `sales_transaction`
--
ALTER TABLE `sales_transaction`
  ADD PRIMARY KEY (`transaction_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `inventory_data`
--
ALTER TABLE `inventory_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=725;
--
-- AUTO_INCREMENT for table `product_info`
--
ALTER TABLE `product_info`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;
--
-- AUTO_INCREMENT for table `sales_transaction`
--
ALTER TABLE `sales_transaction`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=469;
--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
