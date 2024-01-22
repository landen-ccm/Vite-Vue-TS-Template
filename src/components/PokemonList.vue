<script setup lang="ts">
import Button from 'primevue/button'
import SearchForm from './SearchForm.vue'
</script>
<template class="pokemon-list">
  <SearchForm></SearchForm>
</template>

<style lang="scss">
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
