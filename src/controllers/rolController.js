import { conexion } from "../database/conexion.js";

export const listarRol = async (res, req) => {
    try {
        let sql = "SELECT * FROM rol";
        const [response] = await conexion.query(sql);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "rol listados correctamente", data: response })
        }
        return res.status(401).json({ message: "no se listo correctamente" })

    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message })
    }
}

export const registrarRol = async (req, res) => {
    try {
        const { rol } = req.body
        let sql = `INSERT INTO rol (rol) VALUES (?)`;
        const [response] = await conexion.query(sql, [rol]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "rol registrado correctamente" })
        }
        return res.status(401).json({ message: "no se pudo registrar el rol" })

    } catch (error) {

        return res.status(500).json({ message: "error", error: error.message })
    }
}

export const actualizarRol = async (req, res) => {
    try {
        const { rol } = req.body
        const id = req.params.id
        let sql = `UPDATE rol SET rol=? WHERE id_rol=?`;
        const [response] = await conexion.query(sql, [rol, id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "rol actualizado correctamente" })
        }
        return res.status(401).json({ message: "no se pudo actualizar el rol" })

    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message })
    }
}

export const eliminarRol = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `DELETE FROM rol WHERE id_rol=?`;
        const [response] = await conexion.query(sql, [id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "rol eliminado correctamente" })
        }
        return res.status(401).json({ message: "no se pudo eliminar el rol" })

    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message })
    }
}

export const buscarRolPorId = async (req, res) => {
    try {
        const id = req.params.id
        let sql = `SELECT * FROM rol WHERE id_rol=?`;
        const [response] = await conexion.query(sql, [id]);
        if (response.length > 0) {
            return res.status(200).json({ message: "rol encontrado correctamente", data: response[0] })
        }
        return res.status(401).json({ message: "no se pudo encontrar el rol" })

    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message })
    }
}
