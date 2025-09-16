let carrito = [];

// Agregar producto al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  document.getElementById("contador-carrito").textContent = carrito.length;
  mostrarCarrito();
  document.getElementById("carrito").scrollIntoView({ behavior: "smooth" });
}

// Mostrar carrito con botón eliminar
function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const resumen = document.getElementById("resumen-compra");
  lista.innerHTML = "";
  carrito.forEach((item,index)=>{
    const li=document.createElement("li");
    li.innerHTML = `${index+1}. ${item} <button onclick="eliminarProducto(${index})">X</button>`;
    lista.appendChild(li);
  });
  resumen.innerHTML = carrito.length>0? `<strong>Productos seleccionados:</strong> ${carrito.join(", ")}` : "";
}

// Eliminar producto individual
function eliminarProducto(index){
  carrito.splice(index,1);
  mostrarCarrito();
  document.getElementById("contador-carrito").textContent = carrito.length;
}

// Enviar pedido por WhatsApp
function enviarPedido(){
  const nombre=document.getElementById("nombre").value.trim();
  const observaciones=document.getElementById("observaciones").value.trim();
  if(!nombre){alert("Por favor ingresa tu nombre."); return;}
  if(carrito.length===0){alert("No has seleccionado ningún producto."); return;}
  const mensaje=`Hola, soy ${nombre}. Quiero comprar: ${carrito.join(", ")}. Observaciones: ${observaciones}`;
  const telefono="573213887844";
  window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`,"_blank");
  carrito=[];
  mostrarCarrito();
  document.getElementById("contador-carrito").textContent="0";
}

// Scroll suave para menú
function scrollToSection(id){
  const el=document.getElementById(id);
  el.scrollIntoView({behavior:"smooth"});
}
