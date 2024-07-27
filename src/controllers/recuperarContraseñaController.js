import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

dotenv.config();

export const recuperarContraseña = async (req, res) => {
  try {
    let { numero_documento } = req.body;
    console.log(numero_documento)

    let sql = `select id_usuario, correo_electronico from usuarios where numero_documento=?`;

    const [resultado] = await conexion.query(sql, [numero_documento]);
    //console.log('resultado de la peticion a la base de datos',resultado)

    if (resultado.length == 1) {
      let tokenRecuperar = jwt.sign(
        { id_usuario: resultado[0].id_usuario },
        process.env.SECRET,
        {
          expiresIn: process.env.RECOVERYTIME,
        }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.RECOVERYEMAIL, // Reemplaza con tu correo de Gmail
          pass: process.env.RECOVERYPASSEMAIL, // Reemplaza con tu contraseña de Gmail
        },
      });

      // Crear el enlace de restablecimiento de contraseña con el token generado
      const resetLink = `http://localhost:3000/api/password/actualizar/${tokenRecuperar}`;

      // Definir las opciones del correo, incluyendo el destinatario obtenido de la consulta
      const mailOptions = {
        from: process.env.RECOVERYEMAIL, // Correo del sistema
        to: resultado[0].correo_electronico, // Correo del usuario obtenido de la consulta
        subject: "Recuperación de contraseña",
        text: `Hola, para restablecer tu contraseña, por favor visita el siguiente enlace: ${resetLink}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error enviando el correo:", error);
          return res.status(500).json({ message: "Error enviando el correo" });
        }

        console.log("Correo enviado:", info.response);
        res
          .status(200)
          .json({ message: "Correo enviado con éxito", tokenRecuperar });
      });
    } else {
      res.status(404).json({ message: "usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: +error.message });
  }
};

export const actualizarContraseña = async (req, res, next) => {
  let token = req.headers.token;

  console.log("token desde la url del mensaje", token);

  try {
    if (!token) {
      return res
        .status(402)
        .json({ message: "Se requiere el token de autorización" });
    }

    const decode = jwt.verify(token, process.env.SECRET);
    // console.log("token verificado", decode);

    let decodedToken;
    try {
      decodedToken = jwt.decode(token);
      // console.log("token decodificado", decodedToken);
    } catch (error) {
      return res.status(400).json({ message: "Token no decodificado" });
    }

    if (!decodedToken || !decodedToken.id_usuario) {
      return res.status(400).json({ message: "Token inválido" });
    }

    let id_usuario = decodedToken.id_usuario;

    const salt = await bcryptjs.genSalt(10);
    let { password } = req.body;
    let hashPassword = await bcryptjs.hash(password, salt);

    let sql = `update usuarios set password = ? where id_usuario = ?`;
    const [respuesta] = await conexion.query(sql, [hashPassword, id_usuario]);

    if (respuesta.affectedRows > 0) {
      res.status(200).json({ message: "Contraseña actualizada con éxito" });
    } else {
      res.status(404).json({ message: "Contraseña no actualizada" });
    }
  } catch (error) {
    console.error("Error en actualizarContraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
