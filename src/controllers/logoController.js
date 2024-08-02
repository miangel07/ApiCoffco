import { conexion } from "../database/conexion.js";


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
        let { estado, nombre } = req.body;
        const ruta = req.file.originalname;
        let sql = "INSERT INTO logos (ruta,estado,nombre	) VALUES (?, ?,?)";
        const [response] = await conexion.query(sql, [ruta, estado, nombre]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo registrado correctamente" });

        }
        return res.status(200).json({ message: "No se registrado correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}

export const actualizarLogo = async (req, res) => {
    try {

        const id = req.params.id;
        let { estado, nombre, logo } = req.body;
        let sql = "UPDATE logos SET nombre=?, estado=?, logo=? WHERE id=?";
        const [response] = await conexion.query(sql, [nombre, estado, logo, id]);
        if (response.affectedRows > 0) {
            return res.status(200).json({ message: "Logo actualizado correctamente" });
        }
        return res.status(401).json({ message: "no se actualizado correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "error", error: error.message });
    }
}

export const eliminarLogo = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = "DELETE FROM logos WHERE id=?";
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
        let sql = "SELECT * FROM logos WHERE id=?";
        const [response] = await conexion.query(sql, [id]);
        if (response.length > 0) {
            return res.status(200).json({ message: "Logo encontrado correctamente", data: response });
        }
        return res.status(401).json({ message: "No se encontró correctamente" });

    } catch (error) {
        return res.status(500).json({ message: "Error", error: error.message });
    }
}
