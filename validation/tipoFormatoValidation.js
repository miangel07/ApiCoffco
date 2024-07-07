import { check } from "express-validator";

export const validateTipoFormato =[
    check('nombre','El nombre es obligatorio').not().isEmpty().isLength({max:10})
]