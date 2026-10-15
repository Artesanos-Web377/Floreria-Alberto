function enviarPedidoWhatsApp() {
    if (carrito.length === 0) return;

    const telefono = "5255 35652131";
    const lineas = ["¡Hola! Me interesa encargar las siguientes piezas desde el catálogo:\n"];
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        lineas.push(`🛍️ *${item.cantidad}x ${item.nombre}* - $${subtotal.toFixed(2)} USD`);
        // Enviamos el enlace directo a la página web del ramo
        lineas.push(`🔗 Ver Producto: ${item.imagen}\n`);
    });

    lineas.push(`💰 *Total estimado:* $${total.toFixed(2)} USD\n`);
    lineas.push("Por favor, confírmame la disponibilidad para agendar mi pedido. 😊");

    const mensaje = lineas.join("\n");
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
}
