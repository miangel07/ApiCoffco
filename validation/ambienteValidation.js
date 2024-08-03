import { check } from "express-validator";

/* nombre_ambiente, estado */

export const ambienteValidate = [
  check("nombre","El nombre es obligatorio").not().isEmpty().isLength({max:50}),
  check("estado", "El estado es obligatorio")
    .optional()
    .isIn(['activo', 'inactivo'])
    .withMessage("El estado debe ser 'activo' o 'inactivo'")
];
