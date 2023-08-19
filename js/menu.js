const productos = [
    {
        id: "bulones 3/8",
        titulo: "Bulones 3/8",
        precio: 10,
        categoria: {
            nombre: "Bulones",
            id: "bulones",
        }
    },

    {
        id: "bulones 1/2",
        titulo: "Bulones 1/2",
        precio: 12,
        categoria: {
            nombre: "Bulones",
            id: "bulones",
        }
    },

    {
        id: "arandelas 3/8",
        titulo: "Arandelas 3/8",
        precio: 7,
        categoria: {
            nombre: "Arandelas",
            id: "arandelas",
        }
    },

    {
        id: "arandelas 1/2",
        titulo: "Arandelas 1/2",
        precio: 8,
        categoria: {
            nombre: "Arandelas",
            id: "arandelas",
        }
    },

    {
        id: "grower 3/8",
        titulo: "Grower 3/8",
        precio: 1,
        categoria: {
            nombre: "Grower",
            id: "grower",
        }
    },

    {
        id: "grower 1/2",
        titulo: "Grower 1/2",
        precio: 3,
        categoria: {
            nombre: "Grower",
            id: "grower",
        }
    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let numerito = document.querySelector("#numerito")


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto")
        div.innerHTML = `
<img src="" alt="" class="producto-imagen">
<div class="producto-detalles">
    <h3 class="producto-titulo">${producto.titulo}</h3>
    <p class="producto-precio"${producto.precio}</p>
    <button class="producto-agregar" id="${producto.id}" onclick="${agregarAlCarrito}">Comprar</button>
</div>  
`;
        contenedorProductos.append(div); //o deberia usar .extend?

    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"))

        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            //no funciona el cambio del titulo
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);

            tituloPrincipal.innertText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);

            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innertText = "Todos los produtos";
            cargarProductos(productos);
        }


    })

})


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

let productosEnCarrito; 

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS){

     productosEnCarrito = JSON.parse(productosEnCarritoLS);
     actualizarNumerito(); 

}else{
productosEnCarrito = [];
};


function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

        //ver findindex
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}