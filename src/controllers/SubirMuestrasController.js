import multer from 'multer';
import path from 'path';

const fileTypes = /document|png|jpg|svg|gif|webp|eps|ai|pdf|jpeg/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/muestras');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten ciertos formatos.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, 
}).single('fotoMuestra');

export const subirMuestras = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'El archivo es demasiado grande. Máximo 2MB.' });
      }
      return res.status(500).json({ message: `Error de subida: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No se subió ningún archivo.' });
    }
    next();
  });
};