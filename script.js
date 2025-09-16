function finalizeOrder(e){
  e.preventDefault();
  if(cart.length===0){ alert('El carrito está vacío'); return; }
  const name=document.getElementById('customer-name').value.trim();
  const note=document.getElementById('customer-note').value.trim();
  let msg='Hola, quiero hacer un pedido:%0A';
  cart.forEach(i=>msg+=`- ${i.name} x${i.qty} - $${(i.price*i.qty).toLocaleString()}%0A`);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  msg+=`%0ATotal: $${total.toLocaleString()}%0A`;
  msg+=`%0ANombre: ${encodeURIComponent(name)}%0A`;
  if(note) msg+=`Nota: ${encodeURIComponent(note)}%0A`;
  const phone='573213887844';
  window.open(`https://wa.me/${phone}?text=${msg}`,'_blank');
  
  // Limpiar carrito y campos
  cart.length = 0;
  renderCart();
  document.getElementById('customer-name').value = '';
  document.getElementById('customer-note').value = '';
}
