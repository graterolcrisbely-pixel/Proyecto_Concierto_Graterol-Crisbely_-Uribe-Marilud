///////////LOGIN///////////

const botonIngresar =
    document.getElementById("ingresar");

if (botonIngresar) {

    botonIngresar.addEventListener("click", () => {

        const correo =
            document.getElementById("correo").value;

        const contrasena =
            document.getElementById("contrasena").value;

        if (
            correo === "admin@gmail.com" &&
            contrasena === "12345"
        ) {

            localStorage.setItem(
                "sesion",
                "activa"
            );

            window.location.href =
                "../admin.html";
        }
        else {

            alert(
                "Correo o contraseña incorrectos"
            );

        }

    });

}


//////////////////EVENTOS DE ADMINISTRADOR//////////////

//==================================================
// VARIABLES GLOBALES
//==================================================

// Formulario
const nombreEvento = document.querySelector("#nombreEvento");
const artistaEvento = document.querySelector("#artistaEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const ciudadEvento = document.querySelector("#ciudadEvento");
const categoriaEvento = document.querySelector("#categoriaEvento");
const precioEvento = document.querySelector("#precioEvento");
const imagenEvento = document.querySelector("#imagenEvento");

// Botones
const btnGuardarEvento = document.querySelector("#btnGuardarEvento");
const btnActualizarEvento = document.querySelector("#btnActualizarEvento");
const btnCancelarEdicion = document.querySelector("#btnCancelarEdicion");

// Dashboard
const totalEventos = document.querySelector("#totalEventos");
const eventosPublicados = document.querySelector("#eventosPublicados");
const eventosVendidos = document.querySelector("#eventosVendidos");

// Lista
const listaEventos = document.querySelector("#listaEventos");
const buscarEvento = document.querySelector("#buscarEvento");

// Arreglo donde estarán todos los eventos
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Variables para editar
let editando = false;
let idEditar = null;


//==================================================
// CARGAR CIUDADES DESDE LA API
//==================================================

async function cargarCiudades() {

    const url = "https://api-colombia.com/api/v1/Department";

    try {

        const respuesta = await fetch(url);
        const ciudades = await respuesta.json();

        ciudadEvento.innerHTML = "";

        const opcionInicial = document.createElement("option");
        opcionInicial.textContent = "Seleccione una ciudad";
        opcionInicial.value = "";

        ciudadEvento.append(opcionInicial);

        ciudades.forEach(ciudad => {

            const opcion = document.createElement("option");

            opcion.value = ciudad.name;
            opcion.textContent = ciudad.name;

            ciudadEvento.append(opcion);

        });

    } catch (error) {

        console.log("Error al cargar ciudades", error);

    }

}


//==================================================
// INICIAR LA PÁGINA
//==================================================

document.addEventListener("DOMContentLoaded", () => {

    cargarCiudades();

    pintarEventos();

    actualizarDashboard();

});


//==================================================
// GUARDAR EVENTO
//==================================================

btnGuardarEvento.addEventListener("click", guardarEvento);

function guardarEvento() {

    // Validar campos
    if (
        nombreEvento.value.trim() === "" ||
        artistaEvento.value.trim() === "" ||
        fechaEvento.value === "" ||
        ciudadEvento.value === "" ||
        categoriaEvento.value === "" ||
        precioEvento.value === "" ||
        imagenEvento.value.trim() === ""
    ) {
        alert("Completa todos los campos.");
        return;
    }

    // Crear objeto del evento
    const nuevoEvento = {

        id: Date.now(),

        nombre: nombreEvento.value,

        artista: artistaEvento.value,

        fecha: fechaEvento.value,

        ciudad: ciudadEvento.value,

        categoria: categoriaEvento.value,

        precio: Number(precioEvento.value),

        imagen: imagenEvento.value,

        vendido: false,

        publicado: false

    };

    // Agregar al arreglo
    eventos.push(nuevoEvento);

    // Guardar en LocalStorage
    localStorage.setItem(
        "eventos",
        JSON.stringify(eventos)
    );

    // Limpiar formulario
    limpiarFormulario();

    // Actualizar vista
    pintarEventos();
    actualizarDashboard();

}

//==================================================
// LIMPIAR FORMULARIO
//==================================================

function limpiarFormulario() {

    nombreEvento.value = "";
    artistaEvento.value = "";
    fechaEvento.value = "";
    ciudadEvento.selectedIndex = 0;
    categoriaEvento.selectedIndex = 0;
    precioEvento.value = "";
    imagenEvento.value = "";

}

const archivo =
document.querySelector("#imagenEvento");

const imagen =
archivo.files[0];