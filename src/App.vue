<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { useRoute } from 'vue-router'
import { type Pokemon, setFavorites, getFavorites } from './api.calls'

const toast = useToast()
const route = useRoute()
const favorites = ref<Set<number>>(getFavorites())

onMounted(() => {})
function addToFavorites(id: number) {
  favorites.value.add(id)
  setFavorites(favorites.value)
  toast.add({
    severity: 'success',
    detail: 'Pokemon added to favorites!',
    life: 3000
  })
}

function removeFromFavorites(id: number) {
  favorites.value.delete(id)
  setFavorites(favorites.value)
  toast.add({
    severity: 'error',
    detail: 'Pokemon removed from favorites!',
    life: 3000
  })
}

function clearFavorites() {
  favorites.value.clear()
  setFavorites(favorites.value)
  toast.add({
    severity: 'error',
    detail: 'Favorites cleared!',
    life: 3000
  })
}

function addAllToFavorites(pokemonArr: Pokemon[]) {
  pokemonArr.forEach((item) => favorites.value.add(item.id))
  setFavorites(favorites.value)
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
