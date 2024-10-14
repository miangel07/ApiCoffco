import { check } from "express-validator";

export const validateTipoDocumento = [
    check('nombreDocumento', 'El tipo de documento es obligatorio y debe ser una cadena de texto válida')
        .not().isEmpty().withMessage('El tipo de documento no debe estar vacío')
        .isString().withMessage('El tipo de documento debe ser una cadena de texto')
        .isLength({ max: 100 }).withMessage('El tipo de documento no debe exceder 100 caracteres'),

];
