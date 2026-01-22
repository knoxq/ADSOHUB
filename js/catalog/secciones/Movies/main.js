import { initMoviesSwiper } from "./swiper.js";
import { renderMovies } from "./render.js";
import { renderSearchMovies } from "./render.js";
import { initSearchMoviesSwiper } from "./swiper.js";

const API_KEY = "12d276e3703dbfd31547bc6f0021075a";

async function loadMovies(page = 1) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    const data = await res.json();

    renderMovies(data.results);
    initMoviesSwiper();
}

// Cargar las series populares al cargar la página

document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("searchMovies");

    if (!inputSearch) return; // seguridad

    inputSearch.addEventListener("input", async () => {
        const query = inputSearch.value.trim();

        if (query.length < 2) {
            loadMovies();
            return;
        }

        const results = await searchMovies(query);
        renderSearchMovies(results);
        initSearchMoviesSwiper();
    });
});

// Función para realizar la búsqueda de series

async function searchMovies(query) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${(query)}`
    );
    const data = await res.json();
    return data.results;
};

loadMovies();