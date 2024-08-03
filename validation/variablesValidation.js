import { check } from "express-validator";

export const validateVariables = [
    check('nombre', 'El nombre es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El nombre no debe estar vacío')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre no debe exceder 100 caracteres'),

    check('estado', 'El estado es obligatorio y debe ser "activo" o "inactivo"')
        .not().isEmpty().withMessage('El estado no debe estar vacío')
        .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),

    check('fk_idVersiones', 'El ID de versiones es obligatorio y debe ser un número entero positivo')
        .not().isEmpty().withMessage('El ID de versiones no debe estar vacío')
        .isInt({ gt: 0 }).withMessage('El ID de versiones debe ser un número entero positivo')
]