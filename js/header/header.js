    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    const menuPanel = document.getElementById("mobile-menu-panel");
    const closeMenu = document.getElementById("close-menu");

    function isMobile() {
        return window.innerWidth < 768; // md breakpoint
    }

    menuToggle.addEventListener("click", () => {
        if (!isMobile()) return;

        mobileMenu.classList.remove("opacity-0", "pointer-events-none");
        menuPanel.classList.remove("-translate-y-10");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.add("opacity-0", "pointer-events-none");
        menuPanel.classList.add("-translate-y-10");
    });

    // Si se agranda la pantalla, cerramos el menú
    window.addEventListener("resize", () => {
        if (!isMobile()) {
            mobileMenu.classList.add("opacity-0", "pointer-events-none");
            menuPanel.classList.add("-translate-y-10");
        }
    });