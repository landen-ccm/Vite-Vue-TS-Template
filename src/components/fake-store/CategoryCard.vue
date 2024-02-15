<script setup lang="ts">
import { type Category } from '@/pages/fake-store/index'

defineProps({
  category: {
    type: Object as () => Category,
    required: true
  }
})

const formatDate = (date: string): string => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('en-US', options)
}
</script>

<template>
  <RouterLink :to="`/fake-store/${category.id}`">
    <div class="category-card">
      <img :src="category.image" :alt="category.name" />
      <h2>{{ category.name }}</h2>

      <div>
        <span> Created at: {{ formatDate(category.creationAt) }} </span>
        <span> Updated at: {{ formatDate(category.updatedAt) }} </span>
      </div>
    </div>
  </RouterLink>
</template>

<style lang="scss">
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin: 1rem;
  width: 300px;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  h2 {
    margin: 1rem 0;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
