export function initMoviesSwiper() {
    return new Swiper(".moviesSwiper", {
        slidesPerView: 2,
        grid: {
            rows: 2,
            fill: "row"
        },
        spaceBetween: 16,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            640: {
                slidesPerView: 3,
                grid: { rows: 2 }
            },
            1024: {
                slidesPerView: 5,
                grid: { rows: 2 }
            }
        }
    });
}


// Swiper para la sección de Series de búsqueda

export function initSearchMoviesSwiper() {
    return new Swiper(".moviesSwiper", {
        slidesPerView: 2,
        grid: {
            rows: 2,
            fill: "row"
        },
        spaceBetween: 16,

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            640: {
                slidesPerView: 3,
                grid: { rows: 2 }
            },
            1024: {
                slidesPerView: 5,
                grid: { rows: 2 }
            }
        }
    });
}