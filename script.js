let carrito = [];

function mostrarSeccion(id) {
  document.querySelectorAll("main, section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
  alert(`${nombre} agregado al carrito ✅`);
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach((item, i) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    lista.appendChild(li);
  });
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola, quiero hacer un pedido:\n\n";
  carrito.forEach(item => {
    mensaje += `- ${item.nombre} - $${item.precio.toLocaleString()}\n`;
  });

  const url = `https://wa.me/573213887844?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// Mostrar catálogo por defecto
mostrarSeccion("catalogo");
