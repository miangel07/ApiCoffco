import { check } from "express-validator";

export const validateDatos=[
    check('nombre','El nombre es obligatorio').not().isEmpty().isLength({max:20}),
    check('tipo','El tipo es obligatorio').not().isEmpty(),
    check('estado','El estado es obligatorio').not().isEmpty().isLength({max:15}),
    check('fk_id_formato','El formato es obligatorio').not().isEmpty()
]