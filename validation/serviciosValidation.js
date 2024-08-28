import { check } from "express-validator";

export const validateServicios = [
    check('nombre')
        .not().isEmpty().withMessage('El nombre es obligatorio y no debe estar vacío')
        .isString().withMessage('El nombre debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El nombre no debe exceder 100 caracteres'),
    
    check('fk_idTipoServicio')
        .not().isEmpty().withMessage('El ID de tipo de servicio es obligatorio')
        .isInt().withMessage('El ID de tipo de servicio debe ser un número entero'),
    
    check('fecha')
        .not().isEmpty().withMessage('La fecha es obligatoria')
        .isISO8601().withMessage('La fecha debe estar en un formato válido (ISO 8601)'),
    
    check('fk_idAmbiente')
        .not().isEmpty().withMessage('El ID del ambiente es obligatorio')
        .isInt().withMessage('El ID del ambiente debe ser un número entero'),
    
    check('fk_idMuestra')
        .not().isEmpty().withMessage('El ID de muestra es obligatorio')
        .isInt().withMessage('El ID de muestra debe ser un número entero'),
    
    check('fk_idPrecio')
        .not().isEmpty().withMessage('El ID del precio es obligatorio')
        .isInt().withMessage('El ID del precio debe ser un número entero'),
    
    check('fk_idUsuarios')
        .not().isEmpty().withMessage('El ID del usuario es obligatorio')
        .isInt().withMessage('El ID del usuario debe ser un número entero'),
];
