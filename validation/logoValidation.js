import { check } from "express-validator";

export const logoValidate = [
  check("estado", "El estado es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El estado no debe estar vacío")
    .isIn(['activo', 'inactivo'])
    .withMessage("El estado debe ser 'activo' o 'inactivo'"),

  check("nombre", "El nombre es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder 50 caracteres")
];
