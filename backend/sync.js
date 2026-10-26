const conn = require('./db/conn')
const {Carga, Motorista, Entrega, Funcionario} = require('./models/rel')

async function SyncDataBase() {
    try{
    await conn.sync({force: true})
    console.log('Fazendo conexão com o banco')
    }catch(err){
    console.error('Erro ao realizar o sync', err)
    }finally{
        await conn.close()
        console.log('Fechando a conexão com o banco')
    }
}

SyncDataBase()