let productosEnCarrito = localStorage.getItem("productos-en-carrito") || [];

productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelector(".carrito-producto-eliminar");
let botonVaciar = document.querySelector("#carrito-acciones-vaciar")
let botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length >= 0) {


        contenedorCarritoVacio.style.display = `none`;
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        // contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <div class="carrito-producto-titulo">
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                     <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}"><i>Eliminar</i></button>
`

            contenedorCarritoProductos.append(div);
        });

    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        productosEnCarrito.length = 0;
        // contenedorCarritoComprado.classList.add("disabled");
    };

    actualizarBotonesEliminar();

};

cargarProductosCarrito();



function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    })
};

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito.splice(index, 1);

    cargarProductosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}

// botonVaciar.addEventListener("click", vaciarCarrito);


botonVaciar.addEventListener("click", () => {
    if (productosEnCarrito.length <= 0) {
        Swal.fire({
            icon: 'error',
            text: ' No tiene productos en carrito',

        })
        vaciarCarrito();
    } else {
        Swal.fire({
            text: ' Que lastima que vacies tu carrito, deseamos que vuelva pronto',
        })
vaciarCarrito();
    }

})




function vaciarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}


// ' '


// botonComprar.addEventListener("click", comprarCarrito);

botonComprar.addEventListener("click", () => {
    if (productosEnCarrito.length >= 1) {
        Swal.fire({
            icon: 'success',
            tittle: 'Gracias por su compra,vuelva pronto',
            text: 'Gracias por su compra,vuelva pronto',

        })
        comprarCarrito();
    } else {
        Swal.fire({
            icon: 'error',
            tittle: 'No tiene productos en carrito',
            text: 'No tiene productos en carrito',

        })


    }
}

);

function comprarCarrito() {
    productosEnCarrito.length = 0;

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    productosEnCarrito.length = 0;
    // contenedorCarritoComprado.classList.remove("disabled");

    cargarProductosCarrito();

}

