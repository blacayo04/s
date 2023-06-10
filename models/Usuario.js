const { DataTypes } = require("sequelize");
const db = require("../db/database");


const Usuario = db.define('Usuarios',{
    nombre:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
        unique: true,
    },
    estado:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

module.exports = Usuario;