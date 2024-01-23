<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import type { Pokemon } from './api.calls'

const toast = useToast()
const route = useRoute()
const favorites = ref<Set<number>>(new Set())

function addToFavorites(id: number) {
  favorites.value.add(id)
  toast.add({
    severity: 'success',
    detail: 'Pokemon added to favorites!',
    life: 3000
  })
}

function removeFromFavorites(id: number) {
  favorites.value.delete(id)
  toast.add({
    severity: 'error',
    detail: 'Pokemon removed from favorites!',
    life: 3000
  })
}

function clearFavorites() {
  favorites.value.clear()
  toast.add({
    severity: 'error',
    detail: 'Favorites cleared!',
    life: 3000
  })
}

function addAllToFavorites(pokemonArr: Pokemon[]) {
  pokemonArr.forEach((item) => favorites.value.add(item.id))
}

provide('favorites', favorites)
provide('addFavorite', addToFavorites)
provide('removeFavorite', removeFromFavorites)
provide('clearFavorites', clearFavorites)
provide('addAllToFavorites', addAllToFavorites)
</script>

<template>
  <Toast />
  <RouterView :key="route.fullPath" />
</template>

<style lang="scss"></style>
