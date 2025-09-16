let cart = [];

document.querySelectorAll('.add').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const prod = e.target.closest('.producto');
    const id = prod.dataset.id;
    const name = prod.dataset.name;
    const price = parseInt(prod.dataset.price);
    const qty = parseInt(prod.querySelector('.qty').value);

    const exists = cart.find(p=>p.id===id);
    if(exists){ exists.qty += qty; } else { cart.push({id,name,price,qty}); }

    updateCart();
    scrollToSection('carrito');
  });
});

function updateCart(){
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(p=>{
    const div = document.createElement('div');
    div.textContent = `${p.name} x ${p.qty} - $${(p.price*p.qty).toLocaleString()}`;
    cartItems.appendChild(div);
  });
  document.getElementById('cart-count').textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({behavior:'smooth'});
}

function finalizeOrder(e){
  e.preventDefault();
  const name = document.getElementById('customer-name').value;
  const note = document.getElementById('customer-note').value;
  let message = `Hola! Soy ${name}, quiero pedir:\n`;
  cart.forEach(p=>{ message += `${p.name} x${p.qty}\n`; });
  if(note) message += `Observaciones: ${note}`;
  const url = `https://wa.me/573213887844?text=${encodeURIComponent(message)}`;
  window.open(url,'_blank');
  cart = [];
  updateCart();
  document.getElementById('order-form').reset();
}
function openWhatsApp(){ finalizeOrder({preventDefault:()=>{}}); }
