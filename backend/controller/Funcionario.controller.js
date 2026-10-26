const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Cadastrar = async (req,res)=>{
    const valor = req.body

    if(!valor.nome || !valor.email || !valor.senha){
        return res.status(401).json({message: 'coloque todos os valores para continuar'})
    }

    try{
        
    const senhaCrpto = cryptoJs.AES.encrypt(valor.senha, CHAVE_SEGREDO).toString()

    await Funcionario.create({
        nome: valor.nome,
        email: valor.email,
        senha: senhaCrpto
    })

    res.status(201).json({message:'Operação realizada'})
    }catch(err){
    res.status(500).json({message: 'Erro ao realizar a operação'})
    console.error('Erro ao realizar a operação',err)
    }
}

module.exports = {Cadastrar}
