const cart = [];

document.querySelectorAll('.add').forEach(btn => {
  btn.addEventListener('click', e => {
    const productDiv = e.target.closest('.producto');
    const id = productDiv.dataset.id;
    const name = productDiv.dataset.name;
    const price = parseInt(productDiv.dataset.price);
    const qty = parseInt(productDiv.querySelector('.qty').value);

    const existing = cart.find(p => p.id === id);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({id, name, price, qty});
    }

    updateCart();
    scrollToSection('carrito');
  });
});

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach(p => {
    total += p.price * p.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${p.name} x${p.qty} - $${p.price * p.qty}</span>
      <button onclick="removeFromCart('${p.id}')">❌</button>
    `;
    cartItems.appendChild(div);
  });

  const cartSummary = document.getElementById('cart-summary');
  cartSummary.innerHTML = `<strong>Total: $${total}</strong>`;

  document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function removeFromCart(id) {
  const index = cart.findIndex(p => p.id === id);
  if(index >= 0) cart.splice(index,1);
  updateCart();
}

function scrollToSection(id) {
  const section = document.getElementById(id);
  section.scrollIntoView({behavior: 'smooth'});
}

function finalizeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;

  let msg = `Hola! Soy ${name}. Quiero pedir:\n`;
  cart.forEach(p => {
    msg += `${p.name} x${p.qty} = $${p.price*p.qty}\n`;
  });
  if(note) msg += `Notas: ${note}`;

  const url = `https://wa.me/573213887844?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');

  cart.length = 0;
  updateCart();
  document.getElementById('order-form').reset();
}
