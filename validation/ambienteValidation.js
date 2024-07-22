import { check } from "express-validator";

export const ambienteValidate = [
  check("nombre","El nombre es obligatorio").not().isEmpty().isInt().isLength({max:50}),
  check("estado", "El estado es obligatorio")
    .optional()
    .isIn(['activo', 'inactivo'])
];
