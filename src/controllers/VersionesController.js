import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarVersiones = async (req, res) => {
  try {
    let sql = "select * from versiones";
    const [result] = await conexion.query(sql);
    console.log(result);

    console.log(result.length);
    if (result.length > 0) {
      res.status(200).json(result);
    } else
      res
        .status(404)
        .json({ message: "No se encontraron versiones en la base de datos" });
  } catch (err) {
    res.status(500).json({
      message: "Error en el controlador VersionesController.js " + err,
    });
  }
};

export const registrarVersiones = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }


    let { version, fk_documentos } = req.body;
    console.log(req.body);


    const archivo = req.file.originalname;
    console.log(archivo)

    let sql = `insert into versiones (version, fk_documentos, nombre_documento, fecha_version)values(?,?,?,curdate())`;

    const [respuesta] = await conexion.query(sql, [version, fk_documentos, archivo]);

    if (respuesta.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se registró con éxito la versión" });
    } else {
      return res
        .status(404)
        .json({ message: "No se registró ningúna version" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor " + error.message });
  }
};


export const eliminarVersiones = async (req, res) => {
  try {
    let id_formato = req.params.id_formato;

    let sql = `delete from versiones where id_formato = ${id_formato}`;

    const [rows] = await conexion.query(sql);
    if (rows.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: "Se eliminó con éxito la version." });
    } else {
      return res.status(404).json({ message: "No se eliminó la version." });
    }
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
}

// actualiza la version 
export const actualizarVersiones = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    // recibe los parametros del body
    let { version, fk_documentos } = req.body;
    let idVersion = req.params.id_formato;
    // consulta si el id de la version existe
    let sql = `select * from versiones where idVersion = ${idVersion}`;
    const [result] = await conexion.query(sql);
    console.log(result);
    //si no exixte sale el mensaje 
    if (result.length == 0) {
      return res.status(500).json({ message: "dato no encontrado" });
    }
    // pide el archivo con el nombre
    const archivo = req.file.originalname;
    // inserta un nuevo documento con los datos ya pasados anteriormente
    let sqlNuevo = `insert into versiones (version, fk_documentos, estado, nombre_documento, fecha_version)values(?,?,'activo',?,NOW())`
    // ejecuta la consulta para insertar el nuevo documento
    const [respuesta] = await conexion.query(sqlNuevo, [version, fk_documentos, archivo]);
    // si la respuesta  affectedRows  desactiva el estado del que ya estaba antiguamente
    if (respuesta.affectedRows > 0) {
      let sql = `update versiones set estado='inactivo' where idVersion = ${idVersion}`;
      await conexion.query(sql);
      return res
        .status(200)
        .json({ message: "Se actualizó con éxito la version." });
    }
    return res.status(404).json({ message: "No se actualizó version" });
  } catch (e) {
    return res.status(500).json({ message: "error " + e.message });
  }
};

export const ListaridVersiones = async (req, res) => {
  try {
    let idVersion = req.params.id_formato;

    let sql = `select * from versiones where idVersion=${idVersion}`;
    const [responde] = await conexion.query(sql);
    if (responde.length == 1) {
      res.status(200).json(responde);
    } else {
      res.status(500).json({ message: "dato no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ menssage: "error en la conexion" + error.menssage });
  }
};

export const desactivarEstado = async (req, res) => {
  try {
    let { estado } = req.body

 
    let idVersion = req.params.id_formato;
    console.log(req.body, idVersion)
    let sql = `update versiones set estado='${estado}' where fk_documentos=${idVersion}`;
    const [responde] = await conexion.query(sql);
    if (responde.affectedRows > 0) {
      res.status(200).json({ message: ` Se cambio  con éxito el estado a ${estado} ` });
    } else {
      res.status(500).json({ message: "dato no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ menssage: "error" + error.menssage });
  }
};
// solo sobre escribe en la misma version 
export const actualizar = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let { version, fk_documentos } = req.body;
    let idVersion = req.params.id_formato;
    const archivo = req.file.originalname;
    let sqlbuscar = `select * from versiones where idVersion=${idVersion}`;
    const [rows] = await conexion.query(sqlbuscar);
    const fecha_version = rows[0].fecha_version
    let sql = `update versiones set version='${version}', fk_documentos=${fk_documentos}, nombre_documento='${archivo}',fecha_version='${fecha_version}'
     where idVersion=${idVersion}`;
    const [responde] = await conexion.query(sql);
    if (responde.affectedRows > 0) {
      res.status(200).json({ message: "Se actualizó con éxito la versión." });
    } else {
      res.status(500).json({
        message:
          "No se actualizó la versión."
      });
    }
  }
  catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.message });
  }
}
