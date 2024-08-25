import { check } from "express-validator";
export const validateVersiones = [

  check('version', 'La versión es obligatoria y debe ser una cadena de texto válida')
    .not().isEmpty().withMessage('La versión no debe estar vacía')
    .isString().withMessage('La versión debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('La versión no debe exceder 50 caracteres'),

  check('fk_documentos', 'El ID del documento es obligatorio y debe ser un número entero positivo')
    .not().isEmpty().withMessage('El ID del documento no debe estar vacío')
    .isInt({ gt: 0 }).withMessage('El ID del documento debe ser un número entero positivo'),
];

