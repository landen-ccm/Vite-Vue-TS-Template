import { searchPokemon } from '@/composable/searchPokemon'
import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const arcanineData = {
  id: 59,
  name: 'arcanine'
}

vi.mock('axios')

describe('Test getting Pokemon details', () => {
  // beforeEach(() => {
  //   axios.get.mockResolvedValue(arcanineData)
  // })

  it('Returns a list of all pokemon', async () => {
    vi.mocked(axios, true).get.mockResolvedValue({ data: arcanineData })
    const data = await searchPokemon('59')
    expect(data).contains(arcanineData)
  })

  it('Returns null when it fails', async () => {
    vi.mocked(axios, true).get.mockRejectedValue(null)
    const data = await searchPokemon('-1')
    expect(data).toBeNull()
  })

  it('Returns null when given nothing', async () => {
    vi.mocked(axios, true).get.mockResolvedValue(null)
    const data = await searchPokemon('')
    expect(data).toBeNull()
  })
})
