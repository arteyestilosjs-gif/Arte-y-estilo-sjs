let carrito = [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = item + " ";
    let btn = document.createElement("button");
    btn.textContent = "❌";
    btn.style.fontSize = "12px";
    btn.onclick = () => {
      carrito.splice(index, 1);
      actualizarCarrito();
    };
    li.appendChild(btn);
    lista.appendChild(li);
  });
}

document.getElementById("finalizar").addEventListener("click", () => {
  alert("✅ Gracias por tu compra. Nos pondremos en contacto contigo.");
  carrito = [];
  actualizarCarrito();
  document.getElementById("nombre").value = "";
  document.getElementById("observaciones").value = "";
});
