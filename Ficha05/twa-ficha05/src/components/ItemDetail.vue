
<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <h2>Detalhes do produto</h2>

    <p>Nome: {{ item.name }}</p>
    <p>Preço: {{ item.price.toFixed(2) }} €</p>
    <p>Categoria: {{ item.category }}</p>
    <p>Tags: {{ item.tags.join(', ') }}</p>
    <p>Fornecedor: {{ item.provider.name }}</p>
    <p>País: {{ item.provider.country }}</p>
  </section>
</template>

<style scoped>
section {
  margin-top: 20px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2 {
  color: #5b1f2e;
  margin-bottom: 15px;
}

p {
  margin: 8px 0;
}
</style>
