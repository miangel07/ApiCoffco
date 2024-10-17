/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioLogin:
 *       type: object
 *       properties:
 *         numero_documento:
 *           type: string
 *           description: "El número de documento del usuario"
 *         password:
 *           type: string
 *           description: "La contraseña del usuario"
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Inicia sesión un usuario y devuelve un token de autenticación
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioLogin'
 *     responses:
 *       200:
 *         description: Usuario autenticado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Usuario_Logeado:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: "ID del usuario logeado"
 *                     nombre:
 *                       type: string
 *                       description: "Nombre del usuario"
 *                     apellido:
 *                       type: string
 *                       description: "Apellido del usuario"
 *                     rol:
 *                       type: string
 *                       description: "Rol del usuario"
 *                     estado:
 *                       type: string
 *                       description: "Estado del usuario"
 *                     correo:
 *                       type: string
 *                       description: "Correo electrónico del usuario"
 *                     telefono:
 *                       type: string
 *                       description: "Teléfono del usuario"
 *                     documento:
 *                       type: string
 *                       description: "Número de documento del usuario"
 *                     tipo_documento:
 *                       type: string
 *                       description: "Tipo de documento del usuario"
 *                 token:
 *                   type: string
 *                   description: "Token de autenticación"
 *                 message:
 *                   type: string
 *                   description: "Mensaje de autenticación exitosa"
 *       400:
 *         description: Error en los datos enviados
 *       401:
 *         description: Contraseña incorrecta o token inválido
 *       403:
 *         description: Acceso denegado, usuario inactivo
 *       404:
 *         description: Contraseña o número de identificación incorrectos
 *       500:
 *         description: Error en el servidor
 */

export const authDocs = {};
