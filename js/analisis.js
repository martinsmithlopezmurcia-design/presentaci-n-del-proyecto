        // Estado de pantalla actual por cada sección
        const estadoSecciones = {
            inquilinos:   { pantallaActual: 0, total: 3 },
            propietarios: { pantallaActual: 0, total: 3 },
            cruce:        { pantallaActual: 0, total: 3 }
        };

        // Sección actualmente visible
        let seccionActiva = 'inquilinos';

        /**
         * Gestiona el clic en un botón:
         * - Si el botón es de otra sección: cambia de sección y muestra pantalla 1 de esa sección.
         * - Si el botón es de la sección activa: avanza a la siguiente pantalla (rotativo).
         */
        function gestionarClic(seccion, btnElement) {
            if (seccion !== seccionActiva) {
                // Cambiar de sección
                cambiarSeccion(seccion, btnElement);
            } else {
                // Avanzar a la siguiente pantalla dentro de la misma sección
                const estado = estadoSecciones[seccion];
                const nuevaPantalla = (estado.pantallaActual + 1) % estado.total;
                irAPantalla(seccion, nuevaPantalla);
                actualizarIndicador(btnElement, nuevaPantalla);
            }
        }

        /**
         * Cambia la sección visible (oculta la anterior, muestra la nueva en pantalla 1).
         */
        function cambiarSeccion(nuevaSeccion, btnElement) {
            // Desactivar todos los botones
            document.querySelectorAll('.btn-holograma').forEach(b => b.classList.remove('activo'));
            btnElement.classList.add('activo');

            // Ocultar sección actual con efecto 3D
            const seccionAnterior = document.getElementById(`sec-${seccionActiva}`);
            seccionAnterior.classList.remove('activo');
            seccionAnterior.classList.add('oculto');

            // Mostrar nueva sección
            const nuevaSec = document.getElementById(`sec-${nuevaSeccion}`);
            nuevaSec.classList.remove('oculto');
            setTimeout(() => {
                nuevaSec.classList.add('activo');
                // Ir a pantalla 1 y animar barras
                irAPantalla(nuevaSeccion, 0);
                actualizarIndicador(btnElement, 0);
            }, 80);

            seccionActiva = nuevaSeccion;
        }

        /**
         * Muestra la sub-pantalla indicada dentro de una sección y anima sus barras.
         */
        function irAPantalla(seccion, indicePantalla) {
            const contenedor = document.getElementById(`sec-${seccion}`);
            const pantallas  = contenedor.querySelectorAll('.sub-pantalla');

            pantallas.forEach((p, i) => {
                p.classList.remove('activo');
                if (i === indicePantalla) {
                    p.classList.add('activo');
                    animarBarras(p);
                }
            });

            estadoSecciones[seccion].pantallaActual = indicePantalla;
        }

        /**
         * Anima las barras de progreso de un contenedor dado (de 0% al valor destino).
         */
        function animarBarras(contenedor) {
            contenedor.querySelectorAll('.barra-llenado').forEach(barra => {
                const destino = barra.getAttribute('data-porcentaje');
                barra.style.width = '0%';
                setTimeout(() => { barra.style.width = destino; }, 120);
            });
        }

        /**
         * Actualiza los puntitos indicadores del botón activo.
         */
        function actualizarIndicador(btnElement, indiceActivo) {
            const puntos = btnElement.querySelectorAll('.punto');
            puntos.forEach((p, i) => {
                p.classList.toggle('activo', i === indiceActivo);
            });
        }

        // Al cargar, animar barras de la pantalla inicial
        window.addEventListener('DOMContentLoaded', () => {
            const pantallaInicial = document.querySelector('#sec-inquilinos .sub-pantalla.activo');
            if (pantallaInicial) animarBarras(pantallaInicial);
        });