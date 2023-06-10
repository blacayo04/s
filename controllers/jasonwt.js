const jwt = require('jsonwebtoken');
const Usuarios = require('src\models\Usuario.js')
const express = require('express');
const app = express();

app.use(express.json());


const validateAuth = (permission) => {
     return (req,res,next) => {
        const authHeader = req.headers["authorization"];
        let userPermission = 'public';
        req.authorized = false;

        if(authHeader == undefined){
            res.status(401).json({message: "token required"}).end();
        }

         //Bearer token

    const tokenType = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if(token==undefined){
        res.status(401).json({message: "token required"}).end();
    }
    
    if(tokenType!='Bearer'){
        res.status(401).json({message: "incorrect token_type"}).end();
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err, payload)=>{
        if(err)
            res.status(401).end();
        


        
        //obtenemos el nombre del usuario o idusuario
        //buscamos en la bd los permisos o permiso que tenga

        if(payload.userId=='Maria'){
            userPermission='private';
        }

        if(userPermission == permission){
            req.authorized=true;
        }
                
        req.userId = payload.userId;

        next();
    })

    }
}

function validateToke(req,res,next){
    const authHeader = req.headers["authorization"];

    if(authHeader == undefined){
        res.status(401).json({message: "token required"}).end();
    }

    //Bearer token

    const tokenType = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];



    if(token==undefined){
        res.status(401).json({message: "token required"}).end();
    }
    
    if(tokenType!='Bearer'){
        res.status(401).json({message: "incorrect token_type"}).end();
    }

    jwt.verify(token,process.env.JWT_SECRET_KEY,(err, payload)=>{
        if(err)
            res.status(401).end();
        
        req.authorized = true;
        req.userId = payload.userId;

        next();
    })

    
}

app.get('/',(req,res)=>{
    res.send("<h1>Public Area</h1>");
})

app.get('/private',validateAuth('private'),(req,res)=>{

    if(req.authorized){
        res.send("<h1>Private Area</h1>");
    }

    res.status(401).json({message: `user '${req.userId}' not authorized`}).end();
})


app.post('/auth/token',(req,res)=>{
    const data = req.body;

    
    const payload = {
        userId: data.userId
    }

    const accessToken = jwt.sign(payload,process.env.JWT_SECRET_KEY,{ expiresIn: process.env.EXPIRATION_SECONDS + 's'});

    res.json({
        access_token: accessToken,
        token_type: 'Bearer',
        expires_in: process.env.EXPIRATION_SECONDS
    }).end();

})

