import { loadFavorites, type Favorites } from '@/helpers/storeFavorite'
import type { Pokemon, displaydata } from '@/helpers/types'
import { ref, computed } from 'vue'

export const searchParam = ref('')
export const pageSize = ref('25')
export const pageSizes = ['25', '50', '100', 'all']
export const currentPage = ref(0)
export const favorites = ref<Favorites>(loadFavorites()) // #hash #use_as_dict :p
export const displayData = ref<displaydata>({
  count: 0,
  next: '',
  previous: '',
  results: []
})
export const searchResults = ref<Pokemon>()
export const displayedPokemon = ref<Pokemon[]>([])

export const pokeFavorites = computed((): Pokemon[] => {
  const outPoke: Pokemon[] = []

  for (const id in favorites.value) {
    const numericalID = +id
    const poke = favorites.value[numericalID]
    if (poke != undefined) {
      outPoke.push(poke)
    }
  }
  return outPoke
})
