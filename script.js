let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  mostrarCarrito();

  // Redirigir automáticamente al carrito
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });

  // Actualizar contador
  document.getElementById("contador-carrito").textContent = carrito.length;
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
  const telefono = "573213887844"; // número en formato internacional

  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
