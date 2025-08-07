'use strict'

const BASE_URL = 'http://localhost:3000'
const fotosContainer = document.querySelector('.slider-container')
let currentIndex = 0

// Função para buscar fotos da API
async function getFotos() {
    try {
        const response = await fetch(`${BASE_URL}/fotos`)
        if (!response.ok) {
            throw new Error('Erro ao buscar fotos')
        }
        const data = await response.json()
        return data || []
    } catch (error) {
        console.error('Erro:', error)
        return []
    }
}

// Função para criar o card da imagem
function criarCard(foto) {
    const card = document.createElement('div')
    card.classList.add('card')

    const img = document.createElement('img')
    img.src = foto.imagem
    img.alt = foto.titulo || 'Imagem'

    const legenda = document.createElement('p')
    legenda.textContent = foto.legenda || 'Sem legenda'

    const data = document.createElement('p')
    data.textContent = foto.data || 'Data não disponível'

    card.appendChild(img)
    card.appendChild(legenda)
    card.appendChild(data)

    return card
}

// Função para carregar as fotos e criar os cards
async function carregarFotos() {
    const fotos = await getFotos()
    if (fotos.length === 0) {
        console.error('Nenhuma foto encontrada.')
        return
    }

    fotos.forEach(foto => {
        const card = criarCard(foto)
        fotosContainer.appendChild(card)
    })

    updateSlide() 
}

// Função para atualizar o slide
function updateSlide() {
    const slideWidth = document.querySelector('.slider').offsetWidth
    fotosContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`
}

// Função para ir ao slide anterior
function prevSlide() {
    const totalSlides = document.querySelectorAll('.card').length
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
    updateSlide()
}

// Função para ir ao próximo slide
function nextSlide() {
    const totalSlides = document.querySelectorAll('.card').length
    currentIndex = (currentIndex + 1) % totalSlides
    updateSlide()
}

// Carregar as fotos ao carregar a página
carregarFotos()