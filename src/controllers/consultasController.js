import { conexion } from "../database/conexion.js";




export const consultaRegistroIngresoTostion = async (req, res) => {
  const { formulario, fecha_incio, fecha_fin } = req.body;
  try {
    let sql = `SELECT 
    d.nombre AS nombre_documento,
    d.descripcion AS descripcion_documento,
    GROUP_CONCAT(DISTINCT l.nombre ORDER BY l.nombre SEPARATOR ', ') AS logos,
    d.codigo_documentos,
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
    AND m.fecha_muestra BETWEEN '${fecha_incio}' AND '${fecha_fin}' 
GROUP BY     
    d.nombre, d.descripcion, d.codigo_documentos, ver.version, m.codigo_muestra, m.fecha_muestra, 
    m.cantidadEntrada, u_receptor.nombre, u_productor.nombre, u_productor.tipo_documento, 
    u_productor.numero_documento, u_productor.telefono, mun.nombre_municipio 
ORDER BY     
    m.fecha_muestra DESC`;

    const [result] = await conexion.query(sql);

    if (result.length > 0) {
      res.status(200).json(
        result.map((row) => {
          const variablesYValores = row.variables_y_valores
            .split(", ")
            .reduce((acc, current) => {
              const [variable, valor] = current.split(": ");
              acc[variable.trim()] = valor.trim();
              return acc;
            }, {});

          return {
            nombre_documento: row.nombre_documento,
            descripcion_documento: row.descripcion_documento,
            logos: row.logos,
            codigo_documentos: row.codigo_documentos,
            version: row.version,
            codigo_muestra: row.codigo_muestra,
            fecha_muestra: row.fecha_muestra,
            cantidadEntrada: row.cantidadEntrada,
            quien_recibe: row.quien_recibe,
            productor_nombre: row.productor_nombre,
            tipo_documento: row.tipo_documento,
            numero_documento: row.numero_documento,
            telefono: row.telefono,
            nombre_municipio: row.nombre_municipio,
            variables_y_valores: variablesYValores,
          };
        })
      );
    } else {
      res
        .status(404)
        .json({ message: "No se encontró reporte de este registro" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error en el controlador VersionesController.js " + err,
    });
  }
};



export const consultaSalidaserviciosTostionyTrilla = async (req, res) => {
  const { formulario, fecha_incio, fecha_fin } = req.body;
  try {
    let sql = `
    SELECT 
        d.nombre AS nombre_documento,
        d.descripcion AS descripcion_documento,
        GROUP_CONCAT(DISTINCT l.nombre ORDER BY l.nombre SEPARATOR ', ') AS logos,
        d.codigo_documentos,
        ver.version AS version, 
        m.codigo_muestra,
        GROUP_CONCAT(DISTINCT CONCAT(v.nombre, ': ', val.valor) ORDER BY v.nombre SEPARATOR ', ') AS variables_y_valores
    FROM     
        muestra m 
    JOIN     
        servicios s ON m.id_muestra = s.fk_idMuestra 
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
        precio p ON s.fk_idTipoServicio = p.fk_idTipoServicio
    WHERE 
        d.nombre = '${formulario}'
        AND m.fecha_muestra BETWEEN '${fecha_incio}' AND '${fecha_fin}'
    GROUP BY     
        d.nombre, d.descripcion, d.codigo_documentos, ver.version, m.codigo_muestra
    ORDER BY     
        m.codigo_muestra DESC
    `;

    const [result] = await conexion.query(sql);

    if (result.length > 0) {
      res.status(200).json(
        result.map((row) => {
          const variablesYValores = row.variables_y_valores
            .split(", ")
            .reduce((acc, current) => {
              const [variable, valor] = current.split(": ");
              acc[variable.trim()] = valor.trim();
              return acc;
            }, {});

          return {
            nombre_documento: row.nombre_documento,
            descripcion_documento: row.descripcion_documento,
            logos: row.logos,
            codigo_documentos: row.codigo_documentos,
            version: row.version,
            codigo_muestra: row.codigo_muestra,
            variables_y_valores: variablesYValores,
          };
        })
      );
    } else {
      res
        .status(404)
        .json({ message: "No se encontró reporte de este registro" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error en el controlador VersionesController.js " + err,
    });
  }
};

