import { check } from "express-validator";

/* nombre_ambiente, estado */

export const ambienteValidate = [

  check("nombre", "El nombre es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder 50 caracteres"),

  check("estado", "El estado es obligatorio")
    .optional()
    .isIn(['activo', 'inactivo'])
    .withMessage("El estado debe ser 'activo' o 'inactivo'")
];
