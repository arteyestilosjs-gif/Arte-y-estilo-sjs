let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  // Agregar al carrito
  carrito.push(producto);

  // Actualizar contador de productos
  document.getElementById("contador-carrito").textContent = carrito.length;

  // Mostrar la lista en el carrito
  mostrarCarrito();

  // Redirigir automáticamente al carrito
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
}

// Mostrar productos en carrito
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const resumen = document.getElementById("resumen-compra");

  lista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item}`;
    lista.appendChild(li);
  });

  if (carrito.length > 0) {
    resumen.innerHTML = `<strong>Resumen de compra:</strong> ${carrito.join(", ")}`;
  } else {
    resumen.innerHTML = "";
  }
}

// Enviar pedido por WhatsApp
function enviarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  const observaciones = document.getElementById("observaciones").value.trim();

  if (!nombre) {
    alert("Por favor ingresa tu nombre.");
    return;
  }

  if (carrito.length === 0) {
    alert("No has seleccionado ningún producto.");
    return;
  }

  const productos = carrito.join(", ");
  const mensaje = `Hola, soy ${nombre}. Quiero comprar: ${productos}. 
Observaciones: ${observaciones}`;

  const telefono = "573213887844"; // Número en formato internacional
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  // Limpiar carrito y contador
  carrito = [];
  document.getElementById("contador-carrito").textContent = "0";
  mostrarCarrito();
}
