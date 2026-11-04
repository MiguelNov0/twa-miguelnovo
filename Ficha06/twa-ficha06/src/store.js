
import { ref } from 'vue'
import { getJSON } from './api/getJSON.js'

// Dados partilhados entre as páginas
export const items = ref(null)
export const status = ref('idle')
export const error = ref('')

// Carregar o catálogo apenas quando necessário
export async function load() {
  status.value = 'loading'
  error.value = ''

  try {
    items.value = await getJSON('/items.json')
    status.value = 'ready'
  } catch (err) {
    error.value = err.message
    status.value = 'error'
  }
}

// Adicionar um novo modelo ao catálogo
export function addItem(item) {
  const id = Math.max(
    0,
    ...(items.value ?? []).map(i => i.id)
  ) + 1

  if (!items.value) items.value = []

  items.value.push({
    id,
    ...item,
    provider: { name: 'Manual', country: 'N/A' }
  })

  return id
}
