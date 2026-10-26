const db = require('../db/conn')
const {DataTypes} = require('sequelize')

const Entrega = db.define('entrega',{
    codEntrega:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cidadeDestino:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('ENTREGUE','TRANSITO'),
        allowNull: false
    },
    data:{
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora:{
        type: DataTypes.TIME,
        allowNull: false
    },
    idCarga:{
        type: DataTypes.INTEGER,
        references:{
            model: 'cargas',
            key: 'codCarga'
        },
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'entregas'
})

module.exports = Entrega