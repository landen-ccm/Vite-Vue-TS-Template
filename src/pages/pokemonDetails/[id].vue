<script setup lang="ts">
import { useRoute } from 'vue-router'
import { searchPokemon } from '../../composable/searchPokemon'
import { onMounted, ref } from 'vue'
import { Pokemon } from '../../helpers/PokeTypes'
import Carousel from 'primevue/carousel'

const route = useRoute()
const pokemonDetails = ref<Pokemon>()
const pokemonSprites = ref<string[]>([])
const id = ref(route.query.pokemon as unknown as number)

onMounted(async () => {
  pokemonDetails.value = await searchPokemon(String(id.value))
  const pokemonSpriteObject = pokemonDetails.value?.sprites
  console.log(Object.keys(pokemonSpriteObject))
  for (const key in pokemonSpriteObject) {
    if (pokemonSpriteObject[key] && key != 'other' && key != 'versions')
      pokemonSprites.value.push(pokemonSpriteObject[key])
  }
  console.log(pokemonSprites.value)
})
</script>

<template>
  <div class="details-page">This is details</div>
  <div class="card">
    <Carousel :value="pokemonSprites" :numVisible="1" :numScroll="1">
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div class="mb-3">
            <img :src="slotProps.data" :alt="slotProps.data.name" class="w-6 shadow-2" />
          </div>
        </div>
      </template>
    </Carousel>
    <button>Next</button>
    <button>Back</button>
  </div>
  <router-view></router-view>
</template>

<style scoped>
button {
  margin: 50px 0 10px 10px;
}
</style>
