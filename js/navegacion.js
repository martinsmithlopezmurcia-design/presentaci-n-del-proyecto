// js/navegacion.js

const paginas = [
    "index.html",
    "contenido.html",
    "pregunta.html",
    "objetivos.html",
    "herramientas.html",
    "analisis.html",
    "conclusiones.html",
    "final.html"
];

const paginaActual = window.location.pathname.split("/").pop() || "index.html";
const indiceActual = paginas.indexOf(paginaActual);

function siguientePagina() {
    if (indiceActual < paginas.length - 1) {
        window.location.href = paginas[indiceActual + 1];
    }
}

function anteriorPagina() {
    if (indiceActual > 0) {
        window.location.href = paginas[indiceActual - 1];
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") siguientePagina();
    if (event.key === "ArrowLeft") anteriorPagina();
});

document.addEventListener("DOMContentLoaded", () => {
    const mostrarAnterior = indiceActual > 0;
    const mostrarSiguiente = indiceActual < paginas.length - 1 && indiceActual !== -1;

    const navContenedor = document.createElement("div");
    navContenedor.className = "controles-navegacion";

    if (mostrarAnterior) {
        const btnAnt = document.createElement("button");
        btnAnt.innerHTML = "&#8592;"; // Solo flecha izquierda
        btnAnt.className = "btn-nav btn-anterior";
        btnAnt.onclick = anteriorPagina;
        navContenedor.appendChild(btnAnt);
    }

    if (mostrarSiguiente) {
        const btnSig = document.createElement("button");
        btnSig.innerHTML = "&#8594;"; // Solo flecha derecha
        btnSig.className = "btn-nav btn-siguiente";
        btnSig.onclick = siguientePagina;
        navContenedor.appendChild(btnSig);
    }

    document.body.appendChild(navContenedor);

    // Sistema automático inyector de partículas sutiles
    const contenedorParticulas = document.getElementById("particulas-contenedor");
    if (contenedorParticulas) {
        for (let i = 0; i < 15; i++) { // Pocas partículas para que sea sutil
            const particula = document.createElement("div");
            particula.className = "particula";
            particula.style.left = Math.random() * 100 + "vw";
            particula.style.width = particula.style.height = (Math.random() * 6 + 4) + "px";
            particula.style.animationDelay = Math.random() * 5 + "s";
            particula.style.animationDuration = (Math.random() * 6 + 6) + "s";
            contenedorParticulas.appendChild(particula);
        }
    }
});
