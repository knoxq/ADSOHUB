// js/catalog/main.js
import { renderMovies, renderSeries } from "./catalog.js";
import {
  initHeroSwiper,
  initMoviesSwiper,
  initSeriesSwiper
} from "./swiper.js";

const API_KEY = "12d276e3703dbfd31547bc6f0021075a";

// ================= FETCH MOVIES =================
async function loadMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  renderMovies(data.results);
}

// ================= FETCH SERIES =================
async function loadSeries() {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  renderSeries(data.results);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", async () => {
  await loadMovies();
  await loadSeries();

  initHeroSwiper();
  initMoviesSwiper();
  initSeriesSwiper();
});
