const abrirModal = document.getElementById("abrirModal");
const cerrarModal = document.getElementById("cerrarModal");
const modal = document.getElementById("modal");
const tablero = document.getElementById("tablero");
const reiniciar = document.getElementById("reiniciar");

let cartas = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉", "🍓", "🍓", "🍊", "🍊"];
let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

abrirModal.onclick = () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    iniciarJuego();
};

cerrarModal.onclick = () => {
    modal.classList.add("hidden");
};

function iniciarJuego() {
    tablero.innerHTML = "";
    cartas.sort(() => 0.5 - Math.random());
    primeraCarta = null;
    segundaCarta = null;
    bloqueado = false;

    cartas.forEach(simbolo => {
        const carta = document.createElement("div");
        carta.className = "bg-red-600 hover:bg-red-700 text-white h-16 flex items-center justify-center text-2xl rounded-lg cursor-pointer";
        carta.textContent = "";
        carta.dataset.valor = simbolo;

        carta.onclick = () => {
            if (bloqueado || carta.textContent !== "") return;

            carta.textContent = simbolo;

            if (!primeraCarta) {
                primeraCarta = carta;
            } else {
                segundaCarta = carta;
                bloqueado = true;

                if (primeraCarta.dataset.valor === segundaCarta.dataset.valor) {
                    primeraCarta = null;
                    segundaCarta = null;
                    bloqueado = false;
                } else {
                    setTimeout(() => {
                        primeraCarta.textContent = "";
                        segundaCarta.textContent = "";
                        primeraCarta = null;
                        segundaCarta = null;
                        bloqueado = false;
                    }, 800);
                }
            }
        };

        tablero.appendChild(carta);
    });
}

reiniciar.onclick = iniciarJuego;