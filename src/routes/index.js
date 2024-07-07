import express from "express";
import rutaAlquiler from "./AlquilerRoute.js";
import rutaServicios from "./serviciosRoute.js";
import rutaTipoFormato from "./tipoFormatoRoute.js";
import rutaMunicipio from "./municipioRoute.js";
import ruta from "./muestraRoutes.js";
import DocumentosRouter from "./DocumentosRoute.js";
import rutaVersion from './VersionesRoute.js';
import rutaUsuario from './usuarioRoute.js';
import rutaDetalle from "./detalleRoute.js";
import rutaFinca from "./FincaRoute.js";
import rutaDatos from "./DatosRouters.js";
import RutaAuth from "./AutonteficacionRoutes.js";
import EstadisticaRouter from "./EstadisticaRouters.js";

const router = express.Router();
router.use("/estadisticas",EstadisticaRouter)
router.use("/auth",RutaAuth)
router.use("/municipio", rutaMunicipio);
router.use("/muestra", ruta);
router.use("/documentos", DocumentosRouter);
router.use("/versiones", rutaVersion);
router.use('/usuario', rutaUsuario);
router.use('/detalle', rutaDetalle);
router.use('/finca', rutaFinca);
router.use('/datos', rutaDatos);
router.use('/alquiler', rutaAlquiler);
router.use('/servicios',rutaServicios)
router.use('/tipoformato',rutaTipoFormato)

export default router;