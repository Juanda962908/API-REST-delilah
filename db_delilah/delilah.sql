SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/* -------------------------------------------------------------------------------------- */
/* Estructura de la tabla del carrito de compras */

CREATE TABLE `carrito` (
  `ID` int(10) DEFAULT NULL,
  `NombrePlato` varchar(50) NOT NULL,
  `Codigo` varchar(20) NOT NULL,
  `Precio` int(20) NOT NULL,
  `Img` varchar(1000) NOT NULL,
  `username` varchar(50) NOT NULL,
  `user_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


/*---------------------------------------------------------------------------------------*/
/* Estructura de la tabla del historial de compras */

CREATE TABLE `historial` (
  `Estado` varchar(20) NOT NULL,
  `Hora` varchar(100) NOT NULL,
  `Numero` int(11) NOT NULL,
  `Descripcion` varchar(1000) NOT NULL,
  `DescripcionCompleta` varchar(1000) NOT NULL,
  `TipoPago` varchar(20) NOT NULL,
  `Pago` int(11) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `user_id` int(10) NOT NULL,
  `Direccion` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* -------------------------------------------------------------------------------------- */
/* Estructura para la tabla de menú e insercción de los productos a consumir */

CREATE TABLE `menu` (
  `ID` int(10) NOT NULL,
  `Codigo` varchar(10) DEFAULT NULL,
  `NombrePlato` text DEFAULT NULL,
  `Gluten` tinyint(1) DEFAULT NULL,
  `Precio` int(10) DEFAULT NULL,
  `Img` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `menu` (`ID`, `Codigo`, `NombrePlato`, `Gluten`, `Precio`, `Img`) VALUES
(1, 'HamClas', 'Hamburgesa clasica', 1, 250, 'https://i.imgur.com/KaGNegD.png'),
(2, 'BglSalmon', 'Bagel de salmon', 1, 420, 'https://i.imgur.com/yrHKMiK.jpg'),
(3, 'SandVegg', 'Sandwich veggie', 0, 310, 'https://i.imgur.com/pZehRUK.jpg'),
(4, 'EnsVegg', 'Ensalada veggie', 0, 340, 'https://i.imgur.com/2pmnLhG.jpg'),
(5, 'Foca', 'Focaccia', 1, 300, 'https://i.imgur.com/eQ8563H.jpg'),
(6, 'SandFoca', 'Sandwich focaccia', 0, 440, 'https://i.imgur.com/RgVYbEX.jpg'),
(7, 'EnsCaes', 'Ensalada Caesar', 0, 320, 'https://i.imgur.com/OUwLnpw.jpg'),
(8, 'HambLent', 'Hamburguesa de lentejas', 1, 380, 'https://i.imgur.com/1cnJL1v.jpg'),
(9, 'EnsAtun', 'Ensalada de atún', 0, 305, 'https://i.imgur.com/I2lLT2J.jpg'),
(10, 'TarJyQ', 'Tarta de jamon y queso', 1, 380, 'https://i.imgur.com/hKrt49L.jpg'),
(11, 'TarVerd', 'Tarta integral de verdura', 0, 380, 'https://i.imgur.com/fcTZtic.jpg'),
(12, 'EmpJyQ', 'Empanada de jamon y queso', 1, 100, 'https://i.imgur.com/FcnX7F1.jpg'),
(13, 'EmpCar', 'Empanada de carne', 1, 100, 'https://i.imgur.com/Mxq4vTT.jpg'),
(14, 'EmpVer', 'Empanada de verdura', 1, 100, 'https://i.imgur.com/FhDkhmj.jpg'),
(15, 'WrVer', 'Wrap de verdura', 0, 210, 'https://i.imgur.com/3OlClju.jpg'),
(16, 'WrPollyV', 'Wrap de pollo y verdura', 0, 270, 'https://i.imgur.com/kKExXq7.jpg'),
(17, 'WrAtun', 'Wrap integral de atún', 0, 330, 'https://i.imgur.com/RyF2d3T.jpg'),
(18, 'NoqGel', 'Ñoquis de alcohol en gel', 0, 450, 'https://i.imgur.com/tPbRwcF.jpg');

/* -------------------------------------------------------------------------------------- */
/* Estructura de la tabla de pedidos */
CREATE TABLE `pedidos` (
  `Estado` text NOT NULL,
  `Hora` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `Numero` int(11) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `DescripcionCompleta` varchar(1000) NOT NULL,
  `TipoPago` text DEFAULT NULL,
  `Pago` int(20) NOT NULL,
  `Usuario` text NOT NULL,
  `user_id` int(20) NOT NULL,
  `Direccion` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/* -------------------------------------------------------------------------------------- */
/* Estructura de la tabla de sessions */

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('AAZrN9uVktTGfc6szeonr670MRpo3bYA', 1589479155, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":10}}');

/* -------------------------------------------------------------------------------------- */
/* Estructura de la tabla usuarios */
CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `password` varchar(500) NOT NULL,
  `Role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `usuarios` (`ID`, `username`, `fullname`, `email`, `phone`, `address`, `password`, `Role`) VALUES
(1, 'sudojuanda', 'juanda de la hoz', 'juandaniel9629@gmail.com', 0, '', '$2a$10$DNvKnZi8Oft2Oy9ZQnC5ReB2mnrZjwcsCYK2oRJDamJjWmmq/TQ2i', 'admin');

ALTER TABLE `historial`
  ADD KEY `fk_user` (`user_id`);

ALTER TABLE `menu`
  ADD PRIMARY KEY (`ID`);
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`Numero`),
  ADD KEY `user_id` (`user_id`);

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`);

ALTER TABLE `menu`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

ALTER TABLE `pedidos`
  MODIFY `Numero` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;
