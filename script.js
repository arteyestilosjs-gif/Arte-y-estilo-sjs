const cart=[];

function scrollToSection(id){
  const el=document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
  updateCartCount();
  if(id==='carrito') renderCart();
}

document.addEventListener('click',function(e){
  if(e.target.classList.contains('add')){
    const card=e.target.closest('.producto');
    const id=card.dataset.id;
    const name=card.dataset.name;
    const price=Number(card.dataset.price)||0;
    const qty=Number(card.querySelector('.qty').value)||1;
    const found=cart.find(i=>i.id===id);
    if(found) found.qty+=qty;
    else cart.push({id,name,price,qty});
    updateCartCount();
    alert('Producto añadido al carrito');
    scrollToSection('carrito');
  }
});

function updateCartCount(){
  document.getElementById('cart-count').innerText=cart.reduce((s,i)=>s+i.qty,0);
}

function renderCart(){
  const container=document.getElementById('cart-items');
  container.innerHTML='';
  if(cart.length===0){
    container.innerHTML='<p>Tu carrito está vacío.</p>';
    document.getElementById('cart-summary').innerText='';
    return;
  }
  cart.forEach((item,idx)=>{
    const row=document.createElement('div');
    row.className='cart-row';
    const imgMap={
      p1:'cobija_messi.jpg',p2:'cobija_fotos.jpg',p3:'forro1.png',p4:'forro2.png',
      p5:'cojin1.png',p6:'cojin2.png',p7:'cuadro1.png',p8:'almohada.png',
      p9:'manta.png',p10:'cojines_set.png',p11:'tapete.png',p12:'portavelas.png'
    };
    row.innerHTML=`<img src="imágenes/${imgMap[item.id]}">
    <div style="flex:1"><strong>${item.name}</strong></div>
    <div style="text-align:right">
      <div>Cantidad: <input type="number" min="1" value="${item.qty}" data-idx="${idx}" class="cart-qty"></div>
      <div>Precio unidad: $${item.price.toLocaleString()}</div>
      <div>Subtotal: $${(item.price*item.qty).toLocaleString()}</div>
      <button data-idx="${idx}" class="remove">Eliminar</button>
    </div>`;
    container.appendChild(row);
  });
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cart-summary').innerText='Total: $'+total.toLocaleString();
}

document.addEventListener('input',function(e){
  if(e.target.classList.contains('cart-qty')){
    const idx=Number(e.target.dataset.idx);
    cart[idx].qty=Math.max(1,Number(e.target.value));
    renderCart();
    updateCartCount();
  }
});

document.addEventListener('click',function(e){
  if(e.target.classList.contains('remove')){
    cart.splice(Number(e.target.dataset.idx),1);
    renderCart();
    updateCartCount();
  }
});

function finalizeOrder(e){
  e.preventDefault();
  if(cart.length===0){alert('El carrito está vacío');return;}
  const name=document.getElementById('customer-name').value.trim();
  const note=document.getElementById('customer-note').value.trim();
  let message=`Hola, soy ${name}, quiero hacer el siguiente pedido:\n`;
  cart.forEach(i=>{message+=`- ${i.name} x${i.qty}\n`});
  if(note) message+=`Observaciones: ${note}\n`;
  message+='Gracias!';
  const waLink='https://wa.me/573213887844?text='+encodeURIComponent(message);
  window.open(waLink,'_blank');
}
