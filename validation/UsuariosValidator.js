import { check } from "express-validator";

export const validacionUser = [
  check("nombre_usuario", "El nombre es obligatorio").not().isEmpty().isLength({ max: 45 }),
  check("apellido_usuario", "El apellido es obligatorio").not().isEmpty().isLength({ max: 45 }),
  check("correo_electronico", "El correo electrónico es obligatorio").not().isEmpty().isEmail().isLength({ max: 45 }),
  check("telefono_usuario", "El teléfono es obligatorio").not().isEmpty().isLength({ max: 15 }),
  check("rol_usuario", "El rol es obligatorio").not().isEmpty().isIn(['administrador', 'encargado', 'invitado']),
  check("contraseña_usuario", "La contraseña es obligatoria").not().isEmpty().isLength({ max: 60 }),
  check("numero_identificacion", "El número de identificación es obligatorio").optional().isLength({ max: 20 }),
  check("tipo_documento", "El tipo de documento es obligatorio").optional().isIn(['cc', 'ti', 'nit', 'pasaporte'])
]
