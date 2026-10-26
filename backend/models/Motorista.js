const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Motorista = db.define('motorista', {
    codMotorista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cnh:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps:false,
    tableName: 'motoristas'
})

module.exports = Motorista