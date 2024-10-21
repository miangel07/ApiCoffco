import { check } from "express-validator";

export const validateServicios = [
  check("fk_idTipoServicio")
    .not()
    .isEmpty()
    .withMessage("El tipo de servicio es obligatorio"),

  check("fk_id_precio")
    .not()
    .isEmpty()
    .withMessage("El precio es obligatorio"),

  check("fk_idAmbiente")
    .not()
    .isEmpty()
    .withMessage("El ambiente es obligatorio"),

  check("fk_idMuestra")
    .not()
    .isEmpty()
    .withMessage("La muestra es obligatoria"),

  check("fk_idUsuarios")
    .not()
    .isEmpty()
    .withMessage("El  usuario es obligatorio"),

  check("valoresVariables")
    .not()
    .isEmpty()
    .withMessage("Los valores de las variables son obligatorios"),
];
