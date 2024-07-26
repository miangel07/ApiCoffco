import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"

// Registrar Servicio Detalle
export const registrarServicioDetalle = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fk_idAmbiente, fk_idCliente, fk_idMuestra, fk_idServicios } = req.body;
        const sql = `INSERT INTO servicio_detalle (fk_idAmbiente, fk_idCliente, fk_idMuestra, fk_idServicios)`;
        const [result] = await conexion.query(sql, [fk_idAmbiente, fk_idCliente, fk_idMuestra, fk_idServicios]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'registrado con éxito' });
        } else {
            res.status(404).json({ message: 'po se regitro' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

// Listar Todos los Servicios Detalle
export const listarServiciosDetalle = async (req, res) => {
    try {
        const sql = `SELECT * FROM servicio_detalle`;
        const [result] = await conexion.query(sql);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Datos no encontrados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

// Listar Servicio Detalle por ID
export const listarServicioDetallePorId = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM servicio_detalle WHERE idServicios = ?`;
        const [result] = await conexion.query(sql, [id]);

        if (result.length === 1) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'El dato no existe' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

// Actualizar Servicio Detalle
export const actualizarServicioDetalle = async (req, res) => {
    try {
        const { fk_idAmbiente, fk_idCliente, fk_idMuestra, fk_idServicios } = req.body;
        const id = req.params.id;
        const sql = `UPDATE servicio_detalle SET fk_idAmbiente = ?, fk_idCliente = ?, fk_idMuestra = ?, fk_idServicios = ? WHERE idServicios = ?`;
        const [result] = await conexion.query(sql, [fk_idAmbiente, fk_idCliente, fk_idMuestra, fk_idServicios, id]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Datos actualizados con éxito' });
        } else {
            res.status(404).json({ message: 'Datos no actualizados' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

// Eliminar Servicio Detalle
export const eliminarServicioDetalle = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM servicio_detalle WHERE idServicios = ?`;
        const [result] = await conexion.query(sql, [id]);

        if (result.affectedRows === 1) {
            res.status(200).json({ message: 'Datos eliminados con éxito' });
        } else {
            res.status(404).json({ message: 'Error al eliminar datos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}
