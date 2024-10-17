/**
 * @swagger
 * components:
 *   schemas:
 *     Alquiler:
 *       type: object
 *       properties:
 *         id_alquiler:
 *           type: integer
 *           description: "El ID del alquiler"
 *         fk_id_usuario:
 *           type: integer
 *           description: "El ID del usuario que realiza el alquiler"
 *         fk_id_producto:
 *           type: integer
 *           description: "El ID del producto alquilado"
 *         fecha_alquiler:
 *           type: string
 *           format: date
 *           description: "La fecha en la que se realizó el alquiler"
 *         fecha_devolucion:
 *           type: string
 *           format: date
 *           description: "La fecha en la que se debe devolver el producto"
 *         estado:
 *           type: string
 *           description: "El estado actual del alquiler (ej: activo, finalizado)"
 *         cantidad:
 *           type: integer
 *           description: "Cantidad de productos alquilados"
 */

/**
 * @swagger
 * /api/alquiler/listar:
 *   get:
 *     summary: Obtiene la lista de todos los alquileres
 *     tags:
 *       - Alquiler
 *     responses:
 *       200:
 *         description: Lista de alquileres obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Alquiler'
 */

/**
 * @swagger
 * /api/alquiler/listarid/{id}:
 *   get:
 *     summary: Obtiene un alquiler por su ID
 *     tags:
 *       - Alquiler
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del alquiler"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alquiler obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alquiler'
 *       404:
 *         description: Alquiler no encontrado
 */

/**
 * @swagger
 * /api/alquiler/registrar:
 *   post:
 *     summary: Crea un nuevo alquiler
 *     tags:
 *       - Alquiler
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alquiler'
 *     responses:
 *       201:
 *         description: Alquiler creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alquiler'
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/alquiler/actualizar/{id}:
 *   put:
 *     summary: Actualiza un alquiler por su ID
 *     tags:
 *       - Alquiler
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID del alquiler a actualizar"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Alquiler'
 *     responses:
 *       200:
 *         description: Alquiler actualizado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alquiler'
 *       404:
 *         description: Alquiler no encontrado
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/alquiler/eliminar/{id_alquiler}:
 *   delete:
 *     summary: Elimina un alquiler por su ID
 *     tags:
 *       - Alquiler
 *     parameters:
 *       - in: path
 *         name: id_alquiler
 *         required: true
 *         description: "El ID del alquiler a eliminar"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Alquiler eliminado con éxito
 *       404:
 *         description: Alquiler no encontrado
 */

export const alquilerDocs = {};
