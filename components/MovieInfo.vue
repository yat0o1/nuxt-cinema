<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-4/5 max-h-full overflow-y-auto relative">
      <button @click="close" class="absolute top-4 right-4
      text-gray-500 hover:text-gray-800 transition-colors ease-linear duration-150">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
      </button>
      <div class="flex flex-col sm:flex-col lg:flex-row gap-4 items-center">
        <img :src="movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `noPicture.jpg`" alt="poster"
        class="mb-4 max-w-40">
          <div class="flex flex-col gap-2">
            <p class="text-2xl font-semibold">{{ movie.title }}</p>
            <p class="text-gray-500">{{ movie.original_title }}</p>
            <p>{{ movie.overview }}</p>
            <p>{{ movie.vote_average }}/10</p>
            <p v-if="movie.vote_count == 1">{{ movie.vote_count }} vote</p>
            <p v-else-if="movie.vote_count > 1">{{ movie.vote_count }} votes</p>
            <p>{{ movie.release_date }}</p>
            <button class="w-6 h-6">
              <img v-if="!checkForFavorite(movie.id)" src="../assets/addToFav.png" alt="add" 
              @click="addToFavorites(movie)">
              <img v-else src="../assets/addedToFav.png" alt="remove"
              @click="deleteFromFavorites(movie.id)">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { reactive } from 'vue';
const { $locally } = useNuxtApp();
const storedFavoriteMovies = $locally.getItem('favoriteMovies');
const favoriteMovies = reactive(storedFavoriteMovies ? JSON.parse(storedFavoriteMovies) : []);

defineProps(['movie']);
const emit = defineEmits(['close']);
  
const close = () => {
  emit('close');
}

const addToFavorites = (m) => {
  favoriteMovies.push({
    id : m.id,
    title: m.title,
    original_title: m.original_title,
    overview: m.overview,
    vote_average: m.vote_average,
    vote_count: m.vote_count,
    poster_path: m.poster_path,
    release_date: m.release_date
  });
  $locally.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
};


const deleteFromFavorites = (id) => {
  const index = favoriteMovies.findIndex(movie => movie.id === id);
  if (index !== -1) {
    favoriteMovies.splice(index, 1);
    $locally.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }
};

const checkForFavorite = (id) => {
  return Array.isArray(favoriteMovies) && favoriteMovies.some(movie => movie.id === id);
};

</script>

<style scoped>
.modal-content {
  overflow-y: auto;
  max-height: calc(100vh - 2rem);
}
</style>