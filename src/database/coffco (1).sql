-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 07-07-2024 a las 03:20:29
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `coffco`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alquiler_laboratorio`
--

CREATE TABLE `alquiler_laboratorio` (
  `id_alquiler` int NOT NULL,
  `fecha_alquiler` datetime NOT NULL,
  `fk_usuarios` int NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `fecha_fin` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos`
--

CREATE TABLE `datos` (
  `id_datos` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `tipo` float NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `fk_id_formato` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `datos`
--

INSERT INTO `datos` (`id_datos`, `nombre`, `tipo`, `estado`, `fk_id_formato`) VALUES
(1, 'temperatura', 1, 1, 1),
(2, 'temperatura', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `id_detalle` int NOT NULL,
  `fk_id_formato` int NOT NULL,
  `fk_id_datos` int NOT NULL,
  `valor` float NOT NULL,
  `fk_id_servicios` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle`
--

INSERT INTO `detalle` (`id_detalle`, `fk_id_formato`, `fk_id_datos`, `valor`, `fk_id_servicios`) VALUES
(1, 1, 1, 1, 1),
(2, 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documentos`
--

CREATE TABLE `documentos` (
  `id_documentos` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha_carga` date NOT NULL,
  `fk_id_usuarios` int NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  `formato` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'inactivo',
  `archivo` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `documentos`
--

INSERT INTO `documentos` (`id_documentos`, `nombre`, `fecha_carga`, `fk_id_usuarios`, `descripcion`, `formato`, `estado`, `archivo`) VALUES
(2, 'procesos estrategicos', '2024-05-04', 1, 'asdasdas', 'word', 'activo', ''),
(6, 'procesos logicos', '2024-04-27', 1, 'procesos logicos', 'pdf', 'activo', ''),
(7, 'procesos estrategicos', '2024-04-27', 1, 'procesos misionales', 'pdf', 'activo', ''),
(8, 'formato tostion ingresos', '2024-04-29', 1, 'tostion', 'excel', 'activo', ''),
(10, 'procesos estrategicos', '2024-05-04', 1, 'jhhhhhh', 'word', 'inactivo', ''),
(11, 'procesos estrategicos', '2024-05-04', 1, 'jhhhhhh', 'word', 'inactivo', ''),
(12, 'procesos estrategicos', '2024-05-04', 1, 'jhhhhhh', 'word', 'inactivo', ''),
(15, 'asdasd', '2024-05-04', 1, 'desss', 'asdadasd', 'inactivo', ''),
(16, 'asdasd', '2024-05-04', 1, 'desss', 'asdadasd', 'inactivo', ''),
(17, 'procesos estrategicos', '2024-05-04', 1, 'jhhhhhh', 'word', 'inactivo', ''),
(18, 'asdasd', '2024-05-04', 1, 'desss', 'asdadasd', 'inactivo', ''),
(20, 'asdasd', '2024-05-06', 1, 'asdasdasd', 'pdf', 'inactivo', ''),
(21, 'asdasd', '2024-05-04', 1, 'desss', 'asdadasd', 'inactivo', ''),
(22, 'procesos estrategicos', '2024-05-04', 1, 'jhhhhhh', 'word', 'inactivo', ''),
(23, 'archivo', '2020-05-04', 1, 'asda', 'pdf', 'inactivo', ''),
(24, 'archivo', '2020-05-04', 1, 'asda', 'pdf', 'inactivo', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `finca`
--

CREATE TABLE `finca` (
  `id_finca` int NOT NULL,
  `nombre_finca` varchar(50) NOT NULL,
  `fk_id_municipio` int NOT NULL,
  `fk_id_usuario` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `finca`
--

INSERT INTO `finca` (`id_finca`, `nombre_finca`, `fk_id_municipio`, `fk_id_usuario`) VALUES
(1, 'el dorado', 1, 1),
(2, 'el dorado', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `muestra`
--

CREATE TABLE `muestra` (
  `id_muestra` int NOT NULL,
  `cantidad` float NOT NULL,
  `fk_id_finca` int NOT NULL,
  `fecha_muestra` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `muestra`
--

INSERT INTO `muestra` (`id_muestra`, `cantidad`, `fk_id_finca`, `fecha_muestra`) VALUES
(1, 33.33, 1, '2024-04-08'),
(2, 33.33, 1, '2024-04-08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipio`
--

CREATE TABLE `municipio` (
  `id_municipio` int NOT NULL,
  `nombre_municipio` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `municipio`
--

INSERT INTO `municipio` (`id_municipio`, `nombre_municipio`) VALUES
(1, 'oporapa'),
(2, 'oporapa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicios` int NOT NULL,
  `tipo_servicios` varchar(100) NOT NULL,
  `fk_id_muestra` int NOT NULL,
  `fk_formato` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`id_servicios`, `tipo_servicios`, `fk_id_muestra`, `fk_formato`) VALUES
(1, 'tostion', 1, 1),
(2, 'tostion', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_formato`
--

CREATE TABLE `tipo_formato` (
  `id_formato` int NOT NULL,
  `nombre` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tipo_formato`
--

INSERT INTO `tipo_formato` (`id_formato`, `nombre`) VALUES
(1, 'registro'),
(2, 'registro'),
(3, 'salida'),
(5, 'alquiler');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `nombre_usuario` varchar(45) NOT NULL,
  `apellido_usuario` varchar(45) NOT NULL,
  `correo_electronico` varchar(45) NOT NULL,
  `telefono_usuario` varchar(15) NOT NULL,
  `rol_usuario` enum('administrador','encargado','invitado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contraseña_usuario` varchar(60) NOT NULL,
  `numero_identificacion` int DEFAULT NULL,
  `tipo_documento` enum('cc','ti','nit','pasaporte') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre_usuario`, `apellido_usuario`, `correo_electronico`, `telefono_usuario`, `rol_usuario`, `contraseña_usuario`, `numero_identificacion`, `tipo_documento`) VALUES
(1, 'miguel', 'osori', 'miguel@gmail.com', '3204994085', 'administrador', '$2a$10$4lx.vQfdyV/8QIyOYUL5eeJunDJK6ypqkJm7IKzrMIISA2GB.wfoK', 1006459235, 'cc'),
(83, 'miguel', 'eojas', 'miguel@gmail.com', '1321213', 'invitado', '$2a$10$JFvjXFzGUcd5tKb14OcsxuLtE8IWu2dReER9pqHkxQq7Jn0530Pze', 10002222, 'cc'),
(84, 'miguel', 'rojas', 'miguel@gmail.com', '1321213', 'invitado', '$2a$10$kwQoLD82Q7EG7rvDll7FE.DQRVFHeVOa2fwiHEEDqE/uQBe8mlgUe', 10002222, 'cc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `versiones`
--

CREATE TABLE `versiones` (
  `id_formato` int NOT NULL,
  `version` varchar(45) NOT NULL,
  `editable` tinyint(1) NOT NULL,
  `fk_id_tipo_formato` int NOT NULL,
  `fk_id_usuarios` int NOT NULL,
  `formato_vacio` blob,
  `fk_documentos` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `versiones`
--

INSERT INTO `versiones` (`id_formato`, `version`, `editable`, `fk_id_tipo_formato`, `fk_id_usuarios`, `formato_vacio`, `fk_documentos`) VALUES
(1, '0.1', 1, 1, 1, NULL, 2),
(2, '0.1', 1, 1, 1, NULL, 2),
(3, '0.1', 1, 1, 1, NULL, 8);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alquiler_laboratorio`
--
ALTER TABLE `alquiler_laboratorio`
  ADD PRIMARY KEY (`id_alquiler`),
  ADD KEY `alquiler_usuario` (`fk_usuarios`);

--
-- Indices de la tabla `datos`
--
ALTER TABLE `datos`
  ADD PRIMARY KEY (`id_datos`),
  ADD KEY `valida` (`fk_id_formato`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `ingresar_valor` (`fk_id_formato`),
  ADD KEY `ingresar_dato` (`fk_id_datos`),
  ADD KEY `fk_id_servicios` (`fk_id_servicios`);

--
-- Indices de la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD PRIMARY KEY (`id_documentos`),
  ADD KEY `ingresa` (`fk_id_usuarios`);

--
-- Indices de la tabla `finca`
--
ALTER TABLE `finca`
  ADD PRIMARY KEY (`id_finca`),
  ADD KEY `pertenece` (`fk_id_municipio`),
  ADD KEY `recibe` (`fk_id_usuario`);

--
-- Indices de la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD PRIMARY KEY (`id_muestra`),
  ADD KEY `recibe_muestra` (`fk_id_finca`);

--
-- Indices de la tabla `municipio`
--
ALTER TABLE `municipio`
  ADD PRIMARY KEY (`id_municipio`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicios`),
  ADD KEY `realiza_muestra` (`fk_id_muestra`),
  ADD KEY `fk_formato` (`fk_formato`);

--
-- Indices de la tabla `tipo_formato`
--
ALTER TABLE `tipo_formato`
  ADD PRIMARY KEY (`id_formato`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indices de la tabla `versiones`
--
ALTER TABLE `versiones`
  ADD PRIMARY KEY (`id_formato`),
  ADD KEY `generar_formato` (`fk_id_usuarios`),
  ADD KEY `realiza` (`fk_id_tipo_formato`),
  ADD KEY `versiones` (`fk_documentos`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alquiler_laboratorio`
--
ALTER TABLE `alquiler_laboratorio`
  MODIFY `id_alquiler` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `datos`
--
ALTER TABLE `datos`
  MODIFY `id_datos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `documentos`
--
ALTER TABLE `documentos`
  MODIFY `id_documentos` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `finca`
--
ALTER TABLE `finca`
  MODIFY `id_finca` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `muestra`
--
ALTER TABLE `muestra`
  MODIFY `id_muestra` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `municipio`
--
ALTER TABLE `municipio`
  MODIFY `id_municipio` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicios` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_formato`
--
ALTER TABLE `tipo_formato`
  MODIFY `id_formato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT de la tabla `versiones`
--
ALTER TABLE `versiones`
  MODIFY `id_formato` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alquiler_laboratorio`
--
ALTER TABLE `alquiler_laboratorio`
  ADD CONSTRAINT `alquiler_usuario` FOREIGN KEY (`fk_usuarios`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `datos`
--
ALTER TABLE `datos`
  ADD CONSTRAINT `valida` FOREIGN KEY (`fk_id_formato`) REFERENCES `versiones` (`id_formato`);

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`fk_id_servicios`) REFERENCES `servicios` (`id_servicios`),
  ADD CONSTRAINT `ingresar_dato` FOREIGN KEY (`fk_id_datos`) REFERENCES `datos` (`id_datos`),
  ADD CONSTRAINT `ingresar_valor` FOREIGN KEY (`fk_id_formato`) REFERENCES `versiones` (`id_formato`);

--
-- Filtros para la tabla `documentos`
--
ALTER TABLE `documentos`
  ADD CONSTRAINT `ingresa` FOREIGN KEY (`fk_id_usuarios`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `finca`
--
ALTER TABLE `finca`
  ADD CONSTRAINT `pertenece` FOREIGN KEY (`fk_id_municipio`) REFERENCES `municipio` (`id_municipio`),
  ADD CONSTRAINT `recibe` FOREIGN KEY (`fk_id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `muestra`
--
ALTER TABLE `muestra`
  ADD CONSTRAINT `recibe_muestra` FOREIGN KEY (`fk_id_finca`) REFERENCES `finca` (`id_finca`);

--
-- Filtros para la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD CONSTRAINT `fk_formato` FOREIGN KEY (`fk_formato`) REFERENCES `versiones` (`id_formato`),
  ADD CONSTRAINT `realiza_muestra` FOREIGN KEY (`fk_id_muestra`) REFERENCES `muestra` (`id_muestra`);

--
-- Filtros para la tabla `versiones`
--
ALTER TABLE `versiones`
  ADD CONSTRAINT `generar_formato` FOREIGN KEY (`fk_id_usuarios`) REFERENCES `usuarios` (`id_usuario`),
  ADD CONSTRAINT `realiza` FOREIGN KEY (`fk_id_tipo_formato`) REFERENCES `tipo_formato` (`id_formato`),
  ADD CONSTRAINT `versiones` FOREIGN KEY (`fk_documentos`) REFERENCES `documentos` (`id_documentos`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
