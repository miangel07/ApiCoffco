import { check } from 'express-validator';

export const validateValor = [
    check('valor', 'El valor es obligatorio y debe ser un número positivo')
        .not().isEmpty().withMessage('El valor no debe estar vacío'),


    check('servicio', 'El ID del servicio es obligatorio y debe ser un número entero positivo')
        .not().isEmpty().withMessage('El ID del servicio no debe estar vacío')
        .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo'),

    check('variable', 'El ID de la variable es obligatorio y debe ser un número entero positivo')
        .not().isEmpty().withMessage('El ID de la variable no debe estar vacío')
        .isInt({ gt: 0 }).withMessage('El ID de la variable debe ser un número positivo')
];
