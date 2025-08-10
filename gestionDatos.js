console.log("1. Declaración del array inicial");
let productos = [
    {Id: "01", nombre: "carpeta", precio: 30000, stock: 10},
    {Id: "02", nombre: "birome", precio: 4000, stock: 80},
    {Id: "03", nombre: "goma", precio: 3500, stock: 50},
    {Id: "04", nombre: "cartuchera", precio: 25000, stock: 7},
    {Id: "05", nombre: "mochila", precio: 90000, stock: 4}
];

console.log("\n2. Operaciones Básicas");
console.log("Cantidad total de productos:", productos.length);
console.log("Segundo producto:", productos[1].nombre);
console.log("Cuarto producto:", productos[3].nombre);

console.log("\n3. Recorrido del Array");
console.log("\nRecorrido con for...of:");
function mostrarProductos(array) {
  console.log("\nListado de productos:");
  array.forEach(p => {
    console.log(`Producto: ${p.nombre}, Precio: $${p.precio}`);
  });
}
mostrarProductos(productos);

console.log("\nRecorrido con forEach con frase descriptiva:");
productos.forEach(p => {
  console.log(`Producto: ${p.nombre}, Precio: $${p.precio}`);
});

console.log("\n\n4. Manipulación de Arrays");
console.log("\n4.1. Agregar dos productos usando push");
productos.push(
  { id: 6, nombre: "sacapuntas", precio: 3500, stock: 40 },
  { id: 7, nombre: "cuaderno", precio: 8500, stock: 20 }
);

console.log("Mostrar los ultimos 2 agregados");
const ultimosAgregados = productos.slice(-2); // Toma los últimos dos elementos
console.log("Se han agregado los productos:");
ultimosAgregados.forEach(p => console.log(`- ${p.nombre}`));
mostrarProductos(productos);

console.log("\n4.2. Eliminar el último producto usando pop");
console.log(`Se ha eliminado el producto ${productos.pop().nombre}`);
mostrarProductos(productos);


console.log("\n4.3. Agregar al inicio usando unshift");
productos.unshift({ id: 0, nombre: "marcadores", precio: 1800, stock: 60 });
mostrarProductos(productos);

console.log("\n4.4. Eliminar el primero con shift");
productos.shift();
mostrarProductos(productos);

console.log("\n4.5. Filtrar productos con stock > 0 uso de filter");
const productosConStock = productos.filter(p => p.stock > 0);
console.log("\nProductos con stock:", productosConStock);

console.log("4.6. Obtener solo los nombres, uso de map");
const nombresProductos = productos.map(p => p.nombre);
console.log("\nNombres de productos:", nombresProductos);

console.log("\n4.7. Buscar producto por ID, uso de find");
const idBuscado = 3;
const productoEncontrado = productos.find(p => p.id === idBuscado);
if (productoEncontrado) {
  console.log(`\nProducto con ID ${idBuscado}:`, productoEncontrado);
} else {
  console.log(`\nProducto con ID ${idBuscado} no existe.`);
}

console.log("\n4.8. Ordenar por precio descendente, uso de sort");
const productosOrdenados = [...productos].sort((a, b) => b.precio - a.precio);
console.log("\nProductos ordenados por precio (desc):", productosOrdenados);
console.log("\nEl array original es:");
mostrarProductos(productos);