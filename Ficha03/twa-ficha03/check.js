import assert from 'node:assert/strict'

import { models } from '../../Ficha02/twa-ficha02/data.js'

import {
  byCategory,
  search,
  total,
  top,
  categories,
  withDiscount,
  sortByPrice
} from './src/catalog.js'

assert.equal( byCategory(models, 'Image').length, 2)

assert.equal( search(models, 'programacao').length, 6)

assert.equal(total(models), 126);

assert.equal(top(models, 1)[0].name, 'Gemini');

assert.deepEqual(categories(models), ['Code', 'Image', 'LLM', 'Multimodal']);
// o withDiscount tive dificuldade então pedi à IA
assert.deepEqual(
  [
    withDiscount(models, 10)[0].price,
    models[0].price
  ],
  [18, 20]
)



// Testar ordenação decrescente
const decrescente = sortByPrice(models, 'desc')

assert.equal(decrescente[0].name, 'Gemini')

// Testar ordenação crescente
const crescente = sortByPrice(models, 'asc')

assert.equal(crescente[0].price, 10)

// Confirmar que o array original não foi alterado
assert.equal(models[0].name, 'GPT')

console.log('Todos os testes passaram!')