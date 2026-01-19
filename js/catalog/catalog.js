const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const YT = "https://www.youtube.com/embed/";


window.openMovie = (movie) => openModal(movie, true);
window.openSeries = (series) => openModal(series, false);

let MOVIES_CACHE = {};
let SERIES_CACHE = {};

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

// ================= MOVIES =================
export function renderMovies(movies) {
    const wrapper = document.getElementById("movies-wrapper");
    wrapper.innerHTML = "";

    movies.forEach(movie => {
        if (!movie.poster_path) return;

        MOVIES_CACHE[movie.id] = movie;

        wrapper.insertAdjacentHTML("beforeend", `
    <div class="swiper-slide !w-[160px]">
    <div
        class="movie-card relative rounded-md overflow-hidden cursor-pointer hover:scale-105 transition" data-id="${movie.id}" data-type="movie">
        <img
        src="${IMG}${movie.poster_path}"
        class="w-full aspect-[2/3] object-cover"
        alt="${movie.title}"
        />
    </div>
    </div>
`);
    });
}

// ================= SERIES =================
export function renderSeries(seriesList) {
    const wrapper = document.getElementById("series-wrapper");
    wrapper.innerHTML = "";

    seriesList.forEach(series => {
        if (!series.poster_path) return;

        SERIES_CACHE[series.id] = series;

        wrapper.insertAdjacentHTML("beforeend", `
    <div class="swiper-slide !w-[160px]">
    <div
    class="movie-card relative rounded-md overflow-hidden cursor-pointer hover:scale-105 transition" data-id="${series.id}" data-type="tv">
        <img
        src="${IMG}${series.poster_path}"
        class="w-full aspect-[2/3] object-cover"
        alt="${series.name}"
        />
    </div>
    </div>
`);
    });
}

const modal = document.getElementById("movie-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-description");
const modalBackdrop = document.getElementById("modal-backdrop");
const closeModal = document.getElementById("close-modal");

const BACKDROP = "https://image.tmdb.org/t/p/original";

async function openModal(item, isMovie) {
    modalTitle.textContent = isMovie ? item.title : item.name;
    modalDesc.textContent = item.overview || "Sin descripción disponible";

    modalBackdrop.style.backgroundImage = `
    url(https://image.tmdb.org/t/p/original${item.backdrop_path || item.poster_path})
    `;

    modal.classList.remove("hidden");

    // 🎞 TRAILER
    const trailer = await fetchTrailer(
        item.id,
        isMovie ? "movie" : "tv"
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


closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");

    const iframe = document.getElementById("modal-trailer");
    iframe.src = ""; // 🔥 corta el video
});


document.addEventListener("click", (e) => {
    const card = e.target.closest(".movie-card");
    if (!card) return;

    const id = card.dataset.id;
    const type = card.dataset.type;

    const item =
        type === "movie" ? MOVIES_CACHE[id] : SERIES_CACHE[id];

    openModal(item, type === "movie");
});
