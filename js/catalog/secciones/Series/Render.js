// Base URL para las imágenes de TMDB

const IMG = "https://image.tmdb.org/t/p/w500";

// Función para renderizar las series populares

export function renderSeries(series) {
    const wrapper = document.getElementById("series-wrapper");
    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;

        wrapper.innerHTML += `
        <div class="swiper-slide">
        <div class="group relative rounded-lg overflow-hidden cursor-pointer">

            <img src="${IMG + tv.poster_path}"
                class="w-full h-[280px] object-cover
                        transition-transform duration-300
                        group-hover:scale-110" />

            <div class="absolute inset-0 bg-black/80 opacity-0
                        group-hover:opacity-100 transition
                        flex flex-col justify-end p-3">

            <h3 class="text-sm font-bold">
                ${tv.name}
                <span class="text-zinc-400 font-normal">
                (${tv.first_air_date?.slice(0, 4) || "—"})
                </span>
            </h3>

            </div>
        </div>
        </div>
    `;
    });
}

// Función para renderizar los resultados de búsqueda de series

export function renderSearchSeries(series) {
    const wrapper = document.getElementById("series-wrapper");
    if (!wrapper) return;

    wrapper.innerHTML = "";

    series.forEach(tv => {
        if (!tv.poster_path) return;

        wrapper.innerHTML += `
        <div class="swiper-slide">
            <div class="group relative rounded-lg overflow-hidden cursor-pointer">

                <img src="${IMG + tv.poster_path}"
                    class="w-full h-[280px] object-cover
                        transition-transform duration-300
                        group-hover:scale-110" />

                <div class="absolute inset-0 bg-black/80 opacity-0
                            group-hover:opacity-100 transition
                            flex flex-col justify-end p-3">
                    <h3 class="text-sm font-bold">
                        ${tv.name}
                        <span class="text-zinc-400 font-normal">
                            (${tv.first_air_date?.slice(0, 4) || "—"})
                        </span>
                    </h3>
                </div>

            </div>
        </div>
        `;
    });
}

// Función para limpiar los resultados de búsqueda de series

export function clearSearchSeries() {
    const wrapper = document.getElementById("series-wrapper");
    if (wrapper) wrapper.innerHTML = "";
}
