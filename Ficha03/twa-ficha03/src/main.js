import './style.css'
import { search, byCategory, categories, sortByPrice } from './catalog.js'

const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null
}

async function load() {
  try {
    const resposta = await fetch('/items.json')

    if (!resposta.ok) {
      throw new Error(`Erro HTTP: ${resposta.status}`)
    }

    state.items = await resposta.json()
    state.status = 'ready'

    console.log('Modelos carregados:', state.items)

  } catch (erro) {
    state.status = 'error'
    state.error = erro.message

    console.error('Erro ao carregar modelos:', erro)

  } finally {
    console.log('Tentativa de carregamento terminada.')
    renderCategories()
    render()
  }

}


function renderCategories() {
  const seletor = document.querySelector('#category')

  seletor.replaceChildren()

  const todas = document.createElement('option')
  todas.value = ''
  todas.textContent = 'Todas as categorias'
  seletor.append(todas)

  categories(state.items).forEach((categoria) => {
    const opcao = document.createElement('option')

    opcao.value = categoria
    opcao.textContent = categoria

    seletor.append(opcao)
  })

  seletor.value = state.category
}


function render() {
  const lista = document.querySelector('#list')
  const status = document.querySelector('#status')

  lista.replaceChildren()

  if (state.status === 'loading') {
    status.textContent = 'A carregar modelos...'
    return
  }

  if (state.status === 'error') {
    status.textContent = `Erro: ${state.error}`
    return
  }

  let resultados = search(state.items, state.query)

  if (state.category !== '') {
  resultados = byCategory(resultados, state.category)
  }

  resultados = sortByPrice(resultados, state.sortDir)

  status.textContent = `${resultados.length} modelos encontrados`

  resultados.forEach((modelo) => {
  const li = document.createElement('li')

  const botao = document.createElement('button')
  botao.type = 'button'
  botao.textContent = `${modelo.name} — ${modelo.price} €`

  botao.addEventListener('click', () => {
    state.selectedId = modelo.id
    render()
  })

  li.append(botao)
  lista.append(li)
  })
  
  renderDetail()
}

// A função render() termina aqui.


function renderDetail() {
  const detalhe = document.querySelector('#detail')

  detalhe.replaceChildren()

  const titulo = document.createElement('h2')
  titulo.textContent = 'Detalhes do modelo'
  detalhe.append(titulo)

  const modelo = state.items.find(
    (item) => item.id === state.selectedId
  )

  if (!modelo) {
    const mensagem = document.createElement('p')
    mensagem.textContent = 'Seleciona um modelo para ver os detalhes.'
    detalhe.append(mensagem)
    return
  }

  const informacoes = [
    `Nome: ${modelo.name}`,
    `Categoria: ${modelo.category}`,
    `Preço: ${modelo.price} €`,
    `Tags: ${modelo.tags.join(', ')}`,
    `Fornecedor: ${modelo.provider.name}`,
    `País: ${modelo.provider.country}`
  ]

  informacoes.forEach((texto) => {
    const p = document.createElement('p')
    p.textContent = texto
    detalhe.append(p)
  })
}

const pesquisa = document.querySelector('#search')

pesquisa.addEventListener('input', (evento) => {
  state.query = evento.target.value
  render()
})

const seletorCategoria = document.querySelector('#category')

seletorCategoria.addEventListener('change', (evento) => {
  state.category = evento.target.value
  render()
})

const botaoOrdenar = document.querySelector('#sort')

botaoOrdenar.addEventListener('click', () => {
  if (state.sortDir === 'desc') {
    state.sortDir = 'asc'
  } else {
    state.sortDir = 'desc'
  }

  botaoOrdenar.textContent =
    state.sortDir === 'desc'
      ? 'Ordenar por preço ↓'
      : 'Ordenar por preço ↑'

  render()
})

render()
load()