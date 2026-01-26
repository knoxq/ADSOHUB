// Swiper para la sección de Series

export function initSeriesSwiper() {
    return new Swiper(".seriesSwiper", {
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

export function initSearchSeriesSwiper() {
    return new Swiper(".seriesSwiper", {
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



