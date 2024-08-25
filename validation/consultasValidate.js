import { check } from "express-validator";

export const validateConsultas = [
    check('formulario')
        .not().isEmpty().withMessage('El formulario es obligatorio y no debe estar vacío')
        .isString().withMessage('El formulario debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El formulario no debe exceder 100 caracteres'),
    
    check('fecha_inicio')
        .not().isEmpty().withMessage('La fecha de inicio es obligatoria')
        .isISO8601().withMessage('La fecha de inicio debe estar en un formato válido (ISO 8601)'),
    
    check('fecha_fin')
        .not().isEmpty().withMessage('La fecha de fin es obligatoria')
        .isISO8601().withMessage('La fecha de fin debe estar en un formato válido (ISO 8601)')
        .custom((value, { req }) => {
            if (new Date(value) < new Date(req.body.fecha_inicio)) {
                throw new Error('La fecha de fin debe ser posterior a la fecha de inicio');
            }
            return true;
        })
];
