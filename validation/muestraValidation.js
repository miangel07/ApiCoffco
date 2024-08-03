import { check } from "express-validator";


export const validateMuestra = [
    check('cantidadEntrada', 'La cantidad es obligatoria y debe ser un número positivo')
    .not().isEmpty().withMessage('La cantidad no debe estar vacía')
    .isFloat({ min: 0 }).withMessage('La cantidad debe ser un número positivo'),

    check('fk_id_finca', 'La finca es obligatoria y debe ser un número entero positivo')
    .not().isEmpty().withMessage('La finca no debe estar vacía')
    .isInt({ gt: 0 }).withMessage('El ID de la finca debe ser un número entero positivo'),

    check('fecha_muestra', 'La fecha es obligatoria y debe estar en formato YYYY-MM-DD')
    .not().isEmpty().withMessage('La fecha no debe estar vacía')
    .isISO8601().withMessage('La fecha debe estar en formato YYYY-MM-DD'),

    check('codigo_muestra', 'El código de muestra debe ser una cadena de texto válida')
    .optional()
    .isString().withMessage('El código de muestra debe ser una cadena de texto')
    .isLength({ max: 45 }).withMessage('El código de muestra no puede exceder los 45 caracteres'),

    check('fk_id_usuarios', 'El ID del usuario debe ser un número entero positivo')
    .optional()
    .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo')
];

