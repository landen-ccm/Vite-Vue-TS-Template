<script setup lang="ts">
import { getDetails } from '@/helpers/homepageHelpers'
import { useRoute, useRouter } from 'vue-router'
import type { DetailedPokemon, PokeType } from '../helpers/types'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Image from 'primevue/image'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const pokeId = route.query.id?.toString()!
const data = ref<DetailedPokemon>({
  name: 'bulbasaur',
  id: 1,
  types: [
    { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
    { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' }
  ],
  weight: 69,
  height: 7,
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
  }
})

const sprites = computed(() => {
  const outSprites = []
  for (const key in data.value.sprites) {
    const sprite = data.value.sprites[key]
    if (typeof sprite === 'string') {
      outSprites.push(sprite)
    }
  }
  console.log(outSprites)
  return outSprites
})

const displayTypes = computed(() => {
  const outTypes: PokeType[] = []
  for (const type of [...data.value.types]) {
    if (type !== null) {
      outTypes.push(type)
    }
  }
  return outTypes
})

onMounted(async () => {
  const d = await getDetails(pokeId)
  console.log(d)
  if (d) {
    data.value.name = d.name
    data.value.id = d.id
    data.value.weight = d.weight
    data.value.height = d.height
    data.value.types = d.types
    data.value.sprites = d.sprites
  } else {
    alert('Invalid pokemon ID!')
  }
  console.dir(data)
})
</script>

<template>
  <Card>
    <template #title> {{ data.name }} : {{ data.id }} </template>
    <template #content>
      <Carousel :value="sprites" :numVisible="3" :numScroll="1" :circular="true">
        <template #item="slotProps">
          <Image :src="slotProps.data"></Image>
        </template>
      </Carousel>
      <Card>
        <template #content>
          <Card>
            <template #title>
              <h2>Details</h2>
            </template>
            <template #content>
              <ul>
                <li v-for="t of displayTypes" :key="t.name" :href="t.url">{{ t.name }}</li>
              </ul>
              <div style="display: flex; flex-flow: column; align-items: center">
                <a>Weight: {{ data.weight }}</a>
                <a>Height: {{ data.height }}</a>
                <Button @click="router.push({ name: 'home' })" style="width: 5.5em"> Home </Button>
              </div>
            </template>
          </Card>
        </template>
      </Card>
    </template>
  </Card>
</template>

<style></style>
