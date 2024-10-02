import multer from "multer";
import path from "path";

const fileTypes = /document|png|jpg|svg|gif|webp|eps|ai|pdf/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/logos");
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
    return cb(
      console.log("errorensubirlogosdesdeelbackend"),
      JSON.stringify({
        message: "Tipo de archivo no valido",
      })
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const subirLogos = upload.single("file");