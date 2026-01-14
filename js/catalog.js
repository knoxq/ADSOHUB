
new Swiper(".mySwiper", {
    loop: true,
    speed: 1200,

    effect: "fade",
    fadeEffect: {
        crossFade: true
    },

    autoplay: {
        delay: 6000,
        disableOnInteraction: false,
    },

    allowTouchMove: false, // no swipe


});



const API_KEY = "88146b98";

// CONTENEDORES
const popularContainer = document.getElementById("popular-movies");
const recentContainer = document.getElementById("recent-movies");

/* =========================
   FETCH GENÉRICO
========================= */
async function fetchMovies(query, container) {
    try {
        const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`
        );
        const data = await res.json();

        if (data.Response === "True") {
            renderMovies(data.Search, container);
        } else {
            container.innerHTML =
                `<p class="text-zinc-400">No se encontraron resultados</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

/* =========================
   RENDER
========================= */
function renderMovies(movies, container) {
    container.innerHTML = "";

    movies.forEach(movie => {
        if (movie.Poster === "N/A") return;

        const slide = document.createElement("div");
        slide.className = "swiper-slide";

        slide.innerHTML = `
      <div class="group relative h-full cursor-pointer">
        <img
          src="${movie.Poster}"
          alt="${movie.Title}"
          class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-110"
        />

        <div class="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition flex items-end p-4 rounded-lg">
          <div>
            <h3 class="text-sm font-semibold">${movie.Title}</h3>
            <p class="text-xs text-zinc-300">${movie.Year}</p>
          </div>
        </div>
      </div>
    `;

        container.appendChild(slide);
    });
}

/* =========================
   SWIPERS
========================= */
function initSwipers() {
    new Swiper(".popularSwiper", {
        slidesPerView: 2,
        spaceBetween: 12,
        breakpoints: {
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
        }
    });

    new Swiper(".recentSwiper", {
        slidesPerView: 2,
        spaceBetween: 12,
        breakpoints: {
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 }
        }
    });
}

/* =========================
    INICIO
========================= */
fetchMovies("batman", popularContainer);   // Populares
fetchMovies("avengers", recentContainer);       // Recientes (simulado)

setTimeout(initSwipers, 500);
