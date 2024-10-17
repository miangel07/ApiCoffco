/**
 * @swagger
 * components:
 *   schemas:
 *     Muestra:
 *       type: object
 *       properties:
 *         cantidadEntrada:
 *           type: number
 *           format: float
 *           description: "La cantidad de entrada de la muestra"
 *         fk_id_finca:
 *           type: integer
 *           description: "El ID de la finca asociada"
 *         fecha_muestra:
 *           type: string
 *           format: date
 *           description: "La fecha en la que se tomó la muestra"
 *         fk_id_usuarios:
 *           type: integer
 *           description: "El ID del usuario que registró la muestra"
 *         estado:
 *           type: string
 *           description: "El estado actual de la muestra (ej: pendiente)"
 *         altura:
 *           type: number
 *           format: float
 *           description: "La altura donde se tomó la muestra"
 *         variedad:
 *           type: string
 *           description: "La variedad de café de la muestra"
 *         observaciones:
 *           type: string
 *           description: "Observaciones adicionales sobre la muestra"
 *         codigoExterno:
 *           type: string
 *           description: "Código externo de la muestra"
 *         fk_idTipoServicio:
 *           type: integer
 *           description: "El ID del tipo de servicio asociado"
 *         UnidadMedida:
 *           type: string
 *           description: "Unidad de medida de la muestra (ej: kg)"
 */

/**
 * @swagger
 * /api/muestras/listar:
 *   get:
 *     summary: Obtiene la lista de todas las muestras
 *     tags:
 *       - Muestras
 *     responses:
 *       200:
 *         description: Lista de muestras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Muestra'
 */

/**
 * @swagger
 * /api/muestras/listarid/{id}:
 *   get:
 *     summary: Obtiene una muestra por su ID
 *     tags:
 *       - Muestras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID de la muestra"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muestra obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Muestra'
 *       404:
 *         description: Muestra no encontrada
 */

/**
 * @swagger
 * /api/muestras/registrar:
 *   post:
 *     summary: Crea una nueva muestra
 *     tags:
 *       - Muestras
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Muestra'
 *     responses:
 *       201:
 *         description: Muestra creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Muestra'
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/muestras/actualizar/{id}:
 *   put:
 *     summary: Actualiza una muestra por su ID
 *     tags:
 *       - Muestras
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: "El ID de la muestra a actualizar"
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Muestra'
 *     responses:
 *       200:
 *         description: Muestra actualizada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Muestra'
 *       404:
 *         description: Muestra no encontrada
 *       400:
 *         description: Error en los datos enviados
 */

/**
 * @swagger
 * /api/muestras/eliminar/{id_muestra}:
 *   delete:
 *     summary: Elimina una muestra por su ID
 *     tags:
 *       - Muestras
 *     parameters:
 *       - in: path
 *         name: id_muestra
 *         required: true
 *         description: "El ID de la muestra a eliminar"
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Muestra eliminada con éxito
 *       404:
 *         description: Muestra no encontrada
 */

export const muestrasDocs = {};
