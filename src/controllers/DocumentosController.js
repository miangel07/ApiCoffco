import { json } from "express";
import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const listarDocumentos = async (req, res) => {
  try {
    let sql = "select * from documentos";
    const [result] = await conexion.query(sql);
    console.log(result.length);
    if (result.length > 0) {
      res.status(200).json(result);
    } else
      res.status(404).json({
        message: "No se encontraron docuementos  en la base de datos",
      });
  } catch (err) {
    res.status(500).json({ message: "Error" + err });
  }
};
/* nombre	fecha_carga	descripcion	codigo_documentos	fecha_emision	fk_idTipoServicio	fk_idTipoDocumento	fk_idLogos	
 */
export const registrarDocumentos = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let {
      nombre,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
      logos
    } = req.body;
    console.log(req.body)

    let sqlDocumento = `INSERT INTO documentos (nombre, fecha_carga, descripcion, codigo_documentos, fecha_emision, fk_idTipoServicio, fk_idTipoDocumento)
                        VALUES (?, CURDATE(), ?, ?, ?, ?, ?)`;
    const [rows] = await conexion.query(sqlDocumento, [
      nombre,
      descripcion,
      codigo_documentos,
      fecha_emision,
      fk_idTipoServicio,
      fk_idTipoDocumento
    ]);

    // verifica el id del documento que se registro
    const id_documentos = rows.insertId;

    if (!logos || logos.length === 0) {
      return res.status(400).json({ message: "No se proporcionaron logos para el documento." });
    }

    let sqlLogos = 'INSERT INTO logo_documento (documentos_iddocumentos, 	logo_idlogos) VALUES ?';
    const values = logos.map(id_logo => [id_documentos, id_logo]);
    console.log(values)
    const [response] = await conexion.query(sqlLogos, [values]);

    if (response.affectedRows > 0) {
      return res.status(200).json({ message: "Se registró con éxito el documento y sus logos." });
    } else {
      return res.status(404).json({ message: "No se registro el documento." });
    }
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
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let {
      nombre,
      descripcion,
      codigo: codigo_documentos,
      fecha_emision,
      servicios: fk_idTipoServicio,
      tipo_documento: fk_idTipoDocumento,
      logos
    } = req.body;

    const id = req.params.id_documentos;
    let sql = "SELECT * FROM documentos WHERE id_documentos = ?";
    const [documentoRows] = await conexion.query(sql, id);
    if (documentoRows.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontró el documento solicitado." });
    }
    const fecha_carga = documentoRows[0].fecha_carga
    const date = new Date(fecha_carga).toISOString().split('T')[0];
    console.log(date)

    let sqlDocumento = `INSERT INTO documentos (nombre, fecha_carga, descripcion, codigo_documentos, fecha_emision, fk_idTipoServicio, fk_idTipoDocumento)
                        VALUES (?, '${date}', ?, ?, ?, ?, ?)`;
    const [rows2] = await conexion.query(sqlDocumento, [
      nombre,
      descripcion,
      codigo_documentos,
      fecha_emision,
      fk_idTipoServicio,
      fk_idTipoDocumento
    ]);

    if (!rows2.affectedRows > 0) {
      return res
        .status(404)
        .json({ message: "No se actualizó el documentos." });
    }
    let sqlLogos = 'INSERT INTO logo_documento (documentos_iddocumentos, 	logo_idlogos) VALUES ?';
    const values = logos.map(id_logo => [id, id_logo]);

    const [response] = await conexion.query(sqlLogos, [values]);
    if (response.affectedRows > 0) {
      return res.status(200).json({ message: "Se actualizo con éxito el documento" });
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
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
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

    const fecha_carga = documentoRows[0].fecha_carga
    const date = new Date(fecha_carga).toISOString().split('T')[0];
    let sql = `UPDATE documentos SET nombre ='${nombre}', fecha_carga = '${date}', 
           descripcion = '${descripcion}',codigo_documento='${codigo_documentos}',
          fecha_emision='${fecha_emision}',servicios=${fk_idTipoServicio},tipo_documento=${fk_idTipoDocumento}
           WHERE id_documentos = ${id}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res.status(200).json({ message: "Se actualizó con éxito el documento." });
    } else {
      return res.status(404).json({ message: "No se ha podido actualizar el documento." });
    }

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }


}
