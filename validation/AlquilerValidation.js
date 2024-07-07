import { check } from "express-validator";

export const validateAlquilerLaboratorio = [
  check("fecha_alquiler", "La fecha del alquiler es obligatoria en formato datetime").not().isEmpty().isISO8601(),
  check("fk_usuarios", "El ID del usuario es obligatorio y debe ser un número entero").not().isEmpty().isInt(),
  check("estado", "El estado del alquiler es obligatorio y debe ser uno de: activo, inactivo").not().isEmpty().isIn(["activo", "inactivo"]),
  check("fecha_fin", "La fecha de finalización del alquiler debe ser en formato datetime si está presente").optional().isISO8601(),
];

export const validateEstadoAlquiler = [
  check("estado", "El estado del alquiler es obligatorio y debe ser uno de: activo, inactivo").not().isEmpty().isIn(["activo", "inactivo"]),

];
