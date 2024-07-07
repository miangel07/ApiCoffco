import { check } from "express-validator";

export const validateMuestra =[
    check('cantidad','La cantidad es obligatoria').not().isEmpty(),
    check('fk_id_finca','La finca es obligatoria').not().isEmpty().isNumeric(),
    check('fecha_muestra','La fecha es obligatoria').not().isEmpty()
]