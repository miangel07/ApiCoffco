import { conexion } from "../database/conexion.js";

export const getAlquiler = async (req, res) => {
  try {
    let sql = `SELECT 
    s.id_servicios,
    ts.nombreServicio AS tipo_servicio,
    DATE_FORMAT(s.fecha, '%Y-%m-%d') AS fecha,
    CONCAT(u.nombre, ' ', u.apellidos) AS nombre_completo_usuario,
    DATE_FORMAT(s.fecha_fin, '%Y-%m-%d') AS fecha_fin,
    s.estado
FROM 
    servicios s
JOIN 
    tiposervicio ts ON s.fk_idTipoServicio = ts.idTipoServicio
JOIN 
    usuarios u ON s.fk_idUsuarios = u.id_usuario
WHERE 
    s.fk_idTipoServicio = 4
ORDER BY 
    s.id_servicios ASC;
`;
    const [resultado] = await conexion.query(sql);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "No hay reservas activas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const usuariosParaAlquiler = async (req,res)=>{
  try {
    let sql = `SELECT 
    u.id_usuario,
    u.nombre,
    u.apellidos,
    u.correo_electronico,
    u.telefono,
    u.numero_documento,
    u.tipo_documento,
    u.estado,
    r.rol
FROM 
    usuarios u
JOIN 
    rol r ON u.fk_idRol = r.idRol
WHERE 
    u.tipo_documento = 'nit'
AND    
    r.rol = 'cliente';
`
const [respuesta] = await conexion.query(sql)
if(respuesta.length>0){
  res.status(200).json(respuesta)
}else{
  res.status(404).json({message:'No hay usuarios que cumplan los requisitos para el servicio'})
}
  } catch (error) {
    res.status(500).json({message:'Error en el servidor'+error.message})
  }
}



export const registrarAlquiler = async (req, res) => {
  try {
    const { fecha, fk_idAmbiente, fk_idUsuarios, fecha_fin } = req.body;

    // Obtener la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

    // Verificar si la fecha de inicio o fin es anterior a la fecha actual
    if (fecha < fechaActual || fecha_fin < fechaActual) {
      return res.status(400).json({ message: "No se pueden reservar fechas anteriores a la actual" });
    }

    // Verificar si ya hay una reserva en ese ambiente para el rango de fechas
    let sqlVerificar = `
      SELECT * FROM servicios 
      WHERE fk_idAmbiente = ? 
      AND (fecha BETWEEN ? AND ? OR fecha_fin BETWEEN ? AND ?)
    `;
    
    const [reservasExistentes] = await conexion.query(sqlVerificar, [
      fk_idAmbiente,
      fecha,
      fecha_fin,
      fecha,
      fecha_fin,
    ]);

    if (reservasExistentes.length > 0) {
      return res.status(400).json({ message: "Ya existe una reserva para las fechas seleccionadas" });
    }

    // Si todo está bien, proceder con la inserción
    let sqlInsertar = `
      INSERT INTO servicios (fk_idTipoServicio, fecha, fk_idAmbiente, fk_idUsuarios, fecha_fin) 
      VALUES (4, ?, ?, ?, ?)
    `;
    
    const [resultado] = await conexion.query(sqlInsertar, [
      fecha,
      fk_idAmbiente,
      fk_idUsuarios,
      fecha_fin,
    ]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Reserva de laboratorio exitosa" });
    } else {
      res.status(404).json({ message: "No se pudo crear la reserva" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};


export const actualizarAlquiler = async (req, res) => {
  try {
    const { id } = req.params; // ID de la reserva a actualizar
    const { fecha, fk_idAmbiente, fk_idUsuarios, fecha_fin } = req.body;

    // Obtener la fecha actual
    const fechaActual = new Date().toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'

    // Verificar si la fecha de inicio o fin es anterior a la fecha actual
    if (fecha < fechaActual || fecha_fin < fechaActual) {
      return res.status(400).json({ message: "No se pueden reservar fechas anteriores a la actual" });
    }

    // Verificar si ya hay una reserva en ese ambiente para el rango de fechas
    let sqlVerificar = `
      SELECT * FROM servicios 
      WHERE fk_idAmbiente = ? 
      AND (fecha BETWEEN ? AND ? OR fecha_fin BETWEEN ? AND ?) 
      AND id_servicios != ?
    `;

    const [reservasExistentes] = await conexion.query(sqlVerificar, [
      fk_idAmbiente,
      fecha,
      fecha_fin,
      fecha,
      fecha_fin,
      id, // Excluir la reserva que se está actualizando
    ]);

    if (reservasExistentes.length > 0) {
      return res.status(400).json({ message: "Ya existe una reserva para las fechas seleccionadas" });
    }

    // Si todo está bien, proceder con la actualización
    let sqlActualizar = `
      UPDATE servicios 
      SET fecha = ?, fk_idAmbiente = ?, fk_idUsuarios = ?, fecha_fin = ? 
      WHERE id_servicios = ?
    `;

    const [resultado] = await conexion.query(sqlActualizar, [
      fecha,
      fk_idAmbiente,
      fk_idUsuarios,
      fecha_fin,
      id,
    ]);

    if (resultado.affectedRows > 0) {
      res.status(200).json({ message: "Reserva actualizada con éxito" });
    } else {
      res.status(404).json({ message: "No se encontró la reserva para actualizar" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};
