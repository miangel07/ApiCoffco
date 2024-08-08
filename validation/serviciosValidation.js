import { check } from "express-validator";

export const validateServicios = [
    check('nombre', 'El nombre es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El nombre no debe estar vacío')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre no debe exceder 100 caracteres'),
];
