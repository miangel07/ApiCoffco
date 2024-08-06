import { conexion } from "../database/conexion.js";




export const consultaRegistroIngresoTostion = async (req, res) => {
    const {formulario,fecha_incio, fecha_fin}= req.body
  try {
    let sql = `SELECT 
    d.nombre AS nombre_documento,
    d.descripcion AS descripcion_documento,
    GROUP_CONCAT(DISTINCT l.nombre ORDER BY l.nombre SEPARATOR ', ') AS logos,
    ver.version AS version, 
    m.codigo_muestra,
    m.fecha_muestra,     
    m.cantidadEntrada,     
    u_receptor.nombre AS quien_recibe,     
    u_productor.nombre AS productor_nombre,     
    u_productor.tipo_documento,     
    u_productor.numero_documento,     
    u_productor.telefono,     
    mun.nombre_municipio,     
    GROUP_CONCAT(DISTINCT CONCAT(v.nombre, ': ', val.valor) 
    ORDER BY v.nombre SEPARATOR ', ') AS variables_y_valores 
FROM     
    muestra m 
JOIN     
    finca f ON m.fk_id_finca = f.id_finca 
JOIN     
    municipio mun ON f.fk_id_municipio = mun.id_municipio 
JOIN     
    servicios s ON m.id_muestra = s.fk_idMuestra 
JOIN     
    usuarios u_productor ON m.fk_id_usuarios = u_productor.id_usuario 
JOIN     
    usuarios u_receptor ON s.fk_idUsuarios = u_receptor.id_usuario 
JOIN     
    valor val ON s.id_servicios = val.fk_idServicios 
JOIN     
    variables v ON val.fk_idVariable = v.idVariable 
JOIN     
    versiones ver ON v.fk_idVersiones = ver.idVersion 
JOIN     
    documentos d ON ver.fk_documentos = d.id_documentos 
LEFT JOIN 
    logo_documento ld ON d.id_documentos = ld.documentos_iddocumentos
LEFT JOIN 
    logos l ON ld.logo_idlogos = l.idLogos
JOIN     
    tiposervicio ts ON d.fk_idTipoServicio = ts.idTipoServicio 
WHERE 
    d.nombre = '${formulario}'  -- Filtro por el documento específico
    AND m.fecha_muestra BETWEEN '${fecha_incio}' AND '${fecha_fin}'  -- Rango de fechas
GROUP BY     
    d.nombre, d.descripcion, ver.version, m.codigo_muestra, m.fecha_muestra, m.cantidadEntrada, u_receptor.nombre, u_productor.nombre, u_productor.tipo_documento, u_productor.numero_documento, u_productor.telefono, mun.nombre_municipio 
ORDER BY     
    m.fecha_muestra DESC;  `

    const [result] = await conexion.query(sql);
    console.log(result);

    console.log(result.length);
    if (result.length > 0) {
      res.status(200).json(result);
    } else {
      res
        .status(404)
        .json({ message: "No se encontro reporte de este registro" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error en el controlador VersionesController.js " + err,
    });
  }
};
