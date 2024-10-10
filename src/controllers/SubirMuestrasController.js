import multer from "multer";
import path from "path";

// Definir los tipos de archivos permitidos
const imageTypes = /png|jpg|jpeg|svg|gif|webp/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/muestras"); // Ruta de destino para las imágenes de muestra
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Guardar el archivo con su nombre original
  },
});

const fileFilter = (req, file, cb) => {
  const extname = imageTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = imageTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    cb(null, true); // Aceptar el archivo si es válido
  } else {
    return cb(
      console.log("Error en subir imagen de muestra desde el backend"),
      JSON.stringify({
        message: "Tipo de archivo no válido para imágenes de muestra",
      })
    );
  }
};

// Configuración de `multer` para el manejo de la subida
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Exportar la función `subirMuestras` para manejar la subida de una única imagen de muestra
export const subirMuestras = upload.single("file");
