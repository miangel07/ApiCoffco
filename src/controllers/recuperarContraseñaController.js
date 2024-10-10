import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator";
import nodemailer from "nodemailer";
import randomatic from "randomatic";
import bcryptjs from "bcryptjs";

const codigosRecuperacion = {};

export const recuperarContraseña = async (req, res) => {
  try {
    let { numero_documento } = req.body;
    const code = randomatic('0', 4);
    console.log(code)

    let sql = `select id_usuario, correo_electronico from usuarios where numero_documento=? and estado = 'activo'`;

    const [resultado] = await conexion.query(sql, [numero_documento]);
    if (resultado.length < 1) {
      return res.status(404).json({ message: "El número de documento ingresado no es válido o el usuario no está activo." });
    }
    let mailOptions = {
      from: process.env.RECOVERYEMAIL,
      to: resultado[0].correo_electronico,
      subject: 'Codigo de Recuperacion de contrasena de coffco',
      text: `Este es un correo de recuperar contrasena de coffco tu codgo  de verificacion es el siguiente ${code}`,
      html: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recuperación de Contraseña</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .footer {
            background-color: #f4f4f4;
            padding: 10px;
            text-align: center;
            font-size: 12px;
            color: #555555;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            padding: 10px;
            border: 2px dashed #007bff;
            display: inline-block;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Recuperación de Contraseña</h1>
             
        </div>
        <div class="content">
            <p>Hola,</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para proceder, por favor utiliza el siguiente código de verificación:</p>
            <div class="code">${code}</div>
            <p>Si no has solicitado este cambio, puedes ignorar este mensaje.</p>
            <p>Este codigo sera valido solo para los proximos 8 minutos.</p>
            <p>Gracias,</p>
            <p>El equipo de Coffco</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Coffco. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`,
    };
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.RECOVERYEMAIL,
        pass: process.env.RECOVERYPASSEMAIL,
      },
    }); await transporter.sendMail(mailOptions);

    codigosRecuperacion[resultado[0].id_usuario] = code;
    setTimeout(() => {
      delete codigosRecuperacion[resultado[0].id_usuario];
    }, 480000)
    return res.status(200).json({ message: 'Código de recuperación  fue enviado al correo electrónico. ', data: resultado });

  } catch (e) {
    console.error("Error al recuperar la contraseña:", e);
    return res.status(500).json({ message: "Error en la conexión: " + e.message });
  }
}

export const validarRecuperacion = async (req, res) => {
  try {
    let { codigo, id_usuario } = req.body;

    if (!codigosRecuperacion[id_usuario] || codigosRecuperacion[id_usuario] !== codigo) {
      return res.status(401).json({ message: "El código de recuperación no es válido o ha expirado." });
    }
    delete codigosRecuperacion[id_usuario];
    return res.status(200).json({ message: "El codigo de recuperacion fue validado correctamente", data: id_usuario });
  } catch (e) {
    console.error("Error al validar la recuperación:", e);
    return res.status(500).json({ message: "Error en la conexión: " + e.message });
  }
}

export const actualizarContraseña = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json(error);
    }
    let { id_usuario, password } = req.body;
    const salt = await bcryptjs.genSalt(10);
    let hashPassword = await bcryptjs.hash(password, salt);
    const sql = "UPDATE usuarios SET password =? WHERE id_usuario =?";
    const [result] = await conexion.query(sql, [hashPassword, id_usuario]);
    if (result.affectedRows > 0) {
      return res.status(200).json({ message: "Contraseña actualizada correctamente." });
    }

    return res.status(404).json({ message: "No se encontró el usuario." });

  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    return res.status(500).json({ message: "Error en la conexión: " + error.message });
  }
}