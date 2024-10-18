/**
 * @swagger
 * components:
 *   schemas:
 *     Finca:
 *       type: object
 *       properties:
 *         id_finca:
 *           type: integer
 *           description: "ID de la finca"
 *         nombre_finca:
 *           type: string
 *           description: "Nombre de la finca"
 *         vereda:
 *           type: string
 *           description: "Vereda donde se encuentra la finca"
 *         fk_id_municipio:
 *           type: integer
 *           description: "ID del municipio relacionado con la finca"
 */

/**
 * @swagger
 * /api/finca/listar:
 *   get:
 *     summary: Lista todas las fincas
 *     tags:
 *       - Fincas
 *     responses:
 *       200:
 *         description: Fincas listadas con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Finca'
 *       404:
 *         description: No se encontraron fincas en la base de datos
 *       500:
 *         description: Error en el controlador
 */

/**
 * @swagger
 * /api/finca/registrar:
 *   post:
 *     summary: Registra una nueva finca
 *     tags:
 *       - Fincas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_finca:
 *                 type: string
 *                 description: "Nombre de la finca"
 *               vereda:
 *                 type: string
 *                 description: "Vereda donde se encuentra la finca"
 *               fk_id_municipio:
 *                 type: integer
 *                 description: "ID del municipio relacionado con la finca"
 *     responses:
 *       200:
 *         description: Finca registrada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Mensaje de éxito"
 *       400:
 *         description: El nombre de la finca ya existe o error en los datos enviados
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/finca/eliminar/{id_finca}:
 *   delete:
 *     summary: Elimina una finca por su ID
 *     tags:
 *       - Fincas
 *     parameters:
 *       - name: id_finca
 *         in: path
 *         required: true
 *         description: ID de la finca a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Finca eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Mensaje de éxito"
 *       404:
 *         description: No se encontró la finca
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/finca/actualizar/{id_finca}:
 *   put:
 *     summary: Actualiza una finca por su ID
 *     tags:
 *       - Fincas
 *     parameters:
 *       - name: id_finca
 *         in: path
 *         required: true
 *         description: ID de la finca a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_finca:
 *                 type: string
 *                 description: "Nuevo nombre de la finca"
 *               vereda:
 *                 type: string
 *                 description: "Nueva vereda donde se encuentra la finca"
 *               fk_id_municipio:
 *                 type: integer
 *                 description: "Nuevo ID del municipio relacionado con la finca"
 *     responses:
 *       200:
 *         description: Finca actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: "Mensaje de éxito"
 *       400:
 *         description: El nombre de la finca ya existe o error en los datos enviados
 *       404:
 *         description: No se encontró la finca
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/finca/listarid/{id_finca}:
 *   get:
 *     summary: Obtiene una finca por su ID
 *     tags:
 *       - Fincas
 *     parameters:
 *       - name: id_finca
 *         in: path
 *         required: true
 *         description: ID de la finca a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Finca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Finca'
 *       404:
 *         description: No se encontró la finca
 *       500:
 *         description: Error en el servidor
 */

export const fincasDocs = {};
