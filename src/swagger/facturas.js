/**
 * @swagger
 * components:
 *   schemas:
 *     Factura:
 *       type: object
 *       properties:
 *         codigo_muestra:
 *           type: string
 *           description: "Código de la muestra"
 *         cantidadEntrada:
 *           type: integer
 *           description: "Cantidad de entrada de la muestra"
 *         servicios:
 *           type: string
 *           description: "Servicios asociados a la muestra"
 *         precios:
 *           type: string
 *           description: "Precios de los servicios"
 *         cantidad_salida_servicios:
 *           type: string
 *           description: "Cantidad de salida de los servicios"
 *         total_calculado:
 *           type: string
 *           description: "Total calculado de la factura"
 *         nombre_finca:
 *           type: string
 *           description: "Nombre de la finca relacionada"
 *         UnidadMedida:
 *           type: string
 *           description: "Unidad de medida de los precios"
 *         nombre_municipio:
 *           type: string
 *           description: "Nombre del municipio"
 *         nombre_usuario:
 *           type: string
 *           description: "Nombre del usuario que generó la factura"
 *         apellido_usuario:
 *           type: string
 *           description: "Apellido del usuario que generó la factura"
 *         correo_usuario:
 *           type: string
 *           description: "Correo electrónico del usuario"
 *         usuarios_servicio:
 *           type: string
 *           description: "Usuarios asignados a los servicios"
 */

/**
 * @swagger
 * /api/facturas/generar:
 *   post:
 *     summary: Genera una factura para una muestra
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: "Código de la muestra para generar la factura"
 *     responses:
 *       200:
 *         description: Factura generada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Factura'
 *       404:
 *         description: No se encontraron resultados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/facturas/alquiler:
 *   post:
 *     summary: Genera facturas para servicios de alquiler
 *     tags:
 *       - Facturas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Documento:
 *                 type: string
 *                 description: "Número de documento del usuario para la factura"
 *     responses:
 *       200:
 *         description: Facturas de alquiler generadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_usuario:
 *                     type: integer
 *                     description: "ID del usuario"
 *                   nombre:
 *                     type: string
 *                     description: "Nombre del usuario"
 *                   apellidos:
 *                     type: string
 *                     description: "Apellidos del usuario"
 *                   cedula:
 *                     type: string
 *                     description: "Número de cédula del usuario"
 *                   tipo_documento:
 *                     type: string
 *                     description: "Tipo de documento del usuario"
 *                   correo_electronico:
 *                     type: string
 *                     description: "Correo electrónico del usuario"
 *                   fecha:
 *                     type: string
 *                     description: "Fecha del servicio"
 *                   fecha_fin:
 *                     type: string
 *                     description: "Fecha de finalización del servicio"
 *                   estado:
 *                     type: string
 *                     description: "Estado del servicio"
 *                   precio:
 *                     type: string
 *                     description: "Precio del servicio"
 *       404:
 *         description: No se encontraron resultados para generar la factura
 *       500:
 *         description: Error en el servidor
 */

export const facturasDocs = {};
