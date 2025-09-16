let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarrito();
}

// Mostrar productos en carrito
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });
}

// Enviar pedido por WhatsApp
function enviarPedido() {
  const nombre = document.getElementById("nombre").value;
  const observaciones = document.getElementById("observaciones").value;

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
  const telefono = "573213887844"; // tu número en formato internacional

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
