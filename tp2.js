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

// Eliminar producto.
const borrarProducto = async (productID) => {
    try{
        const response = await fetch (`https://fakestoreapi.com/products/${productID}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        console.log("Producto eliminado: ", data);
    } catch(error) {
        console.error("Error al eliminar producto: ", error)
    }
};

//Borra el producto con el 'ID' 1.
borrarProducto(1);


//Modificar un producto.
const actualizarProducto = async (productID, updateData) => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(updateData),
        });
        const data = await response.json();
        console.log("Producto actualizado: ", data);
    } catch (error) {
        console.error("Error al actualizar producto: ", error);
    }
};

const acProducto = {
    title: "Mouse",
    price: 250.00,
    description: "Mouse Gamer",
    category: "Tecnology"
}
//Actualiza el producto con 'ID' 3.
actualizarProducto(3, acProducto)

// FileSystem.
//Agregar producto al archivo local "JSON".
const agregarProductoLocal = (nuevoProducto, archivo = "productos.json") => {
    try{
        // Si el archivo no existe lo crea.
        if (!fs.existsSync(archivo)) {
            fs.writeFileSync(archivo, '[]', 'utf-8');
        }
        const data = fs.readFileSync(archivo, "utf-8");
        const productos = JSON.parse(data);

        productos.push(nuevoProducto);

        fs.writeFileSync(archivo, JSON.stringify(productos, null, 2), 'utf-8');
        console.log("Producto agregado localmente: ", nuevoProducto);
        console.log("Lista actualizada con nuevo producto: ");
        console.log(productos);
    } catch (error) {
        console.error("Error al agregar producto: ", error);
    }
};

const nuevoProducto = {
    id: 6,
    title: "Teclado",
    price: 450.00,
    description: "Teclado Gamer"
};
agregarProductoLocal(nuevoProducto);


//Eliminar productos superiores a un determinado valor.
const eliminarProductosCaros = (limite, archivo = "productos.json") => {
    try{
        const data = fs.readFileSync(archivo, "utf-8");
        let productos = JSON.parse(data);

        const productosFiltrados = productos.filter(producto => producto.price <= limite);

        fs.writeFileSync(archivo, JSON.stringify(productosFiltrados, null, 2));
        console.log(`Productos con precio mayor a ${limite} eliminados.`)
        console.log("Lista actualizada sin productos mayores a 120: ");
        console.log(productosFiltrados)
    } catch (error) {
        console.error("Error al eliminar productos caros: ", error);
    }
};
//Limite de precio.
eliminarProductosCaros(120);