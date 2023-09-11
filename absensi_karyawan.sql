-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Sep 2023 pada 02.28
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensi_karyawan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `attendanceconfigs`
--

CREATE TABLE `attendanceconfigs` (
  `id` varchar(50) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `timeStart` varchar(255) DEFAULT NULL,
  `timeEnd` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `attendanceconfigs`
--

INSERT INTO `attendanceconfigs` (`id`, `status`, `timeStart`, `timeEnd`, `createdAt`, `updatedAt`) VALUES
('1001', 'masuk', '05.00.59', '07.59.59', '2023-09-10 22:08:39', '2023-09-10 22:08:39'),
('1002', 'pulang', '17.00.59', '23.59.59', '2023-09-10 22:08:39', '2023-09-10 22:08:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `attendances`
--

CREATE TABLE `attendances` (
  `id` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `dateAttendance` date DEFAULT NULL,
  `timeAttendance` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `attendances`
--

INSERT INTO `attendances` (`id`, `userId`, `dateAttendance`, `timeAttendance`, `status`, `createdAt`, `updatedAt`) VALUES
('246a7b2e-0887-465d-9628-06dce962fc10', '7b75f811-e3c9-4e68-9a30-5f834f174f7d', '2023-09-01', '23.44.49', 'pulang', '2023-09-10 20:44:49', '2023-09-10 20:44:49'),
('4a2fb4ef-10ff-458e-ae89-ea1d418fa03c', '26f94fcc-c237-4fc3-a19a-42365c325466', '2023-09-11', '6.0.40', 'masuk', '2023-09-10 23:00:40', '2023-09-10 23:00:40'),
('efdd0c3f-278a-4d7f-a4aa-93312c0eb229', '7b75f811-e3c9-4e68-9a30-5f834f174f7d', '2023-09-11', '5.58.36', 'masuk', '2023-09-10 22:58:36', '2023-09-10 22:58:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230907154210-create-user.js'),
('20230910180751-create-attendance.js'),
('20230910200725-create-attendanceconfig.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) NOT NULL,
  `jabatan` varchar(255) DEFAULT NULL,
  `noHp` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `fullname`, `jabatan`, `noHp`, `photo`, `level`, `createdAt`, `updatedAt`) VALUES
('26f94fcc-c237-4fc3-a19a-42365c325466', 'admin@email.com', 'admin', '$2b$10$RD4epf4vDufnQBw6Hi78teTlIafcCndFsaP6iXEmVygPK0YON.XQa', 'admin', 'Supervisor', '0212233445566', '3.jpg', 'admin', '2023-09-07 16:30:00', '2023-09-10 23:00:04'),
('7b75f811-e3c9-4e68-9a30-5f834f174f7d', 'jonheri@email.com', 'jonheri', '$2b$10$lGcP9YMp3TeEvac1ll.hVOJc1nMkovDEhbk4Qg5nsUJ3X4U1vhOSq', 'Jon Heri Soft', 'Staff IT', '021555555555555', '3.jpg', 'karyawan', '2023-09-07 16:00:27', '2023-09-10 17:59:42'),
('dcadc06e-0df6-489c-b36d-ebd2f9608bf9', 'maya@email.com', 'Maya', '$2b$10$ZIQxIItJHA5qnDoklHFR5u7eRjLz.HQ.wSXK6oXjrRPIB7uKsHL.W', 'admin', NULL, NULL, NULL, 'karyawan', '2023-09-07 17:01:47', '2023-09-07 17:01:47'),
('fe013878-47b8-4fbb-a22f-990ed793ece7', 'andy@email.com', 'admin', '$2b$10$iNuI9r5UJFeotdZ9uOec5OaLw/lOtjI32F9lC7HyoX9pMYKQjzIZ.', 'Andy', NULL, NULL, NULL, 'karyawan', '2023-09-07 17:00:08', '2023-09-07 17:00:08');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `attendanceconfigs`
--
ALTER TABLE `attendanceconfigs`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `attendances`
--
ALTER TABLE `attendances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `attendances`
--
ALTER TABLE `attendances`
  ADD CONSTRAINT `attendances_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
