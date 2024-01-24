<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Image from 'primevue/image'
import Button from 'primevue/button'
import axios from 'axios'

type Pokemon = {
  name: string
  id: number
  sprites: {
    [key: string]: string | null
  }
}
const getsprites = async (str: string) => {
  try {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${str}`)
    return data
  } catch (error) {
    return error
  }
}
const route = useRoute()
const router = useRouter()
const id_pokemon = route.query.id ? String(route.query.id) : '1'
const Pokemon_data = ref<Pokemon>({
  name: 'bulbasaur',
  id: 1,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  }
})

const sprites = computed(() => {
  const temp = []
  for (const key in Pokemon_data.value.sprites) {
    const sprite = Pokemon_data.value.sprites[key]
    if (typeof sprite === 'string') {
      temp.push(sprite)
    }
  }
  return temp
})

const responsiveOptions = ref([
  {
    breakpoint: '7700px',
    numVisible: 2,
    numScroll: 1
  }
])

onMounted(async () => {
  const spritesdata = await getsprites(id_pokemon)

  if (spritesdata) {
    Pokemon_data.value.name = spritesdata.name
    Pokemon_data.value.id = spritesdata.id
    Pokemon_data.value.sprites = spritesdata.sprites
  } else {
    console.log('error id')
  }
})
</script>

<template>
  <Card>
    <template #title> {{ Pokemon_data.name }} : {{ Pokemon_data.id }} </template>
    <template #content>
      <Carousel :value="sprites" :responsiveOptions="responsiveOptions" :circular="true">
        <template #item="slotProps">
          <Image :src="slotProps.data"></Image>
        </template>
      </Carousel>
    </template>
  </Card>
  <Button @click="router.push({ path: '/' })"> Back </Button>
</template>

<style>
img {
  filter: blur(0);
  -webkit-filter: blur(0);
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  width: 25vw;
}

.p-image {
  display: flex;
  justify-content: center;
}

.flow-box {
  display: flex;
  flex-flow: column;
  justify-items: center;
}

.flow-row {
  display: flex;
  flex-flow: nowrap;
}

.p-button {
  flex: 1;
  margin-left: 1em;
  justify-content: center;
}
</style>
