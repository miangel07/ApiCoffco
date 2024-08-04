import multer from "multer";
import path from "path";

// Tipos de archivo permitidos
const fileTypes = /document|docx|xls|xlsx|pdf|pptx|ppt|png|jpg|svg/;

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/documentos");
  },

  filename: function (req, file, cb) {
    const nombre = `${Date.now()}-${file.originalname}`;
    cb(null, nombre);
  },
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  // Verificar la extensión del archivo
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Verificar el tipo MIME
  const mimetype = fileTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    return cb(
      JSON.stringify({
        message: "archivo no valido",
      })
    );
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const subirArchivos = upload.single("file");
