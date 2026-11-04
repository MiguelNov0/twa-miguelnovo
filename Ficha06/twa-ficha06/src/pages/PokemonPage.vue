
<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoad } from '../composables/useLoad.js'
import { list, PAGE } from '../api/pokeapi.js'

const route = useRoute()
const router = useRouter()

// A página atual vem do URL
const page = computed(() => {
  const p = Number(route.query.page ?? 1)
  return Number.isInteger(p) && p > 0 ? p : 1
})

// Carregar os Pokémon da página atual
const { status, error, data, load } =
  useLoad(() => list(page.value))

// Quando o número da página muda, carregar novos dados
watch(page, load)

// Número total de páginas
const pages = computed(() =>
  Math.ceil((data.value?.count ?? 0) / PAGE)
)

// Navegar para outra página
function go(p) {
  if (p < 1 || p > pages.value) return

  router.push({
    query: { page: p }
  })
}
</script>

<template>
  <main>
    <h1>Lista de Pokémon</h1>

    <p>
      Exemplo de paginação — Ficha 06
    </p>

    <div v-if="status === 'loading'">
      A carregar Pokémon...
    </div>

    <div v-else-if="status === 'error'">
      <p>Erro: {{ error }}</p>
      <button @click="load">Tentar novamente</button>
    </div>

    <div v-else-if="status === 'ready'">
      <p>{{ data.count }} Pokémon encontrados</p>

      <ul>
        <li
          v-for="pokemon in data.results"
          :key="pokemon.name"
        >
          {{ pokemon.name }}
        </li>
      </ul>
    </div>

    <div class="pagination">
      <button
        :disabled="page <= 1 || status !== 'ready'"
        @click="go(page - 1)"
      >
        ← Anterior
      </button>

      <span>
        Página {{ page }} de {{ pages }}
      </span>

      <button
        :disabled="page >= pages || status !== 'ready'"
        @click="go(page + 1)"
      >
        Seguinte →
      </button>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 20px;
}

ul {
  padding-left: 25px;
}

li {
  padding: 6px 0;
  text-transform: capitalize;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
