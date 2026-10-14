// Efecto de Zoom Suave en la imagen
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

// Acción del botón: Agrega al carrito con la RUTA COMPLETA y da feedback visual
const btn = document.getElementById('buy-action');

if (btn) {
    btn.addEventListener('click', () => {
        // 1. Agregamos el producto pasándole la ruta absoluta desde la raíz
        if (typeof agregarAlCarrito === 'function') {
            agregarAlCarrito(
                'Artesanía Floral - FUSIÓN DORADA', 
                1.00, 
                'referencias/detallesramo8/arreglo8.jpeg'
            );
        }

        // 2. Feedback visual en el botón
        btn.innerHTML = "Excelente elección";
        btn.style.background = "#2d3436";
        btn.style.color = "#fff";
    });
}
