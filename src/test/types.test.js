import {
  displaydata,
  PokeAbility,
  PokeType,
  Pokemon,
  DetailedPokemon,
  Favorites
} from '../helpers/types'
import { test, expectTypeOf } from 'vitest'
import { searchParam, pageSize, pageSizes, currentPage, displayedPokemon } from '../pages/variables'

const testsearchParam = 'pikachu'
const testpageSize = '25'
const testpageSizes = ['25', '50', '100', 'all']
const testcurrentPage = 0
const testdisplayedPokemon = [
  {
    name: 'string',
    id: 1,
    url: 'string'
  }
]

const testdisplaydata = {
  count: 1302,
  next: 'url',
  previous: 'url',
  results: [
    {
      name: 'pikachu',
      url: 'pikachu url',
      id: 24
    }
  ]
}

const testPokemon = {
  name: 'string',
  id: 1,
  url: 'string'
}

const testFavorites = {
  1: {
    name: 'pikachu',
    id: 24,
    url: 'pikachu string'
  }
}

const testPokeType = {
  type: {
    name: 'string',
    url: 'string'
  }
}

const testPokeAbility = {
  ability: { name: 'string', url: 'string' }
}

const testDetailedPokemon = {
  name: 'string',
  id: 24,
  types: [
    {
      type: {
        name: 'string',
        url: 'string'
      }
    }
  ],
  abilities: [
    {
      ability: { name: 'string', url: 'string' }
    }
  ],
  sprites: {
    front_default: 'string'
  }
}

test('type testing', () => {
  expectTypeOf(testdisplaydata).toEqualTypeOf(displaydata)
  expectTypeOf(testDetailedPokemon).toEqualTypeOf(DetailedPokemon)
  expectTypeOf(testPokeAbility).toEqualTypeOf(PokeAbility)
  expectTypeOf(testPokeType).toEqualTypeOf(PokeType)
  expectTypeOf(testFavorites).toEqualTypeOf(Favorites)
  expectTypeOf(testPokemon).toEqualTypeOf(Pokemon)
  expectTypeOf(testdisplayedPokemon).toEqualTypeOf(displayedPokemon)
  expectTypeOf(testcurrentPage).toEqualTypeOf(currentPage)
  expectTypeOf(testpageSizes).toEqualTypeOf(pageSizes)
  expectTypeOf(testpageSize).toEqualTypeOf(pageSize)
  expectTypeOf(testsearchParam).toEqualTypeOf(searchParam)
})
