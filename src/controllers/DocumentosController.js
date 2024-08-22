import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarDocumentos = async (req, res) => {
  try {
    const sql = `SELECT 
    d.id_documentos,
    d.nombre AS nombre_documento,
    d.fecha_carga,
    d.descripcion,
    d.codigo_documentos,
    d.fecha_emision,
    v.version,
    v.estado AS estado_version,
    v.nombre_documento AS nombre_version,
    v.fecha_version,  -- Campo añadido
    t.nombreDocumento AS tipo_documento,
    t.estado AS estado_tipo_documento,
    v.nombre_documento AS nombre_documento_version 
FROM 
    documentos d
JOIN 
    versiones v ON d.id_documentos = v.fk_documentos
JOIN 
    tipodocumento t ON d.fk_idTipoDocumento = t.idTipoDocumento
WHERE 
    v.estado = 'activo';

`;
    const [result] = await conexion.query(sql);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error: " + err.message });
  }
};

export const registrarDocumentos = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    //optiene todos los datos que se van a insertar en el documento
    let {
      nombre,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
      version,
      variables,
      logos,
    } = req.body;
    // el tipo del servicio puede ir null en casi de no ser un documentos que no este relacionado a un servicio
    fk_idTipoServicio = fk_idTipoServicio ? fk_idTipoServicio : null;
    console.log(req.body)
    const archivo = req.file.originalname;
    // primero  crea el documento
    let sqlDocumento = `INSERT INTO documentos (nombre, fecha_carga, descripcion, codigo_documentos, fecha_emision, fk_idTipoServicio, fk_idTipoDocumento)
                        VALUES (?, CURDATE(), ?, ?, ?, ?, ?)`;
    const [rows] = await conexion.query(sqlDocumento, [
      nombre,
      descripcion,
      codigo_documentos,
      fecha_emision,
      fk_idTipoServicio,
      fk_idTipoDocumento,
    ]);
    //obtiene el id del documento que se acabo de crear con este creamos la version 
    const id_documentos = rows.insertId;
    let sql = `INSERT INTO versiones (version, fk_documentos, nombre_documento, fecha_version) VALUES (?,?,?,NOW())`;
    // registramos la version el bd
    const [respondeVersion] = await conexion.query(sql, [version, id_documentos, archivo]);
    if (!respondeVersion) {
      return res.status(500).json({ message: "No se pudo registrar la versión." });
    }
    //obtenemos el id del la version que en estos momentos ya esta relacionado a un documento
    const idVersion = respondeVersion.insertId;
    // validamos que hallan logos 
    if (!logos || logos.length === 0) {
      return res
        .status(400)
        .json({ message: "No se proporcionaron logos para el documento." });
    }
    // si hay un un id de servicios osea si el docuemento tiene algo que ver con servicios entra al if
    if (fk_idTipoServicio) {
      /* fk_idVariable	fk_id_version	
 */
      let sqlValorVariables = `INSERT INTO detalle ( fk_idVariable ,fk_id_Version) VALUES (?,?)`;
      // mapea las variables por que viene en un array 
      const VariablesDocumento = JSON.parse(variables).map(async (idVariables) => {
        const valuesVariable = [idVariables, idVersion];
        //inserta uno por uno a la tabla valor el id  servicio el id de la variable y el id de la version
        const [response] = await conexion.query(sqlValorVariables, valuesVariable);
        return response
      });
      let sqlLogos = "INSERT INTO logo_documento (logo_idlogos,documentos_iddocumentos ) VALUES ?";
      const values = JSON.parse(logos).map((id_logo) => [id_logo, id_documentos]);
      const [response] = await conexion.query(sqlLogos, [values]);
      if (VariablesDocumento && response.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Se registró con éxito el documento y sus logos. y sus variables" });
      }
    }


    let sqlLogos = "INSERT INTO logo_documento (logo_idlogos,documentos_iddocumentos ) VALUES ?";
    const values = JSON.parse(logos).map((id_logo) => [id_logo, id_documentos]);
    const [response] = await conexion.query(sqlLogos, [values]);

    if (response.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se registró con éxito el documento y sus logos." });
    }
    return res.status(404).json({ message: "No se registró el documento." });

  } catch (e) {
    return res.status(500).json({ message: "Error: " + e.message });
  }
};

export const eliminarDocumentos = async (req, res) => {
  try {
    let id_documentos = req.params.id_documentos;
    let sql = `delete from documentos where id_documentos = ${id_documentos}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se eliminó con éxito el documentos." });
    } else {
      return res.status(404).json({ message: "No se eliminó el documentos." });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const actalizardocumentosVersion = async (req, res) => {
  try {
    let {
      nombre,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
      logos,
    } = req.body;

    const id = req.params.id_documentos;
    let sql = "SELECT * FROM documentos WHERE id_documentos = ?";
    const [documentoRows] = await conexion.query(sql, id);
    if (documentoRows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el documento solicitado." });
    }
    const fecha_carga = documentoRows[0].fecha_carga;
    const date = new Date(fecha_carga).toISOString().split("T")[0];
    console.log(date);

    let sqlDocumento = `INSERT INTO documentos (nombre, fecha_carga, descripcion, codigo_documentos, fecha_emision, fk_idTipoServicio, fk_idTipoDocumento)
                        VALUES (?, '${date}', ?, ?, ?, ?, ?)`;
    const [rows2] = await conexion.query(sqlDocumento, [
      nombre,
      descripcion,
      codigo_documentos,
      fecha_emision,
      fk_idTipoServicio,
      fk_idTipoDocumento,
    ]);

    if (!rows2.affectedRows > 0) {
      return res
        .status(404)
        .json({ message: "No se actualizó el documentos." });
    }
    let sqlLogos =
      "INSERT INTO logo_documento (documentos_iddocumentos, 	logo_idlogos) VALUES ?";
    const values = logos.map((id_logo) => [id, id_logo]);

    const [response] = await conexion.query(sqlLogos, [values]);
    if (response.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se actualizo con éxito el documento" });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const buscarDocumentos = async (req, res) => {
  try {
    let sql = "SELECT * FROM documentos WHERE id_documentos = ?";
    const id = req.params.id;
    const [documentoRows] = await conexion.query(sql, id);

    if (documentoRows.length > 0) {
      return res.status(200).json(documentoRows);
    } else {
      return res
        .status(404)
        .json({ message: "No se ha encontrado el documento solicitado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
  }
};

export const Actualizar = async (req, res) => {
  try {
    let {
      nombre,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
    } = req.body;
    const id = req.params.id_documentos;
    let sqlbuscar = "SELECT * FROM documentos WHERE id_documentos = ?";
    const [documentoRows] = await conexion.query(sqlbuscar, id);

    const fecha_carga = documentoRows[0].fecha_carga;
    const date = new Date(fecha_carga).toISOString().split("T")[0];
    let sql = `UPDATE documentos SET nombre ='${nombre}', fecha_carga = '${date}', 
           descripcion = '${descripcion}',codigo_documento='${codigo_documentos}',
          fecha_emision='${fecha_emision}',servicios=${fk_idTipoServicio},tipo_documento=${fk_idTipoDocumento}
           WHERE id_documentos = ${id}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se actualizó con éxito el documento." });
    } else {
      return res
        .status(404)
        .json({ message: "No se ha podido actualizar el documento." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
