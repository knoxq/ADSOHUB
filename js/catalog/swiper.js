// js/catalog/swiper.js
export function initHeroSwiper() {
    new Swiper(".mySwiper", {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: "fade",
    });
}

export function initMoviesSwiper() {
    new Swiper(".moviesSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        freeMode: true,
        grabCursor: true,
    });
}

export function initSeriesSwiper() {
    new Swiper(".seriesSwiper", {
        slidesPerView: "auto",
        spaceBetween: 12,
        freeMode: true,
        grabCursor: true,
    });
}
