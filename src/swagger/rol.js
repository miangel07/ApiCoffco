/**
 * @swagger
 * components:
 *   schemas:
 *     Rol:
 *       type: object
 *       properties:
 *         idRol:
 *           type: integer
 *           description: "ID del rol"
 *         rol:
 *           type: string
 *           description: "Nombre del rol"
 */

/**
 * @swagger
 * /api/roles/listar:
 *   get:
 *     summary: Listar todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Rol'
 *       401:
 *         description: No se listaron roles correctamente
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/roles/registrar:
 *   post:
 *     summary: Registrar un nuevo rol
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol registrado correctamente
 *       401:
 *         description: No se pudo registrar el rol
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/roles/actualizar/{idRol}:
 *   put:
 *     summary: Actualizar un rol existente
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: idRol
 *         required: true
 *         description: ID del rol a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Rol'
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       401:
 *         description: No se pudo actualizar el rol
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/roles/eliminar/{idRol}:
 *   delete:
 *     summary: Eliminar un rol
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: idRol
 *         required: true
 *         description: ID del rol a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       401:
 *         description: No se pudo eliminar el rol
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/roles/listarid/{idRol}:
 *   get:
 *     summary: Buscar rol por ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - in: path
 *         name: idRol
 *         required: true
 *         description: ID del rol a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Rol'
 *       401:
 *         description: No se pudo encontrar el rol
 *       500:
 *         description: Error en la conexión
 */

export const rolDocs = {};
