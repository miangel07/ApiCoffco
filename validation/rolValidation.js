import { check } from 'express-validator';

export const rolValidate = [
    check('rol', 'El rol es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El rol no debe estar vacío')
        .isString().withMessage('El rol debe ser una cadena de texto')
        .isIn(['admin', 'user', 'editor']).withMessage('El rol debe ser uno de los siguientes: "admin", "user", "editor"')
        .isLength({ max: 50 }).withMessage('El rol no debe exceder 50 caracteres')
];