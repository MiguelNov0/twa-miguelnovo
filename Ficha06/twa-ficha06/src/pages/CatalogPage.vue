
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items, status, error, load } from '../store.js'
import { search, byCategory, sortByPrice, categories } from '../catalog.js'
import ItemList from '../components/ItemList.vue'

const router = useRouter()

const query = ref('')
const category = ref('')
const sortDir = ref('desc')

onMounted(() => {
  if (!items.value) load()
})

// Filtrar e ordenar os modelos de IA
const visible = computed(() => {
  let list = search(items.value ?? [], query.value)

  if (category.value) {
    list = byCategory(list, category.value)
  }

  return sortByPrice(list, sortDir.value)
})

const cats = computed(() => categories(items.value ?? []))

// Abrir a página de detalhe do modelo selecionado
function selectItem(id) {
  router.push(`/items/${id}`)
}
</script>

<template>
  <main>
    <h1>Catálogo de Modelos de IA</h1>

    <p v-if="status === 'loading'">
      A carregar modelos...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <div v-else-if="status === 'ready'">
      <input
        v-model="query"
        placeholder="Pesquisar modelos..."
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

      <p>{{ visible.length }} modelos encontrados</p>

      <ItemList
        :items="visible"
        :selected-id="null"
        @select="selectItem"
      />

      <p v-if="visible.length === 0">
        Nenhum modelo encontrado.
      </p>

      <RouterLink to="/items/new">
        Adicionar novo modelo
      </RouterLink>
    </div>
  </main>
</template>
