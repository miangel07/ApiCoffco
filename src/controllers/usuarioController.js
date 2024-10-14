import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

export const listarUsuario = async (req, res) => {
  try {
    let sql = `
      SELECT usuarios.*, rol.rol 
      FROM usuarios 
      LEFT JOIN rol ON rol.idRol = usuarios.fk_idRol
    `;
    const [resultado] = await conexion.query(sql);
    
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

export const estadoUsuario = async (req, res) => { 
  try {
    const { id_usuario } = req.params;

    let selectRolSql = `
      SELECT fk_idRol, estado FROM usuarios WHERE id_usuario = ?
    `;

    const [selectRolResult] = await conexion.query(selectRolSql, [id_usuario]);

    if (selectRolResult.length > 0) {
      const usuario = selectRolResult[0];

      if (usuario.fk_idRol === 3) {
        return res.status(400).json({ message: "No puedes cambiar el estado de un Cliente." });
      }

      const nuevoEstado = usuario.estado === 'activo' ? 'inactivo' : 'activo';

      let updateSql = `
        UPDATE usuarios SET estado = ? WHERE id_usuario = ?
      `;

      const [updateResult] = await conexion.query(updateSql, [nuevoEstado, id_usuario]);

      if (updateResult.affectedRows > 0) {
        res.status(200).json({ message: "Estado del usuario actualizado correctamente" });
      } else {
        res.status(404).json({ message: "Usuario no encontrado" });
      }
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};


export const listarUsuarioId = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `SELECT usuarios.*, rol.rol 
      FROM usuarios 
      LEFT JOIN rol ON rol.idRol = usuarios.fk_idRol 
      WHERE id_usuario=${id}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.length == 1) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "El usuario no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const registrarUsuario = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const mensajesError = error.array().map(err => err.msg);
      return res.status(400).json({ errors: mensajesError });
    }

    let { numero_documento, correo_electronico, rol, ...restoDatos } = req.body;

    let sqlExiste = `SELECT COUNT(*) AS count FROM usuarios WHERE numero_documento = ?`;
    const [result] = await conexion.query(sqlExiste, [numero_documento]);

    if (result[0].count > 0) {
      return res.status(400).json({ message: "El número de documento ya está en uso" });
    }

    let sqlCorreo = `SELECT COUNT(*) AS count FROM usuarios WHERE correo_electronico = ?`;
    const [correoResult] = await conexion.query(sqlCorreo, [correo_electronico]);

    if (correoResult[0].count > 0) {
      return res.status(400).json({ message: "El correo electrónico ya está en uso" });
    }

    const salt = await bcryptjs.genSalt(10);
    let hashPassword = await bcryptjs.hash(req.body.password, salt);
    let estadoUsuario = (rol === "3") ? 'inactivo' : 'activo';

    let sqlInsert = `INSERT INTO usuarios 
      (nombre, apellidos, correo_electronico, telefono, password, numero_documento, tipo_documento, fk_idRol, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [respuesta] = await conexion.query(sqlInsert, [
      req.body.nombre,
      req.body.apellidos,
      correo_electronico,
      req.body.telefono,
      hashPassword,
      numero_documento,
      req.body.tipo_documento,
      rol,
      estadoUsuario
    ]);

    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Se registró el usuario con éxito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    let id_usuario = req.params.id_usuario;
    let sql = `delete from usuarios where id_usuario=${id_usuario}`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "El usuario se elimiino con exito" });
    } else {
      res.status(404).json({ message: "Error" + error.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Errror" + error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    // MANEJO DE ERRORES
    const error = validationResult(req);
    if (!error.isEmpty()) {
      const mensajesError = error.array().map(err => err.msg);
      return res.status(400).json({ errors: mensajesError });
    }

    const { id } = req.params;
    const { numero_documento, correo_electronico, password, ...restoDatos } = req.body;

    // Verifica si el usuario existe
    const [usuarioExistente] = await conexion.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);
    
    if (usuarioExistente.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar si el número de documento ya está en uso por otro usuario
    if (numero_documento) {
      const [result] = await conexion.query(
        "SELECT COUNT(*) AS count FROM usuarios WHERE numero_documento = ? AND id_usuario != ?",
        [numero_documento, id]
      );
      if (result[0].count > 0) {
        return res.status(400).json({ message: "El número de documento ya está en uso por otro usuario" });
      }
    }

    // Verificar si el correo electrónico ya está en uso por otro usuario
    if (correo_electronico) {
      const [correoResult] = await conexion.query(
        "SELECT COUNT(*) AS count FROM usuarios WHERE correo_electronico = ? AND id_usuario != ?",
        [correo_electronico, id]
      );
      if (correoResult[0].count > 0) {
        return res.status(400).json({ message: "El correo electrónico ya está en uso por otro usuario" });
      }
    }

    // Encriptar la contraseña si se está actualizando
    let passwordHashed = usuarioExistente[0].password;
    if (password) {
      const salt = await bcryptjs.genSalt(10);
      passwordHashed = await bcryptjs.hash(password, salt);
    }

    // Crear el objeto de actualización
    const actualizacion = {
      numero_documento: numero_documento || usuarioExistente[0].numero_documento,
      correo_electronico: correo_electronico || usuarioExistente[0].correo_electronico,
      password: passwordHashed,
      ...restoDatos
    };

    // Realizar la actualización
    const [resultado] = await conexion.query(
      "UPDATE usuarios SET ? WHERE id_usuario = ?",
      [actualizacion, id]
    );

    res.json({ message: "Usuario actualizado correctamente", Usuario: resultado });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


export const ConsultaUsers = async (req, res) => {
  try {
    let sql = `SELECT COUNT(rol_usuario) AS rol
        FROM usuarios
        WHEREpassword = 'administrador'
        GROUP BYpassword`;
    let rol;
    const [respuesta] = await conexion.query(sql);
    console.log(respuesta);

    if (respuesta.length > 0) {
      res.status(200).json(respuesta);
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) { }
};

export const verificarContraseña = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { contraActual, contraNueva } = req.body; 

    const [resultado] = await conexion.query("SELECT * FROM usuarios WHERE id_usuario = ?", [id]);

    const usuario = resultado[0];

    const contraseñaCoincide = await bcryptjs.compare(contraActual, usuario.password);
    if (!contraseñaCoincide) {
      return res.status(401).json({ message: "Contraseña actual incorrecta" });
    }

    let actualizacion = { ...usuario }; 

    if (contraNueva) {
      const salt = await bcryptjs.genSalt(10);
      const passwordHash = await bcryptjs.hash(contraNueva, salt);
      actualizacion.password = passwordHash;
    }

    const [sql] = await conexion.query("UPDATE usuarios SET ? WHERE id_usuario = ?", [actualizacion, id]);

    res.json({ message: "Contraseña actualizada correctamente", Usuario: sql });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const listarRoles = async (req, res) => {
  try {
    let sqlRoles = `
      SELECT r.rol, COUNT(u.id_usuario) AS total_usuarios
      FROM rol r
      LEFT JOIN usuarios u ON u.fk_idRol = r.idRol
      WHERE r.rol IN ('administrador', 'encargado', 'cliente', 'operario')
      GROUP BY r.rol
    `;

    const [usuariosPorRol] = await conexion.query(sqlRoles);
    const roles = ['administrador', 'encargado', 'cliente', 'operario'];
    const usuariosPorRolFinal = roles.map((rol) => {
      const rolEncontrado = usuariosPorRol.find((r) => r.rol === rol);
      return {
        rol,
        total_usuarios: rolEncontrado ? rolEncontrado.total_usuarios : 0
      };
    });

    let sqlTotal = 'SELECT COUNT(*) AS total FROM usuarios';
    const [totalResults] = await conexion.query(sqlTotal);
    const totalUsuarios = totalResults[0].total;

    const resultadoFinal = {
      usuariosPorRol: usuariosPorRolFinal,
      total: totalUsuarios,
    };

    res.status(200).json(resultadoFinal);
    
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor: " + error.message });
  }
};

