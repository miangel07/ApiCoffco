import { check } from 'express-validator';

export const validateMuestra = [
    check('cantidadEntrada', 'La cantidad es obligatoria y debe ser un número válido')
        .not().isEmpty()
        .isFloat().withMessage('La cantidad debe ser un número'),

    check('fk_id_finca', 'La finca es obligatoria y debe ser un número entero válido')
        .not().isEmpty()
        .isInt({ gt: 0 }).withMessage('El ID de la finca debe ser un número entero positivo'),

    check('fecha_muestra', 'La fecha es obligatoria y debe estar en formato YYYY-MM-DD')
        .not().isEmpty()
        .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha debe estar en formato YYYY-MM-DD'),

    check('fk_id_usuarios', 'El ID del usuario es obligatorio y debe ser un número entero válido')
        .not().isEmpty()
        .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo'),

    check('altura', 'La altura es obligatoria y debe ser un número válido')
        .not().isEmpty()
        .isFloat().withMessage('La altura debe ser un número'),

    check('variedad', 'La variedad es obligatoria y debe ser una cadena de texto válida')
        .not().isEmpty()
        .isString()
        .isLength({ max: 45 }).withMessage('La variedad no puede exceder los 45 caracteres'),


    check('observaciones', 'Las observaciones deben ser una cadena de texto válida')
        .optional()
        .isString()
        .isLength({ max: 255 }).withMessage('Las observaciones no pueden exceder los 255 caracteres'),

    check('codigoExterno', 'El código externo debe ser una cadena de texto válida')
        .optional()
        .isString()
        .isLength({ max: 100 }).withMessage('El código externo no puede exceder los 100 caracteres'),

    
        check('fk_idTipoServicio', 'El tipo de servicio es obligatorio y debe ser un número entero válido')
        .not().isEmpty()
        .isInt({ gt: 0 }).withMessage('El ID del tipo de servicio debe ser un número entero positivo'),

    check('UnidadMedida', 'La unidad de medida es obligatoria y debe ser una cadena de texto válida')
        .not().isEmpty()
        .isString()
        .isLength({ max: 20 }).withMessage('La unidad de medida no puede exceder los 20 caracteres')
];