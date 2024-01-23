<script setup lang="ts">
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

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

provide('favorites', favorites)
provide('addFavorite', addToFavorites)
provide('removeFavorite', removeFromFavorites)
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style lang="scss"></style>
