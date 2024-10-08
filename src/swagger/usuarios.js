/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: "El nombre del usuario"
 *         apellidos:
 *           type: string
 *           description: "Los apellidos del usuario"
 *         correo_electronico:
 *           type: string
 *           description: "El correo electrónico del usuario"
 *         telefono:
 *           type: string
 *           description: "El número de teléfono del usuario"
 *         password:
 *           type: string
 *           description: "La contraseña del usuario"
 *         numero_documento:
 *           type: integer
 *           description: "El número de documento del usuario"
 *         tipo_documento:
 *           type: string
 *           description: "El tipo de documento del usuario (ej: cc)"
 *         estado:
 *           type: string
 *           description: "El estado actual del usuario (ej: activo)"
 *         rol:
 *           type: integer
 *           description: "El rol del usuario (ej: 1 para administrador)"
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene la lista de todos los usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del usuario"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       201:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del usuario"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del usuario"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */

export const usuariosDocs = {};
