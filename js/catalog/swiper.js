let heroSwiper = null;
let moviesSwiper = null;
let seriesSwiper = null;
let searchSwiper = null;

// ================= HERO =================
export function initHeroSwiper() {
    if (heroSwiper) return;

    heroSwiper = new Swiper(".mySwiper", {
        loop: true,
        autoplay: { delay: 5000 },
    });
}

// ================= MOVIES =================
export function initMoviesSwiper() {
    destroyMoviesSwiper();

    moviesSwiper = new Swiper(".moviesSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        loop: true,
    });
}

export function destroyMoviesSwiper() {
    if (moviesSwiper) {
        moviesSwiper.destroy(true, true);
        moviesSwiper = null;
    }
}

// ================= SERIES =================
export function initSeriesSwiper() {
    destroySeriesSwiper();

    seriesSwiper = new Swiper(".seriesSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        loop: true,
    });
}

export function destroySeriesSwiper() {
    if (seriesSwiper) {
        seriesSwiper.destroy(true, true);
        seriesSwiper = null;
    }
}

// ================= SEARCH =================
export function initSearchMultimediaSwiper() {
    destroySearchSwiper();

    searchSwiper = new Swiper(".searchSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        loop: true,
    });
}

export function destroySearchSwiper() {
    if (searchSwiper) {
        searchSwiper.destroy(true, true);
        searchSwiper = null;
    }
}

// ================= GLOBAL =================
export function destroyAllSwipers() {
    destroyMoviesSwiper();
    destroySeriesSwiper();
}
