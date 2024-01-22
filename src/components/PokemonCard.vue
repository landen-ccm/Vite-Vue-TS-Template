<script setup lang="ts">
import Image from 'primevue/image'
import Button from 'primevue/button'

const props = defineProps<{
  name?: string
  id?: number
  sprites?: string
  showList?: boolean
  isFavorite?: boolean
}>()
</script>

<template>
  <div>
    <div v-if="props.name" class="p-card">
      <h2>{{ props.name.toUpperCase() }}</h2>
      <p>Id: {{ props.id }}</p>
      <div class="img-div">
        <Image v-if="props.sprites" :src="props.sprites" width="300" alt="pokemon-front" />
      </div>
      <div>
        <i v-if="!isFavorite" class="pi pi-heart" style="font-size: 4rem"></i>
        <i v-else class="pi pi-heart-fill" style="font-size: 4rem"></i>
      </div>
      <Button>View</Button>
    </div>
    <div v-else class="error-message">
      <h1>NO POKEMON WITH THAT NAME OR ID!</h1>
    </div>
  </div>
</template>

<style scoped>
.p-card {
  border: 1px solid #c8ced3;

  border-radius: 4px;

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-height: 600px;
}

.p-card h2 {
  font-size: 3rem;
}

.img-div {
  display: flex;
}
</style>
