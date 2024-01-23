<script setup lang="ts">
import Card from 'primevue/card'

import Toast from 'primevue/toast'

import Button from 'primevue/button'
import router from '@/router'

defineProps(['pokemon', 'addToFavorites', 'favoritePokemon', 'id', 'url'])
</script>

<template>
  <div>
    <Card style="width: 12em; margin-bottom: 10px">
      <template #header>
        <h1>{{ pokemon.name }}</h1>
      </template>
      <template #title>
        <img alt="user header" :src="url" />
      </template>
      <template #subtitle> {{ id }} </template>
      <template><Button @click="console.log(router.getRoutes())">See routes</Button></template>
      <template #content
        ><Button @click="router.push({ name: '/pokemon/[id]', params: { id: id } })"
          >View Details</Button
        ></template
      >
      <template #footer>
        <div>
          <Toast />
          <p>{{ pokemon.id }}</p>
          <Button @click="addToFavorites(pokemon)">
            <i :class="favoritePokemon.has(pokemon.name) ? 'pi pi-heart-fill' : 'pi pi-heart'"></i>
          </Button>
        </div>
      </template>
    </Card>
  </div>
</template>
