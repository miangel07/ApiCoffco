import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarvalor = async (req, res) => {
  try {
    let sql = `select * from valor`;
    const [respuesta] = await conexion.query(sql);

    if (respuesta.length > 0) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "No hay datos registrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const listarvalorId = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `select * from valor where idValor= ${id}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.length == 1) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "El dato no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

/*idValor valor,	fk_idServicios	,fk_idVariable */
export const registrarvalor = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    let { valor, servicio: fk_idServicios, variable: fk_idVariable, versiones:fk_id_version } = req.body;
    let sql = `insert into valor (valor,	fk_idServicios	,fk_idVariable,fk_id_version)
        values('${valor}','${fk_idServicios}','${fk_idVariable}','${fk_id_version}')`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows == 1) {
      res.status(200).json({ message: "Dato ingresado con exito" });
    } else {
      res.status(404).json({ message: "Datos no registrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const actualizarvalor = async (req, res) => {
  try {
    let { valor,  } = req.body;
    let id = req.params.id;
    let sql = `update valor set valor='${valor}' where idValor=${id}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Datos actualizados con exito" });
    } else {
      res.status(404).json({ message: "Datos no actualizados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const eliminarvalor = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `delete from valor where idValor=${id}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Datos eliminados con exito" });
    } else {
      res.status(404).json({ message: "Error al eliminar datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};
