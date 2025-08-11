console.log("\n--- Consigna 1 ---");
//array con 5 objetos JavaScript
let productos = [
    {Id: "01", nombre: "carpeta", precio: 30000, stock: 10},
    {Id: "02", nombre: "birome", precio: 4000, stock: 80},
    {Id: "03", nombre: "goma", precio: 3500, stock: 50},
    {Id: "04", nombre: "cartuchera", precio: 25000, stock: 7},
    {Id: "05", nombre: "mochila", precio: 90000, stock: 4},
]
console.log(productos);

console.log("\n--- Consigna 2 ---");
// Longitud total.
console.log("Longitud de la lista: ", productos.length);
// Imprimir por consola el nombre del 2do y 4to elemento del array utilizando su indice.
console.log("Nombre segundo elemento: ", productos[1].nombre);
console.log("Nombre cuarto elemento: ", productos[3].nombre);
console.log("\n")

console.log("\n--- Consigna 3 ---");
//utilizar for...of e imprimir nombre y precio
for(let producto of productos){
    //console.log(producto.nombre);
    //console.log(producto.precio);
    console.log(`${producto.nombre} $ ${producto.precio}`);
}
console.log("\n");

//utilizar forEach() e imprimir con frase descriptiva nombre y precio
productos.forEach(function(producto, indice){
    console.log(`El producto ${producto.nombre} cuesta $ ${producto.precio}`);
});
console.log("\n");

console.log("\n--- Consigna 4 ---");
console.log("\n1. Agregar dos elementos al final del array productos utilizando push()");
productos.push({Id: "06", nombre: "regla", precio: 5000, stock: 12}, {Id: "07", nombre: "cuaderno", precio: 6500, stock: 15});
console.log(productos);

console.log("\n2. Eliminar el último elemento del array productos utilizando pop()");
productos.pop()
console.log(productos);

console.log("\n3. Agregar un nuevo elemento al inicio del array productos utilizando unshift()");
productos.unshift({Id: "08", nombre: "pinturitas", precio: 18000, stock: 6},)
console.log(productos);

console.log("\n4. Elimina el primer elemento del array productos utilizando shift()");
productos.shift()
console.log(productos);

console.log("\n5. Crear un nuevo array llamado productosConStock que contenga solo los elementos del array productos donde el stock sea mayor que 0 utilizando filter()");
let productosConStock = productos.filter(producto => producto.stock > 0)
console.log(productosConStock);

console.log("\n6. Crear  un  nuevo  array  llamado  nombresProductos  que  contenga  solo  los  nombres  de  todos  los productos en el inventario utilizando map()");
const nombresProductos = productos.map(producto => producto.nombre)
console.log(nombresProductos);

console.log("\n7. Encontrar y guardar en una variable el primer producto en productos que tenga un id específico (ej. id:3). utilizando find(). Si no lo encuentra, indicar que no existe.");
let productoIdEspecifico = productos.find(producto => producto.Id === "03" )
    || "No existe un producto con ese Id";
console.log(productoIdEspecifico);

console.log("\n8. Crear un nuevo array llamado productosOrdenados que contenga los productos ordenados por precio en orden decreciente. (investigar método sort()).");
let productosOrdenados = productos.sort((a, b) => b.precio - a.precio)
console.log(productosOrdenados);