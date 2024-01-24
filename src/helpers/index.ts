import { ref } from 'vue'
export const MAX_POKEMON = 1302
export const sizeOption = [
  { name: '25', val: 25 },
  { name: '50', val: 50 },
  { name: '100', val: 100 },
  { name: 'ALL', val: MAX_POKEMON }
]
export const pageSize = ref({ name: '25', val: 25 })
export const pageNumber = ref(1)
export const FINAL_POKEMON_ID = 10277
export const POKEMON_SKIP_AT_ID = 1025
export const POKEMON_SKIP_TO_ID = 10001
