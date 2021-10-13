-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2021 at 04:37 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teste`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate`
--

CREATE TABLE `candidate` (
  `id_candidate` int(11) NOT NULL,
  `name_candidate` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate`
--

INSERT INTO `candidate` (`id_candidate`, `name_candidate`) VALUES
(98768, 'Skywalker'),
(98769, 'Van Damme'),
(98770, 'Carmen Maluca'),
(98771, 'Asus Laptop'),
(98772, 'Red'),
(98773, 'Yellow'),
(98774, 'Green'),
(98775, 'Black'),
(98776, 'Brown'),
(98777, 'SL Benfica'),
(98778, 'FC Avintes'),
(98779, 'Vitoria SC'),
(98780, 'Passarinhos da Ribeira'),
(98781, 'Computer Science'),
(98782, 'Mechanical engineering'),
(98783, 'Sport'),
(98784, 'Tourism'),
(98785, 'Fire'),
(98786, 'Smashing'),
(98787, 'Fall'),
(98788, 'Smoking'),
(98789, 'Apartment'),
(98790, 'House'),
(98791, 'Box'),
(98792, 'Garage'),
(98793, 'I9'),
(98794, 'AMD Rayzen 5'),
(98795, 'I5'),
(98796, 'I3'),
(98797, 'Asus'),
(98798, 'Lenovo'),
(98799, 'Compaq'),
(98800, 'Dell'),
(98801, 'LG'),
(98802, 'Milky way'),
(98803, 'Orion Nebula'),
(98804, 'Andromeda');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_event`
--

CREATE TABLE `candidate_event` (
  `id_candidate_event` int(11) NOT NULL,
  `id_candidate` int(11) NOT NULL,
  `id_event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `candidate_event`
--

INSERT INTO `candidate_event` (`id_candidate_event`, `id_candidate`, `id_event`) VALUES
(8678, 98768, 436),
(8679, 98769, 436),
(8680, 98770, 436),
(8681, 98771, 436),
(8682, 98772, 437),
(8683, 98773, 437),
(8684, 98774, 437),
(8685, 98775, 437),
(8686, 98776, 437),
(8687, 98777, 438),
(8688, 98778, 438),
(8689, 98779, 438),
(8690, 98780, 438),
(8691, 98781, 439),
(8692, 98782, 439),
(8693, 98783, 439),
(8694, 98784, 439),
(8695, 98785, 440),
(8696, 98786, 440),
(8697, 98787, 440),
(8698, 98788, 440),
(8699, 98789, 441),
(8700, 98790, 441),
(8701, 98791, 441),
(8702, 98792, 441),
(8703, 98793, 442),
(8704, 98794, 442),
(8705, 98795, 442),
(8706, 98796, 442),
(8707, 98797, 443),
(8708, 98798, 443),
(8709, 98799, 443),
(8710, 98800, 443),
(8711, 98801, 443),
(8712, 98802, 444),
(8713, 98803, 444),
(8714, 98804, 444);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id_event` int(11) NOT NULL,
  `event_name` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `type_document` varchar(50) NOT NULL,
  `event_description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id_event`, `event_name`, `start_date`, `end_date`, `type_document`, `event_description`) VALUES
(436, 'Autarquics', '2021-05-27', '2021-04-14', 'Voter card', 'President election'),
(437, 'Best color', '2021-05-27', '2021-07-02', 'Health card', 'Choose the prettiest color!'),
(438, 'Best soccer club', '2021-05-27', '2021-06-01', 'Associate card', 'What is your club'),
(439, 'Choose course!', '2021-05-27', '2021-05-28', 'Student Card', 'Which course are you taking?'),
(440, 'Riscs decision', '2021-06-04', '2021-08-18', 'Citizen card', 'Which risc is more severe?'),
(441, 'Choose your home', '2021-06-04', '2021-06-04', 'Citizen card', 'Where do you feel more confortable?'),
(442, 'Best processor', '2021-06-04', '2021-06-04', 'Citizen card', 'Which one is faster'),
(443, 'Best laptop manufacturer', '2021-06-04', '2021-06-04', 'Citizen card', 'Choose the best for you'),
(444, 'Galaxies poll', '2021-06-04', '2021-06-23', 'Astronomy card', 'Which galaxy you like');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(512) NOT NULL,
  `nidentificacao` varchar(20) NOT NULL,
  `type_document` varchar(50) NOT NULL,
  `access_code` text NOT NULL,
  `access_level` varchar(50) NOT NULL DEFAULT 'Voter',
  `status` int(11) NOT NULL COMMENT '0=pending,1=confirmed',
  `created` datetime NOT NULL,
  `modified` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='admin and customer users';

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `nidentificacao`, `type_document`, `access_code`, `access_level`, `status`, `created`, `modified`) VALUES
(364, 'Admin', 'admin@admin.com', '$2y$10$2.5JoJcXdXSZyo2OIZEJreRuyp5reOe25TpMoemmcs9ARxSih3gEC', '00000', 'Admin', 'aZfdwarHv0vriEJQkufG54wbOjf9JunN', 'Admin', 1, '2020-09-22 14:04:40', '2021-05-11 22:20:35'),
(444, 'Matador', 'matador@mail.com', '$2y$10$D8i8Lfj8H/kIYAQKU5ypR.IyMbctSAWl3i0z3TGTYG2StVtSS215K', '123454', 'Voter card', 'IsK1VAjcajtUHsYUvBAXuA9evN5wpjrg', 'Voter', 0, '2021-05-28 14:55:27', '2021-06-04 18:26:57'),
(446, 'Xiaomi!', 'xiaomi@mail.com', '$2y$10$MsdLLaS3tBmkqGJznoyQYuxpQGrAY55RHwuWUGpM5bY5AP/BLwoe6', '147852', 'Health card', 'KV8w5KyjV1RBeoxcWWm2CuS72QkcYtgF', 'Voter', 0, '2021-05-28 14:58:39', '2021-06-04 18:25:24'),
(447, 'Magalhaes', 'magalhaes@mail.com', '$2y$10$xDO.tV9/mB9MhuvV2cCKgOCnxiaPwINR.vltguIzY191rrb4iFPKK', '996611', 'Health card', 'ZZhA40BEjramiHpDqYnYDgAlFqefIOuL', 'Voter', 0, '2021-05-28 15:12:17', '2021-05-28 14:13:04'),
(448, 'Ronaldo', 'ronaldo@mail.com', '$2b$08$vIqSpTtYVcHspezUKgn8ler.KZW3ph0gFvVRM7Vqnm9pSwhfiaS9a', '000007', 'Associate card', '$2b$08$geirrT2LY66BjUSRBSr9ZO3Fk1SuiPQKjJ/IFk48ZK7WxGe2CGQXK', 'Voter', 0, '2021-05-28 15:18:18', '2021-06-17 23:38:33'),
(450, 'Matador', 'matador@mail.com', '$2y$10$5eLdps7IewH3cddqAKhKTevz6BMooeF.kIyWJnQekoVMQrgEKdrR6', '123456', 'Associate card', 'yDmb0Zmzqc868DFCbpO8et0ErYUron4u', 'Voter', 0, '2021-05-28 15:20:28', '2021-05-28 14:20:28'),
(452, 'Anonimo', 'anonimo@mail.com', '$2y$10$D1T74hab2ql6TQlaVvMsfOh/9nCZtLjAZpldhbI15kDg6WcP1Goby', '990000', 'Health card', '9y8K11zoINsiLvHu6wNaEvQosSE43Z0N', 'Voter', 0, '2021-05-28 16:37:55', '2021-05-28 15:37:55'),
(517, 'Manel', 'manel@mail.com', '$2y$10$vCPNZ4U0Z7q.tJT813mtXe3nrMnW0q4u6yKQ4/cAh54zOPZquSK86', '4441111', 'Citizen card', 'u6Kvo8EBsNXdTuDi8V5BLA4X4ueazlFp', 'Voter', 0, '2021-06-04 19:36:03', '2021-06-04 18:36:03'),
(518, 'Home User', 'home@mail.com', '$2y$10$yyGCmfD4nuaObX9Podw6r.MI5ISuaPZu5LfsL9hiwOfEPL0fGrTq.', '992222', 'Citizen card', 'ZAvMMkjAZWxynwXqPxgqE0uitMXuH6jK', 'Voter', 0, '2021-06-04 19:36:48', '2021-06-04 18:36:48'),
(519, 'Informatic', 'informatic@mail.com', '$2y$10$phEo628ZdDhpj/ob2BWuEe2RfSpvCxDl7ImskermzlT38s6Qy9oqi', '951753', 'Citizen card', 'RFCsMFsOGXTsjlphR9ACO9h5lMfGqUpT', 'Voter', 0, '2021-06-04 19:37:37', '2021-06-04 18:37:37'),
(520, 'Techguy', 'techguy@mail.com', '$2y$10$cWKazR92qvpxE9wVoYdrPODELYbXUrlndyCKIcZT1pyWlEgP.d1Vy', '741456', 'Citizen card', 'gIBnO1zRVSt8ndHqIYgVU2sUkp99fFJe', 'Voter', 0, '2021-06-04 19:38:21', '2021-06-04 18:38:21'),
(521, 'Player', 'player@mail.com', '$2y$10$o62fLRXaFIl3k3YBWR1jS.6ZBaF3DK.MIlOf8WXVG9qlT0fCuebQq', '789632', 'Associate card', 'FUXLOfBIUKrH5wWSbLGeQd98AIItUs4O', 'Voter', 0, '2021-06-04 19:39:15', '2021-06-04 18:39:15'),
(522, 'User Test', 'oliveira.ruben@outlook.pt', '$2b$08$ozPyy/VKSPPag2dAMjnpzekwV5cv77IQBonWt5O0K0cgtVa5d0siG', '000007', 'Associate card', 'eyVBmwrEiUMLL54Rd7ZeSSMbAM8fj90z', 'Voter', 0, '2021-05-28 15:18:18', '2021-07-06 14:01:47');

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `id_vote` int(11) NOT NULL,
  `id_voter` int(11) NOT NULL,
  `public_vote` varchar(25) NOT NULL,
  `id_candidate` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `date_creation` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vote`
--

INSERT INTO `vote` (`id_vote`, `id_voter`, `public_vote`, `id_candidate`, `id_event`, `date_creation`) VALUES
(1186, 450, 'No', 98769, 436, '2021-05-28'),
(1187, 450, 'Yes', 98777, 438, '2021-05-28'),
(1190, 446, 'Yes', 98772, 437, '2021-05-28'),
(1191, 447, 'Yes', 98774, 437, '2021-05-28'),
(1200, 452, 'Yes', 98773, 437, '2021-05-28'),
(1201, 517, 'Yes', 98788, 440, '2021-06-04'),
(1202, 518, 'Yes', 98790, 441, '2021-06-04'),
(1203, 519, 'Yes', 98793, 442, '2021-06-04'),
(1204, 518, 'Yes', 98803, 444, '2021-07-06');

-- --------------------------------------------------------

--
-- Table structure for table `voter_event`
--

CREATE TABLE `voter_event` (
  `id_user_event` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_event` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `voter_event`
--

INSERT INTO `voter_event` (`id_user_event`, `id_user`, `id_event`) VALUES
(483, 444, 436),
(485, 446, 437),
(486, 447, 437),
(487, 448, 438),
(489, 450, 438),
(491, 452, 437),
(551, 517, 440),
(552, 518, 441),
(553, 519, 442),
(554, 520, 443),
(555, 521, 438),
(556, 522, 444),
(557, 522, 440),
(558, 522, 441),
(559, 448, 442),
(560, 522, 436),
(561, 522, 438);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate`
--
ALTER TABLE `candidate`
  ADD PRIMARY KEY (`id_candidate`);

--
-- Indexes for table `candidate_event`
--
ALTER TABLE `candidate_event`
  ADD PRIMARY KEY (`id_candidate_event`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id_event`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`id_vote`);

--
-- Indexes for table `voter_event`
--
ALTER TABLE `voter_event`
  ADD PRIMARY KEY (`id_user_event`),
  ADD KEY `FK_id_user` (`id_user`),
  ADD KEY `FK_id_user_event` (`id_event`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate`
--
ALTER TABLE `candidate`
  MODIFY `id_candidate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98805;

--
-- AUTO_INCREMENT for table `candidate_event`
--
ALTER TABLE `candidate_event`
  MODIFY `id_candidate_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8715;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=445;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=525;

--
-- AUTO_INCREMENT for table `vote`
--
ALTER TABLE `vote`
  MODIFY `id_vote` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1405;

--
-- AUTO_INCREMENT for table `voter_event`
--
ALTER TABLE `voter_event`
  MODIFY `id_user_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=562;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `voter_event`
--
ALTER TABLE `voter_event`
  ADD CONSTRAINT `FK_id_user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_id_user_event` FOREIGN KEY (`id_event`) REFERENCES `event` (`id_event`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
