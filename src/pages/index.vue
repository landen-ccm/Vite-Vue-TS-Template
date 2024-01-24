<script setup lang="ts">
import SearchForm from '@/components/SearchForm.vue'
</script>

<template class="pokemon-list">
  <SearchForm></SearchForm>
</template>

<style>
.dropdown {
  width: 100%;
  color: black;
}

.btn-div {
  display: flex;
  justify-content: space-between;
}

.pokemon-list {
  display: flex;
  justify-content: space-between;
  gap: 4rem;
}
</style>
