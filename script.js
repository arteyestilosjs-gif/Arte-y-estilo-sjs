// Pestañas
const tabs = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Carrito
let carrito = [];
const itemsCarrito = document.getElementById('items-carrito');
const botonesAgregar = document.querySelectorAll('.agregar-carrito');
const comprarWhatsApp = document.getElementById('comprar-whatsapp');

botonesAgregar.forEach(btn => {
  btn.addEventListener('click', e => {
    const producto = e.target.closest('.producto');
    const nombre = producto.dataset.nombre;
    const precio = producto.dataset.precio;

    const obsInput = producto.querySelector('.observaciones-input');
    const obs = obsInput.value.trim();

    if (!obs) {
      alert('Por favor ingresa información adicional obligatoria para este producto.');
      obsInput.focus();
      return;
    }

    const fileInput = producto.querySelector('.imagen-referencia');
    const fileName = fileInput && fileInput.files.length > 0 ? fileInput.files[0].name : 'No adjuntada';

    carrito.push({ nombre, precio, obs, referencia: fileName });
    mostrarCarrito();

    obsInput.value = '';
    if(fileInput) fileInput.value = '';
  });
});

function mostrarCarrito() {
  itemsCarrito.innerHTML = '';
  carrito.forEach((item, i) => {
    itemsCarrito.innerHTML += `<div>
      <strong>${item.nombre}</strong> ($${item.precio})<br>
      Obs: ${item.obs}<br>
      Referencia: ${item.referencia}
      <button onclick="eliminar(${i})">❌</button>
    </div>`;
  });
}

window.eliminar = function(i) {
  carrito.splice(i, 1);
  mostrarCarrito();
}

// Comprar por WhatsApp desde carrito
comprarWhatsApp.addEventListener('click', () => {
  if (carrito.length === 0) { alert('Tu carrito está vacío'); return; }
  let mensaje = 'Hola, buen día 👋, quiero comprar los siguientes productos:\n';
  carrito.forEach(item => mensaje += `- ${item.nombre} ($${item.precio}) Observaciones: ${item.obs}, Referencia: ${item.referencia}\n`);
  window.open(`https://wa.me/573213887844?text=${encodeURIComponent(mensaje)}`, '_blank');
});

// Botón detalle
document.querySelectorAll('.detalle').forEach(btn => {
  btn.addEventListener('click', e => {
    const producto = e.target.closest('.producto');
    alert(`Producto: ${producto.dataset.nombre}\nPrecio: $${producto.dataset.precio}`);
  });
});

// WhatsApp flotante general
const wsFlotante = document.getElementById('whatsapp-flotante');
wsFlotante.addEventListener('click', () => {
  window.open('https://wa.me/573213887844?text=' + encodeURIComponent('Hola, buen día 👋'), '_blank');
});

// Botón WhatsApp en carrito con icono
comprarWhatsApp.innerHTML = '<img src="imagenes/whatsapp.png" style="width:18px; vertical-align:middle;"> Comprar por WhatsApp';
