import { check } from 'express-validator';

export const validateTipoServicio = [
    check('nombreServicio', 'El nombre del servicio es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El nombre del servicio no debe estar vacío')
        .isString().withMessage('El nombre del servicio debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre del servicio no debe exceder 100 caracteres')
];