<script setup lang="ts">
import PokemonSearchTab from '@/components/PokemonSearchTab.vue'
import FavoritesTab from '@/components/FavoritesTab.vue'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import { ref } from 'vue'

const favorites = ref(inject<Set<number>>('favorites', new Set()))
</script>

<template>
  <h1>Pokemon App</h1>
  <TabView>
    <TabPanel header="Search">
      <PokemonSearchTab :favorites="favorites" />
    </TabPanel>
    <TabPanel :header="'Favorites - ' + favorites.size">
      <FavoritesTab :favorites="favorites" />
    </TabPanel>
  </TabView>
</template>

<style lang="scss"></style>
