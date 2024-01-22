import { ref } from 'vue'

type displaydata = {
  count: number
  next: string
  previous: string
  results: {
    name: string
    url: string
  }[]
}

export const searchParam = ref('')
export const pageSize = ref('25')
export const pageSizes = ['25', '50', '100', 'all']
export const displayData = ref<displaydata>()
