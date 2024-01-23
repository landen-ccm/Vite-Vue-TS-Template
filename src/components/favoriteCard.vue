<script setup lang="ts">
const props = defineProps<{
  id: number
  name: string
}>()
</script>

<template>
  <div class="p-card">
    <h2>{{ props.name.toUpperCase() }}</h2>
    <p>Id: {{ props.id }}</p>
    <div class="img-div">
      <Image
        :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`"
      ></Image>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
</style>
