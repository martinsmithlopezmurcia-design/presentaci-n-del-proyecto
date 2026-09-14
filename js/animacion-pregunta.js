// js/animacion-pregunta.js

// 1. INTERACTIVIDAD DE EXPANSIÓN DE CONTENEDORES VACÍOS
function activarExpansion(bloque) {
    const yaExpandido = bloque.classList.contains('expandido');
    document.querySelectorAll('.bloque-revelable-vacio').forEach(b => b.classList.remove('expandido'));
    if (!yaExpandido) bloque.classList.add('expandido');
}

// 2. CONFIGURACIÓN DEL CANVAS: FORZADO ESTRICTO ADELANTE (CAPA SUPERIOR)
const canvas = document.getElementById('canvas-red-urbana');
const ctx = canvas.getContext('2d');

// Corrección de sintaxis: Forzado real al frente por encima del contenedor blanco
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100vw";
canvas.style.height = "100vh";
canvas.style.zIndex = "9999"; // Valor ultra-alto para asegurar que esté al frente de todo
canvas.style.pointerEvents = "none"; // El mouse atraviesa los palitos para dar clic atrás
canvas.style.display = "block";

let nodosConstelacion = [];
// Incrementamos el rango del mouse para que los palitos reaccionen elásticamente al pasar el cursor
const mouse = { x: null, y: null, rango: 130 };

function ajustarPantalla() {
    canvas.width = window.innerWidth || document.documentElement.clientWidth;
    canvas.height = window.innerHeight || document.documentElement.clientHeight;
    inicializarNodosAleatorios();
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => { 
    mouse.x = null; 
    mouse.y = null; 
});

// Puntos fluidos aleatorios
function inicializarNodosAleatorios() {
    nodosConstelacion = [];
    const cantidadPuntos = 35; // Densidad ideal visible

    for (let i = 0; i < cantidadPuntos; i++) {
        nodosConstelacion.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.7, // Movimiento autónomo elegante
            vy: (Math.random() - 0.5) * 0.7,
            radio: Math.random() * 2 + 2.5
        });
    }
}

function actualizarPosicionesAleatorias() {
    nodosConstelacion.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        // Si salen de la pantalla, cruzan hacia el otro extremo
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;

        // Empuje elástico nítido al acercar el puntero
        if (mouse.x !== null && mouse.y !== null) {
            let dx = n.x - mouse.x;
            let dy = n.y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.rango) {
                let fuerza = (mouse.rango - dist) / mouse.rango;
                n.x += (dx / dist) * fuerza * 2;
                n.y += (dy / dist) * fuerza * 2;
            }
        }
    });
}

function renderizarBucle() {
    // Limpia la pantalla para redibujar el siguiente fotograma transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    actualizarPosicionesAleatorias();

    // DISTANCIA AMPLIADA: Ahora los palitos sí se trazan y se conectan entre nodos cercanos
    const distanciaMaximaConexion = 160; 

    for (let i = 0; i < nodosConstelacion.length; i++) {
        for (let j = i + 1; j < nodosConstelacion.length; j++) {
            let dx = nodosConstelacion[i].x - nodosConstelacion[j].x;
            let dy = nodosConstelacion[i].y - nodosConstelacion[j].y;
            let distancia = Math.sqrt(dx * dx + dy * dy);

            // Si los puntos se cruzan a una distancia menor, se dibuja el palito
            if (distancia < distanciaMaximaConexion) {
                // Opacidad progresiva para un acabado ultra fluido
                let opacidadDinamica = (distanciaMaximaConexion - distancia) / distanciaMaximaConexion * 0.5;
                
                ctx.beginPath();
                ctx.moveTo(nodosConstelacion[i].x, nodosConstelacion[i].y);
                ctx.lineTo(nodosConstelacion[j].x, nodosConstelacion[j].y);
                ctx.strokeStyle = `rgba(37, 99, 235, ${opacidadDinamica})`; // Azul nítido
                ctx.lineWidth = 1.6;
                ctx.stroke();
            }
        }
    }

    // Dibujar los puntos (Nodos de la red)
    nodosConstelacion.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radio, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(37, 99, 235, 0.85)'; // Azul intenso visible
        ctx.fill();
    });

    requestAnimationFrame(renderizarBucle);
}

// Inicialización automática formal del lienzo
ajustarPantalla();
window.addEventListener('resize', ajustarPantalla);
renderizarBucle();
