import { check } from "express-validator";

export const validacionUserActualizar = [
  check('numero_documento', 'El número de documento es obligatorio y debe ser un número entero positivo')
    .not().isEmpty().withMessage('El número de documento no debe estar vacío')
    .isInt({ gt: 0 }).withMessage('El número de documento debe ser un número entero positivo'),
];
