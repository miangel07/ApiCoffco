/**
 * @swagger
 * components:
 *   schemas:
 *     TipoDocumento:
 *       type: object
 *       properties:
 *         idTipoDocumento:
 *           type: integer
 *           description: "ID del tipo de documento"
 *         nombreDocumento:
 *           type: string
 *           description: "Nombre del tipo de documento"
 *         estado:
 *           type: string
 *           description: "Estado del tipo de documento (activo/inactivo)"
 */

/**
 * @swagger
 * /api/tipodocumento/listar:
 *   get:
 *     summary: Listar todos los tipos de documento
 *     tags:
 *       - Tipos de Documento
 *     responses:
 *       200:
 *         description: Lista de tipos de documento recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TipoDocumento'
 *       404:
 *         description: No se pudo listar correctamente
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/tipodocumento/registrar:
 *   post:
 *     summary: Registrar un nuevo tipo de documento
 *     tags:
 *       - Tipos de Documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoDocumento'
 *     responses:
 *       200:
 *         description: Tipo de documento registrado correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se pudo registrar el tipo de documento
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/tipodocumento/actualizar/{id}:
 *   put:
 *     summary: Actualizar un tipo de documento existente
 *     tags:
 *       - Tipos de Documento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TipoDocumento'
 *     responses:
 *       200:
 *         description: Tipo de documento actualizado correctamente
 *       404:
 *         description: No se pudo actualizar el tipo de documento
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/tipodocumento/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un tipo de documento
 *     tags:
 *       - Tipos de Documento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de documento eliminado correctamente
 *       404:
 *         description: Tipo de documento no eliminado correctamente
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/tipodocumento/listarid/{id}:
 *   get:
 *     summary: Buscar tipo de documento por ID
 *     tags:
 *       - Tipos de Documento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Tipo de documento encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TipoDocumento'
 *       404:
 *         description: Tipo de documento no encontrado
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/tipodocumento/estado/{id}:
 *   put:
 *     summary: Actualizar el estado de un tipo de documento
 *     tags:
 *       - Tipos de Documento
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo de documento a actualizar
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
 *                 description: "Nuevo estado del tipo de documento"
 *     responses:
 *       200:
 *         description: Estado del tipo de documento actualizado correctamente
 *       400:
 *         description: Estado no válido
 *       404:
 *         description: Tipo de documento no encontrado o no se actualizó
 *       500:
 *         description: Error en la conexión
 */

export const tipoDocumentoDocs = {};
