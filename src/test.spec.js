import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { getPokemon, getPokemonByNameOrId } from './api.calls'
import test1 from './components/test.vue'
import axios from 'axios'
import pokemonCard from './components/PokemonCard.vue'
import favoriteView from './components/FavoritesView.vue'
import detailView from './pages/details/[id].vue'
import main from './pages/index.vue'
import details from './pages/details/index.vue'


const pokemonURL = `https://pokeapi.co/api/v2/pokemon/`

function createFetchResponse(data) {
    return { json: () => new Promise((resolve) => resolve(data)) }
  }

test('test getPokemon', async ()=>{
    const fetchResult = await getPokemon(1, 1)
    const Result = {
        "count": 1302,
        "next": "https://pokeapi.co/api/v2/pokemon/?offset=2&limit=1",
        "previous": "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1",
        "results": [
            {
                "name": "ivysaur",
                "url": "https://pokeapi.co/api/v2/pokemon/2/"
            }
        ]
    }
    expect(fetchResult.data).toStrictEqual(Result)
})


test('test getPokemon 2', async ()=>{
    const fetchResult = await getPokemon(2, 1)
    const Result = 
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/"
    }
    expect(fetchResult.data.results[0]).toStrictEqual(Result)
})


test('test getPokemonById 1', async()=>{
    const fetchResult = await getPokemonByNameOrId(2)
    const Result = 
    [
        {
            "ability": {
                "name": "overgrow",
                "url": "https://pokeapi.co/api/v2/ability/65/"
            },
            "is_hidden": false,
            "slot": 1
        },
        {
            "ability": {
                "name": "chlorophyll",
                "url": "https://pokeapi.co/api/v2/ability/34/"
            },
            "is_hidden": true,
            "slot": 3
        }
    ]
    expect(fetchResult.data.abilities).toStrictEqual(Result)
})

test('test component 1', ()=>{
    const wrapper = mount(test1)
    const res = wrapper.get('[data-test="todo"]')
    expect(res.text()).toBe('hello')
})

test('test pokemon card', ()=>{
    const wrapper = mount(pokemonCard, {
        props: {
          id: 1,
          name: 'Pikachu',
          image: 'xxxx',
          isFav: [{ id: 1, name: 'Pikachu' }]
        }
      })
      const res = wrapper.get('[data-test="display"]').text()
      expect(res).toBe('#0001 - PIKACHU')
})

test('test pokemon card 2', ()=>{
    const wrapper = mount(pokemonCard, {
        props: {
            id: 1,
            name: 'Pikachu',
            image: 'xxxx',
            isFav: [{id: 1, name: 'Pikachu'}]
        }
    })
    const button = wrapper.get('[data-test="button"]')
    button.trigger("click")
    expect(wrapper.emitted('view')).toBeTruthy()
})

test('test details 1', async ()=>{
    const wrapper = mount(details)
    const Input = wrapper.get('[data-test="inputtext"]')
    await Input.setValue("hello")
    expect(wrapper.get('[data-test="viewinput"]').text()).toBe("hello")
})

test("[id].vue test has a button", () => {
    const wrapper = mount(detailView, {
        route : {"params": {"id": 1}}
    })
    expect(wrapper.find("button").exists()).toBe(true);
  });