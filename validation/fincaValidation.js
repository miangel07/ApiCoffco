import { check } from "express-validator";


export const validateFinca = [
    check("nombre_finca", "El nombre de la finca es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El nombre de la finca no debe estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre de la finca no debe exceder 50 caracteres"),

  check("fk_id_municipio", "El municipio es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El municipio no debe estar vacío")
    .isInt()
    .withMessage("El municipio debe ser un número entero"),

  check("fk_id_usuario", "El usuario es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El usuario no debe estar vacío")
    .isInt()
    .withMessage("El usuario debe ser un número entero")
]
