// js/particulas-nieve.js

// 1. INTERACTIVIDAD DE EXPANSIÓN DE OBJETIVOS (Se mantiene intacto)
function conmutarTarjeta(elemento) {
    const yaExpandido = elemento.classList.contains('abierta');
    document.querySelectorAll('.tarjeta-revelable-clic').forEach(t => t.classList.remove('abierta'));
    if (!yaExpandido) elemento.classList.add('abierta');
}

// 2. MOTOR DE PARTÍCULAS: COPOS DE NIEVE EN AZUL CLARO (CAPA SUPERIOR ADELANTE)
const canvasNieve = document.getElementById('canvas-red-urbana');
const ctxNieve = canvasNieve.getContext('2d');

// Forzado estricto al frente por sobre el marco blanco
canvasNieve.style.position = "fixed";
canvasNieve.style.top = "0";
canvasNieve.style.left = "0";
canvasNieve.style.width = "100vw";
canvasNieve.style.height = "100vh";
canvasNieve.style.zIndex = "9999"; 
canvasNieve.style.pointerEvents = "none"; // El mouse atraviesa los copos sin estorbar clics
canvasNieve.style.display = "block";

let copos = [];

function calibrarPantallaNieve() {
    canvasNieve.width = window.innerWidth || document.documentElement.clientWidth;
    canvasNieve.height = window.innerHeight || document.documentElement.clientHeight;
    inicializarCopos();
}

function inicializarCopos() {
    copos = [];
    const cantidadCopos = 45; // Cantidad perfecta para dar vida sin saturar

    for (let i = 0; i < cantidadCopos; i++) {
        copos.push({
            x: Math.random() * canvasNieve.width,
            y: Math.random() * canvasNieve.height,
            // Velocidad de caída y balanceo suave de copos de nieve
            vy: Math.random() * 0.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.3,
            radio: Math.random() * 2.5 + 2, // Tamaños de puntos circulares variados
            // Variaciones de color estrictamente azul claro y cian brillante
            color: Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.7)' : 'rgba(14, 165, 233, 0.5)'
        });
    }
}

function moverCopos() {
    copos.forEach(c => {
        c.y += c.vy;
        c.x += c.vx;

        // Si el copo llega al suelo virtual inferior, se reinicia arriba de forma aleatoria
        if (c.y > canvasNieve.height) {
            c.y = -10;
            c.x = Math.random() * canvasNieve.width;
        }
        // Límites laterales suaves
        if (c.x < 0) c.x = canvasNieve.width;
        if (c.x > canvasNieve.width) c.x = 0;

        // Dibujar el punto circular limpio solicitado (Sin palitos de unión)
        ctxNieve.beginPath();
        ctxNieve.arc(c.x, c.y, c.radio, 0, Math.PI * 2);
        ctxNieve.fillStyle = c.color;
        ctxNieve.fill();
    });
}

function bucleNieve() {
    ctxNieve.clearRect(0, 0, canvasNieve.width, canvasNieve.height);
    moverCopos();
    requestAnimationFrame(bucleNieve);
}

calibrarPantallaNieve();
window.addEventListener('resize', calibrarPantallaNieve);
bucleNieve();
