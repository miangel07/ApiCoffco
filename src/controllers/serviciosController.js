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
      AND ver.estado = 'activo'`;

    // Ejecuta la consulta
    const [respuesta] = await conexion.query(sql, [idTipoServicio]);
    console.log("respuetas de la obtencion de variables: ", respuesta);

    if (respuesta.length > 0) {
      // Si hay resultados, los envía en la respuesta
      return res.status(200).json(respuesta);
    } else {
      // Si no hay resultados, envía un error 404
      return res.status(404).json({
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

export const getVariablesUpdate = async (req, res) => {
  try {
    const { idTipoServicio } = req.body;
    console.log("idTipoServicio en el body: ", idTipoServicio);

    // Consulta SQL con la relación de detalle y variables
    const sql = `SELECT v.valor, v.fk_id_detalle, v.id_valor,var.idVariable , var.nombre AS nombre_variable, var.tipo_dato, var.UnidadMedida
                 FROM valor v
                 JOIN servicios s ON v.fk_id_servicio = s.id_servicios
                 JOIN detalle d ON v.fk_id_detalle = d.id_detalle
                 JOIN variables var ON d.fk_idVariable = var.idVariable
                 WHERE s.id_servicios = ?`;

    // Ejecuta la consulta
    const [respuesta] = await conexion.query(sql, [idTipoServicio]);
    console.log("Respuesta de la obtención de variables: ", respuesta);

    if (respuesta.length > 0) {
      return res.status(200).json(respuesta);
    } else {
      return res.status(404).json({
        message: "No se encontró resultado de Documentos o Variables",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor: " + error.message });
  }
};

export const getMuestrasParaServicios = async (req, res) => {
  try {

    let sql = `
      select id_muestra, cantidadEntrada, fk_id_finca, fecha_muestra, codigo_muestra, fk_id_usuarios,
      estado, altura, variedad, observaciones, fk_idTipoServicio
      from muestra
      where estado = 'pendiente'
      and id_muestra not in (select fk_idMuestra from servicios where fk_idMuestra is not null)
    `;
    const [respuesta] = await conexion.query(sql);

    if (respuesta.length > 0) {
      return res.status(200).json(respuesta);
    } else {
      return res.status(404).json({
        message: 'No se encontraron muestras disponibles'
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error en el servidor: ' + error.message });
  }
};


export const getPreciosSegunTipoServicio = async (req, res) => {
  try {
    const { idTipoServicio } = req.body;
    console.log("idTipoServicio en el body: ", idTipoServicio);

    // Consulta SQL con la relación de detalle y variables
    const sql = `SELECT 
    p.idPrecio,
    p.precio,
    p.presentacion,
    p.UnidadMedida,
    ts.nombreServicio,
    p.estado_precio
FROM 
    precio p
JOIN 
    tiposervicio ts
ON 
    p.fk_idTipoServicio = ts.idTipoServicio
WHERE 
    ts.idTipoServicio = ?
AND 
    p.estado_precio = 'activo'`;

    // Ejecuta la consulta
    const [respuesta] = await conexion.query(sql, [idTipoServicio]);
    console.log("Respuesta optencion de precio: ", respuesta);

    if (respuesta.length > 0) {
      return res.status(200).json(respuesta);
    } else {
      return res.status(404).json({
        message: "No se encontró precio relacionado al tipo de servicio",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en el servidor: " + error.message });
  }
};

export const registrarServicio = async (req, res) => {
  try {
    const {
      fk_idTipoServicio,
      fecha,
      fk_id_precio,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idUsuarios,
      valoresVariables,
    } = req.body;

    console.log("Datos recibidos en el controlador:", {
      fk_idTipoServicio,
      fk_id_precio,
      fk_idAmbiente,
      fk_idMuestra,
      fk_idUsuarios,
      valoresVariables,
    });

    // Verificación de campos obligatorios
    if (
      !fk_idTipoServicio ||
      !fk_id_precio ||
      !fk_idAmbiente ||
      !fk_idMuestra ||
      !fk_idUsuarios
    ) {
      console.log("Campos obligatorios faltantes");
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // registro del servicio
    const [resultServicio] = await conexion.query(
      `
      INSERT INTO servicios (fk_idTipoServicio, fecha, fk_id_precio, fk_idAmbiente, fk_idMuestra, fk_idUsuarios) VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        fk_idTipoServicio,
        fecha || new Date(),
        fk_id_precio,
        fk_idAmbiente,
        fk_idMuestra,
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
        return res.status(400).json({
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

export const registroServicioTerminado = async (req, res) => {
  try {
    let id = req.params.id;
    let { cantidad_salida, fecha_fin } = req.body;
    console.log(cantidad_salida)

    let sql = `update servicios set cantidad_salida= ?, fecha_fin= ? where id_servicios = ?`;
    const [respuesta] = await conexion.query(sql, [
      cantidad_salida,
      fecha_fin || new Date(),
      id,
    ]);
    if (respuesta.affectedRows > 0) {
      let sqlObtenerMuestra = `select fk_idMuestra from servicios where id_servicios= ?`;
      const [respuestaOptenerMuestra] = await conexion.query(
        sqlObtenerMuestra,
        [id]
      );

      if (respuestaOptenerMuestra.length > 0) {
        let idDeMuestra = respuestaOptenerMuestra[0].fk_idMuestra;

        const cambioDeEstadoMuestra = `update muestra set estado='terminado' where id_muestra=?`;
        await conexion.query(cambioDeEstadoMuestra, [idDeMuestra]);
        return res
          .status(200)
          .json({
            message:
              "Registro de término exitoso y estado de muestra actualizado",
          });
      } else {
        return res
          .status(404)
          .json({ message: "Muestra no encontrada para el servicio" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "No se registro la terminacion del servicio" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const listarServicios = async (req, res) => {
  try {
    let sql = `SELECT 
    s.id_servicios,
    ts.nombreServicio as tipo_servicio,
    DATE_FORMAT(s.fecha, '%Y-%m-%d') AS fecha,
    p.presentacion,
    a.nombre_ambiente,
    m.codigo_muestra,
    CONCAT(u.nombre, ' ', u.apellidos) AS nombre_completo_usuario,
    r.rol AS rol_usuario,
    s.estado
FROM 
    servicios s
JOIN 
    tiposervicio ts ON s.fk_idTipoServicio = ts.idTipoServicio
JOIN 
    precio p ON s.fk_id_precio = p.idPrecio
JOIN 
    ambiente a ON s.fk_idAmbiente = a.idAmbiente
JOIN 
    muestra m ON s.fk_idMuestra = m.id_muestra
JOIN 
    usuarios u ON s.fk_idUsuarios = u.id_usuario
JOIN 
    rol r ON u.fk_idRol = r.idRol
    ORDER BY 
    s.id_servicios ASC`;

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
