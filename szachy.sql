-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 13, 2023 at 11:58 PM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `szachy`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friends`
--

CREATE TABLE `friends` (
  `ID` int(11) NOT NULL,
  `Friend1` int(11) DEFAULT NULL,
  `Friend2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `match`
--

CREATE TABLE `match` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Black` int(11) DEFAULT NULL,
  `White` int(11) DEFAULT NULL,
  `Win` int(11) NOT NULL,
  `FENString` varchar(1000) NOT NULL,
  `TypeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `match`
--

INSERT INTO `match` (`ID`, `Date`, `Black`, `White`, `Win`, `FENString`, `TypeID`) VALUES
(1, '2023-05-23 17:41:41', 20, 21, 7, 'start', 5),
(2, '2023-05-23 17:44:26', 21, 20, 2, 'start', 5),
(3, '2023-05-23 20:03:33', 20, 22, 5, 'start', 5),
(4, '2023-05-23 20:04:03', 20, 19, 2, 'start', 5),
(5, '2023-05-23 20:05:19', 20, 22, 6, 'start', 5),
(7, '2023-06-11 00:00:00', 20, 21, 6, 'start', 4),
(8, '2023-06-11 16:35:11', 21, 20, 6, 'e4', 4),
(9, '2023-06-11 21:19:59', 21, 20, 6, 'd5', 4),
(10, '2023-06-11 21:25:10', 20, 21, 6, 'e4', 4),
(11, '2023-06-12 08:02:43', 21, 20, 7, 'rnb2b1r/ppp1k1pp/8/8/2B1P3/3p1N2/PPP1q1PP/RNBK3R w - - 2 12', 4),
(12, '2023-06-12 09:24:39', 20, 21, 2, 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4', 4),
(13, '2023-06-12 09:31:55', 20, 21, 2, 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 0 4', 4),
(15, '2023-06-12 10:09:48', 21, 20, 6, 'rnbqkbnr/pp1ppppp/8/2p5/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2', 4),
(16, '2023-06-12 10:13:47', 21, 20, 6, 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2', 4),
(17, '2023-06-12 10:19:47', 20, 21, 6, 'rnbqkbnr/pppppp1p/8/6p1/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2', 4),
(18, '2023-06-12 10:23:21', 21, 20, 6, 'rnbqkbnr/pppp1ppp/8/4p3/1P6/8/P1PPPPPP/RNBQKBNR w KQkq - 0 2', 4),
(19, '2023-06-12 10:25:47', 20, 21, 6, 'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1', 4),
(20, '2023-06-12 10:28:00', 21, 20, 6, 'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2', 4),
(21, '2023-06-12 11:17:07', 21, 20, 6, 'rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2', 4),
(22, '2023-06-12 12:23:39', 20, 21, 6, 'rnbqkbnr/pppp1ppp/8/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 2', 4),
(23, '2023-06-12 20:00:49', 20, 21, 5, 'rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2', 4),
(24, '2023-06-13 11:13:10', 21, 20, 6, 'rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2', 4);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `matchtype`
--

CREATE TABLE `matchtype` (
  `ID` int(11) NOT NULL,
  `Time` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `matchtype`
--

INSERT INTO `matchtype` (`ID`, `Time`, `Name`) VALUES
(1, 1, 'Bullet'),
(2, 3, 'Blitz'),
(3, 5, 'Blitz'),
(4, 10, 'Rapid'),
(5, 30, 'Rapid');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `title`, `message`) VALUES
(1, 'Magnus wins', 'Magnus beats Duda'),
(2, 'cos', 'cos');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `riddle`
--

CREATE TABLE `riddle` (
  `ID` int(11) NOT NULL,
  `FENString` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `riddlemove`
--

CREATE TABLE `riddlemove` (
  `ID` int(11) NOT NULL,
  `RiddleID` int(11) NOT NULL,
  `MoveCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `riddleuser`
--

CREATE TABLE `riddleuser` (
  `ID` int(11) NOT NULL,
  `RiddleID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Solved` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `score`
--

CREATE TABLE `score` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Score` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `score`
--

INSERT INTO `score` (`ID`, `Date`, `Score`, `UserID`) VALUES
(1, '2023-05-23 17:45:53', 100, 20),
(2, '2023-05-23 17:46:22', 108, 20),
(3, '2023-05-23 17:46:36', 116, 20),
(4, '2023-05-23 17:46:53', 100, 21),
(5, '2023-06-09 00:00:00', 100, 23),
(12, '2023-06-11 00:00:00', 95, 20),
(13, '2023-06-11 00:00:00', 121, 21),
(14, '2023-06-12 00:00:00', 100, 21),
(15, '2023-06-12 00:00:00', 116, 20),
(16, '2023-06-12 09:24:39', 121, 21),
(17, '2023-06-12 09:24:39', 100, 20),
(18, '2023-06-12 09:31:55', 140, 21),
(19, '2023-06-12 09:31:55', 100, 20),
(20, '2023-06-12 10:13:47', 158, 21),
(21, '2023-06-12 10:13:47', 100, 20),
(22, '2023-06-12 10:23:21', 175, 21),
(23, '2023-06-12 10:23:21', 100, 20),
(24, '2023-06-12 10:25:47', 151, 21),
(25, '2023-06-12 10:25:47', 124, 20),
(26, '2023-06-12 10:28:00', 169, 21),
(27, '2023-06-12 10:28:00', 106, 20),
(28, '2023-06-12 11:17:07', 145, 21),
(29, '2023-06-12 11:17:07', 130, 20),
(30, '2023-06-12 12:23:39', 164, 21),
(31, '2023-06-12 12:23:39', 111, 20),
(32, '2023-06-12 20:00:49', 161, 21),
(33, '2023-06-12 20:00:49', 114, 20),
(34, '2023-06-13 11:13:10', 137, 20),
(35, '2023-06-13 11:13:10', 138, 21);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `Password` varchar(1000) NOT NULL,
  `RegistrationDate` date NOT NULL,
  `NickName` varchar(200) NOT NULL,
  `BannedUntil` datetime DEFAULT NULL,
  `Deleted` datetime DEFAULT NULL,
  `AdminPowerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Email`, `Password`, `RegistrationDate`, `NickName`, `BannedUntil`, `Deleted`, `AdminPowerID`) VALUES
(18, 'malpa@malpa', 'niewolno', '2023-05-05', 'dupa', NULL, NULL, 0),
(19, 'dwaa@dwaa', '$argon2id$v=19$m=65536,t=3,p=4$tFa+gOKilsy9U/zTZzjl6g$5qNBty7877Dkng3iWQfUAs6Cv5EfZJNdPVGoekkBuys', '2023-05-11', 'dwaa', NULL, NULL, 1),
(20, 'ktos', '$argon2id$v=19$m=65536,t=3,p=4$TdppyttnxG8z1brKpmBnkA$3we+WirqGzPeHswZTiqfQ1+J+IzoXNE2IJ3SxpfZe9U', '2023-05-17', '1235', NULL, NULL, 1),
(21, 'cos', '$argon2id$v=19$m=65536,t=3,p=4$VhKdX+H4nr6Xf+CYxddHsg$S9LP3Zbdn2jvwr3U5hl1Ma6vsIqdFJdkaI2szR8YVpg', '2023-05-18', 'we', NULL, NULL, 1),
(22, 'sd', '$argon2id$v=19$m=65536,t=3,p=4$oKOFwS7P828O3MKKGz1C6w$j1V11uLeq9NXuoqa4FaMPYvivRx2RS1DE82cgENh+ls', '2023-05-19', 'sd', NULL, NULL, 1),
(23, 'daw@daw', '$argon2id$v=19$m=65536,t=3,p=4$OmT3fsbidyWVFl57BMf3hg$quY1IrfAMTKo76mDxKZ2Xa5eltsmW0//sPRWHrxeFzk', '2023-06-09', 'kostam', NULL, NULL, 0);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Friend2` (`Friend2`),
  ADD KEY `Friend1` (`Friend1`);

--
-- Indeksy dla tabeli `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `TypeID` (`TypeID`),
  ADD KEY `White` (`White`),
  ADD KEY `Black` (`Black`);

--
-- Indeksy dla tabeli `matchtype`
--
ALTER TABLE `matchtype`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `riddle`
--
ALTER TABLE `riddle`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `riddlemove`
--
ALTER TABLE `riddlemove`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `RiddleID` (`RiddleID`);

--
-- Indeksy dla tabeli `riddleuser`
--
ALTER TABLE `riddleuser`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RiddleID` (`RiddleID`);

--
-- Indeksy dla tabeli `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `match`
--
ALTER TABLE `match`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `matchtype`
--
ALTER TABLE `matchtype`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `riddle`
--
ALTER TABLE `riddle`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riddlemove`
--
ALTER TABLE `riddlemove`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `riddleuser`
--
ALTER TABLE `riddleuser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `FK_525f151b7987385978b2af231aa` FOREIGN KEY (`Friend1`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ff8b2329d16c26a90b07b5bd4cb` FOREIGN KEY (`Friend2`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `FK_89c6094a17387f1e3162b72d977` FOREIGN KEY (`Black`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_efa3daadeb051462e1a1008c0e2` FOREIGN KEY (`TypeID`) REFERENCES `matchtype` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_fbb4c1a3f016872e416b3590b54` FOREIGN KEY (`White`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `riddle`
--
ALTER TABLE `riddle`
  ADD CONSTRAINT `FK_04a74f0f20503bad04473a70a15` FOREIGN KEY (`ID`) REFERENCES `riddlemove` (`RiddleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `riddleuser`
--
ALTER TABLE `riddleuser`
  ADD CONSTRAINT `FK_56b533f425494898b7c76d8388f` FOREIGN KEY (`RiddleID`) REFERENCES `riddle` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_7da057b28f2a787704b20423c11` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `FK_5a19d3c48d2b6eda9064e6ff2ec` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
