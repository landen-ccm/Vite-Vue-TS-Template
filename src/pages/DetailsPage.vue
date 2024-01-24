<script setup lang="ts">
import { onUpdated } from 'vue'
import { getDetails } from '@/helpers/homepageHelpers'
import { useRoute, useRouter } from 'vue-router'
import type { DetailedPokemon } from '../helpers/types'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Image from 'primevue/image'
import Button from 'primevue/button'

const route = useRoute()
const router = useRouter()
const pokeId = route.query.id?.toString()!
const isshowDetails = ref(false)
const data = ref<DetailedPokemon>({
  name: 'bulbasaur',
  id: 1,
  types: [
    { type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' } },
    { type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' } }
  ],
  abilities: [
    { ability: { name: 'overgrow', url: 'https://pokeapi.co/api/v2/ability/65/' } },
    { ability: { name: 'chlorophyll', url: 'https://pokeapi.co/api/v2/ability/34/' } }
  ],
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

const showDetails = () => {
  isshowDetails.value = !isshowDetails.value
}

const prevButtonHandler = () => {
  if (+pokeId === 1) {
    router.push({ name: 'details', query: { id: 10277 } })
  } else if (+pokeId === 10001) {
    router.push({ name: 'details', query: { id: 1025 } })
  } else {
    router.push({ name: 'details', query: { id: +pokeId - 1 } })
  }
}

const nextButtonHandler = () => {
  if (+pokeId === 10277) {
    router.push({ name: 'details', query: { id: 1 } })
  } else if (+pokeId === 1025) {
    router.push({ name: 'details', query: { id: 10001 } })
  } else {
    router.push({ name: 'details', query: { id: +pokeId + 1 } })
  }
}

onUpdated(() => {
  location.reload()
})

onMounted(async () => {
  const d = await getDetails(pokeId)
  console.log(d.types)
  if (d) {
    data.value.name = d.name
    data.value.id = d.id
    data.value.abilities = d.abilities
    data.value.types = d.types
    data.value.sprites = d.sprites
  } else {
    alert('Invalid pokemon ID!')
  }
  console.dir(data.value.types)
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
              <Button @click="showDetails" style="width: 5.5em; margin-bottom: 5px"> More </Button>
              <div
                style="display: flex; flex-flow: column; align-items: center"
                v-if="isshowDetails"
              >
                <ul style="display: flex">
                  Abilities:&nbsp;
                  <li v-for="a in data.abilities" :key="a.ability.name">
                    {{ a.ability.name }}&nbsp;
                  </li>
                </ul>
                <ul style="display: flex">
                  Types:&nbsp;
                  <li v-for="t in data.types" :key="t.type.name">{{ t.type.name }}&nbsp;</li>
                </ul>
              </div>
              <div>
                <Button @click="prevButtonHandler">Prev</Button>
                <Button @click="nextButtonHandler">Next</Button>
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
