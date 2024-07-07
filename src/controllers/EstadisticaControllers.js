import { conexion } from "../database/conexion.js";
import { validationResult } from "express-validator"
export const Estadistica = async (req, res) => {
    try {
    
        const error= validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(error)
        }
        let sql = ` SELECT muestra.cantidad, muestra.fecha_muestra, finca.nombre_finca, servicios.tipo_servicios FROM muestra JOIN
         finca ON muestra.fk_id_finca = finca.id_finca JOIN servicios ON muestra.id_muestra = servicios.fk_id_muestra;`
        const [resultado] = await conexion.query(sql);
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        }
        else {
            res.status(404).json({ message: "No se encontraron datos" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error en la conexion"+error.message });
    }
}