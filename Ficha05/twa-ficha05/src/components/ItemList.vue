
<script setup>
defineProps({
  items: { type: Array, required: true },
  selectedId: { type: Number, default: null }
})

const emit = defineEmits(['select'])
</script>

<template>
  <ul>
    <li
      v-for="item in items"
      :key="item.id"
      :class="{ selected: item.id === selectedId }"
      @click="emit('select', item.id)"
    >
      {{ item.name }} — {{ item.price.toFixed(2) }} €
    </li>
  </ul>
</template>

<style scoped>
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
</style>
