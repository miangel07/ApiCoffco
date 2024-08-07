import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator"


export const listarLogos = async (req, res) => {
    try {
        let sql = "SELECT * FROM logos";
        const [response] = await conexion.query(sql)
        if (response.length > 0) {
            return res.status(200).json({ message: "logos listados correctamente", data: response });

        }
        return res.status(401).json({ message: "no se listaron correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const registrarLogo = async (req, res) => {
    try {
        let { nombre } = req.body;
        const ruta = req.file.originalname;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        let sql = "INSERT INTO logos (ruta,estado,nombre) VALUES (?,?)";
        const [response] = await conexion.query(sql, [ruta, estado, nombre]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo registrado correctamente" });

        }
        return res.status(200).json({ message: "No se registrado correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const actualizarLogoVersion = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        const id = req.params.id;
        let { nombre } = req.body;
        const ruta = req.file.originalname;
        let sqlQuery = "select * from logos WHERE idLogos = ?"
        const [result] = await conexion.query(sqlQuery, [id]);
        if (!result.length > 0) {
            return res.status(401).json({ message: "no se Encontro el logo " });
        }
        let sqlCreate = `INSERT INTO logos (ruta,nombre) VALUES (?,?)`
        const [responseCreate] = await conexion.query(sqlCreate, [ruta, nombre]);
        if (!responseCreate.affectedRows > 0) {
            return res.status(401).json({ message: "no se actualizado correctamente" });
        }
        let sql = "UPDATE logos SET estado='inactivo' WHERE idLogos=?";
        const [response] = await conexion.query(sql, [id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo actualizado correctamente" });
        }


    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
}

export const eliminarLogo = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "DELETE FROM logos WHERE idLogos=?";
        const [response] = await conexion.query(sql, [id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo eliminado correctamente" });
        }
        return res.status(401).json({ message: "No se eliminado correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const buscarLogo = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "SELECT * FROM logos WHERE idLogos=?";
        const [response] = await conexion.query(sql, [id]);
        if (response.length > 0) {
            return res.status(200).json({ message: "Logo encontrado correctamente", data: response });
        }
        return res.status(401).json({ message: "lo siento logo no encontrado" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}
export const actualizarEstado = async (req, res) => {
    try {
        let id = req.params.id;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        let { estado, nombre } = req.body;

        let sql = "UPDATE logos SET estado=?,nombre=? WHERE idLogos=?";
        const [response] = await conexion.query(sql, [estado, nombre, id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo actualizado correctamente" });
        }
        return res.status(401).json({ message: "No se actualizado correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });

    }
}