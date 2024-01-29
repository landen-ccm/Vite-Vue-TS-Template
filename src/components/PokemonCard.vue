<script setup lang="ts">
import type { Pokemon, PokemonDetails } from '@/helpers/PokeTypes'
import { brightnessAdjust, capitalizeFirstLetter, pokemonTypeToColor } from '@/helpers/formatting'
import Card from 'primevue/card'
import Button from 'primevue/button'

const props = defineProps<{ pokemon: Pokemon; selected: boolean; favored: boolean }>()
const pokemon = ref(props.pokemon)

const emit = defineEmits<{
  (e: 'selected', pokemon: Pokemon): void
  (e: 'favored', id: number): void
}>()

const textGradient = computed(() => {
  const pokeTypes = pokemon.value.types
  const primaryColor = pokemonTypeToColor[pokeTypes[0].type.name]
  let secondaryColor = pokemonTypeToColor[pokeTypes[0].type.name]
  if (pokeTypes.length > 1) {
    secondaryColor = pokemonTypeToColor[pokeTypes[1].type.name]
  }
  const gradient = `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`
  return gradient
})

function submitEvent() {
  emit('selected', props.pokemon)
}

const highlightOnSelected = computed(() => {
  const color = brightnessAdjust(pokemonTypeToColor[pokemon.value.types[0].type.name], 0.45)
  return props.selected
    ? {
        backgroundColor: color
      }
    : {}
})

const favoredIcon = computed(() => {
  return props.favored ? 'pi pi-heart-fill' : 'pi pi-heart'
})

const favoredIconColor = computed(
  () =>
    `${brightnessAdjust(pokemonTypeToColor[pokemon.value.types[0].type.name], +props.favored * 1.25 + +!props.favored * 1000)}`
)

const buttonBackgroundColor = computed(
  () => `${brightnessAdjust(pokemonTypeToColor[pokemon.value.types[0].type.name], 0.65)}`
)

function favoredEvent(event: Event) {
  event.stopPropagation()
  emit('favored', props.pokemon.id)
}
</script>
<template>
  <div @click="submitEvent">
    <Card class="grid-card" :style="highlightOnSelected">
      <template #title>
        <h3 class="text-gradient" :style="{ backgroundImage: textGradient }">
          {{ capitalizeFirstLetter(pokemon.name) }}
        </h3>
      </template>
      <template #content>
        <div>
          <img :src="pokemon.sprites.front_default!" />
        </div>
        <div style="display: flex; justify-content: flex-end">
          <Button
            @click="favoredEvent"
            :style="{ color: favoredIconColor, backgroundColor: buttonBackgroundColor }"
            :icon="favoredIcon"
          ></Button>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.grid-card {
  width: 12em;
  height: 12em;
  background-color: #222;
  border-radius: 10px;
  margin: 0.75em;
}

.text-gradient {
  background-size: 100%;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: brightness(1.25);
}

button {
  position: relative;
  bottom: 1.5em;
  right: 0.1em;
}

button:hover {
  transition: 0.25s;
  transform: scale(1.1);
}

button:active {
  transition: 0.1s;
  transform: scale(0.9);
}
</style>
