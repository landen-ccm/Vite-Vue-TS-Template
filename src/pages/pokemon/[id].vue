<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getPokemon, type Pokemon } from '../../api.calls'
import { useRoute } from 'vue-router'
import Carousel from 'primevue/carousel'

const route = useRoute()

const poke = ref<Pokemon | undefined>()

const images = computed(() =>
  poke.value
    ? Object.entries(poke.value.sprites)
        .filter((keyVal) => typeof keyVal[1] === 'string')
        .map(([key, val]) => ({ name: key.split('_').join(' '), link: val }))
    : []
)

onMounted(async () => {
  try {
    const id = route.params.id
    if (typeof id === 'string') {
      const response = await getPokemon(id)
      poke.value = response[0]
    }
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <div v-if="poke" class="container">
    <h1>#{{ poke.id }} - {{ poke.name }}</h1>
    <Carousel
      class="carousel"
      :value="images"
      :numVisible="3"
      :numScroll="1"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="carousel-card">
          <img :src="slotProps.data.link" :alt="slotProps.data.name" />
          <h1>
            {{ slotProps.data.name }}
          </h1>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  font-size: 20px;
  font-weight: 700;
}
img {
  width: 200px;
}
.carousel {
  padding: 10px;
}
.carousel-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}
</style>
