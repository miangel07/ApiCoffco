import { conexion } from "../database/conexion.js"
import { validationResult } from "express-validator"

// Registrar Servicio Detalle
export const registrartiposervicio = async (req, res) => {
    try {
        /* nombreServicio */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { nombreServicio } = req.body;
        const sql = `INSERT INTO tiposervicio (nombreServicio)`;
        const [result] = await conexion.query(sql, [nombreServicio]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'registrado con éxito' });
        } else {
            res.status(404).json({ message: 'no se regitro' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
}

// Listar Todos los Servicios Detalle
export const listartiposervicio = async (req, res) => {
    try {
        const sql = `SELECT * FROM tiposervicio`;
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
export const listartiposervicioId = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `SELECT * FROM tiposervicio WHERE idServicios = ?`;
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
export const actualizartiposervicio = async (req, res) => {
    try {
        const { nombreServicio } = req.body;
        const id = req.params.id;
        const sql = `UPDATE tiposervicio SET nombreServicio=?  WHERE idServicios = ?`;
        const [result] = await conexion.query(sql, [nombreServicio,id]);

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
export const eliminartiposervicio = async (req, res) => {
    try {
        const id = req.params.id;
        const sql = `DELETE FROM tiposervicio WHERE idServicios = ?`;
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
