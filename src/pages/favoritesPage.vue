<script setup lang="ts">
import type { PokeCard } from '@/helpers/shared'
import router from '@/router'
import Button from 'primevue/button'
const favorite_list = ref()
type Favorites = { [key: number]: PokeCard | null }
onMounted(() => {
  favorite_list.value = localStorage.getItem('favorites')
})
function loadFavorites(): Favorites {
  const res = localStorage.getItem('favorites')
  if (res === null) {
    return []
  }
  console.log(JSON.parse(res))
  return JSON.parse(res)
}
const favorites = ref<Favorites>(loadFavorites())

const eraselocal = () => {
  localStorage.clear()
  favorite_list.value = localStorage.getItem('favorites')
}

const pokeFavorites = computed((): PokeCard[] => {
  const outPoke: PokeCard[] = []

  for (const id in favorite_list.value) {
    const numericalID = +id
    const poke = favorites.value[numericalID]
    if (poke != undefined) {
      outPoke.push(poke)
    }
  }
  return outPoke
})
const navigateToHome = () => {
  router.push('/')
}
</script>

<template>
  <Button @click="navigateToHome">Home</Button>
  <div class="card-container main-box">
    <div id="poke-list" class="poke-list">
      <PokemonCard
        v-for="poke in pokeFavorites"
        :key="poke.id"
        :id="poke.id"
        :name="poke.name"
        :image-url="poke.imageUrl"
      />
    </div>
  </div>
  <button @click="eraselocal">eraselocal</button>
</template>

<style scoped>
.main-box {
  display: flex;
  flex-direction: column;
}

.poke-list {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
}
</style>
