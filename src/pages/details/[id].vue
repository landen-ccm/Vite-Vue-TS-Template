<script setup lang="ts">
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import { ref } from 'vue'
import { getEnhancedPokemon } from '../../api.calls'

import Carousel from 'primevue/carousel'

const route = useRoute()

const id = route.params.id
const pokemon = ref()
const sprites = ref()

onMounted(async () => {
  const result = await getEnhancedPokemon(id)

  pokemon.value = result[0]
  sprites.value = Object.values(pokemon.value.sprites).filter((item) => typeof item === 'string')
})
</script>
<template>
  <div class="btn-div">Name: {{ pokemon?.name }} ID: {{ pokemon?.id }}</div>

  <Carousel :value="sprites" circular :autoplay-interval="3000">
    <template #item="sprite">
      <div><img :src="sprite.data" /></div>
    </template>
  </Carousel>
  <Button label="Previous" />
  <Button label="Next" />
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
</style>
