<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue'
import Dropdown from 'primevue/dropdown'

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
  <p>Ah</p>
  <Dropdown
    v-model="showCount"
    :options="displayCountOptions"
    optionLabel="text"
    optionValue="value"
  ></Dropdown>
</template>
