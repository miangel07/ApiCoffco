import { conexion } from "../database/conexion.js";

export const listaIngresoTrilla = async (req, res) => {
  try {
    // Consulta SQL para obtener el reporte junto con las rutas de los logos asignados al documento
    let sql = `
    SELECT 
        doc.codigo_documentos AS codigo_documento,
        ver.version AS version_documento,
        doc.fecha_emision AS fecha_emision_documento,
        mu.codigo_muestra AS codigo_muestra,
        mu.fecha_muestra AS fecha_muestra,
        mu.cantidadEntrada AS cantidad_muestra,
        CONCAT(usu.nombre, ' ', usu.apellidos) AS usuario_registro_muestra,
        mu.fk_id_usuarios AS cliente_id,
        usu.tipo_documento AS tipo_documento_cliente,
        usu.numero_documento AS numero_documento_cliente,
        usu.telefono AS telefono_cliente,
        mu.variedad AS variedad_muestra,
        mu.altura AS altura_muestra,
        mu.observaciones AS observaciones_muestra,
        GROUP_CONCAT(logos.ruta ORDER BY logos.idLogos SEPARATOR ', ') AS logos_rutas
    FROM 
        muestra mu
    JOIN 
        usuarios usu ON mu.fk_id_usuarios = usu.id_usuario
    JOIN 
        documentos doc ON mu.fk_idTipoServicio = doc.fk_idTipoServicio
    JOIN 
        versiones ver ON doc.id_documentos = ver.fk_documentos
    LEFT JOIN 
        logo_documento ld ON doc.id_documentos = ld.documentos_iddocumentos
    LEFT JOIN 
        logos ON ld.logo_idlogos = logos.idLogos
    WHERE 
        ver.estado = 'activo'
    GROUP BY 
        doc.id_documentos, ver.version, mu.codigo_muestra, mu.fecha_muestra, mu.cantidadEntrada, usu.id_usuario, mu.variedad, mu.altura, mu.observaciones
    ORDER BY 
        doc.codigo_documentos;`;

    // Ejecutar la consulta SQL
    const [result] = await conexion.query(sql);

    // Si hay resultados, se devuelven
    if (result.length > 0) {
      res.status(200).json(result); // Retornar los resultados en formato JSON
    } else {
      res.status(404).json({ message: 'No se encontraron resultados' }); // En caso de que no haya registros
    }

  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};
