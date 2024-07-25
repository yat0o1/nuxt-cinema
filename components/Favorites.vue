<template>
    <div class="mt-8" v-if="favoriteMovies.length">
        <p class="text-3xl font-semibold">Favorites</p>
        <div class="grid gap-2 mt-8
        grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          <div v-for="(m , index) in favoriteMovies" :key="index" class="flex flex-col">
              <div>
                  <img :src="m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : `noPicture.jpg`" @click="showMovieDetails(m)"
                  loading="lazy"  alt="poster" class="cursor-pointer hover:scale-105 transition-transform ease-linear duration-100">
                  <p>{{ m.title }}</p>
                  <p class="text-gray-500">{{ m.original_title }}</p>
              </div>
          </div>
       </div>


    <MovieInfo v-if="movieDetails" :movie="movieDetails" @close="movieDetails = null"></MovieInfo>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import MovieInfo from './MovieInfo.vue';


const { $locally } = useNuxtApp();
const storedFavoriteMovies = $locally.getItem('favoriteMovies');
const favoriteMovies = reactive(storedFavoriteMovies ? JSON.parse(storedFavoriteMovies) : []);
const movieDetails = ref(null);


const showMovieDetails = (m) => {
  movieDetails.value = {
    id : m.id,
    title: m.title,
    original_title: m.original_title,
    overview: m.overview,
    vote_average: m.vote_average,
    vote_count: m.vote_count,
    poster_path: m.poster_path,
    release_date: m.release_date
  };
};

</script>