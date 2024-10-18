/**
 * @swagger
 * components:
 *   schemas:
 *     IngresoTrilla:
 *       type: object
 *       properties:
 *         codigo_documento:
 *           type: string
 *           description: "Código del documento"
 *         version_documento:
 *           type: string
 *           description: "Versión del documento"
 *         fecha_emision_documento:
 *           type: string
 *           format: date
 *           description: "Fecha de emisión del documento"
 *         codigo_muestra:
 *           type: string
 *           description: "Código de la muestra"
 *         fecha_muestra:
 *           type: string
 *           format: date
 *           description: "Fecha de la muestra"
 *         cantidad_muestra:
 *           type: integer
 *           description: "Cantidad de la muestra"
 *         usuario_registro_servicio:
 *           type: string
 *           description: "Nombre del usuario que registró el servicio"
 *         cliente_id:
 *           type: integer
 *           description: "ID del cliente"
 *         tipo_documento_cliente:
 *           type: string
 *           description: "Tipo de documento del cliente"
 *         numero_documento_cliente:
 *           type: string
 *           description: "Número de documento del cliente"
 *         telefono_cliente:
 *           type: string
 *           description: "Teléfono del cliente"
 *         variedad_muestra:
 *           type: string
 *           description: "Variedad de la muestra"
 *         altura_muestra:
 *           type: number
 *           description: "Altura de la muestra"
 *         observaciones_muestra:
 *           type: string
 *           description: "Observaciones de la muestra"
 *         logos_rutas:
 *           type: string
 *           description: "Rutas de los logos asignados al documento"
 */

/**
 * @swagger
 * /api/ingresos/trillaList:
 *   get:
 *     summary: Obtiene la lista de ingresos de trilla
 *     tags:
 *       - Ingresos
 *     responses:
 *       200:
 *         description: Lista de ingresos de trilla obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IngresoTrilla'
 *       404:
 *         description: No se encontraron resultados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/ingresos/reporte:
 *   post:
 *     summary: Obtiene información de servicio para un tipo de servicio en un rango de fechas
 *     tags:
 *       - Ingresos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTipoServicio:
 *                 type: integer
 *                 description: "ID del tipo de servicio"
 *               fechaInicio:
 *                 type: string
 *                 format: date
 *                 description: "Fecha de inicio del rango"
 *               fechaFin:
 *                 type: string
 *                 format: date
 *                 description: "Fecha de fin del rango"
 *     responses:
 *       200:
 *         description: Información de servicio obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre_tipo_servicio:
 *                     type: string
 *                     description: "Nombre del tipo de servicio"
 *                   codigo_documento:
 *                     type: string
 *                     description: "Código del documento"
 *                   version_documento:
 *                     type: string
 *                     description: "Versión del documento"
 *                   fecha_emision_documento:
 *                     type: string
 *                     format: date
 *                     description: "Fecha de emisión del documento"
 *                   codigo_muestra:
 *                     type: string
 *                     description: "Código de la muestra"
 *                   fecha_muestra:
 *                     type: string
 *                     format: date
 *                     description: "Fecha de la muestra"
 *                   cantidad_muestra:
 *                     type: integer
 *                     description: "Cantidad de la muestra"
 *                   nombre_cliente:
 *                     type: string
 *                     description: "Nombre del cliente"
 *                   nombre_recibido:
 *                     type: string
 *                     description: "Nombre de quien recibe el servicio"
 *                   tipo_documento_cliente:
 *                     type: string
 *                     description: "Tipo de documento del cliente"
 *                   numero_documento_cliente:
 *                     type: string
 *                     description: "Número de documento del cliente"
 *                   telefono_cliente:
 *                     type: string
 *                     description: "Teléfono del cliente"
 *                   variedad_muestra:
 *                     type: string
 *                     description: "Variedad de la muestra"
 *                   altura_muestra:
 *                     type: number
 *                     description: "Altura de la muestra"
 *                   observaciones_muestra:
 *                     type: string
 *                     description: "Observaciones de la muestra"
 *                   logos_rutas:
 *                     type: string
 *                     description: "Rutas de los logos asignados al documento"
 *                   municipio_muestra:
 *                     type: string
 *                     description: "Nombre del municipio"
 *       404:
 *         description: No se encontraron muestras para el tipo de servicio en el rango de fechas especificado
 *       500:
 *         description: Error en el servidor
 */

export const ingresosDocs = {};
