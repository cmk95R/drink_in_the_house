/** Reinicia el carrito */
function reiniciarCarrito() {
  localStorage.removeItem("bebidas"); // Elimina todos los productos del carrito
  actualizarNumeroCarrito();
  actualizarVistaCarrito();
  cargarCarritoEnContenedor(); // Refresca la vista del carrito
}


/** Finaliza la compra y guarda el historial */
/** Evento de clic en el botón de finalizar compra */
document.getElementById("boton-pagar").addEventListener("click", finalizarCompra);
function finalizarCompra() {
  // Obtener el carrito actual desde localStorage
  const carritoActual = JSON.parse(localStorage.getItem("bebidas")) || [];

  // Si el carrito está vacío, no se realiza ninguna acción
  if (carritoActual.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Obtener el historial actual del localStorage
  let historial = JSON.parse(localStorage.getItem("historial")) || [];

  // Agregar los productos del carrito al historial con la fecha de compra
  const nuevaCompra = {
    fecha: new Date().toLocaleString(),
    productos: carritoActual
  };
  historial.push(nuevaCompra);

  // Guardar el historial actualizado en localStorage
  localStorage.setItem("historial", JSON.stringify(historial));

  // Vaciar el carrito y actualizar la cuenta
  reiniciarCarrito();

  notyf.success("¡Compra realizada exitosamente! Los productos se han guardado en el historial.");
}

// Evento para vaciar el carrito
document.getElementById("reiniciar").addEventListener("click", function() {
  // Verificar si el carrito tiene productos
  const carrito = JSON.parse(localStorage.getItem("bebidas")) || [];
  
  if (carrito.length > 0) {
    notyf.success("El carrito se ha vaciado correctamente.");
    reiniciarCarrito();
    return;
  }

  // Vaciar el carrito y mostrar mensaje de éxito
  notyf.error("El carrito ya está vacío.");
  return;
});