<script setup lang="ts">
import Card from 'primevue/card'
export type PokemonDetails = {
  name: string
  id: number
  imageUrl: string
  type: { name: string; url: string }[]
  weight: number
  height: number
}
const props = defineProps<PokemonDetails>()
</script>

<template>
  <Card>
    <template #title>{{ props.name }}: {{ props.id }}</template>
    <template #content>
      <Image :src="props.imageUrl" />
    </template>
  </Card>
</template>
