// ================= IMPORTANTES PARA LOS TRAILERS =================
const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const YT = "https://www.youtube.com/embed/";


// ================= CACHE DE PELICULAS =================
let SERIES_CACHE = {};
let MULTIMEDIA_SERIES_CACHE = {};


// ==
async function fetchTrailer(id, type) {
    const res = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=es-ES`
    );
    const data = await res.json();

    return data.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
    );
}


const IMG = "https://image.tmdb.org/t/p/w500";

// Función para renderizar las series populares

export function renderSeries(series) {
    const wrapper = document.getElementById("series-wrapper");
    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;
        SERIES_CACHE[tv.id] = tv;


        wrapper.insertAdjacentHTML("beforeend", `
<div class="swiper-slide !w-[140px] sm:!w-[160px] md:!w-[180px]">

    <div class="movie-card relative rounded-xl overflow-hidden
                bg-zinc-900 shadow-md
                transition-transform duration-300
                hover:scale-105"
        data-id="${tv.id}"
        data-type="tv">

    <!-- IMAGEN -->
    <img src="${IMG + tv.poster_path}"
            class="w-full h-[210px] sm:h-[240px] md:h-[260px]
                object-cover" />

        <!-- INFO SIEMPRE VISIBLE EN MOBILE -->
        <div class="p-2 sm:p-3 space-y-1">

            <h3 class="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
            ${tv.name}
            </h3>

            <p class="text-[11px] sm:text-xs text-zinc-400">
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
    const wrapper = document.getElementById("series-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;
        MULTIMEDIA_SERIES_CACHE[tv.id] = tv;

        wrapper.insertAdjacentHTML("beforeend", `
<div class="swiper-slide !w-[140px] sm:!w-[160px] md:!w-[180px]">

    <div class="movie-card relative rounded-xl overflow-hidden
                bg-zinc-900 shadow-md
                transition-transform duration-300
                hover:scale-105"
        data-id="${tv.id}"
        data-type="tv">

    <!-- IMAGEN -->
    <img src="${IMG + tv.poster_path}"
            class="w-full h-[210px] sm:h-[240px] md:h-[260px]
                object-cover" />

        <!-- INFO SIEMPRE VISIBLE EN MOBILE -->
        <div class="p-2 sm:p-3 space-y-1">

            <h3 class="text-xs sm:text-sm font-semibold leading-tight line-clamp-2">
            ${tv.name}
            </h3>

            <p class="text-[11px] sm:text-xs text-zinc-400">
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
    const wrapper = document.getElementById("series-wrapper");
    if (wrapper) wrapper.innerHTML = "";
}




// ================ MODAL =================

const modal = document.getElementById("movie-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModal = document.getElementById("close-modal");

// ================ FUNCION ABRIR MODAL =================

async function openModal(item) {
    modalTitle.textContent = item.name;
    modalDesc.textContent = item.overview || "Sin descripción disponible";

    modalBackdrop.style.backgroundImage = `
    url(https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path})
    `;

    modal.classList.remove("hidden");

    // ============== TRAILER =================
    const trailer = await fetchTrailer(
        item.id, "tv"
    );

    const iframe = document.getElementById("modal-trailer");

    if (trailer) {
        iframe.src = `${YT}${trailer.key}?autoplay=1&mute=1`;
        iframe.classList.remove("hidden");
        modalBackdrop.classList.add("hidden");
    } else {
        iframe.classList.add("hidden");
        modalBackdrop.classList.remove("hidden");
    }
}


// ================ EVENTO CIERRE MODAL =================

closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");

    const iframe = document.getElementById("modal-trailer");
    iframe.src = "";
});

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

    openModal(item, type === "tv");
});
