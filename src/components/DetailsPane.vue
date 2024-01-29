<script setup lang="ts">
import { type PokemonDetails, orderedSpriteKeys, type DefaultSpriteKeys } from '@/helpers/PokeTypes'
import { capitalizeFirstLetter, pokemonTypeToColor, pokemonStatToColor } from '@/helpers/formatting'
import Card from 'primevue/card'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Divider from 'primevue/divider'
import Knob from 'primevue/knob'
import VirtualScroller from 'primevue/virtualscroller'

type passType = { pokemon: PokemonDetails }
const props = defineProps<passType>()

const sprites = computed((): string[] => {
  const animatedSprites: string[] = []
  const defaultSprites: string[] = []

  // Prefer animated sprites
  for (const key of orderedSpriteKeys) {
    const animatedUrl =
      props.pokemon.details.sprites.versions['generation-v']['black-white'].animated[key]
    if (animatedUrl !== null) {
      animatedSprites.push(animatedUrl)
    }

    const defaultUrl = props.pokemon.details.sprites[key]

    if (defaultUrl !== null) {
      defaultSprites.push(defaultUrl)
    }
  }

  return animatedSprites.concat(defaultSprites)
})

const pokemonTypes = computed(() => {
  const outTypes: { name: string; color: string; url: string }[] = []

  for (const pType of props.pokemon.details.types) {
    outTypes.push({
      name: pType.type.name,
      url: pType.type.url,
      color: pokemonTypeToColor[pType.type.name]
    })
  }

  return outTypes
})

const pokemonAbilities = computed(() => {
  const outAbilities: string[] = []

  for (const ability of props.pokemon.details.abilities) {
    outAbilities.push(ability.ability.name)
  }

  outAbilities.sort()

  return outAbilities
})

const pokemonMoves = computed(() => {
  const outMoves: string[] = []

  for (const move of props.pokemon.details.moves) {
    outMoves.push(move.move.name)
  }

  console.dir(outMoves)
  outMoves.sort()
  return outMoves
})

const pokemonStats = computed(() => {
  const outStats: { name: string; value: number }[] = []

  for (const stat of props.pokemon.details.stats) {
    let name = stat.stat.name
    if (name.includes('special')) {
      const res = name.match(/special-(.*)/)
      if (res !== null && res.length == 2) {
        name = 'Sp' + capitalizeFirstLetter(res[1])
      }
    }
    outStats.push({
      name: name,
      value: stat.base_stat
    })
  }

  return outStats
})
</script>

<template>
  <Card class="details-card">
    <template #header>
      {{ capitalizeFirstLetter(pokemon.details.name) }}
      <Carousel
        :value="sprites"
        :num-visible="1"
        circular
        :autoplay-interval="10000"
        class="details-carousel"
      >
        <template #item="slotProps">
          <img :src="slotProps.data" class="sprite" />
        </template>
        u
      </Carousel>
      <Divider></Divider>
    </template>
    <template #title>
      <div class="horizontal-align">
        <Button
          v-for="pType in pokemonTypes"
          :key="pType.name"
          :style="{ 'background-color': pType.color }"
          class="details-type-button"
          :label="capitalizeFirstLetter(pType.name)"
        ></Button>
      </div>
      <!-- <div class="horizontal-align breather">
        <p class="smaller-font">Weight: {{ pokemon.details.weight }}</p>
        <p class="smaller-font">Height: {{ pokemon.details.height }}</p>
      </div> -->
    </template>
    <template #content>
      <Accordion :activeIndex="2">
        <AccordionTab header="Abilities">
          <p v-for="ability of pokemonAbilities" :key="ability" class="m-0">{{ ability }}</p>
        </AccordionTab>
        <AccordionTab header="Stats">
          <div class="stat-grid">
            <div v-for="stat of pokemonStats" :key="stat.name">
              <div>
                <Knob
                  v-model="stat.value"
                  :min="0"
                  :size="40"
                  :max="255"
                  :valueColor="pokemonStatToColor[stat.name]"
                  readonly
                ></Knob>
                <p class="smaller-font">{{ capitalizeFirstLetter(stat.name) }}</p>
              </div>
            </div>
          </div>
        </AccordionTab>
        <AccordionTab header="Moves">
          <div class="card flex justify-content-center">
            <VirtualScroller
              :items="pokemonMoves"
              :itemSize="10"
              showLoader
              class="border-1 surface-border border-round"
              style="height: 16em"
            >
              <template v-slot:item="{ item, options }">
                <div
                  :class="['flex align-items-center p-2', { 'surface-hover': options.odd }]"
                  height="5em"
                >
                  {{ item }}
                </div>
              </template>
            </VirtualScroller>
          </div>
        </AccordionTab>
      </Accordion>
    </template>
    <template #footer> </template>
  </Card>
</template>

<style>
.details-card {
  position: fixed;
  top: 1em;
  right: 2em;
  display: flex;
  flex-flow: column;
  min-width: 16rem;
  max-width: 18rem;
  height: 36rem;
  padding: 1rem;
  margin-top: 1em;
  margin-bottom: 1em;
}

.details-carousel {
  margin-bottom: 0px;
}
.p-carousel-indicators {
  display: none;
}

.details-type-button {
  color: #fff;
  text-shadow:
    1px 0 0 #000,
    0 -1px 0 #000,
    0 1px 0 #000,
    -1px 0 0 #000;
  font-size: large;
  border-radius: 24px;
  line-height: 12px;
}

.stat-grid {
  display: grid;
  height: 16em;
  overflow-y: auto;
  grid-template-columns: repeat(2, 1fr);
}

.stat-grid::-webkit-scrollbar {
  display: none;
}

.smaller-font {
  font-size: medium;
}

.horizontal-align {
  display: flex;
  justify-content: space-evenly;
}

.breather {
  margin: 10px;
}

.p-virtualscroller::-webkit-scrollbar {
  display: none;
}

img.sprite {
  max-height: 100px;
  min-height: 100px;
  image-rendering: pixelated;
}
</style>
