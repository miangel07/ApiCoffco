import { check } from "express-validator";
export const validationsLogin=[
    check("id","El numero de identificacion es obligatorio").not().isEmpty().isInt().isLength({max:50}),
    check("password","La contraseña es obligatoria").not().isEmpty()
]