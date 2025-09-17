let carrito = [];
let total = 0;

// Referencias
const cartItems = document.getElementById("cart-items");
const cartSummary = document.getElementById("cart-summary");

// Función para renderizar carrito
function renderCarrito() {
  cartItems.innerHTML = "";
  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}</span>
      <button onclick="eliminarDelCarrito(${index})">X</button>
    `;
    cartItems.appendChild(div);
  });
  cartSummary.textContent = `Total: $${total}`;
}

// Agregar al carrito
function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  total += precio;
  renderCarrito();

  // 👉 Redirigir automáticamente al carrito
  mostrarSeccion("carrito");
}

// Eliminar producto
function eliminarDelCarrito(index) {
  const producto = carrito[index];
  total -= producto.precio * producto.cantidad;
  carrito.splice(index, 1);
  renderCarrito();
}

// Finalizar compra
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let mensaje = "🛒 Pedido realizado:\n\n";
  carrito.forEach(item => {
    mensaje += `${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}\n`;
  });
  mensaje += `\nTotal: $${total}`;

  alert(mensaje);

  carrito = [];
  total = 0;
  renderCarrito();
  mostrarSeccion("catalogo");
}

// Mostrar secciones (inicio, catálogo, carrito, etc.)
function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(sec => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  renderCarrito();
  mostrarSeccion("inicio"); // mostrar inicio al cargar
});
