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

