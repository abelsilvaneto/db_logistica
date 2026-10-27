
const Motorista = require('../models/Motorista')
const cryptoJs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.nome || !valor.cnh || !valor.cpf || !valor.telefone) {
        return res.status(401).json({ message: 'coloque todos os valores para continuar' })
    }

    if (valor.cpf.length !== 11) {
        return res.status(401).json({ message: 'cpf tem que ter 11 numeros' })
    }

    try {

        const cnhCrpto = cryptoJs.AES.encrypt(valor.cnh, CHAVE_SEGREDO).toString()
        const cpfCrpto = cryptoJs.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()

        await Motorista.create({
            nome: valor.nome,
            cnh: cnhCrpto,
            cpf: cpfCrpto,
            telefone: valor.telefone
        })

        res.status(201).json({ message: 'Operação realizada' })
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const Listar = async (req, res) => {
    try {
        const motoristas = await Motorista.findAll()
        let resultado = ''
        motoristas.forEach((el) => {
            let cpfDescrypto = ''
            let cnhDescrypto = ''
            try {
                const bytesCpf = cryptoJs.AES.decrypt(valor.cpf, CHAVE_SEGREDO)
                const bytesCnh = cryptoJs.AES.decrypt(valor.cnh, CHAVE_SEGREDO)
                cpfDescrypto = bytesCpf.toString(cryptoJs.enc.Utf8)
                cnhDescrypto = bytesCnh.toString(cryptoJs.enc.Utf8)
            } catch (err) {
                cpfDescrypto = 'Erro nao descryptografia'
                cnhDescrypto = 'Erro nao descryptografia'
            }
            resultado.push({
                codMotorista: el.codMotorista,
                nome: el.nome,
                cnh: cnhDescrypto,
                cpf: cpfDescrypto,
                telfone: el.telefone
            })
        })

        return res.status(200).json(resultado)
    } catch (err) {
        res.status(500).json({ message: 'Erro ao realizar a operação' })
        console.error('Erro ao realizar a operação', err)
    }
}

const ConsultarCod = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(401).json({ message: ' motorista não achado' })
        }

        const bytesCpf = cryptoJs.AES.decrypt(valor.cpf, CHAVE_SEGREDO)
        const bytesCnh = cryptoJs.AES.decrypt(valor.cnh, CHAVE_SEGREDO)
        console.log('Bytes do cpf =', bytesCpf)
        console.log('Bytes da cnh =', bytesCnh)
        const cnhDescrypto = bytesCnh.toString(cryptoJs.enc.Utf8)
        const cpfDescrypto = bytesCpf.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescrypto,
            cpf: cpfDescrypto,
            telefone: motorista.telefone
        })
    } catch (err) {
        console.error('Erro ao realizar a operação', err)
        res.status(500).json({ message: 'Erro ao realizar a operação' })
    }
}

const ConsultarNome = async (req, res) => {
    const nome = req.params.nome

    try {
        const motorista = await Motorista.findOne({ where: { nome: nome } })
        if (!motorista) {
            return res.status(401).json({ message: ' motorista não achado' })
        }

        const bytesCpf = cryptoJs.AES.decrypt(valor.cpf, CHAVE_SEGREDO)
        const bytesCnh = cryptoJs.AES.decrypt(valor.cnh, CHAVE_SEGREDO)
        console.log('Bytes do cpf =', bytesCpf)
        console.log('Bytes da cnh =', bytesCnh)
        const cnhDescrypto = bytesCnh.toString(cryptoJs.enc.Utf8)
        const cpfDescrypto = bytesCpf.toString(cryptoJs.enc.Utf8)

        return res.status(200).json({
            codMotorista: motorista.codMotorista,
            nome: motorista.nome,
            cnh: cnhDescrypto,
            cpf: cpfDescrypto,
            telefone: motorista.telefone
        })
    } catch (err) {
        console.error('Erro ao realizar a operação', err)
        res.status(500).json({ message: 'Erro ao realizar a operação' })
    }
}

const Apagar = async (req, res) => {
    const id = req.params.id

    try {
        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(401).json({ message: ' motorista não achado' })
        }

        await Motorista.destroy({ where: { codMotorista: id } })

        return res.status(200).json({ message: 'Operação realizada com sucesso' })
    } catch (err) {
        console.error('Erro ao realizar a operação', err)
        res.status(500).json({ message: 'Erro ao realizar a operação' })
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valor = req.body

    if (!valor.nome || !valor.cnh || !valor.cpf || !valor.telefone) {
        return res.status(401).json({ message: 'coloque todos os valores para continuar' })
    }

    try {

        const motorista = await Motorista.findByPk(id)
        if (!motorista) {
            return res.status(401).json({ message: 'Motorista não achado' })
        }

        const dadosAtualizado = { ...valor }
        if (valor.cpf) {
            if (valor.cpf.lenght !== 11) {
                return res.status(401).json({ message: 'cpf tem que ter 11 numeros' })
            }
            dadosAtualizado.cpf = cryptoJs.AES.encrypt(valor.cpf, CHAVE_SEGREDO).toString()
        }

        if (valor.cnh) {
            dadosAtualizado.cnh = cryptoJs.AES.encrypt(valor.cnh, CHAVE_SEGREDO).toString()
        }

        await Motorista.update(dadosAtualizado,{where: {codMotorista: id}})
        return res.status(200).json({message:'Operação realizada com sucesso'})
    } catch (err) {
      req.status(500).json({message:'Erro ao realizar a operação'})
      console.error('Erro ao realizar a operação', err)
    }
}

module.exports = { Cadastrar, Listar, ConsultarCod, ConsultarNome, Apagar, Atualizar }
