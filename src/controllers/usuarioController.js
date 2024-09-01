import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import bcryptjs from "bcryptjs";

export const listarUsuario = async (req, res) => {
  try {
    let sql = ` select usuarios.*, rol.rol FROM usuarios JOIN rol ON rol.idRol = usuarios.fk_idRol`;
    const [resultado] = await conexion.query(sql);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" + error.message });
  }
};

export const listarUsuarioId = async (req, res) => {
  try {
    let id_usuario = req.params.id_usuario;
    let sql = `select * from usuarios where id_usuario=${id_usuario}`;
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
      return res.status(400).json(error);
    }
    console.log(req.body);
    let {
      nombre,
      apellidos,
      correo_electronico,
      telefono,
      password,
      numero_documento,
      tipo_documento,
      estado,
      rol: fk_idRol
    } = req.body;

    const salt = await bcryptjs.genSalt(10);
    let hashPassword = await bcryptjs.hash(password, salt);

    let sql = `insert into usuarios (nombre,apellidos,correo_electronico,telefono,password,numero_documento,tipo_documento,estado,
      fk_idRol)
        value('${nombre}','${apellidos}','${correo_electronico}','${telefono}','${hashPassword}','${numero_documento}','${tipo_documento}','${estado}','${fk_idRol}')`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Se registro el usuario con exito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el usuario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error" + error.message });
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcryptjs.genSalt(10);

    const { id } = req.params;
    const {
      nombre,
      apellidos,
      correo_electronico,
      telefono,
      password,
      numero_documento,
      tipo_documento,
      estado,
      rol: fk_idRol
    } = req.body;

    const hashPassword = await bcryptjs.hash(password, salt);

    const sql = `
            UPDATE usuarios 
            SET 
                nombre = ?, 
                apellidos = ?, 
                correo_electronico = ?,
                telefono = ?,
                password = ?, 
                numero_documento = ?, 
                tipo_documento = ?, 
                estado = ?, 
                fk_idRol = ?
            WHERE id_usuario = ?
        `;

    const values = [
      nombre,
      apellidos,
      correo_electronico,
      telefono,
      hashPassword,
      numero_documento,
      tipo_documento,
      estado,
      fk_idRol,
      id,
    ];

    const [respuesta] = await conexion.query(sql, values);

    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Usuario actualizado" });
    } else {
      res.status(404).json({ message: "Usuario no actualizado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error " + error.message });
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
