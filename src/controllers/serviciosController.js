import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const registrarServicio = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        let { nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios, estado } = req.body;
        let sql = `INSERT INTO servicios (nombre, estado) VALUES (?, ?)`;
        const [respuesta] = await conexion.query(sql, [nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios, estado]);
        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: 'Dato registrado con éxito' });
        } else {
            res.status(404).json({ message: 'Dato no registrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
    }
};

export const listarServicios = async (req, res) => {
    try {
        let sql = `SELECT * FROM servicios`;
        const [resultado] = await conexion.query(sql);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ message: 'Datos no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
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
            res.status(404).json({ message: 'El dato no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
    }
};

export const actualizarServicios = async (req, res) => {
    /* 	id_servicios	nombre	fk_idTipoServicio	fecha	fk_idAmbiente	fk_idMuestra	fk_idPrecio	fk_idUsuarios	estado	 */
    try {
        let { nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios, estado } = req.body;
        let id = req.params.id;
        let sql = `UPDATE servicios SET  nombre=?, fk_idTipoServicio=?, fecha=?, fk_idAmbiente=?, fk_idMuestra=?, fk_idPrecio=?, fk_idUsuarios=?, estado=? 
        WHERE id_servicios=?`;
        const [respuesta] = await conexion.query(sql, [nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios, estado, id]);
        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: 'Datos actualizados con éxito' });
        } else {
            res.status(404).json({ message: 'Datos no actualizados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
    }
};

export const eliminarServicios = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM servicios WHERE id_servicios = ?`;
        const [respuesta] = await conexion.query(sql, [id]);
        if (respuesta.affectedRows === 1) {
            res.status(200).json({ message: 'Datos eliminados con éxito' });
        } else {
            res.status(404).json({ message: 'Error al eliminar datos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor ' + error.message });
    }
};
