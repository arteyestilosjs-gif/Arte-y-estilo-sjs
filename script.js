// Carrito
let carrito = [];

document.querySelectorAll('.btn-carrito').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const producto = document.querySelectorAll('.producto')[index];
    const nombre = producto.querySelector('h3').innerText;
    carrito.push(nombre);
    actualizarCarrito();
  });
});

function actualizarCarrito() {
  const lista = document.getElementById('listaCarrito');
  lista.innerHTML = "";
  carrito.forEach((item, i) => {
    const div = document.createElement("div");
    div.innerText = `${i+1}. ${item}`;
    lista.appendChild(div);
  });
}

// Comprar por WhatsApp desde carrito
document.getElementById("comprarWhatsApp").addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  let mensaje = "Hola, quiero comprar:\n";
  carrito.forEach((item, i) => {
    mensaje += `${i+1}. ${item}\n`;
  });
  window.open(`https://wa.me/573213887844?text=${encodeURIComponent(mensaje)}`, "_blank");
});