
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
  <div>
    <nav>
      <RouterLink to="/">
        Catálogo
      </RouterLink>

      <RouterLink to="/items/new">
        Adicionar modelo
      </RouterLink>

      <RouterLink to="/pokemon">
        Paginação Pokémon
      </RouterLink>
    </nav>

    <hr>

    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  padding: 15px 0;
}

nav a {
  color: #5c2030;
  text-decoration: none;
}

nav a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>




