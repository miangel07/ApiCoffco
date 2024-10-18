/**
 * @swagger
 * components:
 *   schemas:
 *     Documento:
 *       type: object
 *       properties:
 *         id_documentos:
 *           type: integer
 *           description: ID del documento
 *         nombre:
 *           type: string
 *           description: Nombre del documento
 *         fecha_carga:
 *           type: string
 *           format: date
 *           description: Fecha de carga del documento
 *         descripcion:
 *           type: string
 *           description: Descripción del documento
 *         codigo_documentos:
 *           type: string
 *           description: Código del documento
 *         fecha_emision:
 *           type: string
 *           format: date
 *           description: Fecha de emisión del documento
 *         fk_idTipoServicio:
 *           type: integer
 *           description: ID del tipo de servicio asociado
 *         fk_idTipoDocumento:
 *           type: integer
 *           description: ID del tipo de documento
 *     DocumentoVersion:
 *       type: object
 *       properties:
 *         idVersion:
 *           type: integer
 *           description: ID de la versión del documento
 *         version:
 *           type: string
 *           description: Número de la versión
 *         nombre_documento:
 *           type: string
 *           description: Nombre del archivo de la versión
 *         fecha_version:
 *           type: string
 *           format: date
 *           description: Fecha de la versión
 * 
 * /documentos/listar:
 *   get:
 *     summary: Listar todos los documentos
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Documento'
 *       500:
 *         description: Error interno del servidor
 *
 * /documentos/registrar:
 *   post:
 *     summary: Registrar un nuevo documento
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               codigo:
 *                 type: string
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               servicios:
 *                 type: integer
 *               tipo_documento:
 *                 type: integer
 *               variables:
 *                 type: string
 *                 description: JSON string con IDs de variables
 *               logos:
 *                 type: string
 *                 description: JSON string con IDs de logos
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Documento registrado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error interno del servidor
 *
 * /documentos/eliminar/{id_documentos}:
 *   delete:
 *     summary: Eliminar un documento por ID
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_documentos
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Documento eliminado exitosamente
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error interno del servidor
 * 
 * /documentos/actualizarversion:
 *   post:
 *     summary: Actualizar la versión de un documento
 *     tags: [Documentos]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               idVersion:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               codigo:
 *                 type: string
 *               fecha_emision:
 *                 type: string
 *                 format: date
 *               servicios:
 *                 type: integer
 *               tipo_documento:
 *                 type: integer
 *               variables:
 *                 type: string
 *               logos:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Versión actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error interno del servidor
 * 
 * /documentos/actualizar/{id_documentos}:
 *   put:
 *     summary: Actualizar un documento existente
 *     tags: [Documentos]
 *     parameters:
 *       - name: id_documentos
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               codigo:
 *                 type: string
 *               fecha_emision:
 *                 type: string
 *               servicios:
 *                 type: integer
 *               tipo_documento:
 *                 type: integer
 *               nombre_documento_version:
 *                 type: string
 *               idVersion:
 *                 type: integer
 *               logos:
 *                 type: string
 *               version:
 *                 type: string
 *               variables:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Documento actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error interno del servidor
 *
 * /documentos/buscar/{id}:
 *   get:
 *     summary: Buscar un documento por ID
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Documento encontrado
 *       404:
 *         description: Documento no encontrado
 *       500:
 *         description: Error interno del servidor
 *
 * /documentos/grafica:
 *   get:
 *     summary: Obtener datos de la gráfica de documentos por tipo
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos de la gráfica
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       value:
 *                         type: integer
 *       500:
 *         description: Error interno del servidor
 */

export const documentosDocs = {};
