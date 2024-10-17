/**
 * @swagger
 * components:
 *   schemas:
 *     Precio:
 *       type: object
 *       properties:
 *         idPrecio:
 *           type: integer
 *           description: "ID del precio"
 *         estado_precio:
 *           type: string
 *           description: "Estado del precio"
 *         presentacion:
 *           type: string
 *           description: "Presentación del servicio"
 *         UnidadMedida:
 *           type: string
 *           description: "Unidad de medida"
 *         precio:
 *           type: number
 *           format: float
 *           description: "Precio del servicio"
 *         fk_idTipoServicio:
 *           type: integer
 *           description: "ID del tipo de servicio relacionado"
 *         nombreServicio:
 *           type: string
 *           description: "Nombre del servicio"
 */

/**
 * @swagger
 * /api/precio/listar:
 *   get:
 *     summary: Listar todos los precios
 *     tags:
 *       - Precios
 *     responses:
 *       200:
 *         description: Precios listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Precio'
 *       404:
 *         description: No se encontraron precios en la base de datos
 *       500:
 *         description: Error en el controlador
 */

/**
 * @swagger
 * /api/precio/registrar:
 *   post:
 *     summary: Registrar un nuevo precio
 *     tags:
 *       - Precios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presentacion:
 *                 type: string
 *                 description: "Presentación del servicio"
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: "Precio del servicio"
 *               fk_idTipoServicio:
 *                 type: integer
 *                 description: "ID del tipo de servicio"
 *               unidadMedida:
 *                 type: string
 *                 description: "Unidad de medida"
 *     responses:
 *       200:
 *         description: Se registró con éxito el precio
 *       400:
 *         description: Errores de validación
 *       404:
 *         description: No se registró el precio
 *       500:
 *         description: Error al conectar la base de datos
 */

/**
 * @swagger
 * /api/precio/eliminar/{idPrecio}:
 *   delete:
 *     summary: Eliminar un precio
 *     tags:
 *       - Precios
 *     parameters:
 *       - name: idPrecio
 *         in: path
 *         required: true
 *         description: ID del precio a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Se eliminó con éxito el precio
 *       404:
 *         description: No se eliminó el precio
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/precio/actualizar/{idPrecio}:
 *   put:
 *     summary: Actualizar un precio existente
 *     tags:
 *       - Precios
 *     parameters:
 *       - name: idPrecio
 *         in: path
 *         required: true
 *         description: ID del precio a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               presentacion:
 *                 type: string
 *                 description: "Presentación del servicio"
 *               precio:
 *                 type: number
 *                 format: float
 *                 description: "Nuevo precio del servicio"
 *               fk_idTipoServicio:
 *                 type: integer
 *                 description: "Nuevo ID del tipo de servicio"
 *     responses:
 *       200:
 *         description: Se actualizó con éxito el precio
 *       404:
 *         description: No se actualizó el precio
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/precio/actualizarestadoprecio/{idPrecio}:
 *   put:
 *     summary: Actualizar el estado de un precio
 *     tags:
 *       - Precios
 *     parameters:
 *       - name: idPrecio
 *         in: path
 *         required: true
 *         description: ID del precio cuyo estado se actualizará
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado_precio:
 *                 type: string
 *                 description: "Nuevo estado del precio"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Estado no actualizado
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/precio/listarid/{idPrecio}:
 *   get:
 *     summary: Listar precio por ID
 *     tags:
 *       - Precios
 *     parameters:
 *       - name: idPrecio
 *         in: path
 *         required: true
 *         description: ID del precio a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Precio encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Precio'
 *       404:
 *         description: Precio no encontrado
 *       500:
 *         description: Error en la conexión
 */

export const precioDocs = {};
