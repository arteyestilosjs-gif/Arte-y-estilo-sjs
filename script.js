const cart = [];

function scrollToSection(sectionId) {
  document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

document.querySelectorAll(".add").forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const product = btn.closest(".producto");
    const qty = parseInt(product.querySelector(".qty").value);
    const name = product.dataset.name;
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ name, qty });
    }

    updateCart();
    scrollToSection('carrito');
  });
});

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  cart.forEach(item => {
    const div = document.createElement("div");
    div.textContent = `${item.name} x${item.qty}`;
    cartItems.appendChild(div);
  });

  document.getElementById("cart-count").textContent = cart.reduce((a,b)=>a+b.qty,0);
}

function finalizeOrder(event) {
  event.preventDefault();
  const name = document.getElementById("customer-name").value;
  const note = document.getElementById("customer-note").value;
  let message = `Hola, soy ${name}. Deseo los siguientes productos:\n`;
  cart.forEach(item => {
    message += `${item.name} x${item.qty}\n`;
  });
  message += `Observaciones: ${note}`;
  window.open(`https://wa.me/573213887844?text=${encodeURIComponent(message)}`, '_blank');

  // Limpiar carrito y formulario
  cart.length = 0;
  updateCart();
  document.getElementById("order-form").reset();
}
