import { check } from "express-validator";

export const documentoValidate = [
  check("nombre", "El nombre es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El nombre no debe estar vacío")
    .isLength({ max: 50 })
    .withMessage("El nombre no debe exceder 50 caracteres"),

  check("descripcion", "La descripción es obligatoria")
    .not()
    .isEmpty()
    .withMessage("La descripción no debe estar vacía")
    .isLength({ max: 200 })
    .withMessage("La descripción no debe exceder 200 caracteres"),

  check("codigo", "El código de documentos es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El código de documentos no debe estar vacío")
    .isLength({ max: 100 })
    .withMessage("El código de documentos no debe exceder 20 caracteres"),

  check("fecha_emision", "La fecha de emisión es obligatoria")
    .not()
    .isEmpty()
    .withMessage("La fecha de emisión no debe estar vacía")
    .isISO8601()
    .withMessage("La fecha de emisión debe estar en formato ISO 8601"),

  check("tipo_documento", "El tipo de documento es obligatorio")
    .not()
    .isEmpty()
    .withMessage("El tipo de documento no debe estar vacío")
    .isInt()
    .withMessage("El tipo de documento debe ser un número entero"),

];
/*  DataForm.append('nombre', data.nombre);
        DataForm.append('id_documentos', valor.id_documentos);
        DataForm.append('descripcion', data.descripcion);
        DataForm.append('codigo', data.codigo_documentos);
        DataForm.append('fecha_emision', data.fecha_emision);
        DataForm.append('servicios', servicio);
        DataForm.append('tipo_documento', dataInput);
        DataForm.append('nombre_documento_version', valor.nombre_documento_version);
        DataForm.append('idVersion', valor.idversion);
        DataForm.append('logos', JSON.stringify(logos));
        DataForm.append('version', data.version);
        DataForm.append('variables', JSON.stringify(ArryVariables)); */