<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

import { searchByName } from '../../helpers/apiCalls'

const searchParam = ref('')

const emits = defineEmits<{
  (e: 'submit', value: string): void
}>()
</script>

<template>
  <div class="search-form p-card">
    <label for="username">Pokemon search</label>
    <InputText
      @keyup.enter="emits('submit', searchParam)"
      v-model="searchParam"
      id="username"
      aria-describedby="username-help"
    />
    <small id="username-help">Enter the complete name of a pokemon please</small>
    <Button @click="emits('submit', searchParam)">Search</Button>
  </div>
</template>

<style>
.search-form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  gap: 2;
}
</style>
