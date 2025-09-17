let cart = [];

// Agregar producto al carrito
document.querySelectorAll('.producto .add').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.closest('.producto');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const qty = parseInt(product.querySelector('.qty').value);

    // Verificar si ya existe
    const exist = cart.find(item => item.id === id);
    if (exist) {
      exist.qty += qty;
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
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <button class="remove">Eliminar</button>
    `;
    div.querySelector('.remove').addEventListener('click', () => {
      cart = cart.filter(i => i.id !== item.id);
      updateCart();
    });
    cartItems.appendChild(div);
  });
  document.getElementById('cart-count').innerText = cart.reduce((a,b)=>a+b.qty,0);
}

// Scroll a secciones
function scrollToSection(id) {
  document.querySelectorAll('section.tabs').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// Finalizar pedido
function finalizeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  if(cart.length === 0) { alert('Carrito vacío'); return; }

  let msg = `Hola, soy ${name}. Quiero ordenar:\n`;
  cart.forEach(i => msg += `- ${i.name} x${i.qty}\n`);
  msg += `Observaciones: ${note}`;
  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/573213887844?text=${encoded}`, '_blank');

  // Limpiar carrito y formulario
  cart = [];
  updateCart();
  e.target.reset();
}

// Contacto WhatsApp
function contactWhatsApp() {
  window.open('https://wa.me/573213887844', '_blank');
}
