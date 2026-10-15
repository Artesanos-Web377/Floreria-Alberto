// Efecto de Zoom Suave
const img = document.getElementById('zoom-img');
const box = document.querySelector('.main-image-wrapper');

if (box && img) {
    box.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = box.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = "scale(1.5)";
    });

    box.addEventListener('mouseleave', () => {
        img.style.transform = "scale(1)";
    });
}

// Acción del botón: Envía la URL completa de la página web actual
const btn = document.getElementById('buy-action');

if (btn) {
    btn.addEventListener('click', () => {
        // Obtenemos la URL exacta de la página donde está parado el usuario
        const urlPaginaActual = window.location.href;

        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(
                'Artesanía Floral - FUSIÓN DORADA', 
                1.00, 
                urlPaginaActual // <--- Guardamos la URL de la página web
            );
        }

        btn.innerHTML = "Excelente elección";
        btn.style.background = "#2d3436";
        btn.style.color = "#fff";
    });
}
