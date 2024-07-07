import { conexion } from "../database/conexion.js";


export const listarTipoFormato = async (req,res) => {
    try {
        let sql = `select * from tipo_formato`
        const [respuesta] = await conexion.query(sql)

        if(respuesta.length>0){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'No hay formatos registrados'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor' +error.message})
    }
}

export const listarTipoFormatoId = async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`select * from tipo_formato where id_formato= ?`
        const [respuesta]= await conexion.query(sql,[id])
        if(respuesta.length==1){
            res.status(200).json(respuesta)
        }else{
            res.status(404).json({message:'El formato no existe'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor' +error.message})
    }
}

export const registrarTipoFormato = async (req,res) =>{
    try {
        let {nombre}=req.body
        let sql=`insert into tipo_formato (nombre)
        values(?)`
        const [respuesta] =await conexion.query(sql,[nombre])
        if(respuesta.affectedRows==1){
            res.status(200).json({message:'Formato ingresado con exito'})
        }else{
            res.status(404).json({message:'Formato no registrados'})
        }
    } catch (error) {
        res.status(500).json({message:'Error en el servidor'+error.message})
    }
}

export const actualizarTipoFormato = async (req,res) =>{
    try {
        let {nombre}=req.body
        let id = req.params.id
        let sql=`update tipo_formato set nombre='${nombre}'
        where id_formato=${id}`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.affectedRows>0){
            res.status(200).json({message: 'Formato actualizados con exito'})
        }else{
            res.status(404).json({message: 'Formato no actualizados'})
        } 
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor'+error.message})
    }
}

export const eliminarTipoFormato = async (req,res) =>{
    try {
        let id=req.params.id
        let sql=`delete from tipo_formato where id_formato=${id}`
        const [respuesta] = await conexion.query(sql)
        if(respuesta.affectedRows==1){
            res.status(200).json({message: 'Formato eliminados con exito'})
        }else{
            res.status(404).json({message:'Error al eliminar Formato'})
        }
    } catch (error) {
        res.status(500).json({message: 'Error en el servidor'  + error.message})
    }
}