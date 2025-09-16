let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const addButtons = document.querySelectorAll('.add');
  addButtons.forEach(btn => {
    btn.addEventListener('click', addToCart);
  });
  updateCartDisplay();
});

// Scroll a secciones
function scrollToSection(id) {
  const section = document.getElementById(id);
  if(section) {
    section.scrollIntoView({behavior: 'smooth'});
  }
}

// Agregar producto al carrito
function addToCart(e) {
  const productDiv = e.target.closest('.producto');
  const id = productDiv.dataset.id;
  const name = productDiv.dataset.name;
  const price = parseInt(productDiv.dataset.price);
  const qty = parseInt(productDiv.querySelector('.qty').value);

  const existing = cart.find(item => item.id === id);
  if(existing) {
    existing.qty += qty;
  } else {
    cart.push({id, name, price, qty});
  }

  updateCartDisplay();
  scrollToSection('carrito');
}

// Actualizar carrito
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartCountSpan = document.getElementById('cart-count');
  const cartSummaryDiv = document.getElementById('cart-summary');

  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      ${item.name} x ${item.qty} - $${item.price * item.qty}
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
    total += item.price * item.qty;
  });

  cartCountSpan.textContent = cart.length;
  cartSummaryDiv.textContent = `Total: $${total}`;
}

// Quitar item
function removeItem(index) {
  cart.splice(index, 1);
  updateCartDisplay();
}

// Finalizar pedido
function finalizeOrder(event) {
  event.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;

  if(cart.length === 0){
    alert('El carrito está vacío');
    return;
  }

  let message = `Hola, soy ${name}.\nQuiero comprar:\n`;
  cart.forEach(item => {
    message += `- ${item.name} x ${item.qty}\n`;
  });
  message += `Observaciones: ${note}`;

  const whatsappURL = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');

  cart = [];
  updateCartDisplay();
  document.getElementById('order-form').reset();
}
