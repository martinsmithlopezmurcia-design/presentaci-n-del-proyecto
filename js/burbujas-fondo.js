// js/burbujas-fondo.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Crear el contenedor de fondo para las burbujas decorativas
    const contenedorBurbujas = document.createElement("div");
    contenedorBurbujas.id = "burbujas-decorativas-bg";
    
    // Estilos estrictos por código para fijarlo atrás de la diapositiva
    contenedorBurbujas.style.position = "fixed";
    contenedorBurbujas.style.top = "0";
    contenedorBurbujas.style.left = "0";
    contenedorBurbujas.style.width = "100vw";
    contenedorBurbujas.style.height = "100vh";
    contenedorBurbujas.style.zIndex = "2"; // Por detrás del marco blanco (z-index: 10)
    contenedorBurbujas.style.pointerEvents = "none"; // No bloquea los clics del mouse
    contenedorBurbujas.style.overflow = "hidden";
    
    document.body.appendChild(contenedorBurbujas);

    // 2. Configuración del enjambre de burbujas (Aparecen y desaparecen)
    const cantidadBurbujasFondo = 16; // Cantidad equilibrada y elegante

    for (let i = 0; i < cantidadBurbujasFondo; i++) {
        const burbuja = document.createElement("div");
        
        // Tamaños aleatorios para simular profundidad tridimensional
        const diametro = Math.random() * 60 + 30; 
        
        burbuja.style.position = "absolute";
        burbuja.style.width = `${diametro}px`;
        burbuja.style.height = `${diametro}px`;
        
        // Posicionamiento aleatorio inicial por toda la pantalla
        burbuja.style.left = `${Math.random() * 100}vw`;
        burbuja.style.top = `${Math.random() * 100}vh`;
        
        // Gradiente esférico translúcido idéntico al color azul claro de tus copos de nieve
        burbuja.style.background = "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(224, 242, 254, 0.25) 50%, rgba(186, 230, 253, 0.1) 100%)";
        burbuja.style.border = "1px solid rgba(56, 189, 248, 0.15)";
        burbuja.style.borderRadius = "50%";
        
        // Inyectar desfases de tiempo aleatorios para que parpadeen de una en una y no todas juntas
        const duracionAnimacion = Math.random() * 6 + 6; // Entre 6 y 12 segundos
        const retrasoAnimacion = Math.random() * 5;
        
        // Vinculamos la animación avanzada de CSS que crearemos a continuación
        burbuja.style.animation = `flotadoParpadeoBurbuja ${duracionAnimacion}s cubic-bezier(0.4, 0, 0.2, 1) ${retrasoAnimacion}s infinite alternate`;

        contenedorBurbujas.appendChild(burbuja);
    }
});
