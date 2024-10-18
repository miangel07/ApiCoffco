/**
 * @swagger
 * components:
 *   schemas:
 *     Estadistica:
 *       type: object
 *       properties:
 *         nombreServicio:
 *           type: string
 *           description: "Nombre del servicio"
 *         cantidad_uso:
 *           type: integer
 *           description: "Cantidad de veces que el servicio ha sido usado"
 *         total_servicios:
 *           type: integer
 *           description: "Total de servicios registrados"
 *     EstadisticasAlquiler:
 *       type: object
 *       properties:
 *         fecha:
 *           type: string
 *           format: date
 *           description: "Fecha en formato año-mes"
 *         cantidad_servicios:
 *           type: integer
 *           description: "Cantidad de servicios de alquiler registrados en la fecha"
 */

/**
 * @swagger
 * /api/estadistica/estadistica:
 *   get:
 *     summary: Obtiene estadísticas del uso de los servicios
 *     tags:
 *       - Estadísticas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estadistica'
 *       400:
 *         description: Error en los datos enviados
 *       404:
 *         description: No se encontraron datos
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/estadistica/alquiler:
 *   get:
 *     summary: Obtiene estadísticas de servicios de alquiler en un rango de meses
 *     tags:
 *       - Estadísticas
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de alquiler obtenidas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EstadisticasAlquiler'
 *       404:
 *         description: No se encontraron datos
 *       500:
 *         description: Error en el servidor
 */

export const estadisticaDocs = {};
