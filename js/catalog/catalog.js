const API_KEY = "12d276e3703dbfd31547bc6f0021075a";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YT_BASE_URL = "https://www.youtube.com/embed/";

let CACHE = {};

export function renderMovies(movies) {
    let caja = document.getElementById("movies-card");
    if (!caja) {
        return;
    }
    
    let tarjetasHTML = '';
    
    for (let i = 0; i < movies.length; i++) {
        let peli = movies[i];
        
        // Evitamos películas sin póster o inválidas
        if (!peli.poster_path) {
            continue;
        }

        CACHE[peli.id] = peli;
        
        let titulo = peli.title;
        let imagen = peli.poster_path;
        
        tarjetasHTML += `
            <div class="movie-card" data-id="${peli.id}" data-type="movie">
                <img src="${IMG_BASE_URL}${imagen}" alt="${titulo}" class="shadow-sm hover-scale" />
            </div>
        `;
    }
    
    caja.innerHTML = tarjetasHTML;
}

export function renderSeries(seriesList) {
    let caja = document.getElementById("series-card");
    if (!caja) {
        return;
    }
    
    let tarjetasHTML = '';
    
    for (let i = 0; i < seriesList.length; i++) {
        let serie = seriesList[i];
        
        if (!serie.poster_path) {
            continue;
        }

        CACHE[serie.id] = serie;
        
        let titulo = serie.name;
        let imagen = serie.poster_path;
        
        tarjetasHTML += `
            <div class="movie-card" data-id="${serie.id}" data-type="tv">
                <img src="${IMG_BASE_URL}${imagen}" alt="${titulo}" class="shadow-sm hover-scale" />
            </div>
        `;
    }
    
    caja.innerHTML = tarjetasHTML;
}

export function renderSearchMovies(movies) {
    let caja = document.getElementById("movies-card");
    if (!caja) {
        return;
    }
    
    let tarjetasHTML = '';
    
    for (let i = 0; i < movies.length; i++) {
        let peli = movies[i];
        
        if (peli.media_type === "person" || (!peli.poster_path && !peli.backdrop_path)) {
            continue;
        }

        CACHE[peli.id] = peli;
        
        let titulo = peli.title || peli.name;
        let imagen = peli.poster_path || peli.backdrop_path;
        
        tarjetasHTML += `
            <div class="movie-card" data-id="${peli.id}" data-type="movie">
                <img src="${IMG_BASE_URL}${imagen}" alt="${titulo}" class="shadow-sm hover-scale" />
            </div>
        `;
    }
    
    caja.innerHTML = tarjetasHTML;
}

export function renderSearchSeries(seriesList) {
    let caja = document.getElementById("series-card");
    if (!caja) {
        return;
    }
    
    let tarjetasHTML = '';
    
    for (let i = 0; i < seriesList.length; i++) {
        let serie = seriesList[i];
        
        if (serie.media_type === "person" || (!serie.poster_path && !serie.backdrop_path)) {
            continue;
        }

        CACHE[serie.id] = serie;
        
        let titulo = serie.name || serie.title;
        let imagen = serie.poster_path || serie.backdrop_path;
        
        tarjetasHTML += `
            <div class="movie-card" data-id="${serie.id}" data-type="tv">
                <img src="${IMG_BASE_URL}${imagen}" alt="${titulo}" class="shadow-sm hover-scale" />
            </div>
        `;
    }
    
    caja.innerHTML = tarjetasHTML;
}

export function clearCatalog() {
    let cajaMovies = document.getElementById("movies-card");
    let cajaSeries = document.getElementById("series-card");

    if (cajaMovies) {
        cajaMovies.innerHTML = "";
    }
    if (cajaSeries) {
        cajaSeries.innerHTML = "";
    }
}


// ======================================
//             MODAL Y CLICS
// ======================================

const modalElement = document.getElementById("movie-modal");
const iframe = document.getElementById("modal-trailer");
const cajaTituloModal = document.getElementById("modal-title");
const cajaDescModal = document.getElementById("modal-description");
const cajaFondoModal = document.getElementById("modal-backdrop");

// Al cerrar la ventana, quitamos el video
if (modalElement) {
    modalElement.addEventListener('hidden.bs.modal', () => {
        if (iframe) {
            iframe.src = "";
        }
    });
}

function obtenerModal() {
    return bootstrap.Modal.getOrCreateInstance(modalElement);
}

// Búsqueda de un tráiler en Youtube (Peticion a API)
async function pedirTrailer(id, tipo) {
    let url = `https://api.themoviedb.org/3/${tipo}/${id}/videos?api_key=${API_KEY}&language=es-ES`;
    const datos = await fetch(url);
    const jsonVideos = await datos.json();

    // Buscar en el arreglo
    for (let i = 0; i < jsonVideos.results.length; i++) {
        let video = jsonVideos.results[i];
        if (video.type === "Trailer" && video.site === "YouTube") {
            return video; // devolvemos el primero que encontremos
        }
    }
    return null;
}

// Rellenar datos de ventana
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
        cajaFondoModal.classList.add("d-none"); // ocultar foto de fondo
    } else {
        iframe.classList.add("d-none"); // ocultar youtube
        cajaFondoModal.classList.remove("d-none"); // mostrar foto de fondo
    }

    let bsModal = obtenerModal();
    bsModal.show();
}

// Evento Global
document.addEventListener("click", (evento) => {
    // Verificar si hicimos clic a una tarjeta
    const tarjeta = evento.target.closest(".movie-card");
    
    if (tarjeta !== null) {
        let idTarjeta = tarjeta.dataset.id;
        let tipoTarjeta = tarjeta.dataset.type; // tv o movie
        
        let itemGuardado = CACHE[idTarjeta];
        
        if (itemGuardado !== undefined) {
            console.log(itemGuardado); // mostrar la info de la peli / serie como demostracion
            abrirModal(itemGuardado, tipoTarjeta);
        }
    }
});
