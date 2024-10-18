/**
 * @swagger
 * components:
 *   schemas:
 *     Variable:
 *       type: object
 *       properties:
 *         idVariable:
 *           type: integer
 *           description: "ID de la variable"
 *         nombre:
 *           type: string
 *           description: "Nombre de la variable"
 *         tipo_dato:
 *           type: string
 *           description: "Tipo de dato de la variable"
 *         UnidadMedida:
 *           type: string
 *           description: "Unidad de medida de la variable"
 *         estado:
 *           type: string
 *           description: "Estado de la variable (activo/inactivo)"
 */

/**
 * @swagger
 * /api/variables/listar:
 *   get:
 *     summary: Listar todas las variables
 *     tags:
 *       - Variables
 *     responses:
 *       200:
 *         description: Lista de variables recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variable'
 *       404:
 *         description: No hay variables registradas
 *       500:
 *         description: Error en la conexión
 */

/**
 * @swagger
 * /api/variables/registrar:
 *   post:
 *     summary: Registrar una nueva variable
 *     tags:
 *       - Variables
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variable'
 *     responses:
 *       200:
 *         description: Variable registrada exitosamente
 *       400:
 *         description: Datos de entrada inválidos o variable ya existente
 *       500:
 *         description: Error al registrar la variable
 */

/**
 * @swagger
 * /api/variables/listarid/{id}:
 *   get:
 *     summary: Buscar variable por ID
 *     tags:
 *       - Variables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la variable a buscar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Variable encontrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Variable'
 *       404:
 *         description: Variable no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/variables/actualizar/{id}:
 *   put:
 *     summary: Actualizar una variable existente
 *     tags:
 *       - Variables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la variable a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Variable'
 *     responses:
 *       200:
 *         description: Variable actualizada correctamente
 *       400:
 *         description: Datos de entrada inválidos o variable ya existente
 *       404:
 *         description: No se pudo actualizar la variable, verifique el ID
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/variables/eliminar/{id}:
 *   delete:
 *     summary: Eliminar una variable
 *     tags:
 *       - Variables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la variable a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Variable eliminada correctamente
 *       404:
 *         description: Variable no eliminada correctamente
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/variables/estado/{id}:
 *   put:
 *     summary: Actualizar el estado de una variable
 *     tags:
 *       - Variables
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la variable cuyo estado se va a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 description: "Nuevo estado de la variable (activo/inactivo)"
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       404:
 *         description: Variable no encontrada
 *       500:
 *         description: Error en el servidor
 */

/**
 * @swagger
 * /api/variables/listaActivas:
 *   get:
 *     summary: Listar todas las variables activas
 *     tags:
 *       - Variables
 *     responses:
 *       200:
 *         description: Lista de variables activas recuperada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Variable'
 *       404:
 *         description: No hay variables activas
 *       500:
 *         description: Error en la conexión
 */

export const variablesDocs = {};
