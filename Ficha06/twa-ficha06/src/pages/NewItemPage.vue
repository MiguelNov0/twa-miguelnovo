
<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { items, load, addItem } from '../store.js'
import { categories } from '../catalog.js'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()

// Categorias disponíveis no catálogo
const cats = computed(() => categories(items.value ?? []))

// Carregar os dados caso ainda não estejam disponíveis
onMounted(() => {
  if (!items.value) load()
})

// Guardar o modelo e abrir a sua página de detalhes
function onSave(item) {
  const id = addItem(item)
  router.push(`/items/${id}`)
}
</script>

<template>
  <main>
    <RouterLink to="/">
      ← Voltar ao catálogo
    </RouterLink>

    <h1>Adicionar modelo de IA</h1>

    <ItemForm
      :cats="cats"
      @save="onSave"
    />
  </main>
</template>
