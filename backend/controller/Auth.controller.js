const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Login = async (req, res) => {
    const valor = req.body

    
    if (!valor.senha || !valor.email) {
        return res.status(401).json({ message: 'Digite o email e a senha para continuar'})
    }

    try {
        
        const funcionario = await Funcionario.findOne({where: { email: valor.email }})

        if (!funcionario) {
            return res.status(401).json({ message: 'Funcionario não encontrado'})
        }


        const bytes = cryptoJs.AES.decrypt(
            funcionario.senha,
            CHAVE_SEGREDO
        )

        const senhaDC = bytes.toString(cryptoJs.enc.Utf8)


        if (!senhaDC || valor.senha !== senhaDC) {return res.status(401).json({message: 'Email ou senha errada'})
        }

        
        const TempoEmMs = 3 * 60 * 60 * 1000
        const TempoExpira = Date.now() + TempoEmMs

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: TempoExpira
        }


        const token = cryptoJs.AES.encrypt(JSON.stringify(payload),CHAVE_SEGREDO ).toString()

        return res.status(200).json({
            message: 'Login realizado',
            token: token,
            nome: funcionario.nome
        })

    } catch (err) {
        console.error('Erro na operação:', err)
        return res.status(500).json({    message: 'Erro na operação'})
    }
}


module.exports = {Login}