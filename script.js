
// Tabs
document.querySelectorAll('.tab-link').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-link').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(s=>s.classList.remove('active'));
    btn.classList.add('active');
    const id = btn.dataset.tab;
    document.getElementById(id).classList.add('active');
  });
});

// Carrito logic (observaciones obligatorias, limpiar campo, enviar a WhatsApp)
let carrito = [];

function mostrarCarrito(){
  const cont = document.getElementById('items-carrito');
  cont.innerHTML = '';
  if(carrito.length===0){
    cont.innerHTML = '<div class="empty">Tu carrito está vacío</div>';
    return;
  }
  carrito.forEach((it, idx) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<strong>${it.nombre}</strong> - $${it.precio}<br><small>Obs: ${it.obs}</small> <button class="btn-eliminar" data-i="${idx}">Eliminar</button>`;
    cont.appendChild(div);
  });
  document.querySelectorAll('.btn-eliminar').forEach(b=>b.addEventListener('click', e=>{
    const i = e.target.dataset.i;
    carrito.splice(i,1);
    mostrarCarrito();
  }));
}

document.querySelectorAll('.agregar-carrito').forEach(btn => {
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.producto');
    const nombre = card.dataset.nombre;
    const precio = card.dataset.precio;
    const obsEl = card.querySelector('.observaciones-input');
    const obs = obsEl.value.trim();
    if(!obs){
      alert('Por favor ingresa las observaciones adicionales (campo obligatorio).');
      obsEl.focus();
      return;
    }
    carrito.push({nombre, precio, obs});
    mostrarCarrito();
    obsEl.value = '';
  });
});

// Comprar por WhatsApp
document.getElementById('comprar-whatsapp').addEventListener('click', ()=>{
  if(carrito.length===0){
    alert('Tu carrito está vacío.');
    return;
  }
  let msg = 'Hola, buen día 👋.%0AQuiero hacer el siguiente pedido:%0A%0A';
  let total = 0;
  carrito.forEach((it, i)=>{ msg += `${i+1}. ${it.nombre} - $${it.precio} | Obs: ${it.obs}%0A`; total += Number(it.precio); });
  msg += `%0ATotal aproximado: $${total}%0A%0AGracias.`;
  const phone = '573213887844';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
});

// Detalle simple
document.querySelectorAll('.detalle').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.target.closest('.producto');
    const nombre = card.dataset.nombre;
    const precio = card.dataset.precio;
    alert(`${nombre}\nPrecio: $${precio}`);
  });
});

// inicializar carrito UI
mostrarCarrito();
