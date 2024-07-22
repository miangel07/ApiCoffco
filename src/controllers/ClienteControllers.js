import { conexion } from "../database/conexion.js";

export const lisatrCliente = async (req, res) => {
  try {
    let sql = "SELECT * FROM cliente";
    const [resultado] = await conexion.query(sql);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(404).json({ message: "No hay clientes registrados" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error", error });
  }
};

export const listarClienteId = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `SELECT * FROM cliente WHERE idCliente=${id}`;
    const [resultado] = await conexion.query(sql);
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res
        .status(404)
        .json({ message: "No hay clientes registrados con este id" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error", error });
  }
};

export const registrarCliente = async (req, res) => {
  try {
    let { nombre, apellido, telefono, direccion } = req.body;
    let sql = `INSERT INTO cliente(nombre_cliente,apellido_cliente,tipo_documento,numero_documento,fk_id_usuarios,telefono,correo_electronico,direccion) VALUES('${nombre}','${apellido}','${telefono}','${direccion}')`;
    const [respuesta] = await conexion.query(sql);
    if (respuesta.affectedRows == 1) {
      res.status(200).json({ message: "Cliente registrado con exito" });
    } else {
      res.status(404).json({ message: "No se pudo registrar el cliente" });
    }
  } catch (error) {
    res.status(404).json({ message: "Error", error });
  }
};
