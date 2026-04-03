// ================= IMPORTANTES PARA LOS TRAILERS =================
const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const YT = "https://www.youtube.com/embed/";

// ================= CACHE DE PELICULAS =================
let MOVIES_CACHE = {};
let MULTIMEDIA_MOVIES_CACHE = {};

const IMG = "https://image.tmdb.org/t/p/w500";

// ================= FETCH PARA LOS TRAILERS =================
async function fetchTrailer(id, type) {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );
    const data = await res.json();

    return data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );
}

// ================ FUNCIONES DE RENDERIZADO =================
export function renderMovies(movies) {
    const wrapper = document.getElementById("movies-card");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        MOVIES_CACHE[movie.id] = movie;

        wrapper.insertAdjacentHTML("beforeend", `
<div class="col">
    <div class="movie-card bg-dark shadow-sm h-100 hover-scale" data-id="${movie.id}" data-type="movie">
        <img src="${IMG + movie.poster_path}" alt="${movie.title}" />
        <div class="p-2 p-md-3">
            <h3 class="fs-6 fw-semibold text-truncate mb-1" title="${movie.title}">
                ${movie.title}
            </h3>
            <p class="small text-secondary mb-0">
                ${movie.release_date?.slice(0, 4) || "—"}
            </p>
        </div>
    </div>
</div>
`);
    });
}

// ================ FUNCIONES DE BÚSQUEDA =================
export function renderSearchMovies(movies) {
    const wrapper = document.getElementById("movies-card");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        MULTIMEDIA_MOVIES_CACHE[movie.id] = movie;

        wrapper.insertAdjacentHTML("beforeend", `
<div class="col">
    <div class="movie-card bg-dark shadow-sm h-100 hover-scale" data-id="${movie.id}" data-type="movie">
        <img src="${IMG + movie.poster_path}" alt="${movie.title}" />
        <div class="p-2 p-md-3">
            <h3 class="fs-6 fw-semibold text-truncate mb-1" title="${movie.title}">
                ${movie.title}
            </h3>
            <p class="small text-secondary mb-0">
                ${movie.release_date?.slice(0, 4) || "—"}
            </p>
        </div>
    </div>
</div>
`);
    });
}

//================ FUNCIONES DE LIMPIEZA =================
export function clearSearchSeries() {
    const wrapper = document.getElementById("movies-card");
    if (wrapper) wrapper.innerHTML = "";
}

// ================ MODAL =================

const modalElement = document.getElementById("movie-modal");

// Using Bootstrap 5 native behavior
if (modalElement) {
    modalElement.addEventListener('hidden.bs.modal', () => {
        const iframe = document.getElementById("modal-trailer");
        if (iframe) iframe.src = "";
    });
}

function getBsModal() {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
}

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalBackdrop = document.getElementById("modal-backdrop");

// ================ FUNCION ABRIR MODAL =================
async function openModal(item, isMovie) {
    modalTitle.textContent = isMovie ? item.title : item.name;
    modalDesc.textContent = item.overview || "Sin descripción disponible";

    modalBackdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path})`;

    // ============== TRAILER =================
    const trailer = await fetchTrailer(item.id, "movie");

    const iframe = document.getElementById("modal-trailer");

    if (trailer) {
        iframe.src = `${YT}${trailer.key}?autoplay=1&mute=1`;
        iframe.classList.remove("d-none");
        modalBackdrop.classList.add("d-none");
    } else {
        iframe.classList.add("d-none");
        modalBackdrop.classList.remove("d-none");
    }

    // Open Bootstrap Modal
    getBsModal().show();
}

// ================ EVENTO CLICK EN LAS CARDS =================
document.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    let item = null
    if (type === "movie") {
        item = MOVIES_CACHE[id] || MULTIMEDIA_MOVIES_CACHE[id];
    }
    if (!item) return;

    openModal(item, type === "movie");
});

function obtenerModal() {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
}

// Búsqueda de tráiler
async function pedirTrailer(id, tipo) {
    let url = `https://api.themoviedb.org/3/${tipo}/${id}/videos?api_key=${API_KEY}&language=es-ES`;
    const datos = await fetch(url);
    const jsonVideos = await datos.json();

    for (let i = 0; i < jsonVideos.results.length; i++) {
        let video = jsonVideos.results[i];
        if (video.type === "Trailer" && video.site === "YouTube") {
            return video;
        }
    }
    return null;
}

// Ventana emergente
async function abrirModal(item, tipo) {
    cajaTituloModal.innerHTML = item.title || item.name;

    if (item.overview) {
        cajaDescModal.innerHTML = item.overview;
    } else {
        cajaDescModal.innerHTML = "Sin descripción disponible.";
    }

    let imagenFondo = item.backdrop_path || item.poster_path;
    cajaFondoModal.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${imagenFondo})`;

    let videoTrailer = await pedirTrailer(item.id, tipo);

    if (videoTrailer !== null) {
        let urlVideo = `${YT_BASE_URL}${videoTrailer.key}?autoplay=1&mute=1`;
        iframe.src = urlVideo;
        iframe.classList.remove("d-none"); // mostrar
        cajaFondoModal.classList.add("d-none"); // ocultar foto
    } else {
        iframe.classList.add("d-none"); // ocultar youtube
        cajaFondoModal.classList.remove("d-none"); // mostrar foto
    }

    obtenerModal().show();
}

// Manejar todos los clics de las peliculas
document.addEventListener("click", (evento) => {
    const tarjeta = evento.target.closest(".movie-card");

    if (tarjeta !== null) {
        let idTarjeta = tarjeta.dataset.id;
        let peliEnCache = CACHE[idTarjeta];

        if (peliEnCache !== undefined) {
            console.log(peliEnCache); // info de API 
            abrirModal(peliEnCache, "movie");
        }
    }
});