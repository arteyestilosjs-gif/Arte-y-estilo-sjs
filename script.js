const cart = [];

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    const productDiv = button.parentElement;
    const name = productDiv.dataset.name;
    const qty = parseInt(productDiv.querySelector('.qty').value);

    const existing = cart.find(p => p.name === name);
    if(existing) {
      existing.qty += qty;
    } else {
      cart.push({name, qty});
    }

    document.getElementById('cart-count').textContent = cart.reduce((acc,p) => acc + p.qty,0);
    scrollToSection('carrito');
    renderCart();
  });
});

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  cart.forEach(p => {
    const div = document.createElement('div');
    div.textContent = `${p.name} x ${p.qty}`;
    container.appendChild(div);
  });
}

function finalizeOrder(event) {
  event.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola, soy ${name}. Me interesa el siguiente pedido:\n`;
  cart.forEach(p => {
    message += `${p.name} x ${p.qty}\n`;
  });
  if(note) message += `Observaciones: ${note}\n`;
  const whatsappUrl = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl,'_blank');

  cart.length = 0;
  renderCart();
  document.getElementById('order-form').reset();
  document.getElementById('cart-count').textContent = '0';
  scrollToSection('catalogo');
}

function scrollToSection(id) {
  document.querySelectorAll('.tabs').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
