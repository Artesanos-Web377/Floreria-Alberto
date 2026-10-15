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

// Acción del botón: Lee la foto real que se desplegó en la pantalla
const btn = document.getElementById('buy-action');

if (btn) {
    btn.addEventListener('click', () => {
        // Obtenemos el elemento de la imagen en pantalla
        const imagenElemento = document.getElementById('zoom-img');
        // 'src' contiene la URL absoluta real cargada por el navegador
        const rutaImagenReal = imagenElemento ? imagenElemento.src : '';

        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(
                'Artesanía Floral - FUSIÓN DORADA', 
                1.00, 
                rutaImagenReal
            );
        }

        btn.innerHTML = "Excelente elección";
        btn.style.background = "#2d3436";
        btn.style.color = "#fff";
    });
}
