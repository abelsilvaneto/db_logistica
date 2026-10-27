const cryptoJs = require('crypto-js')
const CHAVE_SEGREDO = 'chave_baixa'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']
    console.log(token)
    
    if(!token){
        return res.status(401).json({message: 'acesso negado token não fornecido'})
    }

    try{
     const bytes = cryptoJs.AES.decrypt(token,CHAVE_SEGREDO)
     const dadosDescripto = bytes.toString(cryptoJs.enc.Utf8)

     if(!dadosDescripto){
        return res.status(401).json({message: 'Token invalido'})
     }

     const payload = JSON.parse(dadosDescripto)

     if(Date.now() > payload.expiraEm){
        return res.status(401).json({message: 'Tempo expirado'})
     }

     next()
    }catch(err){
     return res.status(500).json({message: 'Erro ao realizar a ação'})
    }
}

module.exports = authMiddleware