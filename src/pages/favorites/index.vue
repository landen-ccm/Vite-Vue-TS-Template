<script setup lang="ts"></script>

<template>
  <h1>Favorites Page</h1>
  <!-- <div class="card-container">
    <ul v-if="favorites" class>
      <li v-for="pokemon in favorites" :key="pokemon.name">
        <Card class="p-card">
          <template #title> {{ pokemon.name }} </template>
          <template #content>
            <p class="m-0">
              <img
                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`"
                alt="Pokemon Image"
              />
            </p>
            <Button> view</Button>
          </template>
          <template #footer
            ><Toast />
            <i
              :class="pokemon.isFav === true ? 'pi pi-heart-fill' : 'pi pi-heart'"
              @click="addToFavorites(pokemon)"
            ></i
          ></template>
        </Card>
      </li>
    </ul>
    <p v-else>No Pokémon data available.</p>
  </div> -->
</template>
