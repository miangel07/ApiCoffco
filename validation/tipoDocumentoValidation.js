import { check } from "express-validator";

export const validateTipoDocumento = [
    check('nombre', 'El nombre del tipo de documento es obligatorio')
        .not().isEmpty()
        .isLength({ min: 1, max: 50 })
];
