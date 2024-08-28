import { check } from 'express-validator';

export const validatePrecio = [
    check('precio', 'El precio del servicio es obligatorio')
        .not().isEmpty()
        .isFloat().withMessage('El precio del servicio es obligatorio'),

    check('presentacion', 'La presentación es obligatoria')
        .not().isEmpty()
        .isLength({ max: 45 }).withMessage('La presentación no puede exceder los 45 caracteres'),

    check('fk_idTipoServicio', 'El ID del servicio es obligatorio y debe ser un número entero positivo')
        .not().isEmpty()
        .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo')
];