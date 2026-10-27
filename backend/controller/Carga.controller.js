const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

const Cadastrar = async (req,res)=>{
        const valor = req.body

    if (!valor.descricao || !valor.peso || !valor.volume || !valor.codRastreio || !valor.idMotorista) {
        return res.status(400).json({ message: 'Todos os campos (nome, email, senha, cpf, endereço, celular) são obrigatórios!' })
    }

    const motorista = await Motorista.findByPk(valor.idMotorista)

    if(!motorista){
        return res.status(401).json({message: 'motorista não encontrado'})
    }

    try {

        await Carga.create(valor)

        return res.status(201).json({ message: 'carga cadastrado com sucesso!' })
    } catch (err) {
        console.error('Erro ao cadastrar carga:', err)
        return res.status(500).json({ message: 'Erro ao cadastrar carga!' })
    }
}

module.exports = {Cadastrar}