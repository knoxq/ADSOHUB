const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const IMG_SMALL = "https://image.tmdb.org/t/p/w500";

/* CARGAR PELÍCULAS */
async function cargarPeliculas() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  const contenedor = document.getElementById("movies");

  contenedor.innerHTML = "";

  data.results.slice(0, 10).forEach(pelicula => {
    if (!pelicula.poster_path) return;
    contenedor.innerHTML += `
      <div class="movie-thumb">
        <img src="${IMG_SMALL + pelicula.poster_path}"
          alt="${pelicula.title}"
          class="w-100 rounded shadow-sm">
      </div>
    `;
  });
}

/* CARGAR SERIES */
async function cargarSeries() {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();
  const contenedor = document.getElementById("tv");

  contenedor.innerHTML = "";

  data.results.slice(0, 10).forEach(serie => {
    if (!serie.poster_path) return;
    contenedor.innerHTML += `
      <div class="movie-thumb">
        <img src="${IMG_SMALL + serie.poster_path}"
          alt="${serie.name}"
          class="w-100 rounded shadow-sm">
      </div>
    `;
  });
}

cargarPeliculas();
cargarSeries();