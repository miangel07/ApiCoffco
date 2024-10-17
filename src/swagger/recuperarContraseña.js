/**
 * @swagger
 * components:
 *   schemas:
 *     Recuperacion:
 *       type: object
 *       properties:
 *         numero_documento:
 *           type: string
 *           description: "Número de documento del usuario"
 *         codigo:
 *           type: string
 *           description: "Código de recuperación de contraseña"
 *         id_usuario:
 *           type: integer
 *           description: "ID del usuario"
 *         password:
 *           type: string
 *           description: "Nueva contraseña del usuario"
 */

/**
 * @swagger
 * /api/recuperar/recuperar:
 *   post:
 *     summary: Recuperar contraseña
 *     tags:
 *       - Recuperación de Contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Recuperacion'
 *     responses:
 *       200:
 *         description: Código de recuperación enviado correctamente al correo electrónico
 *       404:
 *         description: Número de documento no válido o usuario no activo
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/recuperar/validar:
 *   post:
 *     summary: Validar el código de recuperación
 *     tags:
 *       - Recuperación de Contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: string
 *                 description: "Código de recuperación proporcionado"
 *               id_usuario:
 *                 type: integer
 *                 description: "ID del usuario"
 *     responses:
 *       200:
 *         description: Código de recuperación validado correctamente
 *       401:
 *         description: Código no válido o expirado
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/recuperar/cambiar:
 *   post:
 *     summary: Actualizar contraseña
 *     tags:
 *       - Recuperación de Contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_usuario:
 *                 type: integer
 *                 description: "ID del usuario"
 *               password:
 *                 type: string
 *                 description: "Nueva contraseña"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Errores de validación
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en la conexión
 */

export const recuperarContraseñaDocs = {};
