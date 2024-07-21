import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

// Listar todos los precios
export const listarPrecios = async (req, res) => {
    try {
        let sql = 'SELECT * FROM precio';
        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "No se encontraron precios en la base de datos" });
        }
    } catch (err) {
        res.status(500).json({ "message": "Error en el controlador PrecioController.js: " + err.message });
    }
};

// Registrar un nuevo precio
export const registrarPrecio = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        let { estado_precio, presentacion, precio, fk_idServicios } = req.body;

        let sql = `INSERT INTO precio (estado_precio, presentacion, precio, fk_idServicios)
                   VALUES (?, ?, ?, ?)`;
        const [result] = await conexion.query(sql, [estado_precio, presentacion, precio, fk_idServicios]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Se registró con éxito el precio" });
        } else {
            return res.status(404).json({ "message": "No se registró el precio." });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e.message });
    }
};

// Eliminar un precio
export const eliminarPrecio = async (req, res) => {
    try {
        let idPrecio = req.params.idPrecio;

        let sql = `DELETE FROM precio WHERE idPrecio = ?`;
        const [result] = await conexion.query(sql, [idPrecio]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Se eliminó con éxito el precio" });
        } else {
            return res.status(404).json({ "message": "No se eliminó el precio" });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e.message });
    }
};

// Actualizar un precio
export const actualizarPrecio = async (req, res) => {
    try {
        let idPrecio = req.params.idPrecio;
        let { estado_precio, presentacion, precio, fk_idServicios } = req.body;

        let sql = `UPDATE precio SET estado_precio = ?, presentacion = ?, precio = ?, fk_idServicios = ? WHERE idPrecio = ?`;
        let values = [estado_precio, presentacion, precio, fk_idServicios, idPrecio];

        const [result] = await conexion.query(sql, values);

        if (result.affectedRows > 0) {
            return res.status(200).json({ "message": "Se actualizó con éxito el precio" });
        } else {
            return res.status(404).json({ "message": "No se actualizó el precio" });
        }
    } catch (e) {
        return res.status(500).json({ "message": "Error: " + e.message });
    }
};

// Listar precio por ID
export const ListaridPrecio = async (req, res) => {
    try {
        let idPrecio = req.params.idPrecio;

        let sql = `SELECT * FROM precio WHERE idPrecio = ?`;
        const [result] = await conexion.query(sql, [idPrecio]);

        if (result.length === 1) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "message": "Precio no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Error en la conexión: " + error.message });
    }
};
