import { check } from "express-validator";

export const validateServicioDetalle = [
    check('fk_idAmbiente', 'El id del ambiente es obligatorio').not().isEmpty().isNumeric(),
    check('fk_idCliente', 'El id del cliente es obligatorio').not().isEmpty().isNumeric(),
    check('fk_idMuestra', 'El id de la muestra es obligatorio').not().isEmpty().isNumeric(),
    check('fk_idServicios', 'El id del servicio es obligatorio').not().isEmpty().isNumeric()
];
