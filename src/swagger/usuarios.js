/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: "El ID del usuario"
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
 *         numero_documento:
 *           type: string
 *           description: "El número de documento del usuario"
 *         tipo_documento:
 *           type: string
 *           description: "El tipo de documento del usuario"
 *         estado:
 *           type: string
 *           description: "El estado del usuario (activo/inactivo)"
 *         fk_idRol:
 *           type: integer
 *           description: "El ID del rol del usuario"
 */

/**
 * @swagger
 * /api/usuarios/listar:
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
 *       404:
 *         description: No se encontraron usuarios
 */

/**
 * @swagger
 * /api/usuarios/listarroles:
 *   get:
 *     summary: Obtiene la lista de roles y su cantidad de usuarios
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de roles y cantidad de usuarios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 usuariosPorRol:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rol:
 *                         type: string
 *                         description: "Nombre del rol"
 *                       total_usuarios:
 *                         type: integer
 *                         description: "Total de usuarios con ese rol"
 *                 total:
 *                   type: integer
 *                   description: "Total de usuarios en la base de datos"
 */

/**
 * @swagger
 * /api/usuarios/listarid/{id}:
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
 * /api/usuarios/registrar:
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
 * /api/usuarios/actualizar/{id}:
 *   put:
 *     summary: Actualiza un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del usuario a actualizar"
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
 * /api/usuarios/eliminar/{id_usuario}:
 *   delete:
 *     summary: Elimina un usuario por su ID
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: "El ID del usuario a eliminar"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/usuarios/estado/{id_usuario}:
 *   put:
 *     summary: Cambia el estado de un usuario (activo/inactivo)
 *     tags:
 *       - Usuarios
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: "El ID del usuario cuyo estado se va a cambiar"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Estado del usuario actualizado correctamente
 *       400:
 *         description: No se puede cambiar el estado de un cliente
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/usuarios/clientes:
 *   get:
 *     summary: Obtiene la lista de todos los clientes
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nombre_cliente:
 *                     type: string
 *                     description: "Nombre completo del cliente"
 *                   numero_documento:
 *                     type: string
 *                     description: "Número de documento del cliente"
 *                   id_usuario:
 *                     type: integer
 *                     description: "ID del cliente"
 *       404:
 *         description: No se encontraron usuarios con el rol especificado
 */

/**
 * @swagger
 * /api/usuarios/consulta:
 *   get:
 *     summary: Consulta la cantidad de usuarios por rol
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Consulta realizada con éxito
 *       404:
 *         description: No se encontraron usuarios
 */

export const usuariosDocs = {};
