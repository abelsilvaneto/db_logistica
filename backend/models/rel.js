const Carga = require('./Carga')
const Motorista = require('./Motorista')
const Entrega = require('./Entrega')
const Funcionario = require('./Funcionario')

Motorista.hasMany(Carga,{
    as: 'CargaMotorista',
    foreignKey: 'idMotorista',
    onDelete: 'CASCADE'
})

Carga.belongsTo(Motorista,{
    as: 'MotoristaCarga',
    foreignKey: 'idMotorista',
    allowNull: false
})

Carga.hasMany(Entrega,{
    as: 'CargaEntrega',
    foreignKey: 'idCarga',
    onDelete: 'CASCADE'
})

Entrega.belongsTo(Carga,{
    as: 'EntregaCarga',
    foreignKey: 'idCarga',
    allowNull: false
})

module.exports = {Carga, Motorista, Entrega, Funcionario}