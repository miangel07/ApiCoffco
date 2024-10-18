/**
 * @swagger
 * components:
 *   schemas:
 *     Municipio:
 *       type: object
 *       properties:
 *         id_municipio:
 *           type: integer
 *           description: "ID del municipio"
 *         nombre_municipio:
 *           type: string
 *           description: "Nombre del municipio"
 */

/**
 * @swagger
 * /api/municipio/listar:
 *   get:
 *     summary: Listar todos los municipios
 *     tags:
 *       - Municipios
 *     responses:
 *       200:
 *         description: Municipios listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Municipio'
 *       404:
 *         description: No se pudo listar correctamente
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/municipio/registrar:
 *   post:
 *     summary: Registrar un nuevo municipio
 *     tags:
 *       - Municipios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_municipio:
 *                 type: string
 *                 description: "Nombre del municipio"
 *     responses:
 *       200:
 *         description: El dato se registró correctamente
 *       400:
 *         description: Errores de validación
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/municipio/actualizar/{id}:
 *   put:
 *     summary: Actualizar un municipio existente
 *     tags:
 *       - Municipios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del municipio a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_municipio:
 *                 type: string
 *                 description: "Nuevo nombre del municipio"
 *     responses:
 *       200:
 *         description: Se actualizó con éxito el municipio
 *       404:
 *         description: No se actualizó el municipio
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/municipio/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un municipio
 *     tags:
 *       - Municipios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del municipio a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Municipio eliminado correctamente
 *       404:
 *         description: Municipio no eliminado correctamente
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/municipio/listarid/{id}:
 *   get:
 *     summary: Buscar un municipio por ID
 *     tags:
 *       - Municipios
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del municipio a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Municipio encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Municipio'
 *       404:
 *         description: Municipio no encontrado
 *       500:
 *         description: Error en la conexión en la base de datos
 */

export const municipioDocs = {};
