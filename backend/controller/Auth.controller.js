const Funcionario = require('../models/Funcionario')
const CHAVE_SEGREDO = 'chave_baixa'
const cryptoJs = require('crypto-js')

const Login = async (req, res) => {
    const valor = req.body

    if (!valor.senha || !valor.email) {
        return res.status(401).json({ message: 'Digite o email e a senha para continuar' })
    }

    try {
        const funcionario = await Funcionario.findOne({ where: { email: valor.email } })

        if (!funcionario) {
            return res.status(401).json({ message: 'Funcionario não encontrado' })
        }

        const bytes = cryptoJs.AES.decrypt(valor.senha, CHAVE_SEGREDO).toString()
        console.log(bytes)
        const senhaDC = bytes.toString(cryptoJs.enc.Utf8)
        console.log(senhaDC)


        if (valor.senha !== senhaDC) {
            return res.status(401).json({ message: 'Email ou senha errada' })
        }

        const TempoEmMs = 3 * 60 * 60 * 1000
        const TempoExpira = Date.now() + TempoEmMs

        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: TempoExpira
        }


        const token = cryptoJs.AES.encrypt(JSON.toString(payload),CHAVE_SEGREDO).toString()

        return res.status(200).json({message: 'Login realizado', token: token, nome:funcionario.nome})
    } catch (err) {
      res.status(500).json({message: 'Erro na operação'})
      console.error('Erro na operação',err)
    }
}

module.exports = {Login}