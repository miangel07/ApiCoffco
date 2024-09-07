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

export const obtenerServiciosAlquiler = async (req, res) => {
    try {
        // Paso 1: Obtener el ID del tipo de servicio para "Alquiler de laboratorio"
        const [tipoServicioResult] = await conexion.query(`SELECT idTipoServicio FROM tiposervicio WHERE nombreServicio = 'Alquiler de laboratorio'`);
        
        if (tipoServicioResult.length === 0) {
            return res.status(404).json({ message: "Tipo de servicio no encontrado" });
        }
        
        const idTipoServicio = tipoServicioResult[0].idTipoServicio;

        // Paso 2: Consultar todos los servicios con el tipo de servicio "Alquiler de laboratorio"
        const sql = `
        SELECT 
            s.id_servicios AS id_servicio,
            s.nombre AS servicio_nombre,
            p.precio AS precio_servicio,
            CONCAT(u.nombre, ' ', u.apellidos) AS usuario_nombre_completo,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'variable_nombre', v.nombre, 
                    'tipo_dato', v.tipo_dato, 
                    'variable_valor', val.valor
                )
            ) AS variables
        FROM 
            servicios s
        JOIN 
            usuarios u ON s.fk_idUsuarios = u.id_usuario
        JOIN 
            precio p ON s.fk_idPrecio = p.idPrecio
        JOIN 
            documentos doc ON s.fk_idTipoServicio = doc.fk_idTipoServicio
        JOIN 
            versiones ver ON doc.id_documentos = ver.fk_documentos
        JOIN 
            detalle det ON ver.idVersion = det.fk_id_version
        JOIN 
            variables v ON det.fk_idVariable = v.idVariable
        JOIN 
            valor val ON s.id_servicios = val.fk_id_servicio AND det.id_detalle = val.fk_id_detalle
        WHERE 
            s.fk_idTipoServicio = ?
        GROUP BY 
            s.id_servicios, s.nombre, p.precio, usuario_nombre_completo;
        `;

        const [resultado] = await conexion.query(sql, [idTipoServicio]);

        if (resultado.length > 0) {
            const servicios = resultado.map(row => ({
                id_servicio: row.id_servicio,
                servicio_nombre: row.servicio_nombre,
                precio_servicio: row.precio_servicio,
                usuario_nombre_completo: row.usuario_nombre_completo,
                // Verificar si "variables" ya es un objeto, si no, intentar parsearlo
                variables: typeof row.variables === 'string' ? JSON.parse(row.variables) : row.variables
            }));
            res.status(200).json(servicios);
        } else {
            res.status(404).json({ message: "Servicios no encontrados" });
        }
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};



export const registrarServicioAlquiler = async (req, res) => {
    const { servicio_nombre, id_tipo_servicio, id_precio, id_usuario, id_ambiente, variables } = req.body;

    try {
        // Verificar si el tipo de servicio, precio y usuario existen
        const tipoServicio = await conexion.query('SELECT * FROM tiposervicio WHERE idTipoServicio = ?', [id_tipo_servicio]);
        const precio = await conexion.query('SELECT * FROM precio WHERE idPrecio = ?', [id_precio]);
        const usuario = await conexion.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario]);
        const ambiente = await conexion.query('SELECT * FROM ambiente WHERE idAmbiente = ?', [id_ambiente]);

        if (tipoServicio.length === 0) {
            return res.status(404).json({ message: "Tipo de servicio no encontrado" });
        }
        if (precio.length === 0) {
            return res.status(404).json({ message: "Precio no encontrado" });
        }
        if (usuario.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        if (ambiente.length === 0) {
            return res.status(404).json({ message: "Ambiente no encontrado" });
        }

        // Insertar el servicio en la base de datos
        const [result] = await conexion.query('INSERT INTO servicios (nombre, fk_idTipoServicio, fk_idAmbiente, fk_idPrecio, fk_idUsuarios, estado) VALUES (?, ?, ?, ?, ?, "activo")', [servicio_nombre, id_tipo_servicio, id_ambiente, id_precio, id_usuario]);

        const servicio_id = result.insertId;
        console.log("ID del servicio insertado:", servicio_id);

        if (!servicio_id) {
            return res.status(500).json({ message: "Error al registrar el servicio" });
        }

        // Insertar los valores asociados a las variables
        for (let variable of variables) {
            const { id_detalle, variable_valor } = variable;

            // Verificar si el id_detalle existe
            const detalle = await conexion.query('SELECT * FROM detalle WHERE id_detalle = ?', [id_detalle]);

            if (detalle.length === 0) {
                return res.status(404).json({ message: `Detalle no encontrado para ID: ${id_detalle}` });
            }

            // Insertar el valor en la tabla `valor`
            await conexion.query('INSERT INTO valor (fk_id_servicio, fk_id_detalle, valor) VALUES (?, ?, ?)', [servicio_id, id_detalle, variable_valor]);
        }

        res.status(201).json({ message: "Servicio registrado con éxito" });
    } catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({ message: "Error en el servidor" });
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

