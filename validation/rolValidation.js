import { check } from 'express-validator';

export const rolValidate = [
    check('rol', 'El rol es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El rol no debe estar vacío')
        .isString().withMessage('El rol debe ser una cadena de texto')
        .isLength({ max: 50 }).withMessage('El rol no debe exceder 50 caracteres')
];