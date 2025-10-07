// ==================== Navegación entre secciones ====================
function scrollToSection(id) {
  document.querySelectorAll(".tabs").forEach(tab => tab.classList.remove("active"));
  const section = document.getElementById(id);
  if(section) section.classList.add("active");
  section.scrollIntoView({ behavior: "smooth" });
}

// ==================== Carrito ====================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartSummary = document.getElementById("cart-summary");
  const cartCount = document.getElementById("cart-count");

  cartItems.innerHTML = "";
  let totalItems = 0;

  cart.forEach((item, index) => {
    totalItems += item.qty;
    cartItems.innerHTML += `<div>${item.name} - Cantidad: ${item.qty} <button class="remove-btn" onclick="removeFromCart(${index})">❌</button></div>`;
  });

  cartSummary.innerText = totalItems > 0 ? `Total de artículos: ${totalItems}` : "Carrito vacío";
  cartCount.innerText = totalItems;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(producto, qty) {
  const existing = cart.find(item => item.id === producto.id);
  if(existing) existing.qty += qty; else cart.push({...producto, qty});
  updateCart();
  scrollToSection("carrito");
}

function removeFromCart(index) { cart.splice(index, 1); updateCart(); }
function emptyCart() { cart = []; updateCart(); }

// ==================== Finalizar pedido ====================
document.getElementById("order-form").addEventListener("submit", function(e){
  e.preventDefault();
  const name = document.getElementById("customer-name").value;
  const note = document.getElementById("customer-note").value;

  if(cart.length === 0) { alert("Tu carrito está vacío"); return; }

  let message = `🛒 *Nuevo Pedido*%0A👤 Nombre: ${name}%0A📦 Productos:%0A`;
  cart.forEach(item => { message += `- ${item.name} (x${item.qty})%0A`; });
  if(note.trim() !== "") message += `📝 Observaciones: ${note}%0A`;

  window.open(`https://wa.me/573014653461?text=${message}`, "_blank");
  cart = []; updateCart(); this.reset();
});

// ==================== Modal visor ====================
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
window.onclick = e => { if(e.target===modal) modal.style.display="none"; };
window.addEventListener("keydown", e => { if(e.key==="Escape") modal.style.display="none"; });

// ==================== Inicializar productos ====================
document.querySelectorAll(".producto button.add").forEach((btn, index)=>{
  btn.addEventListener("click", ()=>{
    const producto = {
      id: `p${index+1}`,
      name: btn.parentElement.getAttribute("data-name")
    };
    const qty = parseInt(btn.parentElement.querySelector(".qty").value);
    addToCart(producto, qty);
  });
});

const emptyBtn = document.getElementById("empty-cart");
if(emptyBtn) emptyBtn.addEventListener("click", emptyCart);

// ==================== Carrusel Galería ====================
const track = document.querySelector(".carousel-track");
const items = Array.from(track.children);
const container = document.querySelector(".carousel-container");
let index = 0;
const prevBtn = container.querySelector(".carousel-btn.prev");
const nextBtn = container.querySelector(".carousel-btn.next");

function updateCarousel(){
  const itemWidth = items[0].getBoundingClientRect().width + 20;
  const maxIndex = items.length - Math.floor(container.offsetWidth / itemWidth);
  index = Math.max(0, Math.min(index, maxIndex));
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

prevBtn.addEventListener("click", ()=>{ index--; updateCarousel(); });
nextBtn.addEventListener("click", ()=>{ index++; updateCarousel(); });
window.addEventListener("resize", updateCarousel);
updateCarousel();

// ==================== Inicial ====================
scrollToSection("catalogo");
updateCart();

