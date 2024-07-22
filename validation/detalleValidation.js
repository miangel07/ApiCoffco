import { check } from "express-validator";

export const validateDetalle =  [
    check('valor','EL valor es obligatorio').not().isEmpty(),
    check('fk_idVariable','La Variable es obligatorio').not().isEmpty().isNumeric()

]