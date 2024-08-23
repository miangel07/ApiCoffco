import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./src/routes/index.js";


const servidor = express();
servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));
servidor.set('view engine', 'ejs');
servidor.set('views', './views');
servidor.use(express.static('./public'));
servidor.use(cors());
servidor.use('/documents', (req, res) => {
    res.render('documentacion.ejs');
});
servidor.use("/api", router)




servidor.listen(3000, () => {
    console.log("servidor escuchando desde el puerto  3000");
});