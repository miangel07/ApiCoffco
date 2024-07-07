import { check } from "express-validator";

export const validateServicios =[
    check('tipo_servicios','El tipo de servicio es obligatorio').not().isEmpty(),
    check('fk_id_muestra','La muestra es obligatoria').not().isEmpty().isNumeric(),
    check('fk_formato','El formato es obligatorio').not().isEmpty().isNumeric()
]