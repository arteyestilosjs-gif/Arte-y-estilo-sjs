let cart = [];

function scrollToSection(id){
  document.querySelectorAll('.tabs').forEach(tab=>tab.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0, behavior:'smooth'});
}

function updateCartCount(){
  document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function renderCart(){
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item=>{
    const div = document.createElement('div');
    div.textContent = `${item.name} x ${item.qty}`;
    cartItems.appendChild(div);
  });
  const cartSummary = document.getElementById('cart-summary');
  cartSummary.textContent = `Total items: ${cart.reduce((a,b)=>a+b.qty,0)}`;
}

document.querySelectorAll('.add').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const product = e.target.closest('.producto');
    const id = product.dataset.id;
    const name = product.dataset.name;
    const qty = parseInt(product.querySelector('.qty').value);
    const existing = cart.find(item=>item.id===id);
    if(existing){ existing.qty += qty; }
    else{ cart.push({id,name,qty}); }
    updateCartCount();
    renderCart();
    scrollToSection('carrito');
  });
});

function finalizeOrder(e){
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola, soy ${name}%0A`; 
  cart.forEach(item=> message+= `${item.name} x ${item.qty}%0A`);
  if(note) message += `Nota: ${note}%0A`;
  window.open(`https://wa.me/573213887844?text=${message}`);
  cart = [];
  updateCartCount();
  renderCart();
  document.getElementById('order-form').reset();
}
