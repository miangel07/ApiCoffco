/**
 * @swagger
 * components:
 *   schemas:
 *     Version:
 *       type: object
 *       properties:
 *         idVersion:
 *           type: integer
 *           description: "ID de la versión"
 *         version:
 *           type: string
 *           description: "Número de la versión"
 *         fk_documentos:
 *           type: integer
 *           description: "ID del documento al que pertenece la versión"
 *         nombre_documento:
 *           type: string
 *           description: "Nombre del documento relacionado con la versión"
 *         fecha_version:
 *           type: string
 *           format: date
 *           description: "Fecha en la que se registró la versión"
 *         estado:
 *           type: string
 *           description: "Estado de la versión (activo/inactivo)"
 */

/**
 * @swagger
 * /api/versiones/listar:
 *   get:
 *     summary: Listar todas las versiones
 *     tags:
 *       - Versiones
 *     responses:
 *       200:
 *         description: Lista de versiones recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Version'
 *       404:
 *         description: No se encontraron versiones en la base de datos
 *       500:
 *         description: Error en el controlador
 */

/**
 * @swagger
 * /api/versiones/registrar:
 *   post:
 *     summary: Registrar una nueva versión
 *     tags:
 *       - Versiones
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Version'
 *     responses:
 *       200:
 *         description: Versión registrada exitosamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se registró ninguna versión
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/versiones/listarid/{id_formato}:
 *   get:
 *     summary: Buscar versión por ID
 *     tags:
 *       - Versiones
 *     parameters:
 *       - in: path
 *         name: id_formato
 *         required: true
 *         description: ID de la versión a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Versión encontrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Version'
 *       404:
 *         description: Versión no encontrada
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/versiones/actualizarVersion/{id_formato}:
 *   put:
 *     summary: Actualizar una versión existente
 *     tags:
 *       - Versiones
 *     parameters:
 *       - in: path
 *         name: id_formato
 *         required: true
 *         description: ID de la versión a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Version'
 *     responses:
 *       200:
 *         description: Versión actualizada correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se pudo actualizar la versión, verifique el ID
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/versiones/eliminar/{id_formato}:
 *   delete:
 *     summary: Eliminar una versión
 *     tags:
 *       - Versiones
 *     parameters:
 *       - in: path
 *         name: id_formato
 *         required: true
 *         description: ID de la versión a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Versión eliminada correctamente
 *       404:
 *         description: No se eliminó la versión
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/versiones/actualizarEstado/{id_formato}:
 *   put:
 *     summary: Actualizar el estado de una versión
 *     tags:
 *       - Versiones
 *     parameters:
 *       - in: path
 *         name: id_formato
 *         required: true
 *         description: ID de la versión cuyo estado se va a actualizar
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
 *                 description: "Nuevo estado de la versión (activo/inactivo)"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Versión no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/versiones/actualizar/{id_formato}:
 *   put:
 *     summary: Actualizar los detalles de una versión existente
 *     tags:
 *       - Versiones
 *     parameters:
 *       - in: path
 *         name: id_formato
 *         required: true
 *         description: ID de la versión a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Version'
 *     responses:
 *       200:
 *         description: Detalles de la versión actualizados correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se pudo actualizar la versión, verifique el ID
 *       500:
 *         description: Error en el servidor
 */

export const versionesDocs = {};
