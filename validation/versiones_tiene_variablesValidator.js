import {check} from 'express-validator'

export const versiones_tiene_variables_validate =[
    check('fk_versiones','El id de la version es obligatorio').not().isEmpty().isInt(),
    check('fk_variables','El id de la variable es obligatorio').not().isEmpty().isInt(),
]