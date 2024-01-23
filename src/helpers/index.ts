import { ref } from 'vue'
import { type SinglePokemonResponse } from '../models/pokedex/index'
import { useRouter } from 'vue-router'

const router = useRouter()
export const isFav = ref<SinglePokemonResponse[]>([])
export function handleView(id: number) {
  router.push({
    name: '/details/[id]',
    params: { id: id }
  })
}
