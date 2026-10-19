
<script setup>
import { ref, computed } from 'vue'
import { search, byCategory, sortByPrice, categories } from './catalog.js'


// Estado da aplicação
const status = ref('loading')
const error = ref('')
const items = ref([])
const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)


async function load() {
  status.value = 'loading'
  error.value = ''

  try {
    const res = await fetch('/items.json')

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }

    items.value = await res.json()
    status.value = 'ready'

  } catch (err) {
    error.value = err.message
    status.value = 'error'

  } finally {
    console.log('Carregamento terminado')
  }
}

load()


const visible = computed(() => {
  let list = search(items.value, query.value)

  if (category.value) {
    list = byCategory(list, category.value)
  }

  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value))

const selected = computed(() =>
  items.value.find(item => item.id === selectedId.value)
)

</script>


<template>
  <h1>Catálogo</h1>

  <p v-if="status === 'loading'">
    A carregar produtos...
  </p>

  <div v-else-if="status === 'error'">
    <p>Erro: {{ error }}</p>
    <button @click="load">Tentar novamente</button>
  </div>

  <div v-else>
    <input
      v-model="query"
      placeholder="Pesquisar produtos..."
    >

    <select v-model="category">
      <option value="">Todas as categorias</option>
      <option
        v-for="cat in cats"
        :key="cat"
        :value="cat"
      >
        {{ cat }}
      </option>
    </select>

    <button
      @click="sortDir = sortDir === 'desc' ? 'asc' : 'desc'"
    >
      Ordenar por preço ({{ sortDir }})
    </button>

    <p>{{ visible.length }} produtos encontrados</p>

    <ul>
      <li
        v-for="item in visible"
        :key="item.id"
        :class="{ selected: item.id === selectedId }"
        @click="selectedId = item.id"
      >
        {{ item.name }} — {{ item.price.toFixed(2) }} €
      </li>
    </ul>

    <section v-if="selected">
      <h2>Detalhes do produto</h2>

      <p>Nome: {{ selected.name }}</p>
      <p>Preço: {{ selected.price.toFixed(2) }} €</p>
      <p>Categoria: {{ selected.category }}</p>
      <p>Tags: {{ selected.tags.join(', ') }}</p>
      <p>Fornecedor: {{ selected.provider.name }}</p>
      <p>País: {{ selected.provider.country }}</p>
    </section>
  </div>
</template>



<style scoped>
h1 {
  text-align: center;
  color: #5b1f2e;
}

input, select, button {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  cursor: pointer;
  background-color: #5b1f2e;
  color: white;
}

button:hover {
  background-color: #813448;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 12px;
  margin: 5px 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

li:hover {
  background-color: #f2e8ec;
}

.selected {
  background-color: #e7cbd5;
  border-color: #5b1f2e;
}

section {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

