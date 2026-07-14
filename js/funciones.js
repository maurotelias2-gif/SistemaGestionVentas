window.addEventListener("load", inicio);

function inicio() {

    document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);

    document.querySelector("#btnLogin").addEventListener("click", iniciarSesion);

    document.querySelector("#btnAgregarProducto").addEventListener("click", agregarProducto);

    document.querySelector("#btnRegistrarVenta").addEventListener("click", registrarVenta);

}

function registrarUsuario() {

    let usuario = document.querySelector("#txtUsuario").value;
    let password = document.querySelector("#txtPassword").value;

    if (usuario !== "" && password !== "") {

        let existe = false;

        for (let unUsuario of sistema.usuarios) {

            if (unUsuario.usuario === usuario) {

                existe = true;
                break;

            }

        }

        if (existe) {

            document.querySelector("#mensajeLogin").innerHTML =
                "Ese usuario ya existe.";

        } else {

            sistema.usuarios.push(new Usuario(usuario, password));

            document.querySelector("#mensajeLogin").innerHTML =
                "Usuario registrado correctamente.";

        }

    } else {

        document.querySelector("#mensajeLogin").innerHTML =
            "Complete todos los campos.";

    }

    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtPassword").value = "";

}

function iniciarSesion() {

    let usuario = document.querySelector("#txtUsuario").value;
    let password = document.querySelector("#txtPassword").value;

    let acceso = false;

    for (let unUsuario of sistema.usuarios) {

        if (unUsuario.usuario === usuario &&
            unUsuario.password === password) {

            acceso = true;
            break;

        }

    }

    if (acceso) {

        document.querySelector("#mensajeLogin").innerHTML =
            "Bienvenido.";

        document.querySelector("#productos").hidden = false;
        document.querySelector("#ventas").hidden = false;

    } else {

        document.querySelector("#mensajeLogin").innerHTML =
            "Usuario o contraseña incorrectos.";

    }

    document.querySelector("#txtUsuario").value = "";
    document.querySelector("#txtPassword").value = "";

}
function agregarProducto() {

    let nombre = document.querySelector("#txtNombreProducto").value;
    let descripcion = document.querySelector("#txtDescripcionProducto").value;
    let precio = Number(document.querySelector("#numPrecioProducto").value);
    let stock = Number(document.querySelector("#numStockProducto").value);

    if (nombre !== "" &&
        descripcion !== "" &&
        precio > 0 &&
        stock > 0) {

        let nuevoProducto = new Producto(nombre, descripcion, precio, stock);

        sistema.productos.push(nuevoProducto);
        mostrarProductos();

        document.querySelector("#mensajeProducto").innerHTML =
            "Producto agregado correctamente.";

    } else {

        document.querySelector("#mensajeProducto").innerHTML =
            "Complete todos los campos correctamente.";

    }

    document.querySelector("#txtNombreProducto").value = "";
    document.querySelector("#txtDescripcionProducto").value = "";
    document.querySelector("#numPrecioProducto").value = "";
    document.querySelector("#numStockProducto").value = "";

}

function mostrarProductos() {

    let lista = document.querySelector("#listaProductos");

    lista.innerHTML = "";

    for (let unProducto of sistema.productos) {

        let item = document.createElement("li");

        item.innerHTML =
            unProducto.nombre + " - " +
            unProducto.descripcion + " - $" +
            unProducto.precio + " - Stock: " +
            unProducto.stock;

        lista.appendChild(item);

    }

}
function registrarVenta() {

    let nombre = document.querySelector("#txtNombreVenta").value;
    let cantidad = Number(document.querySelector("#numCantidadVenta").value);

    let productoEncontrado = null;

    for (let unProducto of sistema.productos) {

        if (unProducto.nombre.toLowerCase() === nombre.toLowerCase()) {

            productoEncontrado = unProducto;

        }

    }
    if (productoEncontrado !== null) {

        if (productoEncontrado.stock >= cantidad) {

            productoEncontrado.stock -= cantidad;

            let nuevaVenta = new Venta(productoEncontrado, cantidad);

            sistema.ventas.push(nuevaVenta);

            document.querySelector("#mensajeVenta").innerHTML =
                "Venta registrada correctamente.";

            mostrarProductos();

            mostrarVentas();

        } else {

            document.querySelector("#mensajeVenta").innerHTML =
                "Stock insuficiente.";

        }
    } else {

        document.querySelector("#mensajeVenta").innerHTML =
            "El producto no existe.";

    }

    document.querySelector("#txtNombreVenta").value = "";
    document.querySelector("#numCantidadVenta").value = "";
}

function mostrarVentas() {

    let lista = document.querySelector("#listaVentas");

    lista.innerHTML = "";

    for (let unaVenta of sistema.ventas) {

        let item = document.createElement("li");

        item.innerHTML =
            unaVenta.producto.nombre +
            " - Cantidad: " +
            unaVenta.cantidad;

        lista.appendChild(item);

    }

}