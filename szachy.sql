-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 05 Maj 2023, 20:55
-- Wersja serwera: 10.4.11-MariaDB
-- Wersja PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `szachy`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friends`
--

CREATE TABLE `friends` (
  `ID` int(11) NOT NULL,
  `Friend1` int(11) DEFAULT NULL,
  `Friend2` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `matchtype`
--

CREATE TABLE `matchtype` (
  `ID` int(11) NOT NULL,
  `Time` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `matchtype`
--

INSERT INTO `matchtype` (`ID`, `Time`, `Name`) VALUES
(1, 1, 'Bullet'),
(2, 3, 'Blitz'),
(3, 5, 'Blitz'),
(4, 10, 'Rapid'),
(5, 30, 'Rapid');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `riddle`
--

CREATE TABLE `riddle` (
  `ID` int(11) NOT NULL,
  `FENString` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `riddlemove`
--

CREATE TABLE `riddlemove` (
  `ID` int(11) NOT NULL,
  `RiddleID` int(11) NOT NULL,
  `MoveCode` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `score`
--

CREATE TABLE `score` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Score` int(11) NOT NULL,
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`ID`, `Email`, `Password`, `RegistrationDate`, `NickName`, `BannedUntil`, `Deleted`, `AdminPowerID`) VALUES
(18, 'malpa@malpa', 'niewolno', '2023-05-05', 'dupa', NULL, NULL, 0);

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
-- AUTO_INCREMENT dla tabeli `friends`
--
ALTER TABLE `friends`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `match`
--
ALTER TABLE `match`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `matchtype`
--
ALTER TABLE `matchtype`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `riddle`
--
ALTER TABLE `riddle`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `riddlemove`
--
ALTER TABLE `riddlemove`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `riddleuser`
--
ALTER TABLE `riddleuser`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `score`
--
ALTER TABLE `score`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `FK_525f151b7987385978b2af231aa` FOREIGN KEY (`Friend1`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_ff8b2329d16c26a90b07b5bd4cb` FOREIGN KEY (`Friend2`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `match`
--
ALTER TABLE `match`
  ADD CONSTRAINT `FK_89c6094a17387f1e3162b72d977` FOREIGN KEY (`Black`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_efa3daadeb051462e1a1008c0e2` FOREIGN KEY (`TypeID`) REFERENCES `matchtype` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_fbb4c1a3f016872e416b3590b54` FOREIGN KEY (`White`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `riddle`
--
ALTER TABLE `riddle`
  ADD CONSTRAINT `FK_04a74f0f20503bad04473a70a15` FOREIGN KEY (`ID`) REFERENCES `riddlemove` (`RiddleID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `riddleuser`
--
ALTER TABLE `riddleuser`
  ADD CONSTRAINT `FK_56b533f425494898b7c76d8388f` FOREIGN KEY (`RiddleID`) REFERENCES `riddle` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_7da057b28f2a787704b20423c11` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `FK_5a19d3c48d2b6eda9064e6ff2ec` FOREIGN KEY (`UserID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
