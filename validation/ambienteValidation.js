import { check } from "express-validator";

export const ambienteValidate = [
  check("nombre","El nombre es obligatorio").not().isEmpty().isLength({max:50}),
  check("estado", "El estado es obligatorio")
    .optional()
    .isIn(['activo', 'inactivo'])
];
