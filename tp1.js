//Consigna 1
let productos = [
    {Id: "01", nombre: "carpeta", precio: 30000, stock: 10},
    {Id: "02", nombre: "birome", precio: 4000, stock: 80},
    {Id: "03", nombre: "goma", precio: 3500, stock: 50},
    {Id: "04", nombre: "cartuchera", precio: 25000, stock: 7},
    {Id: "05", nombre: "mochila", precio: 90000, stock: 4},
]

//Consigna 2
// Longitud total.
console.log("Longitud de la lista: ", productos.length);
// Imprimir por consola el nombre del 2do y 4to elemento del array utilizando su indice.
console.log("Nombre segundo elemento: ", productos[1].nombre);
console.log("Nombre cuarto elemento: ", productos[3].nombre);


//Consigna 3
// Nombre y precio de cada producto
for (let i = 0; i < productos.length; i++) {
    console.log(productos[i].nombre);
    console.log(productos[i].precio);
    console.log("-----------------------");
};

// Método 'forEach()', con frase descriptiva.
// Funcion flecha
productos.forEach((producto) => {
    console.log("Id del producto: ", producto.Id);
    console.log("Nombre del producto: ", producto.nombre);
    console.log("Precio del producto: ", producto.precio);
    console.log("Stock del producto: ", producto.stock);
    console.log("-----------------------");
});