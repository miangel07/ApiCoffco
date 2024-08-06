import { check } from "express-validator";

export const logoValidate = [


  check("nombre", "El nombre es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder 50 caracteres")
];
