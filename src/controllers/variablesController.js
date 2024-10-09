import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const ListarVariables = async (req, res) => {
  try {
    let sql = "select * from variables";
    const [respuesta] = await conexion.query(sql);

    if (respuesta.length > 0) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "No hay variables registradas" });
    }
  } catch (error) {
    res.status(500).json({ message: "error en la conexion" + error });
  }
};
export const RegistrarVariables = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let { nombre, tipo_dato, UnidadMedida } = req.body;
    console.log(nombre, tipo_dato, UnidadMedida);

    let sql = `insert into variables (nombre, tipo_dato,UnidadMedida) values (?,?,?)`;
    const NombreMinusculas = nombre.toLowerCase()
    let sqlCheck = 'SELECT * FROM variables WHERE nombre = ?';
    const [existingVariables] = await conexion.query(sqlCheck, [nombre]);
    const [respuesta] = await conexion.query(sql, [
      nombre.toLowerCase(),
      tipo_dato,
      UnidadMedida,
    ]);
    if (NombreMinusculas === "variedad" || NombreMinusculas === "codigoExterno" || NombreMinusculas === "altura") {
      return res
        .status(400)
        .json({ message: "El nombre de la Variable no puede ser 'variedad', 'codigoExterno' o 'altura'" });
    }
    if (respuesta.affectedRows > 0 && existingVariables.length === 0) {
      return res
        .status(200)
        .json({ menssage: "Variable registrada exitosamente" });
    }
    return res.status(404).json({ mensagge: " El nombre de la Variable ya existe." });

  } catch (error) {
    return res
      .status(500)
      .json({ menssage: "error en el servidor" + error.message });
  }
};

export const ListarIdVariables = async (req, res) => {
  try {
    let id = req.params.id;

    let sql = `select * from variables where idVariable=?`;
    const [respuesta] = await conexion.query(sql, [id]);
    if (respuesta.length == 1) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "Variable no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ menssage: "Error en el servidor" + error.message });
  }
};

export const ActualizarVariables = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    /* idVariable	
    nombre,	
    estado	,
    tipo_dato 	 */
    let { nombre, tipo_dato, UnidadMedida } = req.body;

    let id = req.params.id;

    let sql = `update variables set nombre=?, tipo_dato=? , UnidadMedida = ? where idVariable=?`;
    const [respuesta] = await conexion.query(sql, [
      nombre,
      tipo_dato,
      UnidadMedida,
      id,
    ]);
    if (respuesta.affectedRows > 0) {
      return res
        .status(200)
        .json({ menssage: "se actualizo con exito la variable" });
    } else {
      return res.status(404).json({ menssage: "no se actualizo la variable" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor " + error.mensage });
  }
};

export const ELiminarVariables = async (req, res) => {
  try {
    let id = req.params.id;

    let sql = `delete from variables where idVariable=?`;
    const [respuesta] = await conexion.query(sql, [id]);

    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Variable eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Variable no eliminada correctamente" });
    }
  } catch (error) {
    res.status(500).json({ message: "error en el servidor " + error.message });
  }
};
export const UpdateEstado = async (req, res) => {
  try {
    let id = req.params.id;
    let { estado } = req.body;

    let sql = `update variables set estado=? where idVariable=?`;
    const [respuesta] = await conexion.query(sql, [estado, id]);
    if (respuesta.affectedRows > 0) {
      return res
        .status(200)
        .json({ message: `Se cambio  con éxito el estado a ${estado} ` });
    }
    return res.status(500).json({ message: "dato no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};
