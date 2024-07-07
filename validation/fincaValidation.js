import { check } from "express-validator";


export const validateFinca = [
    check('nombre_finca','El nombre es obligatorio ').not().isEmpty().isLength({max:15}),
    check('fk_id_municipio','El municipio es obligatorio').not().isEmpty().isNumeric(),
    check('fk_id_usuario','El usuario es obligatorio').not().isEmpty().isNumeric()
]