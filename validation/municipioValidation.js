import { check } from "express-validator";

export const validateMunicipio =[
    check('nombre_municipio','El nombre del municipio es obligatorio').not().isEmpty().isLength({max:15}),
    
]