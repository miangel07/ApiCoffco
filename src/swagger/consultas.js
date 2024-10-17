/**
 * @swagger
 * components:
 *   schemas:
 *     ConsultaIngresoTostion:
 *       type: object
 *       properties:
 *         formulario:
 *           type: string
 *           description: "Nombre del formulario para filtrar la consulta"
 *         fecha_incio:
 *           type: string
 *           format: date
 *           description: "Fecha de inicio para filtrar la consulta"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: "Fecha de fin para filtrar la consulta"
 *     ConsultaSalidaServicios:
 *       type: object
 *       properties:
 *         formulario:
 *           type: string
 *           description: "Nombre del formulario para filtrar la consulta"
 *         fecha_incio:
 *           type: string
 *           format: date
 *           description: "Fecha de inicio para filtrar la consulta"
 *         fecha_fin:
 *           type: string
 *           format: date
 *           description: "Fecha de fin para filtrar la consulta"
 */

/**
 * @swagger
 * /api/consultas/reporteingreso:
 *   post:
 *     summary: Obtiene un reporte de ingreso de tostones basado en un formulario y rango de fechas
 *     tags:
 *       - Consultas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultaIngresoTostion'
 *     responses:
 *       200:
 *         description: Reporte de ingreso obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre_documento:
 *                     type: string
 *                   descripcion_documento:
 *                     type: string
 *                   logos:
 *                     type: string
 *                   codigo_documentos:
 *                     type: string
 *                   version:
 *                     type: string
 *                   codigo_muestra:
 *                     type: string
 *                   fecha_muestra:
 *                     type: string
 *                     format: date
 *                   cantidadEntrada:
 *                     type: number
 *                   quien_recibe:
 *                     type: string
 *                   productor_nombre:
 *                     type: string
 *                   tipo_documento:
 *                     type: string
 *                   numero_documento:
 *                     type: string
 *                   telefono:
 *                     type: string
 *                   nombre_municipio:
 *                     type: string
 *                   variables_y_valores:
 *                     type: object
 *       404:
 *         description: No se encontró reporte de este registro
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/consultas/reportesalida:
 *   post:
 *     summary: Obtiene un reporte de salida de servicios de tostión y trilla basado en un formulario y rango de fechas
 *     tags:
 *       - Consultas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConsultaSalidaServicios'
 *     responses:
 *       200:
 *         description: Reporte de salida obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre_documento:
 *                     type: string
 *                   descripcion_documento:
 *                     type: string
 *                   logos:
 *                     type: string
 *                   codigo_documentos:
 *                     type: string
 *                   version:
 *                     type: string
 *                   codigo_muestra:
 *                     type: string
 *                   variables_y_valores:
 *                     type: object
 *       404:
 *         description: No se encontró reporte de este registro
 *       500:
 *         description: Error en el servidor
 */

export const consultasDocs = {};
