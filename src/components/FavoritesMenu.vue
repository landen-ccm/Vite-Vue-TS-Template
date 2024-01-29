<template>
  <Button @click="clearLocalStorage">Remove all favorites</Button>
  <SearchBar @submit="submit"></SearchBar>
  <Dropdown
    v-model="showCount"
    :options="displayCountOptions"
    optionLabel="text"
    optionValue="value"
  ></Dropdown>
  <ul>
    <li v-for="pokemon in Object.values(favorites)" :key="JSON.parse(pokemon).name">
      <Card class="p-card">
        <template #title> {{ JSON.parse(pokemon).name }} </template>
        <template #content>
          <p class="m-0">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${JSON.parse(pokemon).url.split('/')[6]}.png`"
              alt="Pokemon Image"
            />
          </p>
          <Button>
            <router-link
              :to="{
                path: `/pokemonDetails/${pokemon.name}`,
                query: { pokemon: JSON.parse(pokemon).url.split('/')[6] }
              }"
              >view</router-link
            >
          </Button>
        </template>
      </Card>
    </li>
  </ul>
</template>
