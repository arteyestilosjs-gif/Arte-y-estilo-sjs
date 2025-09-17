const cart = [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary');

document.querySelectorAll('.add').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const product = btn.parentElement;
    const name = product.dataset.name;
    const qty = parseInt(product.querySelector('.qty').value);
    const itemIndex = cart.findIndex(i => i.name === name);
    
    if(itemIndex > -1) {
      cart[itemIndex].qty += qty;
    } else {
      cart.push({name, qty});
    }
    
    updateCart();
    scrollToSection('carrito');
  });
});

function updateCart() {
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.name} - Cantidad: ${item.qty}`;
    cartItems.appendChild(div);
  });
  cartCount.textContent = cart.reduce((acc, i) => acc + i.qty, 0);
  cartSummary.textContent = `Total items: ${cartCount.textContent}`;
}

function finalizeOrder(e) {
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola, soy ${name}. Deseo comprar:\n`;
  cart.forEach(item => {
    message += `${item.name} - Cantidad: ${item.qty}\n`;
  });
  if(note) message += `Observaciones: ${note}`;
  const waURL = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(waURL, '_blank');
  cart.length = 0;
  updateCart();
  document.getElementById('order-form').reset();
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior: 'smooth'});
}
