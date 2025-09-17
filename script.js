// ==== NAVEGACIÓN ENTRE SECCIONES ====
function scrollToSection(id) {
  document.querySelectorAll(".tabs").forEach(tab => tab.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==== CARRITO ====
let cart = [];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let totalItems = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    cartItems.innerHTML += `
      <div>
        ${item.name} - Cantidad: ${item.qty}
        <button onclick="removeFromCart(${index})">❌</button>
      </div>
    `;
  });

  cartSummary.innerText = totalItems > 0 ? `Total de artículos: ${totalItems}` : "Carrito vacío";
  cartCount.innerText = totalItems;
}

function addToCart(producto, qty) {
  const existing = cart.find(item => item.id === producto.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...producto, qty });
  }
  updateCart();
  scrollToSection("carrito"); // Ir directo al carrito
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// ==== FINALIZAR COMPRA ====
function finalizeOrder(e) {
  e.preventDefault();
  const name = document.getElementById("customer-name").value;
  const note = document.getElementById("customer-note").value;

  if (cart.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  let message = `🛒 *Nuevo Pedido*%0A`;
  message += `👤 Nombre: ${name}%0A`;
  message += `📦 Productos:%0A`;
  cart.forEach(item => {
    message += `- ${item.name} (x${item.qty})%0A`;
  });
  if (note.trim() !== "") {
    message += `📝 Observaciones: ${note}%0A`;
  }

  const url = `https://wa.me/573213887844?text=${message}`;
  window.open(url, "_blank");

  // Vaciar carrito después de finalizar
  cart = [];
  updateCart();
  document.getElementById("order-form").reset();
}

// ==== VISOR DE IMÁGENES (MODAL) ====
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

document.querySelectorAll(".zoomable").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
  });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; };

// ==== INICIALIZAR BOTONES ====
document.querySelectorAll(".producto button.add").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const producto = {
      id: `p${index+1}`,
      name: btn.parentElement.getAttribute("data-name"),
      price: 0
    };
    const qty = parseInt(btn.parentElement.querySelector(".qty").value);
    addToCart(producto, qty);
  });
});

// Mostrar catálogo al inicio
scrollToSection("catalogo");
