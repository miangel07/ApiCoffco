import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarDetalle = async (req, res) => {
  try {
    let sql = `select * from detalle`;
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

export const listarDetalleId = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `select * from detalle where id_detalle= ${id}`;
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

export const registrarDetalle = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    let { valor, fk_idVariable } = req.body;
    let sql = `insert into detalle (valor,fk_idVariable)
        values('${valor}','${fk_idVariable}')`;
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

export const actualizarDetalle = async (req, res) => {
  try {
    let { valor, fk_idVariable } = req.body;
    let id = req.params.id;
    let sql = `update detalle set valor='${valor}', fk_idVariable='${fk_idVariable}'
        where id_detalle=${id}`;
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

export const eliminarDetalle = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `delete from detalle where id_detalle=${id}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows == 1) {
      res.status(200).json({ message: "Datos eliminados con exito" });
    } else {
      res.status(404).json({ message: "Error al eliminar datos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};
