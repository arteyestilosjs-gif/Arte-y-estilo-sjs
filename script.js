function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

// --- Carrito ---
let cart = [];

document.querySelectorAll(".add").forEach(btn=>{
  btn.addEventListener("click", e=>{
    const card = e.target.closest(".producto");
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = parseInt(card.dataset.price);
    const qty = parseInt(card.querySelector(".qty").value);
    const img = card.querySelector("img").src;

    const existing = cart.find(p=>p.id===id);
    if(existing) { existing.qty += qty; }
    else { cart.push({id, name, price, qty, img}); }

    updateCart();
  });
});

function updateCart(){
  const list = document.getElementById("cart-items");
  const summary = document.getElementById("cart-summary");
  const count = document.getElementById("cart-count");
  list.innerHTML="";
  let total=0;
  cart.forEach(p=>{
    total += p.qty * p.price;
    const row=document.createElement("div");
    row.className="cart-row";
    row.innerHTML=`<img src="${p.img}" alt="">
      <div><strong>${p.name}</strong><br>Cant: ${p.qty}<br>$${p.price.toLocaleString()}</div>`;
    list.appendChild(row);
  });
  summary.innerHTML=`<p><strong>Total: $${total.toLocaleString()}</strong></p>`;
  count.textContent=cart.reduce((a,c)=>a+c.qty,0);
}

function finalizeOrder(e){
  e.preventDefault();
  if(cart.length===0){ alert("El carrito está vacío."); return; }
  const name=document.getElementById("customer-name").value;
  const note=document.getElementById("customer-note").value;

  let msg="🛒 Pedido Arte y Estilo SJS:%0A";
  cart.forEach(p=>{
    msg+=`• ${p.name} x${p.qty} - $${p.price.toLocaleString()}%0A`;
  });
  msg+=`%0ATotal: $${cart.reduce((a,c)=>a+c.qty*c.price,0).toLocaleString()}%0A`;
  msg+=`Nombre: ${name}%0A`;
  if(note) msg+=`Nota: ${note}%0A`;

  window.open(`https://wa.me/573213887844?text=${msg}`,"_blank");
}
