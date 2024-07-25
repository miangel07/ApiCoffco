import { check } from "express-validator";

export const validacionUser = [
  check("nombre", "El nombre es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 45 }),
  
  check("apellidos", "El apellido es obligatorio")
    .not()
    .isEmpty()
    .isLength({ max: 45 }),

  check("correo_electronico", "El correo electrónico es obligatorio")
    .not()
    .isEmpty()
    .isEmail()
    .isLength({ max: 45 }),

  check("rol_usuario", "El rol es obligatorio")
    .not()
    .isEmpty()
    .isIn(['administrador', 'encargado', 'invitado']),

  check("password", "La contraseña es obligatoria")
    .not()
    .isEmpty()
    .isLength({ max: 60 }),

  check("numero_documento", "El número de identificación es obligatorio")
    .optional()
    .isInt(),

  check("tipo_documento", "El tipo de documento es obligatorio")
    .optional()
    .isIn(['cc', 'ti', 'nit', 'pasaporte']),
];
