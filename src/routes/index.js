import express from "express";
import rutaServicios from "./serviciosRoute.js";
import rutaTipodocumento from "./tipoDocumentoRoute.js";
import rutaMunicipio from "./municipioRoute.js";
import ruta from "./muestraRoutes.js";
import DocumentosRouter from "./DocumentosRoute.js";
import rutaVersion from "./VersionesRoute.js";
import rutaUsuario from "./usuarioRoute.js";
import rutaValor from "./valorRoute.js";
import rutaFinca from "./FincaRoute.js";
import rutaPrecio from "./PrecioRoute.js";
import RutaAuth from "./AutonteficacionRoutes.js";
import EstadisticaRouter from "./EstadisticaRouters.js";
import rutaAmbiente from "./AmbienteRouter.js";
import rutaRecuperarContraseña from "./recuperarContraseñaRoute.js";
import rutaVariables from "./variablesRouters.js";
import servicioDetalle from "./tipoServicioRoute.js"
import routerConsultas from "./consultasRouter.js";
import logoRouter from "./logoRoutes.js";
import rolRouter from "./rolRouter.js";
import FacturasRouter from "./FacturasRouter.js"
import ReportesRouter from "./ReportesRouter.js"


const router = express.Router();

router.use("/estadisticas", EstadisticaRouter);
router.use("/auth", RutaAuth);
router.use("/precio", rutaPrecio);
router.use("/municipio", rutaMunicipio);
router.use("/muestra", ruta);
router.use("/documentos", DocumentosRouter);
router.use("/versiones", rutaVersion);
router.use("/usuario", rutaUsuario);
router.use("/valor", rutaValor);
router.use("/finca", rutaFinca);
router.use("/variables", rutaVariables);
router.use("/servicios", rutaServicios);
router.use("/tipoServicio", servicioDetalle);
router.use("/tipodocumento", rutaTipodocumento);
router.use("/ambiente", rutaAmbiente);
router.use("/logo", logoRouter);
router.use("/consultas", routerConsultas);
router.use("/password", rutaRecuperarContraseña);
router.use("/rol", rolRouter)
router.use("/facturas", FacturasRouter)
router.use("/reportes", ReportesRouter)


export default router;
