import { check } from "express-validator";

export const validateVersiones = [
    check('version','La version es obligatoria').not().isEmpty().isNumeric(),
    check('estado','El campo estado es obligatorio').not().isEmpty().isNumeric(),
    check('fk_id_usuarios','El usuario es obligatorio').not().isEmpty().isNumeric(),
    check('fecha_version','La fecha es obligatoria').not().isEmpty().isDate()
]