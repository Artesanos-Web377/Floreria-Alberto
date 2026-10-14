let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
    const carritoSidebar = document.getElementById("carrito-sidebar");
    const cerrarCarritoBtn = document.getElementById("btn-cerrar-carrito");
    const botonWhatsApp = document.getElementById("btn-enviar-wa");
    const contenedorItems = document.getElementById("carrito-items");

    // Cerrar carrito
    if (cerrarCarritoBtn && carritoSidebar) {
        cerrarCarritoBtn.addEventListener("click", () => {
            carritoSidebar.classList.remove("activo");
        });
    }

    // Enviar a WhatsApp
    if (botonWhatsApp) {
        botonWhatsApp.addEventListener("click", (e) => {
            e.preventDefault();
            enviarPedidoWhatsApp();
        });
    }

    // Delegación de eventos ultra rápida para controles (+ / -)
    if (contenedorItems) {
        contenedorItems.addEventListener("click", (e) => {
            const btn = e.target.closest("button[data-action]");
            if (!btn) return;
            
            const nombre = btn.getAttribute("data-nombre");
            const accion = btn.getAttribute("data-action");

            if (accion === "sumar") {
                cambiarCantidad(nombre, 1);
            } else if (accion === "restar") {
                cambiarCantidad(nombre, -1);
            }
        });
    }
});

// Agrega un producto al carrito
function agregarAlCarrito(nombre, precio, imagenUrl) {
    const existente = carrito.find(item => item.nombre === nombre);
    
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: parseFloat(precio),
            imagen: imagenUrl,
            cantidad: 1
        });
    }

    actualizarInterfazCarrito();
    
    const sidebar = document.getElementById("carrito-sidebar");
    if (sidebar) sidebar.classList.add("activo");
}

// Modifica la cantidad (+ / -)
function cambiarCantidad(nombre, cambio) {
    const producto = carrito.find(item => item.nombre === nombre);
    
    if (producto) {
        producto.cantidad += cambio;
        if (producto.cantidad <= 0) {
            eliminarProducto(nombre);
            return;
        }
    }
    actualizarInterfazCarrito();
}

// Elimina un producto de la lista
function eliminarProducto(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarInterfazCarrito();
}

// Renderizado rápido mediante DocumentFragment
function actualizarInterfazCarrito() {
    const contenedorItems = document.getElementById("carrito-items");
    const contenedorTotal = document.getElementById("carrito-total-precio");
    
    if (!contenedorItems || !contenedorTotal) return;

    contenedorItems.innerHTML = "";
    let totalAcumulado = 0;

    if (carrito.length === 0) {
        contenedorItems.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        contenedorTotal.innerText = "$0.00 USD";
        return;
    }

    const fragmento = document.createDocumentFragment();

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        totalAcumulado += subtotal;

        const itemDiv = document.createElement("div");
        itemDiv.className = "item-carrito";
        itemDiv.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: center; width: 100%; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
                <img src="${item.imagen}" style="width: 55px; height: 55px; object-fit: cover; border-radius: 8px; border: 1px solid #f0f0f0;" loading="lazy">
                
                <div style="flex-grow: 1; display: flex; flex-direction: column; gap: 4px;">
                    <h4 style="margin: 0; font-size: 14px; color: #333; font-weight: 600; line-height: 1.3;">${item.nombre}</h4>
                    
                    <div style="display: flex; align-items: center; gap: 8px; margin-top: 2px;">
                        <button data-action="restar" data-nombre="${item.nombre}" style="background: #f5f5f5; border: none; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; display: flex; align-items: center; justify-content: center; color: #555;">-</button>
                        <span style="font-weight: bold; font-size: 14px; min-width: 20px; text-align: center; color: #333;">${item.cantidad}</span>
                        <button data-action="sumar" data-nombre="${item.nombre}" style="background: #f5f5f5; border: none; width: 26px; height: 26px; border-radius: 6px; cursor: pointer; font-weight: bold; font-size: 14px; display: flex; align-items: center; justify-content: center; color: #555;">+</button>
                    </div>
                </div>
                
                <div style="text-align: right; font-weight: bold; color: #333; font-size: 14px; min-width: 75px;">
                    <span>$${subtotal.toFixed(2)}</span>
                </div>
            </div>
        `;
        fragmento.appendChild(itemDiv);
    });

    contenedorItems.appendChild(fragmento);
    contenedorTotal.innerText = `$${totalAcumulado.toFixed(2)} USD`;
}

// Envía el pedido formateado a WhatsApp con URLs completas sin errores 404
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return;

    const telefono = "525638166816";
    // Ajusta según la URL principal de tu repositorio en GitHub Pages
    const baseUrl = "https://samiglz007.github.io/"; 

    const lineas = ["¡Hola! Me interesa encargar las siguientes piezas desde el catálogo:\n"];
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        lineas.push(`🛍️ *${item.cantidad}x ${item.nombre}* - $${subtotal.toFixed(2)} USD`);

        // Remueve ../ o ./ al inicio de la ruta si existiera
        const rutaLimpia = item.imagen.replace(/^(\.\.\/|\.\/)+/, '');
        lineas.push(`🖼️ Ver Foto: ${baseUrl}${rutaLimpia}\n`);
    });

    lineas.push(`💰 *Total estimado:* $${total.toFixed(2)} USD\n`);
    lineas.push("Por favor, confírmame la disponibilidad para agendar mi pedido. 😊");

    const mensaje = lineas.join("\n");
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
