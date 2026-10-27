
<script setup>
import { ref, computed, watch } from 'vue'
import { useLoad } from './composables/useLoad.js'
import { getJSON } from './api/getJSON.js'
import { search, byCategory, sortByPrice, categories } from './catalog.js'
import ItemList from './components/ItemList.vue'
import ItemDetail from './components/ItemDetail.vue'
import ItemForm from './components/ItemForm.vue'


// Estado da aplicação

const { status, error, data: items, load } =
  useLoad(() => getJSON('/items.json'))

const query = ref('')
const category = ref('')
const sortDir = ref('desc')
const selectedId = ref(null)


  


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


watch(query, () => {
  selectedId.value = null
})



const nextId = computed(() =>
  Math.max(0, ...items.value.map(item => item.id)) + 1
)

function addItem(item) {
  items.value.push({
    id: nextId.value,
    ...item,
    provider: {
      name: 'Manual',
      country: 'N/A'
    }
  })
}


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

    

    <ItemList
      :items="visible"
      :selected-id="selectedId"
      @select="selectedId = $event"
    />

    <ItemDetail
      v-if="selected"
      :item="selected"
    />

    
    <ItemForm
      :cats="cats"
      @save="addItem"
    />


  </div>
</template>





<style scoped>
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
</style>


