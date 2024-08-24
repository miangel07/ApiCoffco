import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const listarMunicipio = async (req, res) => {
    try {
        let sql = "SELECT * FROM municipio";
        const [responde] = await conexion.query(sql);
        if (responde.length > 0) {
            res.status(200).json(responde);
        } else {
            res.status(404).json({ "message": "No se pudo listar correctamente" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Error en la conexión: " + error.message });
    }
};

export const registrarMunicipio = async (req, res) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json(error);
        }

        let { nombre_municipio } = req.body;
        let sql = `INSERT INTO municipio (nombre_municipio) VALUES (?)`;
        const [respuesta] = await conexion.query(sql, [nombre_municipio]);
        if (respuesta.affectedRows > 0) {
            return res.status(200).json({ "message": "El dato se registró correctamente" });
        } else {
            return res.status(404).json({ "message": "El dato no se registró" });
        }
    } catch (error) {
        return res.status(500).json({ "message": "Error al conectar la base de datos: " + error.message });
    }
};

export const actualizarMunicipio = async (req, res) => {
    try {
        let { nombre_municipio } = req.body;
        let id = req.params.id;
        let sql = `UPDATE municipio SET nombre_municipio = ? WHERE id_municipio = ?`;
        const [responde] = await conexion.query(sql, [nombre_municipio, id]);

        if (responde.affectedRows > 0) {
            return res.status(200).json({ "message": "Se actualizó con éxito el municipio" });
        } else {
            return res.status(404).json({ "message": "No se actualizó el municipio" });
        }
    } catch (error) {
        return res.status(500).json({ "message": "Error en el servidor: " + error.message });
    }
};

export const eliminarMunicipio = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM municipio WHERE id_municipio = ?`;
        const [responde] = await conexion.query(sql, [id]);
        if (responde.affectedRows > 0) {
            res.status(200).json({ "message": "Municipio eliminado correctamente" });
        } else {
            res.status(404).json({ "message": "Municipio no eliminado correctamente" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Error en la conexión: " + error.message });
    }
};

export const listarIdMunicipio = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `SELECT * FROM municipio WHERE id_municipio = ?`;
        const [responde] = await conexion.query(sql, [id]);
        if (responde.length == 1) {
            res.status(200).json(responde);
        } else {
            res.status(404).json({ "message": "Municipio no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ "message": "Error en la conexión en la base de datos: " + error.message });
    }
};
