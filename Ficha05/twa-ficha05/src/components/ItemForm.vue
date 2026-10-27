
<script setup>
import { reactive, computed } from 'vue'

defineProps({
  cats: { type: Array, required: true }
})

const emit = defineEmits(['save'])

const empty = {
  name: '',
  category: '',
  price: null,
  tags: ''
}

const form = reactive({ ...empty })

const errors = computed(() => {
  const e = {}

  if (form.name.length < 3) {
    e.name = 'O nome deve ter pelo menos 3 caracteres'
  }

  if (!form.category) {
    e.category = 'Escolhe uma categoria'
  }

  if (!(form.price > 0)) {
    e.price = 'O preço deve ser superior a zero'
  }

  return e
})

const isValid = computed(() =>
  Object.keys(errors.value).length === 0
)

function save() {
  if (!isValid.value) return

  emit('save', {
    ...form,
    tags: form.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)
  })

  Object.assign(form, empty)
}
</script>

<template>
  <section>
    <h2>Adicionar modelo</h2>

    <form @submit.prevent="save">

      <div>
        <input
          v-model.trim="form.name"
          placeholder="Nome"
          required
        >
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>

      <div>
        <select v-model="form.category" required>
          <option value="" disabled>Escolhe uma categoria</option>
          <option v-for="cat in cats" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <small v-if="errors.category">{{ errors.category }}</small>
      </div>

      <div>
        <input
          v-model.number="form.price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Preço"
          required
        >
        <small v-if="errors.price">{{ errors.price }}</small>
      </div>

      <div>
        <input
          v-model.trim="form.tags"
          placeholder="Tags separadas por vírgulas"
        >
      </div>

      <button type="submit" :disabled="!isValid">
        Adicionar
      </button>

    </form>
  </section>
</template>

<style scoped>
section {
  margin-top: 25px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2 {
  color: #5b1f2e;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input, select, button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #5b1f2e;
  color: white;
  cursor: pointer;
}

button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

small {
  display: block;
  color: #c0392b;
  margin-top: 4px;
}
</style>
