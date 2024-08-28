import { check } from "express-validator";

export const validateVariables = [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().isLength({ max: 50 }),
    check('tipo_dato', 'El tipo de dato es obligatorio').not().isEmpty().isLength({ max: 10 }),
]