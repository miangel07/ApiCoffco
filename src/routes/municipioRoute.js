import { Router } from "express";
import { ListarMunicipio, RegistrarMunicipio,ActualizarMunicipio,EliminarMunicipio, ListaridMunicipio } from "../controllers/municipoControllers.js";
import { validateMunicipio } from "../../validation/municipioValidation.js";
import { validarToken } from "../controllers/AutentificacionLogin.js";

const rutaMunicipio=Router()

rutaMunicipio.get("/listar",validarToken,ListarMunicipio)
rutaMunicipio.post("/registrar",validarToken,validateMunicipio, RegistrarMunicipio)
rutaMunicipio.put("/actualizar/:id",validarToken,validateMunicipio,ActualizarMunicipio)
rutaMunicipio.delete("/eliminar/:id",validarToken,EliminarMunicipio)
rutaMunicipio.get("/listarid/:id",validarToken,ListaridMunicipio)


export default rutaMunicipio