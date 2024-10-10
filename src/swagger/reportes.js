/**
 * @swagger
 * components:
 *   schemas:
 *     Reporte:
 *       type: object
 *       properties:
 *         muestra:
 *           type: string
 *           description: "El identificador de la muestra (ej: CM-01)"
 *         TipoServicio:
 *           type: integer
 *           description: "El tipo de servicio asociado (ej: 2)"
 */

/**
 * @swagger
 * /api/reportes/generar:
 *   post:
 *     summary: Genera un nuevo reporte
 *     tags:
 *       - Reportes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reporte'
 *     responses:
 *       201:
 *         description: Reporte generado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Mensaje de confirmación"
 *                 reporteId:
 *                   type: integer
 *                   description: "ID del reporte generado"
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

export const reportesDocs = {};
