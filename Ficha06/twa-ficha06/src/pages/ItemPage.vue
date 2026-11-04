
<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { items, status, error, load } from '../store.js'
import ItemDetail from '../components/ItemDetail.vue'

const route = useRoute()

// O ID que vem do URL é uma string
const id = computed(() => Number(route.params.id))

// Procurar o modelo correspondente no catálogo
const selected = computed(() =>
  (items.value ?? []).find(item => item.id === id.value)
)

// Carregar o catálogo se ainda não estiver disponível
onMounted(() => {
  if (!items.value) load()
})
</script>

<template>
  <main>
    <RouterLink to="/">
      ← Voltar ao catálogo
    </RouterLink>

    <p v-if="status === 'loading'">
      A carregar modelo...
    </p>

    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <div v-else-if="status === 'ready'">
      <ItemDetail
        v-if="selected"
        :item="selected"
      />

      <p v-else>
        Modelo não encontrado.
      </p>
    </div>
  </main>
</template>
