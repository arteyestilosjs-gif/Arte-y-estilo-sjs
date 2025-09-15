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
    row.innerHTML=`<img src="imagenes/${item.id==='p1'?'cobija_messi.jpg': item.id==='p2'?'cobija_fotos.jpg': item.id==='p3'?'forro1.png': item.id==='p4'?'forro2.png': item.id==='p5'?'cojin1.png': item.id==='p6'?'cojin2.png':'cuadro1.png'}">
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

document.getElementById('gallery-upload').addEventListener('change',function(ev){
  const grid=document.getElementById('gallery-grid');
  Array.from(ev.target.files).forEach(file=>{
    const reader=new FileReader();
    reader.onload=function(e){
      const div=document.createElement('div');
      div.className='producto';
      div.innerHTML=`<img src="${e.target.result}"><p style="font-size:12px">${file.name}</p>`;
      grid.prepend(div);
    };
    reader.readAsDataURL(file);
  });
});

function finalizeOrder(e){
  e.preventDefault();
  if(cart.length===0){ alert('El carrito está vacío'); return; }
  const name=document.getElementById('customer-name').value.trim();
  const note=document.getElementById('customer-note').value.trim();
  const fileEl=document.getElementById('customer-file');
  const fileAttached=fileEl && fileEl.files && fileEl.files.length>0;
  let msg='Hola, quiero hacer un pedido:%0A';
  cart.forEach(i=>msg+=`- ${i.name} x${i.qty} - $${(i.price*i.qty).toLocaleString()}%0A`);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  msg+=`%0ATotal: $${total.toLocaleString()}%0A`;
  msg+=`%0ANombre: ${encodeURIComponent(name)}%0A`;
  if(note) msg+=`Nota: ${encodeURIComponent(note)}%0A`;
  if(fileAttached) msg+=`%0AEl cliente adjuntó una imagen para personalización.%0A`;
  const phone='573213887844';
  window.open(`https://wa.me/${phone}?text=${msg}`,'_blank');
  cart.length=0;
  renderCart();
}

document.addEventListener('DOMContentLoaded',()=>scrollToSection('catalogo'));
