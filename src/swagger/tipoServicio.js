/**
 * @swagger
 * components:
 *   schemas:
 *     TipoServicio:
 *       type: object
 *       properties:
 *         idTipoServicio:
 *           type: integer
 *           description: "ID del tipo de servicio"
 *         nombreServicio:
 *           type: string
 *           description: "Nombre del tipo de servicio"
 *         codigoTipoServicio:
 *           type: string
 *           description: "Código del tipo de servicio"
 *         estado:
 *           type: string
 *           description: "Estado del tipo de servicio (activo/inactivo)"
 */

/**
 * @swagger
 * /api/tiposervicio/listar:
 *   get:
 *     summary: Listar todos los tipos de servicio
 *     tags:
 *       - Tipos de Servicio
 *     responses:
 *       200:
 *         description: Lista de tipos de servicio recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoServicio'
 *       404:
 *         description: Datos no encontrados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/registrar:
 *   post:
 *     summary: Registrar un nuevo tipo de servicio
 *     tags:
 *       - Tipos de Servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoServicio'
 *     responses:
 *       200:
 *         description: Tipo de servicio registrado correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se registró el tipo de servicio
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/listar/{id}:
 *   get:
 *     summary: Buscar tipo de servicio por ID
 *     tags:
 *       - Tipos de Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de servicio a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de servicio encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoServicio'
 *       404:
 *         description: El dato no existe
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/actualizar/{id}:
 *   put:
 *     summary: Actualizar un tipo de servicio existente
 *     tags:
 *       - Tipos de Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de servicio a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoServicio'
 *     responses:
 *       200:
 *         description: Tipo de servicio actualizado correctamente
 *       404:
 *         description: Datos no actualizados. Verifica si el ID existe
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un tipo de servicio
 *     tags:
 *       - Tipos de Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de servicio a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de servicio eliminado correctamente
 *       404:
 *         description: Error al eliminar datos
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/estado/{id}:
 *   put:
 *     summary: Actualizar el estado de un tipo de servicio
 *     tags:
 *       - Tipos de Servicio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de servicio a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [activo, inactivo]
 *                 description: "Nuevo estado del tipo de servicio"
 *     responses:
 *       200:
 *         description: Estado del tipo de servicio actualizado correctamente
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Datos no actualizados. Verifica si el ID existe
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/listarActivo:
 *   get:
 *     summary: Listar todos los tipos de servicio activos
 *     tags:
 *       - Tipos de Servicio
 *     responses:
 *       200:
 *         description: Lista de tipos de servicio activos recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoServicio'
 *       404:
 *         description: Datos no encontrados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/validarTiposervicio:
 *   post:
 *     summary: Validar si existe un servicio asociado a un documento activo
 *     tags:
 *       - Tipos de Servicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idTipoServicio:
 *                 type: integer
 *                 description: ID del tipo de servicio a validar
 *     responses:
 *       200:
 *         description: Valida si ya existe un documento activo asociado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/tiposervicio/listarTipoServActivos:
 *   get:
 *     summary: Listar tipos de servicio con documentos activos
 *     tags:
 *       - Tipos de Servicio
 *     responses:
 *       200:
 *         description: Lista de tipos de servicio con documentos activos recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoServicio'
 *       404:
 *         description: No se encontraron tipos de servicio con documentos activos
 *       500:
 *         description: Error en el servidor
 */

export const tiposervicioDocs = {};
