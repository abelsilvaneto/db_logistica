const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')


const Cadastrar = async (req, res) => {
    const valor = req.body

    if (!valor.cidadeDestino || !valor.status || !valor.data || !valor.hora || !valor.idCarga) {
        return res.status(400).json({ message: 'Todos os campos (data, hora, idBicicleta, idCiclista) são obrigatórios!' })
    }

    try {
        const carga = await Carga.findByPk(valor.idCarga)
        if (!carga) {
            return res.status(404).json({ message: 'carga informado não existe!' })
        }

        const novaEntrega = await Entrega.create(valor)
        return res.status(201).json({ message: 'Entrega registrado com sucesso!', agendamento: novoAgendamento })
    } catch (err) {
        console.error('Erro ao criar Entrega:', err)
        return res.status(500).json({ message: 'Erro ao registrar Entrega!' })
    }
}

const Atualizar = async (req, res) => {
    const id = req.params.id
    const valores = req.body

    try {
        const entrega = await Entrega.findByPk(id)
        if (!entrega) {
            return res.status(404).json({ message: 'Entrega não encontrado!' })
        }

        if (valores.idCarga) {
            const carga = await Carga.findByPk(valores.idCarga)
            if (!carga) {
                return res.status(404).json({ message: 'Carga informado não existe!' })
            }
        }

        await Entrega.update(valores, { where: { codEntrega: id } })
        return res.status(200).json({ message: 'Entrega atualizado com sucesso!' })
    } catch (err) {
        console.error('Erro ao atualizar Entrega:', err)
        return res.status(500).json({ message: 'Erro ao atualizar Entrega!' })
    }
}

const Listar = async (req, res) => {
    try {
        const entrega = await Entrega.findAll({
            order: [['data', 'ASC']],
            include: [
                {
                    model: Ciclista,
                    as: 'CargaEntrega',
                    attributes: ['codCarga', 'descricao', 'peso', 'volume', 'codRastreio', 'idMotorista']
                }
            ]
        })

        return res.status(200).json(entrega)
    } catch (err) {
        console.error('Erro ao listar entrega:', err)
        return res.status(500).json({ message: 'Erro ao listar entrega!' })
    }
}

module.exports = { Cadastrar, Atualizar, Listar }