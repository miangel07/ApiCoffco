import { check } from "express-validator";

export const validateDetalle =  [
    check('fk_id_formato','El formato es obligatorio').not().isEmpty().isNumeric(),
    check('fk_id_datos','El dato es obligatorio').not().isEmpty().isNumeric(),
    check('valor','EL valor es obligatorio').not().isEmpty(),
    check('fk_id_servicios','El servicio es obligatorio').not().isEmpty().isNumeric()

]