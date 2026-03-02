    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    const letrasDiv = document.getElementById("letras");
    const palabraDiv = document.getElementById("palbras");
    const btnInicio = document.getElementById("inicio");
    const btnPista = document.getElementById("verPista");
    const pistasDiv = document.getElementById("pistas");
    const vidasSpan = document.getElementById("vidas");
    const usadasSpan = document.getElementById("usadas");
    const modal = document.getElementById("modal");
    const abrirModal = document.getElementById("abrirModal");
    const cerrarModal = document.getElementById("cerrarModal");
    const peliculas = [
        { titulo: "ELPADRINO", año: 1972, actores: "Marlon Brando", descripcion: "Familia mafiosa." },
        { titulo: "GLADIADOR", año: 2000, actores: "Russell Crowe", descripcion: "Venganza romana." },
        { titulo: "PARASITOS", año: 2019, actores: "Song Kang Ho", descripcion: "Familia infiltrada." },
        { titulo: "TITANIC", año: 1997, actores: "Leonardo DiCaprio", descripcion: "Amor en barco." },
        { titulo: "INTERESTELAR", año: 2014, actores: "Matthew McConaughey", descripcion: "Viaje espacial." },
        { titulo: "MATRIX", año: 1999, actores: "Keanu Reeves", descripcion: "Realidad simulada." },
        { titulo: "FORRESTGUMP", año: 1994, actores: "Tom Hanks", descripcion: "Vida extraordinaria." },
        { titulo: "ELREYLEON", año: 1994, actores: "Animacion", descripcion: "Principe leon." },
        { titulo: "COCO", año: 2017, actores: "Animacion", descripcion: "Musica y familia." },
        { titulo: "ENCANTO", año: 2021, actores: "Animacion", descripcion: "Familia magica." },
        { titulo: "SHREK", año: 2001, actores: "Animacion", descripcion: "Ogro amigable." },
        { titulo: "FROZEN", año: 2013, actores: "Animacion", descripcion: "Reino de hielo." },
        { titulo: "BUSCANDONEMO", año: 2003, actores: "Animacion", descripcion: "Pez perdido." },
        { titulo: "TOYSTORY", año: 1995, actores: "Animacion", descripcion: "Juguetes vivos." },
        { titulo: "UP", año: 2009, actores: "Animacion", descripcion: "Casa con globos." },
        { titulo: "INTENSAMENTE", año: 2015, actores: "Animacion", descripcion: "Emociones internas." },
        { titulo: "LOSINCREIBLES", año: 2004, actores: "Animacion", descripcion: "Familia superheroe." },
        { titulo: "JOKER", año: 2019, actores: "Joaquin Phoenix", descripcion: "Villano de ciudad." },
        { titulo: "AVATAR", año: 2009, actores: "Sam Worthington", descripcion: "Planeta Pandora." },
        { titulo: "ELCONJURO", año: 2013, actores: "Vera Farmiga", descripcion: "Caso paranormal." },
        { titulo: "ANNABELLE", año: 2014, actores: "Annabelle Wallis", descripcion: "Muneca demoniaca." },
        { titulo: "LALLORONA", año: 2019, actores: "Linda Cardellini", descripcion: "Espiritu vengativo." },
        { titulo: "ELORFANATO", año: 2007, actores: "Belen Rueda", descripcion: "Casa misteriosa." },
        { titulo: "REC", año: 2007, actores: "Manuela Velasco", descripcion: "Infeccion viral." },
        { titulo: "AMORESPERROS", año: 2000, actores: "Gael Garcia", descripcion: "Historias cruzadas." },
        { titulo: "ROMA", año: 2018, actores: "Yalitza Aparicio", descripcion: "Vida familiar." },
        { titulo: "MUJERMARAVILLA", año: 2017, actores: "Gal Gadot", descripcion: "Guerrera amazona." },
        { titulo: "AQUAMAN", año: 2018, actores: "Jason Momoa", descripcion: "Rey de Atlantida." },
        { titulo: "SUPERMAN", año: 1978, actores: "Christopher Reeve", descripcion: "Heroe de acero." },
        { titulo: "BATMANINICIA", año: 2005, actores: "Christian Bale", descripcion: "Origen de heroe." },
        { titulo: "SPIDERMAN", año: 2002, actores: "Tobey Maguire", descripcion: "Heroe aracnido." },
        { titulo: "JURASICO", año: 1993, actores: "Sam Neill", descripcion: "Dinosaurios escapan." },
        { titulo: "ELLABERINTO", año: 2006, actores: "Ivana Baquero", descripcion: "Mundo fantastico." },
        { titulo: "CASABLANCA", año: 1942, actores: "Humphrey Bogart", descripcion: "Amor en guerra." },
        { titulo: "PSICOSIS", año: 1960, actores: "Anthony Perkins", descripcion: "Asesino en hotel." },
        { titulo: "ELRESPLANDOR", año: 1980, actores: "Jack Nicholson", descripcion: "Hotel fantasma." },
        { titulo: "CORAZONVALIENTE", año: 1995, actores: "Mel Gibson", descripcion: "Guerrero escoces." },
        { titulo: "VIDAESTABELLA", año: 1997, actores: "Roberto Benigni", descripcion: "Amor en guerra." },
        { titulo: "MILAGROENLACELDA", año: 2019, actores: "Aras Bulut", descripcion: "Amor paternal." }
    ];

    let peliculaActual;
    let palabraSecreta;
    let palabraMostrada;
    let vidas;
    let letrasUsadas;
    let nivelPista;
    let juegoActivo = false;

    function dibujarBase() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(20, 280);
        ctx.lineTo(200, 280);
        ctx.moveTo(50, 280);
        ctx.lineTo(50, 20);
        ctx.lineTo(150, 20);
        ctx.lineTo(150, 50);
        ctx.stroke();
    }

    function dibujarAhorcado(error) {
        ctx.beginPath();
        switch (error) {
            case 1: ctx.arc(150, 70, 20, 0, Math.PI * 2); break;
            case 2: ctx.moveTo(150, 90); ctx.lineTo(150, 150); break;
            case 3: ctx.moveTo(150, 100); ctx.lineTo(120, 130); break;
            case 4: ctx.moveTo(150, 100); ctx.lineTo(180, 130); break;
            case 5: ctx.moveTo(150, 150); ctx.lineTo(120, 190); break;
            case 6: ctx.moveTo(150, 150); ctx.lineTo(180, 190); break;
        }
        ctx.stroke();
    }

    function actualizarVista() {
        palabraDiv.textContent = palabraMostrada.join(" ");
        vidasSpan.textContent = vidas;
        usadasSpan.textContent = letrasUsadas.join(", ");
    }

    function iniciarJuego() {
        juegoActivo = true;
        letrasDiv.innerHTML = "";
        pistasDiv.innerHTML = "";
        pistasDiv.classList.add("hidden");
        vidas = 6;
        letrasUsadas = [];
        nivelPista = 0;
        peliculaActual = peliculas[Math.floor(Math.random() * peliculas.length)];
        palabraSecreta = peliculaActual.titulo.toUpperCase();
        palabraMostrada = Array(palabraSecreta.length).fill("_");
        dibujarBase();
        actualizarVista();
        crearTeclado();
    }

    function crearTeclado() {
        const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        abecedario.split("").forEach(letra => {
            const btn = document.createElement("button");
            btn.textContent = letra;
            btn.className = "bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded";
            btn.addEventListener("click", () => {
                if (!juegoActivo) return;
                btn.remove();
                letrasUsadas.push(letra);
                if (palabraSecreta.includes(letra)) {
                    for (let i = 0; i < palabraSecreta.length; i++) {
                        if (palabraSecreta[i] === letra) {
                            palabraMostrada[i] = letra;
                        }
                    }
                    if (!palabraMostrada.includes("_")) {
                        juegoActivo = false;
                        setTimeout(() => alert("Ganaste"), 200);
                    }
                } else {
                    vidas--;
                    dibujarAhorcado(6 - vidas);
                    if (vidas <= 0) {
                        juegoActivo = false;
                        setTimeout(() =>
                            alert("Perdiste. Era: " + palabraSecreta),
                            200
                        );
                    }
                }

                actualizarVista();
            });

            letrasDiv.appendChild(btn);
        });
    }
    btnPista.addEventListener("click", () => {

        if (!juegoActivo) return;
        if (nivelPista >= 3) return;

        const pistas = [
            `Año: ${peliculaActual.año}`,
            `Actores: ${peliculaActual.actores}`,
            `Descripción: ${peliculaActual.descripcion}`
        ];

        pistasDiv.classList.remove("hidden");

        const nueva = document.createElement("p");
        nueva.textContent = pistas[nivelPista];
        pistasDiv.appendChild(nueva);

        nivelPista++;
    });

    abrirModal.addEventListener("click", () => {
        modal.classList.remove("hidden");
        modal.classList.add("flex");

        setTimeout(() => {
            iniciarJuego();
        }, 50);
    });

    cerrarModal.addEventListener("click", () => {
        modal.classList.add("hidden");
        juegoActivo = false;
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            juegoActivo = false;
        }
    });

    btnInicio.addEventListener("click", iniciarJuego);