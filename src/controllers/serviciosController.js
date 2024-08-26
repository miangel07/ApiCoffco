import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const registrarServicio = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            nombre,
            fk_idTipoServicio,
            fecha,
            fk_idAmbiente,
            fk_idMuestra,
            fk_idPrecio,
            fk_idUsuarios,
        } = req.body;

        // Asegúrate de que estos campos existen en tu tabla y coinciden con los nombres de columnas
        const sql = `INSERT INTO servicios (nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [nombre, fk_idTipoServicio, fecha, fk_idAmbiente, fk_idMuestra, fk_idPrecio, fk_idUsuarios];

        const [respuesta] = await conexion.query(sql, values);

        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: 'Dato registrado con éxito' });
        } else {
            res.status(404).json({ message: 'Dato no registrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
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

export const obtenerServicioAlquiler = async (req, res) => {
    try {
        const query = `
        SELECT
            s.id_servicios,
            s.nombre AS servicio_nombre,
            p.precio,
            CONCAT(u.nombre, ' ', u.apellidos) AS usuario_nombre_completo,
            v.nombre AS variable_nombre,
            v.tipo_dato AS variable_tipo_dato,
            vl.valor AS variable_valor
        FROM
            servicios s
            INNER JOIN precio p ON s.fk_idPrecio = p.idPrecio
            INNER JOIN usuarios u ON s.fk_idUsuarios = u.id_usuario
            INNER JOIN valor vl ON s.id_servicios = vl.fk_id_servicio
            INNER JOIN detalle d ON vl.fk_id_detalle = d.id_detalle
            INNER JOIN variables v ON d.fk_idVariable = v.idVariable
        WHERE
            s.estado = 'activo'
            AND p.estado_precio = 'activo';
        `;

        const [rows] = await conexion.query(query);

        // Mapa para organizar los servicios
        const servicios = {};

        rows.forEach(row => {
            const {
                id_servicios,
                servicio_nombre,
                precio,
                usuario_nombre_completo,
                variable_nombre,
                variable_tipo_dato,
                variable_valor
            } = row;

            // Si el servicio no existe en el mapa, inicializarlo
            if (!servicios[id_servicios]) {
                servicios[id_servicios] = {
                    id_servicios,
                    servicio_nombre,
                    precio,
                    usuario_nombre_completo,
                    variables: []
                };
            }

            // Agregar la variable al array de variables del servicio correspondiente
            servicios[id_servicios].variables.push({
                nombre: variable_nombre,
                tipo_dato: variable_tipo_dato,
                valor: variable_valor
            });
        });

        // Convertir el mapa a un array de servicios
        const result = Object.values(servicios);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener los servicios:", error);
        res.status(500).json({ message: "Error al obtener los servicios" });
    }
};




export const obtenerVariablesPorVersion = async (req, res) => {
    const {idTipoFormulario} = req.body
    try {

        const query = `
        SELECT
            v.idVariable,
            v.nombre AS variable_nombre,
            v.tipo_dato AS variable_tipo_dato
        FROM
            versiones ver
            INNER JOIN detalle d ON ver.idVersion = d.fk_id_version
            INNER JOIN variables v ON d.fk_idVariable = v.idVariable
        WHERE
            ver.estado = 'activo'
            AND ver.idVersion = ?
            AND v.estado = 'activo';
        `;

        const [rows] = await conexion.query(query, [idTipoFormulario]);
    

        const variables = rows.map(row => ({
            id: row.idVariable,
            nombre: row.variable_nombre,
            tipo_dato: row.variable_tipo_dato
        }));

        res.status(200).json(variables);
    } catch (error) {
        console.error("Error al obtener las variables por versión:", error);
        res.status(500).json({ message: "Error al obtener las variables por versión" });
    }
};

