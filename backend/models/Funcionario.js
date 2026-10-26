const db = require('../db/conn')
const { DataTypes } = require('sequelize')

const Funcionario = db.define('funcionario', {
    codFuncionario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING(50),
        cnh: DataTypes.STRING,
        cpf: DataTypes.STRING,
        telefone: DataTypes.INTEGER
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps:false,
    tableName: 'funcionarios'
})

module.exports = Funcionario