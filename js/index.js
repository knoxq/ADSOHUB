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
    contenedor.innerHTML += `
      <div class="group relative cursor-pointer">
        <img src="${IMG_SMALL + pelicula.poster_path}"
          class="rounded-lg group-hover:scale-105 transition duration-300">
        <div class="absolute inset-0 bg-black/60 opacity-0 
          group-hover:opacity-100 flex items-center justify-center transition">
          <button onclick="obtenerTrailer('movie', ${pelicula.id})"
            class="bg-[#E50914] px-4 py-2 rounded">
            Ver tráiler
          </button>
        </div>
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
    contenedor.innerHTML += `
      <div class="group relative cursor-pointer">
        <img src="${IMG_SMALL + serie.poster_path}"
          class="rounded-lg group-hover:scale-105 transition duration-300">
        <div class="absolute inset-0 bg-black/60 opacity-0 
          group-hover:opacity-100 flex items-center justify-center transition">
          <button onclick="obtenerTrailer('tv', ${serie.id})"
            class="bg-[#E50914] px-4 py-2 rounded">
            Ver tráiler
          </button>
        </div>
      </div>
    `;
  });
}

/* OBTENER TRAILER */
async function obtenerTrailer(tipo, id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/${tipo}/${id}/videos?api_key=${API_KEY}&language=es-ES`
  );
  const data = await res.json();

  const trailer = data.results.find(
    video => video.type === "Trailer" && video.site === "YouTube"
  );

  if (trailer) {
    document.getElementById("trailerFrame").src =
      `https://www.youtube.com/embed/${trailer.key}`;

    document.getElementById("trailerModal").classList.remove("hidden");
    document.getElementById("trailerModal").classList.add("flex");
  }
}

/* CERRAR TRAILER */
function cerrarTrailer() {
  document.getElementById("trailerModal").classList.add("hidden");
  document.getElementById("trailerFrame").src = "";
}

cargarPeliculas();
cargarSeries();