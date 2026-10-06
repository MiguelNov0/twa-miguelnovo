import assert from 'node:assert/strict'
import { models } from './data.js'
import {byCategory, search, total, top, categories, withDiscount} from './catalog.js'

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