window.addEventListener("load", inicio);

function inicio() {

    document.querySelector("#btnRegistrar").addEventListener("click", registrarUsuario);

    document.querySelector("#btnLogin").addEventListener("click", iniciarSesion);

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