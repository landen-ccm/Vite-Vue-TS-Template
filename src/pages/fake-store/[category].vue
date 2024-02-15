<script setup lang="ts">
import { baseFakeStoreUrl } from '@/helpers/fake-store/index'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import type { AxiosResponse } from 'axios'
import { useRequest } from '@/composable/useRequest'
import axios from 'axios'

const router = useRouter()

export type Product = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
  creationAt: string
  updatedAt: string
  category: {
    id: number
    name: string
    image: string
    creationAt: string
    updatedAt: string
  }
}

const { data: products, invoke: getProducts } = useRequest(
  (productId: string): Promise<AxiosResponse<Product[]>> =>
    axios.get(`${baseFakeStoreUrl}categories/${productId}/products`)
)

onBeforeMount(() => getProducts(router.currentRoute.value.params.category as string))

const searchText = ref('')

const sortBy = ref<'lowToHigh' | 'highToLow'>('lowToHigh')

const sortByText = computed(() =>
  sortBy.value === 'lowToHigh' ? 'Sort by Price: Low to High' : 'Sort by Price: High to Low'
)

const toggleSort = () => {
  sortBy.value = sortBy.value === 'lowToHigh' ? 'highToLow' : 'lowToHigh'
}

const filteredProducts = computed(() =>
  products.value
    ?.sort((a, b) => (sortBy.value === 'lowToHigh' ? a.price - b.price : b.price - a.price))
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.value.toLowerCase())
    )
)
</script>

<template>
  <div>
    <div class="filters">
      <button @click="toggleSort">
        {{ sortByText }}
      </button>
      <input v-model.trim="searchText" type="text" placeholder="Search by title or description" />
    </div>

    <div class="product-list" v-if="products">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<style lang="scss">
.filters {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 1rem;

  button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #000;
    color: #fff;
    cursor: pointer;
  }

  input {
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    width: 300px;
  }
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
