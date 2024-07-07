import multer from "multer";
import fs from "fs";
// updaload hace uso de multer y le dice donde se va alamacenar los archivos
const upload = multer({ dest: "public" });

export const subirArchivo = (req, res) => {
    // upload single  es como se va a llamar el campo del formulario donde va recibir el archivo
  upload.single("archivo")(req, res, (err) => {

    // console.log(req.file); muestra los datos del archovo con req.file
    console.log(req.file);
    //recibe la imagen y va ala funcion del cambio de nombre del archivo 
    guardarNombre(req.file)
    // aqui maneja el error 
    console.log(guardarNombre)
    if (err) {
      // Manejar errores de subida de archivos
      console.error(err);
      res.status(500).send("Error al subir el archivo");
    } else {
      console.log(req.file);
      res.send("Archivo subido correctamente");
    }
  });
  // guardarnombre del archivo trae lo de file 
  function guardarNombre(file){
    // recibe el nombre del archivo original y lo cambia por el nuevo nombre
    const nuevoNombre =`./uploads/${file.originalname}`
    // cambia el nombre del archivo original por el nuevo nombre
    fs.renameSync(file.path, nuevoNombre)
    return nuevoNombre
  }
};


