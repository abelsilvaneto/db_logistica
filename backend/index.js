const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')


require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/Auth.controller')
const funcionarioController = require('./controller/Funcionario.controller')
const CargaController = require('./controller/Carga.controller')
const entregaController = require('./controller/Entrega.controller')
const motoristaController = require('./controller/Motorista.controller')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.post('/funcionario', funcionarioController.Cadastrar)
app.post('/login', authController.Login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação de motoristas Rodando!' })
})


app.use(authMiddleware)


app.post('/motorista', motoristaController.Cadastrar)
app.get('/motoristas', motoristaController.Listar)
app.get('/motorista/buscarNome/:nome', motoristaController.ConsultarNome)
app.get('/motorista/:id', motoristaController.ConsultarCod)
app.put('/motorista/:id', motoristaController.Atualizar)
app.delete('/motorista/:id', motoristaController.Apagar)


app.post('/carga', CargaController.Cadastrar)
app.post('/entrega', entregaController.Cadastrar)
app.put('/entrega/:id', entregaController.Atualizar)
app.get('/entregas', entregaController.Listar)


conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })