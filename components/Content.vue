<template>
    <div class="flex flex-col px-8 mt-8">
        <div class="flex justify-center">
            <div class="text-black w-full text-center font-semibold flex flex-col gap-4
                p-0 sm:p-4 md:p-12 bg-white bg-opacity-75">
                <p class="text-4xl lg:text-5xl">Welcome</p>
                <p class="text-2xl lg:text-3xl">Search for a favorite movie and film</p>
                <div class="relative text-sm sm:text-base md:text-xl">
                    <input class="p-2 sm:p-3 md:p-4 focus:outline-none border-black border-2
                        rounded-3xl w-full font-semibold" 
                        v-model="movieName" name="queryLine"
                        type="text" placeholder="Search for a movie">
                    <button class=" absolute rounded-3xl bg-gradient-to-tr from-lightBlue to-darkBlue text-white
                        hover:bg-gradient-to-bl hover:scale-95 transition-transform ease-linear duration-100
                        p-2 sm:p-3 md:p-4 right-0 bottom-0.5"
                        @click="searchForMovie(1)">
                        Search
                    </button>
                </div>
            </div>
        </div>

        <div v-if="loadingData"
        class="text-center text-2xl">
            <p>Loading...</p>
        </div>

        <div v-if="successQuery && !loadingData"
        class="mt-8">
            <p class="text-3xl font-semibold">Results</p>
            <div class="grid gap-2 mt-8
            grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                <div v-for="(m , index) in movie.results" :key="index" class="flex flex-col">
                    <img :src="m.poster_path ? `https://image.tmdb.org/t/p/w500/${m.poster_path}` : `noPicture.jpg`" @click="showMovieDetails(m)"
                    loading="lazy"  alt="poster" class="cursor-pointer hover:scale-105 transition-transform ease-linear duration-100">
                    <p>{{ m.title }}</p>
                    <p class="text-gray-500">{{ m.original_title }}</p>
                </div>
            </div>

            <nav v-show="totalPages > 1" class="flex mt-10">
                <div v-show="currentPage > 1" class="flex gap-2">
                    <svg @click="searchForMovie(1)" class="cursor-pointer" enable-background="new 0 0 26 26" height="20px" id="Layer_1" version="1.1" viewBox="0 0 26 26" width="26px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                            <polygon fill="#231F20" points="23.885,0.58 25.969,2.664 15.133,13.5 25.969,24.336 23.885,26.42 10.965,13.5  "/>
                            <polygon fill="#231F20" points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 -0.035,13.5  "/>
                        </g>
                    </svg>
                    <svg @click="searchForMovie(currentPage - 1)" class="cursor-pointer" enable-background="new 0 0 15 26" height="20px" id="Layer_1" version="1.1" viewBox="0 0 15 26" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <polygon fill="#231F20" points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5 "/>
                    </svg>
                </div>

                <div v-show="currentPage < totalPages" class="flex gap-2 ml-auto">
                    <svg @click="searchForMovie(currentPage + 1)" class="cursor-pointer" enable-background="new 0 0 15 26" height="20px" id="Layer_1" version="1.1" viewBox="0 0 15 26" width="15px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <polygon fill="#231F20" points="2.019,0.58 -0.035,2.634 10.646,13.316 -0.035,23.997 2.019,26.052 14.755,13.316 "/>
                    </svg>            
                    <svg @click="searchForMovie(totalPages)" class="cursor-pointer" enable-background="new 0 0 26 26" height="20px" id="Layer_1" version="1.1" viewBox="0 0 26 26" width="26px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g>
                            <polygon fill="#231F20" points="2.049,0.58 -0.035,2.664 10.801,13.5 -0.035,24.336 2.049,26.42 14.969,13.5  "/>
                            <polygon fill="#231F20" points="13.049,0.58 10.965,2.664 21.801,13.5 10.965,24.336 13.049,26.42 25.969,13.5  "/>
                        </g>
                    </svg>
                </div>
            </nav>
        </div>

        <Favorites v-if="isClient" />

        <MovieInfo v-if="movieDetails" :movie="movieDetails" @close="movieDetails = null"></MovieInfo>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MovieInfo from './MovieInfo.vue';

const API = '5244d497a6c9c11f6aba6fea4e54f2e7';

const totalPages = ref(0);
const currentPage = ref(1);
const movieName = ref("");
const movie = ref();
const successQuery = ref(false);
const loadingData = ref(false);
const movieDetails = ref(null);
const isClient = ref(false);

onMounted(() => {
  isClient.value = true;
});

const searchForMovie = async (page) => {
    if(movieName.value.trim()){
        loadingData.value = true;
        currentPage.value = page;
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API}&language=en-U&query=${movieName.value}&page=${ currentPage.value }&include_adult=false`)
        movie.value = await response.json();
        successQuery.value = true;
        totalPages.value= movie.value.total_pages;
        loadingData.value = false;
    }
};

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