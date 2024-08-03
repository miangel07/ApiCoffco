import { check } from "express-validator";

export const validateMunicipio = [
    check('nombre_municipio', 'El nombre del municipio es obligatorio')
    .not().isEmpty().withMessage('El nombre del municipio no debe estar vacío')
    .isString().withMessage('El nombre del municipio debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El nombre del municipio no debe exceder 100 caracteres')
];
