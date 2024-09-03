import { check } from "express-validator";


export const precioValidationEstado = [
  check('estado_precio','El estado es obligatorio')
    .not().isEmpty().isLength({ max: 4 }).withMessage('El estado es obligatorio y debe tener un máximo de 4 caracteres')
];
