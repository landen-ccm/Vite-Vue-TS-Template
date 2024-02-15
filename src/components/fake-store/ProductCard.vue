<script setup lang="ts">
import { type Product } from '@/components/fake-store/ProductCard.vue'

defineProps({
  product: {
    type: Object as () => Product,
    required: true
  }
})
</script>

<template>
  <div class="product-card">
    <img v-for="image in product.images" :key="image" :src="image" :alt="product.title" />
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p class="price">Price: ${{ product.price }}</p>
  </div>
</template>

<style lang="scss">
.product-card {
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
    margin-bottom: 1rem;
  }

  h2 {
    margin: 1rem 0;
  }

  .price {
    font-weight: bold;
    color: #fff;
  }
}
</style>
