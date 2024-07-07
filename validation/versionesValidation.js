import { check } from "express-validator";

export const validateVersiones = [
    check('version','La version es obligatoria').not().isEmpty().isNumeric(),
    check('editable','El campo editable es obligatorio').not().isEmpty().isNumeric(),
    check('fk_id_tipo_formato','El tipo de formato es obligatorio').not().isEmpty().isNumeric(),
    check('fk_id_usuarios','El usuario es obligatorio').not().isEmpty().isNumeric(),
    check('formato_vacio','El formato es obligatorio').not(),
    check('fk_documentos','El documento es obligatorio').not().isEmpty().isNumeric()
]