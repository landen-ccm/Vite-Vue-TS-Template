import type { Pagination, PokemonData } from "@/models"
import { ref } from 'vue'

export const pokemonData = ref<PokemonData>()
export const paginationOptions: Pagination[] = ['25', '50', '100', 'All']
export const selectedPagination = ref('')
export const searchParam = ref('')