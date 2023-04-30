-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Mar 2023, 18:10
-- Wersja serwera: 10.4.27-MariaDB
-- Wersja PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Struktura tabeli dla tabeli `adminpower`
--

CREATE TABLE `adminpower` (
  `ID` int(11) NOT NULL,
  `Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `friends`
--

CREATE TABLE `friends` (
  `ID` int(11) NOT NULL,
  `Friend1` int(11) NOT NULL,
  `Friend2` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `match`
--

CREATE TABLE `match` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Black` int(11) NOT NULL,
  `White` int(11) NOT NULL,
  `Win` int(11) NOT NULL,
  `FENString` varchar(1000) NOT NULL,
  `TypeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `BannedUntil` datetime NOT NULL,
  `Deleted` datetime NOT NULL,
  `AdminPowerID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `adminpower`
--
ALTER TABLE `adminpower`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`ID`);

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
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `riddleuser`
--
ALTER TABLE `riddleuser`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`ID`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `adminpower`
--
ALTER TABLE `adminpower`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
