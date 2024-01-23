<script setup lang="ts">
import PokeCard from '@/components/PokeCard.vue'
import { pokeFavorites } from './variables'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
</script>

<template>
  <Button @click="router.push({ name: 'home' })" style="width: 5.5em"> Home </Button>
  <PokeCard
    v-for="poke of pokeFavorites"
    :key="poke.id"
    :id="poke.id"
    :name="poke.name"
    :url="poke.url"
  ></PokeCard>
</template>
