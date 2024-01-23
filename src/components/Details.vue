<script setup lang="ts">
import { useRouter } from 'vue-router'
import { BASE_API_URL } from '@/helpers'
import axios from 'axios'
import { ref } from 'vue'
import Carousel from 'primevue/carousel'
import Tag from 'primevue/tag'
import Button from 'primevue/button'

type EnhancedPokemonData = {
  name: string
  id: number
  sprites: { front_default: string; back_default: string }
}

const router = useRouter()
const pokemonData = ref<EnhancedPokemonData>()
const _id = router.currentRoute.value.params.id
const sprites = ref()

function back() {
  router.replace('/')
}

const responsiveOptions = ref([
  {
    breakpoint: '1400px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '1199px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '767px',
    numVisible: 1,
    numScroll: 1
  },
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1
  }
])

// onMounted(getPokemonById)
</script>

<template>
  <!-- {{ pokemonData }} -->
  <div class="container">
    <Button @click="back">BACK</Button>
    <Carousel
      :numVisible="1"
      :value="sprites"
      :numScroll="3"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
          <div class="mb-3">
            <img :src="slotProps.data.sprite" :alt="slotProps.data.name" class="w-6 shadow-2" />
          </div>
          <Tag style="align-self: center">{{ slotProps.data.name }}</Tag>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
img {
  height: 300px;
  width: 300px;
}
.container {
  height: 500px;
  width: 700px;
}
</style>
