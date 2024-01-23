<script setup lang="ts">
import Button from 'primevue/button'
import Image from 'primevue/image'
import { getPokemonByNameOrId } from '../../api.calls'
import { onMounted, ref } from 'vue'
import { type SinglePokemonResponse } from '../../models/pokedex'
import { useRoute } from 'vue-router'

const route = useRoute()
const pokemonDetails = ref<SinglePokemonResponse>({
  id: 0,
  name: '',
  sprites: {
    front_default: '',
    front_female: '',
    front_shiny: '',
    front_shiny_female: '',
    back_default: '',
    back_female: '',
    back_shiny: '',
    back_shiny_female: ''
  }
})
const imageCarousel = [
  'front_default',
  'front_female',
  'front_shiny',
  'front_shiny_female',
  'back_default',
  'back_female',
  'back_shiny',
  'back_shiny_female'
]

const imageCounter = ref(0)
const handleClick = (typeOfClick: string) => {
  if (typeOfClick === 'Next') {
    if (imageCounter.value === imageCarousel.length - 1) {
      imageCounter.value = 0
      return
    }
    imageCounter.value++
  } else {
    if (imageCounter.value === 0) {
      imageCounter.value = imageCarousel.length - 1
      return
    }
    imageCounter.value--
  }
}

onMounted(async () => {
  const response = await getPokemonByNameOrId(route.params.id.toString())
  pokemonDetails.value = response?.data as SinglePokemonResponse
})
</script>
<template>
  <div class="p-card">
    <div v-if="pokemonDetails">
      <h2>Pokemon Name: {{ pokemonDetails.name.toUpperCase() }}</h2>
      <h3>Pokemon Id: {{ pokemonDetails.id }}</h3>
      <Image
        v-if="pokemonDetails.sprites[imageCarousel[imageCounter]]"
        :src="pokemonDetails.sprites[imageCarousel[imageCounter]]"
        width="400"
      />
      <div v-else>
        <Image src="https://placehold.co/600x400?text=No+Image+found" />
      </div>
    </div>
    <div class="btn-div">
      <Button @click="handleClick('Prev')">Prev</Button>
      <Button @click="handleClick('Next')">Next</Button>
    </div>
  </div>
</template>
<style scoped>
.p-card {
  border: 1px solid #c8ced3;

  border-radius: 4px;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-height: 800px;
  justify-content: center;
  text-align: center;
}

.p-card h2 {
  font-size: 3rem;
}

.btn-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
