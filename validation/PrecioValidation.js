import { check } from 'express-validator';

export const validatePrecio = [
    check('estado_precio', 'El estado del precio es obligatorio')
        .not().isEmpty()
        .isLength({ max: 45 }).withMessage('El estado del precio no puede exceder los 45 caracteres'),

    check('presentacion', 'La presentación es obligatoria')
        .not().isEmpty()
        .isLength({ max: 45 }).withMessage('La presentación no puede exceder los 45 caracteres'),

    check('fk_idTipoServicio', 'El ID del servicio es obligatorio y debe ser un número entero positivo')
        .not().isEmpty()
        .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo')
];