import { check } from "express-validator";

export const validateMunicipio = [
    check('nombre_municipio', 'El nombre del municipio es obligatorio y no debe exceder los 15 caracteres')
        .not().isEmpty()
        .isLength({ max: 15 })
];
