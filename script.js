const cart = [];

// Scroll a sección
function scrollToSection(id) {
  document.querySelectorAll('.tabs').forEach(tab => tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Agregar productos
document.querySelectorAll('.producto .add').forEach(btn => {
  btn.addEventListener('click', e => {
    const product = e.target.closest('.producto');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const qty = parseInt(product.querySelector('.qty').value);

    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ id, name, qty });
    }

    updateCart();
    scrollToSection('carrito');
  });
});

// Actualizar carrito
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  cartItems.innerHTML = '';
  cartSummary.innerHTML = '';

  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} x${item.qty}`;
    cartItems.appendChild(div);
  });

  cartSummary.textContent = `Total productos: ${cart.reduce((a,b) => a + b.qty,0)}`;
  document.getElementById('cart-count').textContent = cart.reduce((a,b) => a + b.qty,0);
}

// Finalizar orden
function finalizeOrder(e) {
  e.preventDefault();
  if(cart.length === 0) {
    alert("Agrega productos antes de finalizar.");
    return;
  }

  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;

  let message = `Hola, soy ${name}%0A%0APedidos:%0A`;
  cart.forEach(item => {
    message += `${item.name} x${item.qty}%0A`;
  });
  if(note) message += `%0AObservaciones: ${note}`;

  window.open(`https://wa.me/573213887844?text=${message}`, '_blank');

  cart.length = 0;
  updateCart();

  document.getElementById('order-form').reset();
}
