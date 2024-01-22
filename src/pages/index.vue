<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'

type PageCount = 25 | 50 | 100 | -1

const displayCountOptions: { text: string; value: PageCount }[] = [
  { text: '25', value: 25 },
  { text: '50', value: 50 },
  { text: '100', value: 100 },
  { text: 'all', value: -1 }
]

const showCount = ref<PageCount>(25)
</script>
<template>
  <SearchBar @submit="console.log($event)"></SearchBar>
  <div>
    <Dropdown
      v-model="showCount"
      :options="displayCountOptions"
      optionLabel="text"
      optionValue="value"
    ></Dropdown>
    <Button class="page-button">Back</Button>
    <Button class="page-button">Forwards</Button>
  </div>
</template>

<style>
.page-button {
  margin-left: 1em;
}
</style>
