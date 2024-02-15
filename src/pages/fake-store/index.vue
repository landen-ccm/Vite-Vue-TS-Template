<script setup lang="ts">
import axios, { type AxiosResponse } from 'axios'
import { useRequest } from '@/composable/useRequest'
import { baseFakeStoreUrl } from '@/helpers/fake-store/index'

export type Category = {
  id: string
  name: string
  image: string
  creationAt: string
  updatedAt: string
}

const { data: categories, invoke: getCategories } = useRequest(
  (limit = 100): Promise<AxiosResponse<Category[]>> =>
    axios.get(`${baseFakeStoreUrl}categories?limit=${limit}`)
)

onBeforeMount(() => {
  getCategories()
})
</script>

<template>
  <div>
    <h1>Fake Store</h1>

    <div class="category-list-wrapper">
      <CategoryCard v-for="category in categories" :key="category.id" :category="category" />
    </div>
  </div>
</template>

<style lang="scss">
.category-list-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
