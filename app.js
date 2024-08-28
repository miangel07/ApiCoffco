import express from "express"; 
import bodyParser from "body-parser";
import cors from "cors"; 

import router from "./src/routes/index.js";


const servidor = express(); 
servidor.use(bodyParser.json({ limit: '50mb' }));
servidor.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
servidor.set('view engine', 'ejs');
servidor.set('views', './views');
servidor.use(express.static('./public')); 
servidor.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], 
    credentials: true, 
   
}));

servidor.use('/documents', (req, res) => {
    res.render('documentacion.ejs');
});
servidor.use("/api",router)




servidor.listen(3000, () => {
    console.log("servidor escuchando desde el puerto  3000");

});