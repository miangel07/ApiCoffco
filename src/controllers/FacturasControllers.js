import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

export const generarFacturas = async (req, res) => {
  try {
    const { codigo } = req.body;
    let sql = `SELECT 
    m.codigo_muestra,
    m.cantidadEntrada,
    GROUP_CONCAT(DISTINCT ts.nombreServicio ORDER BY ts.nombreServicio ASC SEPARATOR ', ') AS servicios,
    GROUP_CONCAT(DISTINCT CONCAT(ts.nombreServicio, ': ', p.precio) ORDER BY ts.nombreServicio ASC SEPARATOR ', ') AS precios,
    GROUP_CONCAT(DISTINCT CONCAT(ts.nombreServicio, ': ', FORMAT(s.cantidad_salida, 2)) ORDER BY ts.nombreServicio ASC SEPARATOR ', ') AS cantidad_salida_servicios,
    FORMAT(SUM(s.cantidad_salida * p.precio), 3) AS total_calculado,  
    f.nombre_finca,
    mun.nombre_municipio,
    u.nombre AS nombre_usuario,
    u.apellidos AS apellido_usuario,
    u.correo_electronico AS correo_usuario,
    GROUP_CONCAT(DISTINCT CONCAT(ts.nombreServicio, ': ', us.nombre, ' ', us.apellidos) ORDER BY ts.nombreServicio ASC SEPARATOR ', ') AS usuarios_servicio
FROM 
    muestra m
JOIN 
    servicios s ON s.fk_idMuestra = m.id_muestra
JOIN 
    tiposervicio ts ON s.fk_idTipoServicio = ts.idTipoServicio
JOIN 
    finca f ON m.fk_id_finca = f.id_finca
JOIN 
    municipio mun ON f.fk_id_municipio = mun.id_municipio
JOIN 
    usuarios u ON m.fk_id_usuarios = u.id_usuario
LEFT JOIN 
    usuarios us ON s.fk_idUsuarios = us.id_usuario
LEFT JOIN 
    (SELECT fk_idTipoServicio, MAX(precio) as precio FROM precio WHERE estado_precio = 'activo' GROUP BY fk_idTipoServicio) p ON ts.idTipoServicio = p.fk_idTipoServicio
WHERE 
    m.codigo_muestra = '${codigo}'
AND 
    s.estado = 'terminado'
GROUP BY 
    m.codigo_muestra, 
    m.cantidadEntrada,  
    f.nombre_finca, 
    mun.nombre_municipio, 
    u.nombre, 
    u.apellidos, 
    u.correo_electronico;



`


        const [result] = await conexion.query(sql);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'No se encontraron resultados' });
        }

    } catch (error) {
 
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};
