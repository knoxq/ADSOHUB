import {
  renderMovies,
  renderSeries,
  renderSearchMovies,
  renderSearchSeries,
  clearCatalog
} from "./catalog.js";

import {
  initHeroSwiper,
  initMoviesSwiper,
  initSeriesSwiper,
} from "./swiper.js";


const API_KEY = "12d276e3703dbfd31547bc6f0021075a";

let isSearching = false;

// ================= FETCH POPULARES =================
async function loadHome() {
  const [moviesRes, seriesRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`),
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES`)
  ]);

  const moviesData = await moviesRes.json();
  const seriesData = await seriesRes.json();

  renderMovies(moviesData.results);
  renderSeries(seriesData.results);

  initHeroSwiper();
  initMoviesSwiper();
  initSeriesSwiper();
}

// ================= FETCH SEARCH =================
async function searchMovies(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es-ES&query=${query}`
  );
  return (await res.json()).results;
}

async function searchSeries(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=es-ES&query=${query}`
  );
  return (await res.json()).results;
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", async () => {
  await loadHome();

  const inputSearch = document.getElementById("searchMultimedia");
  if (!inputSearch) return;

  inputSearch.addEventListener("input", async () => {
    const query = inputSearch.value.trim();

    // 🔁 VOLVER A INICIO
    if (query.length < 2) {
      if (isSearching) {
        isSearching = false;
        clearCatalog();
        await loadHome();
      }
      return;
    }

    // 🔍 MODO BÚSQUEDA
    isSearching = true;
    clearCatalog();

    const moviesResults = await searchMovies(query);
    const seriesResults = await searchSeries(query);
    renderSearchMovies(moviesResults);
    renderSearchSeries(seriesResults);
  });
});
