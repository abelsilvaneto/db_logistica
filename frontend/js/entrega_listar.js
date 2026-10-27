const token = localStorage.getItem('token')

if (!token) {
    location.href = '../index.html'
}

let resposta = document.getElementById('resposta')
let btn_listar = document.getElementById('btn_listar')

btn_listar.addEventListener('click', (e) => {
    e.preventDefault()

    fetch('http://localhost:3000/entregas', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(res => res.json())
        .then(dados => {
            resposta.innerHTML = ''
            resposta.innerHTML += `
            <table border="1">
                ${criarThead()}
                ${criarTbody(dados)}
            </table>
        `
        })
        .catch((err) => {
            console.error('Erro ao listar os dados', err)
            resposta.innerHTML = '<p>Erro ao conectar com o servidor.</p>'
        })
})

function criarTbody(dados) {
    let corpo = '<tbody>'
    dados.forEach(el => {
        const desCarga = el.CargaEntrega ? `${el.CargaEntrega.descricao}  ${el.CargaEntrega.codRastreio}` : 'N/A'

        corpo += `<tr>`
        corpo += `<td>${el.codEntrega || el.id}</td>`
        corpo += `<td>${el.cidadeDestino}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${el.data}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${desCarga}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead() {
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Cidade/Destino</th>
                <th>Status</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Código Carga</th>
            </tr>
        </thead>
    `
}