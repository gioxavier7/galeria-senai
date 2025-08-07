'use strict'

const BASE_URL= 'http://localhost:3000'

// função crud 
async function getFotos(){
    const response = await fetch(`${BASE_URL}/fotos`)
    const data = await response.json()
    return data
}

//funcao teste
async function buscarFotos(){
    try {
        const response = await fetch(`${BASE_URL}/fotos`)
        if (!response.ok) {
            throw new Error('Erro ao buscar fotos');
        }
        const data = await response.json()

        return data.fotos || []

    } catch (error) {
        return []
    }
}

async function carregarFotos() {
    fotosContainer.appendChild()
    let fotos = await buscarFotos()

    //buscar midias relacinadas
    for(const foto of fotos){
        try {
            fotos.imagem= await buscarFotos(foto.id)
        } catch (error) {
            fotos.imagem = []
        }
    }
}

// funxao para criar o card da imagem
const fotosContainer = document.getElementById('gallery')
function criarCard(foto) {
    const card = document.createElement('div')
    card.classList.add('card')

    const img = document.createElement('img')
    img.src = foto.imagem
    img.alt = foto.titulo

    const legenda = document.createElement('p')
    legenda.textContent = foto.legenda

    const data = document.createElement('p')
    data.textContent = foto.data

    card.appendChild(img)
    card.appendChild(legenda)
    card.appendChild(data)

    fotosContainer.appendChild(card)
}

// função para carregar as fotos
async function carregarGaleria() {
    const fotos = await getFotos()
    fotos.forEach(criarCard)
}

// Chama a função para carregar as fotos ao carregar a página
window.addEventListener('load', carregarGaleria)
// const fotos = await getFotos()


// fotos.forEach(criarCard)


