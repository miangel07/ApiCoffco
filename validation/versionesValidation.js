import { check } from "express-validator";

export const validateVersiones = [
  check('version', 'La versión es obligatoria y debe ser una cadena de texto válida')
  .not().isEmpty().withMessage('La versión no debe estar vacía')
  .isString().withMessage('La versión debe ser una cadena de texto')
  .isLength({ max: 50 }).withMessage('La versión no debe exceder 50 caracteres'),

check('fk_id_usuarios', 'El ID del usuario es obligatorio y debe ser un número entero positivo')
  .not().isEmpty().withMessage('El ID del usuario no debe estar vacío')
  .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo'),

check('fk_documentos', 'El ID del documento es obligatorio y debe ser un número entero positivo')
  .not().isEmpty().withMessage('El ID del documento no debe estar vacío')
  .isInt({ gt: 0 }).withMessage('El ID del documento debe ser un número entero positivo'),

check('estado', 'El estado es obligatorio y debe ser "activo" o "inactivo"')
  .not().isEmpty().withMessage('El estado no debe estar vacío')
  .isIn(['activo', 'inactivo']).withMessage('El estado debe ser "activo" o "inactivo"'),

check('fecha_version', 'La fecha de versión es obligatoria y debe estar en formato YYYY-MM-DD')
  .not().isEmpty().withMessage('La fecha de versión no debe estar vacía')
  .isDate({ format: 'YYYY-MM-DD' }).withMessage('La fecha de versión debe estar en formato YYYY-MM-DD')
  ];

