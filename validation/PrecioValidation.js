import { check } from 'express-validator';

export const validatePrecio = [
    check('estado_precio', 'El estado del precio es obligatorio y debe ser "activo" o "inactivo"')
        .not().isEmpty().withMessage('El estado del precio no debe estar vacío')
        .isIn(['activo', 'inactivo']).withMessage('El estado del precio debe ser "activo" o "inactivo"'),

    check('presentacion', 'La presentación es obligatoria y debe ser una cadena de texto')
        .not().isEmpty().withMessage('La presentación no debe estar vacía')
        .isString().withMessage('La presentación debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('La presentación no debe exceder 100 caracteres'),

    check('precio', 'El precio es obligatorio y debe ser un número positivo')
        .not().isEmpty().withMessage('El precio no debe estar vacío')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),

    check('fk_idServicios', 'El ID del servicio es obligatorio y debe ser un número entero positivo')
        .not().isEmpty().withMessage('El ID del servicio no debe estar vacío')
        .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo')
];
