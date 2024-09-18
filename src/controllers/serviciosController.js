import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const getVariables = async (req, res) => {
  try {
    const { idTipoServicio } = req.body;
    console.log("idTipoServicio en el body: ", idTipoServicio);

    // Consulta combinada para obtener el documento y sus variables
    const sql = `
      SELECT doc.id_documentos, doc.nombre AS documento_nombre, v.idVariable, v.nombre AS variable_nombre, v.tipo_dato AS variable_tipo_dato
      FROM documentos doc
      JOIN versiones ver ON doc.id_documentos = ver.fk_documentos
      JOIN tiposervicio ts ON doc.fk_idTipoServicio = ts.idTipoServicio
      JOIN detalle det ON ver.idVersion = det.fk_id_version
      JOIN variables v ON det.fk_idVariable = v.idVariable
      WHERE ts.idTipoServicio = ?
      AND doc.entrada_salida = 'entrada'
      AND ver.estado = 'activo';
    `;

    // Ejecuta la consulta
    const [respuesta] = await conexion.query(sql, [idTipoServicio]);
    console.log(respuesta);

    if (respuesta.length > 0) {
      // Si hay resultados, los envía en la respuesta
      return res.status(200).json(respuesta);
    } else {
      // Si no hay resultados, envía un error 404
      return res
        .status(404)
        .json({
          message: "No se encontró resultado de Documentos o Variables",
        });
    }
  } catch (error) {
    // Manejo de errores
    return res
      .status(500)
      .json({ message: "Error en el servidor: " + error.message });
  }
};

export const registrarServicio = async (req, res) => {
  try {
    const {
      nombre,
      fk_idTipoServicio,
      fecha,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idPrecio,
      fk_idUsuarios,
      valoresVariables,
    } = req.body;

    console.log("Datos recibidos en el controlador:", {
      nombre,
      fk_idTipoServicio,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idPrecio,
      fk_idUsuarios,
      valoresVariables,
    });

    // Verificación de campos obligatorios
    if (
      !nombre ||
      !fk_idTipoServicio ||
      !fk_idAmbiente ||
      !fk_idMuestra ||
      !fk_idPrecio ||
      !fk_idUsuarios
    ) {
      console.log("Campos obligatorios faltantes");
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // registro del servicio
    const [resultServicio] = await conexion.query(
      `
      INSERT INTO servicios (
        nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios) VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        nombre,
        fk_idTipoServicio,
        fecha || new Date(),
        fk_idAmbiente,
        fk_idMuestra,
        fk_idPrecio,
        fk_idUsuarios,
      ]
    );

    console.log("Resultado de la inserción del servicio:", resultServicio);

    const idServicio = resultServicio.insertId;
    console.log("ID del servicio recién insertado:", idServicio);

    // Inserción de los valores de las variables
    for (const [idVariable, valor] of Object.entries(valoresVariables)) {
      console.log("Buscando detalle para la variable ID:", idVariable);

      // Buscar el detalle correspondiente para cada variable
      const [resultDetalle] = await conexion.query(
        `
        SELECT id_detalle FROM detalle WHERE fk_idVariable = ?
      `,
        [idVariable]
      );

      console.log("Resultado de la búsqueda de detalle:", resultDetalle);

      if (resultDetalle.length === 0) {
        console.log(
          "No se encontró el detalle para la variable con ID:",
          idVariable
        );
        return res
          .status(400)
          .json({
            message: `No se encontró el detalle para la variable con ID ${idVariable}`,
          });
      }

      const idDetalle = resultDetalle[0].id_detalle;
      console.log("ID del detalle correspondiente:", idDetalle);

      await conexion.query(
        `
        INSERT INTO valor (fk_id_servicio, fk_id_detalle, valor)
        VALUES (?, ?, ?)
      `,
        [idServicio, idDetalle, valor]
      );

      console.log('Valor insertado en la tabla "valor":', {
        fk_id_servicio: idServicio,
        fk_id_detalle: idDetalle,
        valor,
      });
    }

    res.status(201).json({ message: "Servicio registrado exitosamente" });
  } catch (error) {
    console.error("Error al registrar el servicio:", error);
    res.status(500).json({ error: "Error al registrar el servicio" });
  }
};

export const listarServicios = async (req, res) => {
  try {
    let sql = `SELECT 
    s.id_servicios,
    s.nombre,
    ts.nombreServicio AS tipo_servicio,
    DATE_FORMAT(s.fecha, '%Y-%m-%d') AS fecha,
    a.nombre_ambiente,
    m.codigo_muestra,
    p.precio,
    CONCAT(u.nombre, ' ', u.apellidos) AS nombre_completo_usuario,
    r.rol AS rol_usuario,
    s.estado
FROM 
    servicios s
JOIN 
    tiposervicio ts ON s.fk_idTipoServicio = ts.idTipoServicio
JOIN 
    ambiente a ON s.fk_idAmbiente = a.idAmbiente
JOIN 
    muestra m ON s.fk_idMuestra = m.id_muestra
JOIN 
    precio p ON s.fk_idPrecio = p.idPrecio
JOIN 
    usuarios u ON s.fk_idUsuarios = u.id_usuario
JOIN 
    rol r ON u.fk_idRol = r.idRol`;
    const [resultado] = await conexion.query(sql);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "Datos no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.message });
  }
};

export const listarServiciosId = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `SELECT * FROM servicios WHERE id_servicios = ?`;
    const [respuesta] = await conexion.query(sql, [id]);
    if (respuesta.length === 1) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "El dato no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.message });
  }
};

export const actualizarServicios = async (req, res) => {
  /* 	id_servicios	nombre	fk_idTipoServicio	fecha	fk_idAmbiente	fk_idMuestra	fk_idPrecio	fk_idUsuarios	estado	 */
  try {
    let {
      nombre,
      fk_idTipoServicio,
      fecha,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idPrecio,
      fk_idUsuarios,
      estado,
    } = req.body;
    let id = req.params.id;
    let sql = `UPDATE servicios SET  nombre=?, fk_idTipoServicio=?, fecha=?, fk_idAmbiente=?, fk_idMuestra=?, fk_idPrecio=?, fk_idUsuarios=?, estado=? 
        WHERE id_servicios=?`;
    const [respuesta] = await conexion.query(sql, [
      nombre,
      fk_idTipoServicio,
      fecha,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idPrecio,
      fk_idUsuarios,
      estado,
      id,
    ]);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Datos actualizados con éxito" });
    } else {
      res.status(404).json({ message: "Datos no actualizados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.message });
  }
};

export const eliminarServicios = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `DELETE FROM servicios WHERE id_servicios = ?`;
    const [respuesta] = await conexion.query(sql, [id]);
    if (respuesta.affectedRows === 1) {
      res.status(200).json({ message: "Datos eliminados con éxito" });
    } else {
      res.status(404).json({ message: "Error al eliminar datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.message });
  }
};

export const actualizarEstadoServicio = async (req, res) => {
  try {
    let { estado } = req.body;

    let id_servicios = req.params.id;

    let sql = `update servicios set estado=? where id_servicios=?`;
    const [respuesta] = await conexion.query(sql, [estado, id_servicios]);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Estado Actualizado correctamente" });
    } else {
      res.status(404).json({ message: "Estado no actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en la conexion" + error.message });
  }
};

export const procesarServicioCompleto = async (req, res) => {
  const { idTipoServicio, idUsuario, idAmbiente, idMuestra, valoresVariables } =
    req.body;

  try {
    // Paso 1: Obtener el documento según el tipo de servicio
    let sqlDocumento = `
      SELECT doc.id_documentos, doc.nombre 
      FROM documentos doc
      JOIN versiones ver ON doc.id_documentos = ver.fk_documentos
      JOIN tiposervicio ts ON doc.fk_idTipoServicio = ts.idTipoServicio
      WHERE ts.idTipoServicio = ?
      AND ver.estado = 'activo';
    `;

    const [documentoRespuesta] = await conexion.query(sqlDocumento, [
      idTipoServicio,
    ]);

    if (documentoRespuesta.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No se encontró el documento para el tipo de servicio proporcionado.",
        });
    }

    const id_documentos = documentoRespuesta[0].id_documentos;

    // Paso 2: Obtener las variables asociadas al documento seleccionado
    let sqlVariables = `
      SELECT v.idVariable, v.nombre AS variable_nombre, v.tipo_dato AS variable_tipo_dato
      FROM versiones ver
      JOIN documentos doc ON ver.fk_documentos = doc.id_documentos
      JOIN detalle det ON ver.idVersion = det.fk_id_version
      JOIN variables v ON det.fk_idVariable = v.idVariable
      WHERE doc.id_documentos = ?
      AND ver.estado = 'activo';
    `;

    const [variablesRespuesta] = await conexion.query(sqlVariables, [
      id_documentos,
    ]);

    if (variablesRespuesta.length === 0) {
      return res
        .status(404)
        .json({
          message: "No se encontraron variables asociadas al documento.",
        });
    }

    // Paso 3: Registrar el servicio
    let sqlServicio = `
      INSERT INTO servicios (fk_idTipoServicio, fk_idUsuarios, fk_idAmbiente, fk_idMuestra, estado)
      VALUES (?, ?, ?, ?, 'activo');
    `;

    const [resultadoServicio] = await conexion.query(sqlServicio, [
      idTipoServicio,
      idUsuario,
      idAmbiente,
      idMuestra,
    ]);
    const idServicio = resultadoServicio.insertId;

    // Paso 4: Registrar los valores de las variables en la tabla "valor"
    for (const variable of variablesRespuesta) {
      const valorVariable = valoresVariables[variable.idVariable] || null;

      let sqlInsertValor = `
        INSERT INTO valor (fk_idVariable, fk_id_servicio, valor)
        VALUES (?, ?, ?);
      `;

      await conexion.query(sqlInsertValor, [
        variable.idVariable,
        idServicio,
        valorVariable,
      ]);
    }

    return res.status(201).json({
      message: "Servicio registrado exitosamente",
      servicioId: idServicio,
    });
  } catch (error) {
    console.error("Error en el proceso de registro:", error);
    return res
      .status(500)
      .json({ error: "Error en el servidor: " + error.message });
  }
};
