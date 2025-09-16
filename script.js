// Scroll a secciones
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({behavior: "smooth"});
}

// Carrito
let cart = [];

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.producto');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const qty = parseInt(product.querySelector('.qty').value);

    const existing = cart.find(item => item.id === id);
    if(existing){
      existing.qty += qty;
    } else {
      cart.push({id, name, qty});
    }
    updateCart();
  });
});

function updateCart(){
  const cartItems = document.getElementById('cart-items');
  const cartSummary = document.getElementById('cart-summary');
  cartItems.innerHTML = '';
  cartSummary.innerHTML = '';
  cart.forEach(item=>{
    const div = document.createElement('div');
    div.textContent = `${item.name} x ${item.qty}`;
    cartItems.appendChild(div);
  });
  cartSummary.textContent = `Total productos: ${cart.reduce((a,b)=>a+b.qty,0)}`;
  document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function finalizeOrder(e){
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola, soy ${name}. Deseo ordenar:\n`;
  cart.forEach(item=>{
    message += `- ${item.name} x ${item.qty}\n`;
  });
  if(note) message += `Observaciones: ${note}`;
  window.open(`https://wa.me/573213887844?text=${encodeURIComponent(message)}`, '_blank');
}
