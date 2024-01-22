<script setup lang="ts">
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { searchPokemon } from '@/composable/searchPokemon'
import type { Pokemon } from '@/helpers/PokeTypes'

const model = defineModel<string>('')
const emits = defineEmits<{
  (e: 'submit', value: Pokemon | null): void
}>()

async function search(event: Event) {
  const res = await searchPokemon(model.value!)
  emits('submit', res)
}
</script>

<template>
  <Card class="search-card">
    <template #content>
      <span class="search-span p-input-icon-right">
        <i class="pi pi-search"></i>
        <InputText
          type="text"
          class="search-box"
          @keypress.enter="search"
          v-model="model"
          placeholder="Search"
        ></InputText>
      </span>
      <Button label="Submit" @click="search"></Button>
    </template>
  </Card>
</template>
<style>
.search-card {
  display: flex;
  justify-content: center;
  align-content: center;
}

.search-span {
  flex: 1;
  flex-grow: 10;
  margin-right: 1em;
}
</style>
