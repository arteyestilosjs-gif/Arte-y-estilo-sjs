let carrito = [];

// Agregar producto
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

// Actualizar vista del carrito
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const total = document.getElementById("total");
  const count = document.getElementById("carrito-count");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    lista.appendChild(li);
    suma += item.precio;
  });

  total.textContent = suma.toLocaleString();
  count.textContent = carrito.length;
}

// Enviar pedido por WhatsApp
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "¡Hola! Me interesa hacer este pedido:%0A";
  carrito.forEach((item) => {
    mensaje += `- ${item.nombre}: $${item.precio.toLocaleString()}%0A`;
  });

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  mensaje += `%0ATotal: $${total.toLocaleString()}`;

  const telefono = "573213887844"; // número destino en WhatsApp
  const url = `https://wa.me/${telefono}?text=${mensaje}`;
  window.open(url, "_blank");
}

// Modal
const modal = document.getElementById("carritoModal");
const btn = document.getElementById("carritoBtn");
const span = document.querySelector(".close");

btn.onclick = () => { modal.style.display = "flex"; };
span.onclick = () => { modal.style.display = "none"; };
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

// Scroll suave
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}
