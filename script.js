let cart = [];

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    const productEl = button.closest('.producto');
    const id = productEl.dataset.id;
    const name = productEl.dataset.name;
    const qty = parseInt(productEl.querySelector('.qty').value);
    
    const existing = cart.find(p => p.id === id);
    if(existing) existing.qty += qty;
    else cart.push({id,name,qty});
    
    updateCart();
    scrollToSection('carrito');
  });
});

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  cartItems.innerHTML = '';
  cart.forEach(item => { cartItems.innerHTML += `<p>${item.name} - Cantidad: ${item.qty}</p>`; });
  cartCount.textContent = cart.reduce((sum,i)=>sum+i.qty,0);
}

function finalizeOrder(e){
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola, soy ${name}. Deseo realizar el siguiente pedido:\n`;
  cart.forEach(p => { message += `${p.name} x ${p.qty}\n`; });
  if(note) message += `Observaciones: ${note}`;
  const url = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank');
  cart = [];
  updateCart();
  document.getElementById('order-form').reset();
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}
