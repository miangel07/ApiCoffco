import { check } from "express-validator";

/* nombre_ambiente, estado */

export const ambienteValidate = [
  check('nombre', 'El nombre del ambiente es obligatorio')
        .not().isEmpty()
        .isLength({ max: 45 }).withMessage('El nombre del ambiente no puede exceder los 45 caracteres'),

];
