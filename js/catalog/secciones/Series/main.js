// JS main para la sección de Series

import { initSeriesSwiper } from "./swiper.js";
import { renderSeries } from "./render.js";
import { renderSearchSeries } from "./render.js";
import { initSearchSeriesSwiper } from "./swiper.js";

// URL base para las imágenes de TMDB

const IMG = "https://image.tmdb.org/t/p/w500";  

// Clave de API de TMDB

const API_KEY = "12d276e3703dbfd31547bc6f0021075a";

// Función para cargar las series populares

async function loadSeries(page = 1) {
    const res = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
    );
    const data = await res.json();

    renderSeries(data.results);
    initSeriesSwiper();
}

// Cargar las series populares al cargar la página

document.addEventListener("DOMContentLoaded", () => {
    const inputSearch = document.getElementById("searchSeries");

    if (!inputSearch) return; // seguridad

    inputSearch.addEventListener("input", async () => {
        const query = inputSearch.value.trim();

        if (query.length < 2) {
            loadSeries();
            return;
        }

        const results = await searchSeries(query);
        renderSearchSeries(results);
        initSearchSeriesSwiper();
    });
});



// Función para realizar la búsqueda de series

async function searchSeries(query) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es-ES&query=${(query)}`
    );
    const data = await res.json();
    return data.results;
};

loadSeries();