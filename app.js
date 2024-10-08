import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import cors from "cors";
import { fileURLToPath } from 'url';
import router from "./src/routes/index.js";
import { swaggerUi, swaggerSetup } from "./views/swagger.js";
//OBTENER EL NOMBRE DE LA CARPETA 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const servidor = express();
servidor.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
}));
servidor.use(bodyParser.json({ limit: '50mb' }));
servidor.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
servidor.set('view engine', 'ejs');
servidor.set('views', './views');
servidor.use("/docs", swaggerUi.serve, swaggerSetup)
//HACER PUBLICA LA CARPETA PUBLIC PARA PODER ACCEDER A ELLA EN EL FRONTEND
servidor.use('/public', express.static(path.join(__dirname, 'public')));

servidor.use('/documents', (req, res) => {
    res.render('documentacion.ejs');
});
servidor.use("/api", router)

servidor.listen(3000, () => {
    console.log("servidor escuchando desde el puerto  3000");
});