const cart=[];

function scrollToSection(id){
  const el=document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
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
    scrollToSection('carrito');
    renderCart();
  }
});

function updateCartCount(){
  document.getElementById('cart-count').innerText=cart.reduce((s,i)=>s+i.qty,0);
}

function renderCart(){
  const container=document.getElementById('cart-items');
  container.innerHTML='';
  if(cart.length===0){ container.innerHTML='<p>Tu carrito está vacío.</p>'; document.getElementById('cart-summary').innerText=''; return; }
  cart.forEach((item,idx)=>{
    const row=document.createElement('div');
    row.className='cart-row';
    row.innerHTML=`<img src="imágenes/${item.id==='p1'?'cobija_messi.jpg': item.id==='p2'?'cobija_fotos.jpg': item.id==='p3'?'forro1.png': item.id==='p4'?'forro2.png': item.id==='p5'?'cojin1.png': item.id==='p6'?'cojin2.png': item.id==='p7'?'cuadro1.png': item.id==='p8'?'almohada.png': item.id==='p9'?'manta.png': item.id==='p10'?'cojines_set.png': item.id==='p11'?'tapete.png':'portavelas.png'}"><div>${item.name} x ${item.qty}</div><div>$${item.price*item.qty}</div><button onclick="removeItem(${idx})">❌</button>`;
    container.appendChild(row);
  });
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cart-summary').innerText='Total: $'+total;
}

function removeItem(idx){cart.splice(idx,1);updateCartCount();renderCart();}

function finalizeOrder(e){
  e.preventDefault();
  const name=document.getElementById('customer-name').value;
  const note=document.getElementById('customer-note').value;
  if(cart.length===0){alert('El carrito está vacío');return;}
  let msg=`Hola, soy ${name} y quiero hacer el pedido:%0A`;
  cart.forEach(i=>{msg+=`${i.name} x ${i.qty} -> $${i.price*i.qty}%0A`;});
  msg+=`Observaciones: ${note}`;
  window.open(`https://wa.me/573213887844?text=${msg}`,'_blank');
}
