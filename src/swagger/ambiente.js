/**
 * @swagger
 * components:
 *   schemas:
 *     Ambiente:
 *       type: object
 *       properties:
 *         idAmbiente:
 *           type: integer
 *           description: "El ID del ambiente"
 *         nombre_ambiente:
 *           type: string
 *           description: "El nombre del ambiente"
 *         estado:
 *           type: string
 *           description: "El estado actual del ambiente (ej: activo, inactivo)"
 */

/**
 * @swagger
 * /api/ambiente/listar:
 *   get:
 *     summary: Obtiene la lista de todos los ambientes
 *     tags:
 *       - Ambiente
 *     responses:
 *       200:
 *         description: Lista de ambientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ambiente'
 *       404:
 *         description: No hay ambientes registrados
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/ambiente/listarid/{id}:
 *   get:
 *     summary: Obtiene un ambiente por su ID
 *     tags:
 *       - Ambiente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del ambiente"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ambiente obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ambiente'
 *       404:
 *         description: Ambiente no encontrado
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/ambiente/registrar:
 *   post:
 *     summary: Crea un nuevo ambiente
 *     tags:
 *       - Ambiente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ambiente'
 *     responses:
 *       201:
 *         description: Ambiente creado con éxito
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/ambiente/actualizar/{id}:
 *   put:
 *     summary: Actualiza un ambiente por su ID
 *     tags:
 *       - Ambiente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del ambiente a actualizar"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ambiente'
 *     responses:
 *       200:
 *         description: Ambiente actualizado con éxito
 *       404:
 *         description: Ambiente no encontrado
 *       400:
 *         description: Error en los datos enviados
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/ambiente/eliminar/{id}:
 *   delete:
 *     summary: Elimina un ambiente por su ID
 *     tags:
 *       - Ambiente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del ambiente a eliminar"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ambiente eliminado con éxito
 *       404:
 *         description: Ambiente no encontrado
 *       500:
 *         description: Error en la conexión
 */

export const ambienteDocs = {};
