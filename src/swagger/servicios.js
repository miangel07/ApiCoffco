// Schemas
/**
 * @swagger
 * components:
 *   schemas:
 *     Servicio:
 *       type: object
 *       properties:
 *         id_servicios:
 *           type: integer
 *           example: 1
 *         fk_idTipoServicio:
 *           type: integer
 *           example: 2
 *         fecha:
 *           type: string
 *           format: date
 *           example: "2024-10-16"
 *         fk_id_precio:
 *           type: integer
 *           example: 3
 *         fk_idAmbiente:
 *           type: integer
 *           example: 4
 *         fk_idMuestra:
 *           type: integer
 *           example: 5
 *         fk_idUsuarios:
 *           type: integer
 *           example: 6
 *         estado:
 *           type: string
 *           example: "activo"
 *         cantidad_salida:
 *           type: integer
 *           example: 10
 *         fecha_fin:
 *           type: string
 *           format: date
 *           example: "2024-10-20"
 *     Cambio:
 *       type: object
 *       properties:
 *         descripcion:
 *           type: string
 *           example: "Servicio terminado"
 *         fk_id_servicio:
 *           type: integer
 *           example: 1
 *         fk_id_usuario:
 *           type: integer
 *           example: 1
 *     Precio:
 *       type: object
 *       properties:
 *         idPrecio:
 *           type: integer
 *           example: 1
 *         precio:
 *           type: number
 *           format: float
 *           example: 100.00
 *         presentacion:
 *           type: string
 *           example: "Presentación de servicio"
 *         UnidadMedida:
 *           type: string
 *           example: "unidad"
 *         estado_precio:
 *           type: string
 *           example: "activo"
 */

// registra los datos al terminar el servicio
/**
 * @swagger
 * /servicios/terminado/{id}:
 *   patch:
 *     summary: Registra la terminación de un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio a registrar como terminado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad_salida:
 *                 type: integer
 *                 example: 10
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-20"
 *     responses:
 *       200:
 *         description: Registro de término exitoso y estado de muestra actualizado
 *       404:
 *         description: No se registró la terminación del servicio o muestra no encontrada
 *       500:
 *         description: Error en el servidor
 */

// lista los servicios en la tabla
/**
 * @swagger
 * /servicios:
 *   get:
 *     summary: Lista todos los servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: No se encontraron datos
 *       500:
 *         description: Error en el servidor
 */

// lista un servicio por ID
/**
 * @swagger
 * /servicios/{id}:
 *   get:
 *     summary: Obtiene un servicio por ID
 *     tags: [Servicios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del servicio a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servicio'
 *       404:
 *         description: El dato no existe
 *       500:
 *         description: Error en el servidor
 */

// obtener precios según el tipo de servicio
/**
 * @swagger
 * /servicios/precios:
 *   post:
 *     summary: Obtiene precios según el tipo de servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_muestra:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Precios encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Precio'
 *       400:
 *         description: El id_muestra es requerido
 *       404:
 *         description: Muestra no encontrada o tipo de servicio no encontrado
 *       500:
 *         description: Error en el servidor
 */

// registra un servicio
/**
 * @swagger
 * /servicios:
 *   post:
 *     summary: Registra un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fk_idTipoServicio:
 *                 type: integer
 *                 example: 2
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2024-10-16"
 *               fk_id_precio:
 *                 type: integer
 *                 example: 3
 *               fk_idAmbiente:
 *                 type: integer
 *                 example: 4
 *               fk_idMuestra:
 *                 type: integer
 *                 example: 5
 *               fk_idUsuarios:
 *                 type: integer
 *                 example: 6
 *               valoresVariables:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *     responses:
 *       201:
 *         description: Servicio registrado exitosamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al registrar el servicio
 */
export const serviciosDocs = {};