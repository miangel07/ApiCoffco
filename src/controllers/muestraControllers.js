import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";

// Listar muestras
export const ListarMuestras = async (req, res) => {
  try {
    const sql = `
      SELECT 
        m.id_muestra, 
        m.codigo_muestra, 
        m.cantidadEntrada, 
        m.fecha_muestra, 
        m.estado, 
        m.altura, 
        m.variedad, 
        m.observaciones, 
        m.codigoExterno, 
        f.nombre_finca AS finca,  -- Renombrado para claridad
        CONCAT(u.nombre, ' ', u.apellidos) AS nombre_usuario,  -- Solo una vez
        ts.nombreServicio AS fk_idTipoServicio  -- Renombrado para claridad
      FROM muestra m
      JOIN finca f ON m.fk_id_finca = f.id_finca
      JOIN usuarios u ON m.fk_id_usuarios = u.id_usuario
      JOIN tiposervicio ts ON m.fk_idTipoServicio = ts.idTipoServicio
    `;

    const [responde] = await conexion.query(sql);

    if (responde.length > 0) {
      const formatearResponde = responde.map((muestra) => ({
        id_muestra: muestra.id_muestra,
        codigo_muestra: muestra.codigo_muestra,
        cantidadEntrada: parseFloat(muestra.cantidadEntrada),
        fecha_muestra: muestra.fecha_muestra.toISOString().split('T')[0],
        estado: muestra.estado,
        finca: muestra.finca,
        usuario: muestra.nombre_usuario,
        altura: parseFloat(muestra.altura),
        variedad: muestra.variedad,
        observaciones: muestra.observaciones,
        codigoExterno: muestra.codigoExterno,
        fk_idTipoServicio: muestra.fk_idTipoServicio,
      }));

      return res.status(200).json(formatearResponde);
    } else {
      return res.status(404).json({ mensaje: "No se encontraron muestras" });
    }
  } catch (error) {
    return res.status(500).json({ mensaje: "Error en la conexión: " + error.message });
  }
};


// Registrar muestra
export const RegistrarMuestra = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    const {
      cantidadEntrada,
      fk_id_finca, // ID de la finca
      fecha_muestra,
      codigo_muestra,
      fk_id_usuarios, // ID del usuario
      estado = "pendiente", // Valor predeterminado
      altura,
      variedad,
      observaciones,
      codigoExterno,
      fk_idTipoServicio // ID del tipo de servicio
    } = req.body;

    const sql = `
      INSERT INTO muestra (cantidadEntrada, fk_id_finca, fecha_muestra, codigo_muestra, fk_id_usuarios, estado, altura, variedad, observaciones, codigoExterno, fk_idTipoServicio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [respuesta] = await conexion.query(sql, [
      cantidadEntrada,
      fk_id_finca,
      fecha_muestra,
      codigo_muestra,
      fk_id_usuarios,
      estado,
      altura,
      variedad,
      observaciones,
      codigoExterno,
      fk_idTipoServicio
    ]);

    if (respuesta.affectedRows > 0) {
      return res.status(201).json({ message: "Se registró correctamente" });
    } else {
      return res.status(404).json({ message: "No se registró correctamente" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error al conectar la base de datos: " + error.message,
    });
  }
};

// Actualizar muestra
export const ActualizarMuestra = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }

    const {
      cantidadEntrada,
      fk_id_finca, // ID de la finca
      fecha_muestra,
      codigo_muestra,
      fk_id_usuarios, // ID del usuario
      estado,
      altura,
      variedad,
      observaciones,
      codigoExterno,
      fk_idTipoServicio // ID del tipo de servicio
    } = req.body;

    const id = req.params.id;

    const sql = `
      UPDATE muestra 
      SET 
        cantidadEntrada = ?, 
        fk_id_finca = ?, 
        fecha_muestra = ?, 
        codigo_muestra = ?, 
        fk_id_usuarios = ?, 
        estado = ?, 
        altura = ?, 
        variedad = ?, 
        observaciones = ?, 
        codigoExterno = ?, 
        fk_idTipoServicio = ?
      WHERE id_muestra = ?
    `;

    const [respuesta] = await conexion.query(sql, [
      cantidadEntrada,
      fk_id_finca,
      fecha_muestra,
      codigo_muestra,
      fk_id_usuarios,
      estado,
      altura,
      variedad,
      observaciones,
      codigoExterno,
      fk_idTipoServicio,
      id,
    ]);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Se actualizó con éxito" });
    } else {
      return res.status(404).json({ message: "No se actualizó correctamente" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error en la conexión: " + error.message,
    });
  }
};




export const eliminarMuestra = async (req, res) => {
    try {
      // Obtén el id desde los parámetros de la ruta
      const { id_muestra } = req.params;
  
      // Verifica si el id es válido
      if (!id_muestra) {
        return res.status(400).json({ message: "ID de la muestra es requerido" });
      }
  
      // Consulta SQL segura usando placeholders
      const sql = 'DELETE FROM muestra WHERE id_muestra = ?';
  
      // Ejecuta la consulta con el id proporcionado en los parámetros
      const [response] = await conexion.query(sql, [id_muestra]);
  
      // Verifica si se eliminó algún registro
      if (response.affectedRows > 0) {
        return res.status(200).json({ message: "Muestra eliminada correctamente" });
      } else {
        return res.status(404).json({ message: "No se encontró la muestra con el ID proporcionado" });
      }
  
    } catch (error) {
      // Manejo de errores y mensajes claros
      console.error("Error al eliminar la muestra:", error);
      return res.status(500).json({ message: "Error en la conexión: " + error.message });
    }
  };
  
export const ListaridMuestra = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `select * from muestra where id_muestra=${id}`;
    const [responde] = await conexion.query(sql);
    if (responde.length == 1) {
      res.status(200).json(responde);
    } else {
      res.status(500).json({ message: "dato no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ menssage: "error en la conexion" + error.menssage });
  }
};




export const ActualizarEstadoMuestra = async (req, res) => {
  try {
    let { estado } = req.body;
    let id = req.params.id;

    let sql = `
      UPDATE muestra
      SET estado = '${estado}'
      WHERE id_muestra = ${id}
    `;

    const [respuesta] = await conexion.query(sql);

    if (respuesta.affectedRows > 0) {
      return res.status(200).json({ message: "Estado actualizado con éxito" });
    } else {
      return res.status(404).json({ message: "No se encontró la muestra" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error en la conexión: " + error.message });
  }
};
