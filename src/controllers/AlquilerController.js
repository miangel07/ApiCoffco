import {conexion} from '../database/conexion.js'
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from "jsonwebtoken"
export const listarAlquiler = async (req, res) => {
    try {
        let sql = `SELECT alquiler_laboratorio.*, 
                          usuarios.nombre_usuario, 
                          usuarios.apellido_usuario, 
                          usuarios.numero_identificacion, 
                          usuarios.tipo_documento
                   FROM alquiler_laboratorio
                   JOIN usuarios ON alquiler_laboratorio.fk_usuarios = usuarios.id_usuario`;
        const [resultado] = await conexion.query(sql);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ "message": 'No se encontraron alquileres' });
        }
    } catch (error) {
        res.status(500).json({ "message": 'Error en el servidor: ' + error.message });
    }
};


export const registrarAlquiler = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        

        let { fecha_alquiler, fk_usuarios, estado, fecha_fin } = req.body;

        let sql = `INSERT INTO alquiler_laboratorio (fecha_alquiler, fk_usuarios, estado, fecha_fin)
                    VALUES ('${fecha_alquiler}', '${fk_usuarios}', '${estado}', '${fecha_fin}')`;
        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: 'Se registró el alquiler de manera exitosa' });
        } else {
            res.status(404).json({ message: 'No se pudo registrar el alquiler' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en alquiler controller: ' + error.message });
    }
};

export const eliminarAlquiler = async (req, res) => {
    try {
        let id_alquiler = req.params.id_alquiler;


        let sql = `DELETE FROM alquiler_laboratorio WHERE id_alquiler=${id_alquiler}`;
        const [respuesta] = await conexion.query(sql);
        if (respuesta.affectedRows > 0) {
            res.status(200).json({ 'message': 'Alquiler eliminado con éxito' });
        } else {
            res.status(404).json({ 'message': 'No se encontró el alquiler para eliminar' });
        }
    } catch (error) {
        res.status(500).json({ 'message': 'Error al intentar eliminar el alquiler: ' + error.message });
    }
};


export const actualizarAlquiler = async (req, res) => {
    try {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json(error)
        }
        


        let id_alquiler = req.params.id_alquiler;
        let { estado} = req.body;

        let sql = `UPDATE alquiler_laboratorio SET estado='${estado}' WHERE id_alquiler='${id_alquiler}'`;

        const [respuesta] = await conexion.query(sql);

        if (respuesta.affectedRows > 0) {
            res.status(200).json({ message: 'Alquiler actualizado' });
        } else {
            res.status(404).json({ message: 'Alquiler no actualizado' });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Error en el controlador alquiler: ' + error.message });
    }
};
