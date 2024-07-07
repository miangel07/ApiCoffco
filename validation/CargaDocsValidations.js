import { check } from "express-validator";

export const validateCargarDocs=[
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("fecha_carga", "La fecha de carga es obligatoria en formato ISO8601").not().isEmpty().isISO8601(),
  check("fk_id_usuarios", "El id del usuario es obligatorio y debe ser un número entero").not().isEmpty().isInt(),
  check("descripcion", "La descripción es obligatoria y debe tener máximo 100 caracteres").not().isEmpty().isLength({ max: 100 }),
  check("formato", "El formato es obligatorio y debe tener máximo 100 caracteres").not().isEmpty().isLength({ max: 100 }),

]

export const validaciondocumentos=[
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
]