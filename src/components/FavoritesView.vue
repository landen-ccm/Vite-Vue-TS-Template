<script setup lang="ts">
import PokemonCard from './PokemonCard.vue'
import type { SinglePokemonResponse } from '../models/pokedex/index'
import { handleView } from '@/helpers'
const props = defineProps<{
  isFav: SinglePokemonResponse[]
}>()
const emit = defineEmits(['like'])

const handleLike = (id: number) => {
  emit('like', id)
}
</script>
<template>
  <PokemonCard
    v-for="(poke, idx) in props.isFav"
    :key="poke ? poke.id : idx"
    :id="poke?.id"
    :name="poke?.name"
    :image="poke?.sprites.front_default"
    :is-fav="isFav"
    @view="handleView"
    @like="handleLike(poke.id)"
  />
</template>
