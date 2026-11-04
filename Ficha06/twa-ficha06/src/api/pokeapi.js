
import { getJSON } from './getJSON.js'

const BASE = 'https://pokeapi.co/api/v2'

// Quantos Pokémon aparecem em cada página
export const PAGE = 20

// Obter uma página de Pokémon
export function list(page = 1) {
  return getJSON(
    `${BASE}/pokemon?limit=${PAGE}&offset=${(page - 1) * PAGE}`
  )
}

// Obter os detalhes de um Pokémon pelo nome
export function get(name) {
  return getJSON(`${BASE}/pokemon/${name}`)
}
