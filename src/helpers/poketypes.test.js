import { expectTypeOf, test } from 'vitest'
import { PokemonType, Pokemon, Poke } from './PokeTypes'
// import { type } from 'os'

const pokemon = {
    slot: 24,
    type: 'fire'
}

const pikachu = {
    id: 3,
    name: 'pikachu',
    abilities: [
        {
            name: 'pikachu', 
            url: 'www.google.com'
        }
    ],
    sprites: {
        ['pikachu']: 'pikachu'
    },
    base_experience: 30,
    types: [
        {
            slot: 24,
            type: 'fire'
        }
    ],
    height: 40,
    weight: 50
}

const bulbasaur = {
    name: 'bulbasaur',
    url: "https://pokeapi.co/api/v2/pokemon-species/1/"
}

test('my types work properly', () => {
    expectTypeOf(pokemon).toEqualTypeOf(PokemonType)
    expectTypeOf(pikachu).toEqualTypeOf(Pokemon)
    expectTypeOf(bulbasaur).toEqualTypeOf(Poke)
})
