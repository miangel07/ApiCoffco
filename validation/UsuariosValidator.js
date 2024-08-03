import { check } from "express-validator";

export const validacionUser = [
  check('nombre', 'El nombre es obligatorio y debe ser una cadena de texto válida')
    .not().isEmpty().withMessage('El nombre no debe estar vacío')
    .isString().withMessage('El nombre debe ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('El nombre no debe exceder 100 caracteres'),

  check('apellidos', 'Los apellidos son obligatorios y deben ser una cadena de texto válida')
    .not().isEmpty().withMessage('Los apellidos no deben estar vacíos')
    .isString().withMessage('Los apellidos deben ser una cadena de texto')
    .isLength({ max: 100 }).withMessage('Los apellidos no deben exceder 100 caracteres'),

  check('correo_electronico', 'El correo electrónico es obligatorio y debe ser una dirección de correo válida')
    .not().isEmpty().withMessage('El correo electrónico no debe estar vacío')
    .isEmail().withMessage('El correo electrónico debe ser una dirección válida'),

  check('password', 'La contraseña es obligatoria y debe tener al menos 6 caracteres')
    .not().isEmpty().withMessage('La contraseña no debe estar vacía')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  check('numero_documento', 'El número de documento es obligatorio y debe ser un número entero positivo')
    .not().isEmpty().withMessage('El número de documento no debe estar vacío')
    .isInt({ gt: 0 }).withMessage('El número de documento debe ser un número entero positivo'),

  check("tipo_documento", "El tipo de documento es obligatorio")
    .optional()
    .isIn(['cc', 'ti', 'nit', 'pasaporte']),
  check('fk_idRol', 'El rol es obligatorio')
    .not().isEmpty().withMessage('El número del rol no debe estar vacío')
    .isInt({ gt: 0 }).withMessage('El número de documento debe ser un número entero'),
];
