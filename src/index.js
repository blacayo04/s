const express = require("express");
const cors = require("cors");
const usuarios = require("./routes/usuarios");
const db = require("./db/database");
const app = express();
const port = process.env.PORT || 3000;


(async ()=>{
    try {
        await db.authenticate();
        await db.sync();
        console.log("conectados a la base de datos")
    } catch (error) {
        throw new Error(error)
    }

})()



//Middleware
app.use(express.json());//Recibir informacion
app.use(cors());//Habilitar otras aplicaciones para realizar solicitudes a nuestra app

app.use("/usuarios",usuarios);


app.listen(port, () =>{
    console.log("Servidor ejecutandose en el puerto:",port);
});