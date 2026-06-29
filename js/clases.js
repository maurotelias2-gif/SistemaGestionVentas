class Usuario {

    constructor(usuario, password) {
        this.usuario = usuario;
        this.password = password;
    }

}

class Producto {

    constructor(nombre, descripcion, precio, stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
    }

}

class Venta {

    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

}

class Sistema {

    constructor() {

        this.usuarios = [];
        this.productos = [];
        this.ventas = [];
    }

}

const sistema = new Sistema();