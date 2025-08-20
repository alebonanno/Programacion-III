//almacenar url del endpoint
const url = "https://fakestoreapi.com/products";

console.log("---API FETCH---");
console.log("---Recuperar la información de todos los productos (GET)---");

fetch(url) //solicitud de datos al servidor de la URL
.then((response) => {
    //si la respuesta no es ok tira el error    
    if (!response.ok){
                throw new Error(`Error  ${response.status}`);
    }
    return response.json(); //Parsear la información a json
})

//este then es para atrapar el return
.then((datos) => {
    console.log(datos);
})
//atrapa el error y lo muestra en consola
.catch((error) => {
    console.log(error);
})


// Recuperar un numero limitado de productos.
const fs = require('fs');
fetch("https://fakestoreapi.com/products?limit=5")
    .then(res => res.json())
    .then(json => {
        console.log("Muestra de 5 productos: ")
        console.log(json)

        // Guardado de productos limitados.
        fs.writeFileSync('productos.json', JSON.stringify(json, null, 2), 'utf-8');
        console.log("Datos guardados en 'productos.json'");
    })
    .catch(error => console.log("Error: ", error));


// Agregado de producto.
fetch(url, {
    method: 'POST',
    body: JSON.stringify({
        title: 'Notebook AlienWare',
        price: 800.00,
        description: 'Notebook Gamer',
        category: 'Tecnology',
        rating: { rate: 4.8, count: 400 }
    }),
    headers: {'Content-Type' : 'application/json'}
})
    .then(res => res.json())
    .then(data => console.log("Producto agregado: ", data));

// Busqueda por 'ID' de un producto.
fetch("https://fakestoreapi.com/products/7")
    .then(res => res.json())
    // Muestra el producto con 'ID' 7.
    .then(data => {
        console.log("Busqueda del producto con ID 7.")
        console.log("Producto encontrado: ", data)
    });