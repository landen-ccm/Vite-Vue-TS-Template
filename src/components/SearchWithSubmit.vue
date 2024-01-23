<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

defineProps({
  searchPlaceholder: {
    type: String,
    default: 'Search'
  },
  submitText: {
    type: String,
    default: 'Submit'
  },
  showSumit: {
    type: Boolean,
    default: true
  }
})

// Submit button
defineEmits(['submit'])
const searchInput = defineModel<string>()
</script>

<template>
  <div class="search-submit">
    <InputText class="mr-2" v-model="searchInput" :placeholder="searchPlaceholder" />
    <Button v-if="showSumit" :label="submitText" @click="$emit('submit')" />
  </div>
</template>
