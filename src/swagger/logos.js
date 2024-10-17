/**
 * @swagger
 * components:
 *   schemas:
 *     Logo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: "ID del logo"
 *         ruta:
 *           type: string
 *           description: "Ruta del logo"
 *         nombre:
 *           type: string
 *           description: "Nombre del logo"
 *         estado:
 *           type: string
 *           description: "Estado del logo (activo/inactivo)"
 */

/**
 * @swagger
 * /api/logos/listar:
 *   get:
 *     summary: Listar todos los logos
 *     tags:
 *       - Logos
 *     responses:
 *       200:
 *         description: Logos listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Logo'
 *       401:
 *         description: No se listaron correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/listaActivos:
 *   get:
 *     summary: Listar logos activos
 *     tags:
 *       - Logos
 *     responses:
 *       200:
 *         description: Logos activos listados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Logo'
 *       401:
 *         description: No se listaron correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/registrar:
 *   post:
 *     summary: Registrar un nuevo logo
 *     tags:
 *       - Logos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: "Nombre del logo"
 *     responses:
 *       200:
 *         description: Logo registrado correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/actualizar/{id}:
 *   put:
 *     summary: Actualizar un logo existente
 *     tags:
 *       - Logos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del logo a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: "Nuevo nombre del logo"
 *     responses:
 *       200:
 *         description: Logo actualizado correctamente
 *       400:
 *         description: El logo no se actualizó correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/estado/{id}:
 *   put:
 *     summary: Cambiar el estado de un logo
 *     tags:
 *       - Logos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del logo a actualizar el estado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado del logo actualizado correctamente
 *       404:
 *         description: Logo no encontrado
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/eliminar/{id}:
 *   delete:
 *     summary: Eliminar un logo
 *     tags:
 *       - Logos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del logo a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Logo eliminado correctamente
 *       401:
 *         description: No se eliminó correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/logos/listarid/{id}:
 *   get:
 *     summary: Buscar un logo por ID
 *     tags:
 *       - Logos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del logo a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Logo encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Logo'
 *       401:
 *         description: No se encontró correctamente
 *       500:
 *         description: Error en el servidor
 */

export const logosDocs = {};
