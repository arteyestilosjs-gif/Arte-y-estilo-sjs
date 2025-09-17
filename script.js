let cart = [];

function addToCart(event) {
  event.preventDefault();
  const form = event.target;
  const productoDiv = form.closest('.producto');
  const name = productoDiv.querySelector('h3').innerText;
  const qty = parseInt(form.querySelector('.qty').value);

  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, qty });
  }

  updateCart();
  scrollToSection('carrito');
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x ${item.qty}`;
    cartItems.appendChild(div);
  });

  document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function finalizeOrder(event) {
  event.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;

  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  let message = `Hola, soy ${name}. Me interesa comprar:\n`;
  cart.forEach(item => {
    message += `${item.name} x ${item.qty}\n`;
  });
  if(note) message += `Observaciones: ${note}`;

  const url = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  // Limpiar carrito y formulario
  cart = [];
  updateCart();
  event.target.reset();
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}
