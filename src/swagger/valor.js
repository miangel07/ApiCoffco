/**
 * @swagger
 * components:
 *   schemas:
 *     Valor:
 *       type: object
 *       properties:
 *         idValor:
 *           type: integer
 *           description: "ID del valor"
 *         valor:
 *           type: string
 *           description: "Valor asociado"
 *         fk_idServicios:
 *           type: integer
 *           description: "ID del servicio relacionado"
 *         fk_idVariable:
 *           type: integer
 *           description: "ID de la variable relacionada"
 *         fk_id_version:
 *           type: integer
 *           description: "ID de la versión relacionada"
 */

/**
 * @swagger
 * /api/valor/listar:
 *   get:
 *     summary: Listar todos los valores
 *     tags:
 *       - Valores
 *     responses:
 *       200:
 *         description: Lista de valores recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Valor'
 *       404:
 *         description: No hay datos registrados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/valor/listarid/{id}:
 *   get:
 *     summary: Buscar valor por ID
 *     tags:
 *       - Valores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del valor a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Valor encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Valor'
 *       404:
 *         description: El dato no existe
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/valor/registrar:
 *   post:
 *     summary: Registrar un nuevo valor
 *     tags:
 *       - Valores
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Valor'
 *     responses:
 *       200:
 *         description: Valor registrado correctamente
 *       400:
 *         description: Datos de entrada inválidos
 *       404:
 *         description: No se registró el valor
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/valor/actualizar/{id}:
 *   put:
 *     summary: Actualizar un valor existente
 *     tags:
 *       - Valores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del valor a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Valor'
 *     responses:
 *       200:
 *         description: Valor actualizado correctamente
 *       404:
 *         description: Datos no actualizados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/valor/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un valor
 *     tags:
 *       - Valores
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del valor a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Valor eliminado correctamente
 *       404:
 *         description: Error al eliminar datos
 *       500:
 *         description: Error en el servidor
 */

export const valorDocs = {};
