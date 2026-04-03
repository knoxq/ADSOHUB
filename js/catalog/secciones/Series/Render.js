// ================= IMPORTANTES PARA LOS TRAILERS =================
const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const YT = "https://www.youtube.com/embed/";

// ================= CACHE DE PELICULAS =================
let SERIES_CACHE = {};
let MULTIMEDIA_SERIES_CACHE = {};

const IMG = "https://image.tmdb.org/t/p/w500";

async function fetchTrailer(id, type) {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );
    const data = await res.json();

    return data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );
}

// Función para renderizar las series populares
export function renderSeries(series) {
    const wrapper = document.getElementById("series-card");
    if (!wrapper) return;
    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;
        SERIES_CACHE[tv.id] = tv;

        wrapper.insertAdjacentHTML("beforeend", `
<div class="col">
    <div class="movie-card bg-dark shadow-sm h-100 hover-scale" data-id="${tv.id}" data-type="tv">
        <img src="${IMG + tv.poster_path}" alt="${tv.name}" />
        <div class="p-2 p-md-3">
            <h3 class="fs-6 fw-semibold text-truncate mb-1" title="${tv.name}">
                ${tv.name}
            </h3>
            <p class="small text-secondary mb-0">
                ${tv.first_air_date?.slice(0, 4) || "—"}
            </p>
        </div>
    </div>
</div>
`);
    });
}

// Función para renderizar los resultados de búsqueda de series
export function renderSearchSeries(series) {
    const wrapper = document.getElementById("series-card");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;
        MULTIMEDIA_SERIES_CACHE[tv.id] = tv;

        wrapper.insertAdjacentHTML("beforeend", `
<div class="col">
    <div class="movie-card bg-dark shadow-sm h-100 hover-scale" data-id="${tv.id}" data-type="tv">
        <img src="${IMG + tv.poster_path}" alt="${tv.name}" />
        <div class="p-2 p-md-3">
            <h3 class="fs-6 fw-semibold text-truncate mb-1" title="${tv.name}">
                ${tv.name}
            </h3>
            <p class="small text-secondary mb-0">
                ${tv.first_air_date?.slice(0, 4) || "—"}
            </p>
        </div>
    </div>
</div>
`);
    });
}

// Función para limpiar los resultados de búsqueda de series
export function clearSearchSeries() {
    const wrapper = document.getElementById("series-card");
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
async function openModal(item) {
    modalTitle.textContent = item.name;
    modalDesc.textContent = item.overview || "Sin descripción disponible";

    modalBackdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path})`;

    // ============== TRAILER =================
    const trailer = await fetchTrailer(item.id, "tv");

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
    if (type === "tv") {
        item = SERIES_CACHE[id] || MULTIMEDIA_SERIES_CACHE[id];
    }
    if (!item) return;

    openModal(item);
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
        iframe.classList.remove("d-none"); // mostrar video
        cajaFondoModal.classList.add("d-none"); // ocultar foto de fondo
    } else {
        iframe.classList.add("d-none"); // ocultar youtube
        cajaFondoModal.classList.remove("d-none"); // mostrar foto de fondo
    }

    obtenerModal().show();
}

// Manejar clic
document.addEventListener("click", (evento) => {
    const tarjeta = evento.target.closest(".movie-card");

    if (tarjeta !== null) {
        let idTarjeta = tarjeta.dataset.id;
        let serieEnCache = CACHE[idTarjeta];

        if (serieEnCache !== undefined) {
            console.log(serieEnCache); // info de API 
            abrirModal(serieEnCache, "tv");
        }
    }
});
