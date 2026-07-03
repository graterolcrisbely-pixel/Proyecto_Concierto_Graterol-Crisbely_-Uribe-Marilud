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

const panel = document.getElementById("panelAdmin");

if (panel) {

    

    cargarCiudades();
    cargarGeneros();
    mostrarEventosAdmin();
}

async function cargarCiudades() {

    try {

        const respuesta =
            await fetch(
                "https://api-colombia.com/api/v1/Department"
            );

        const ciudades =
            await respuesta.json();

        const select =
            document.getElementById("ciudad");

        ciudades.forEach((ciudad) => {

            select.innerHTML += `

                <option value="${ciudad.name}">
                    ${ciudad.name}
                </option>

            `;

        });

    }
    catch {

        alert(
            "No se pudieron cargar las ciudades"
        );

    }

}

function cargarGeneros() {

    const generos = [

        "POP",
        "ROCK",
        "K-POP",
        "JAZZ",
        "INDIE POP",
        "ELECTRÓNICA",
        "FOLK",
        "CONTEMPORÁNEO"

    ];

    const select =
        document.getElementById("genero");

    generos.forEach((genero) => {

        select.innerHTML += `

            <option value="${genero}">
                ${genero}
            </option>

        `;

    });

}

let indiceEditar = -1;

document.addEventListener(
    "click",
    function (e) {

        if (
            e.target.id !== "guardar"
        ) {
            return;
        }

        const nombre =
            document.getElementById(
                "nombre"
            ).value;

        const genero =
            document.getElementById(
                "genero"
            ).value;

        const ciudad =
            document.getElementById(
                "ciudad"
            ).value;

        const hora =
            document.getElementById(
                "hora"
            ).value;

        const precio =
            document.getElementById(
                "precio"
            ).value;

        const archivo =
            document.getElementById(
                "imagen"
            ).files[0];

        if (
            nombre === "" ||
            genero === "" ||
            ciudad === "" ||
            hora === "" ||
            precio === ""
        ) {
            alert(
                "Complete todos los campos"
            );

            return;
        }

        if (
            indiceEditar === -1 &&
            !archivo
        ) {
            alert(
                "Seleccione una imagen"
            );

            return;
        }

        if (archivo) {

            const lector =
                new FileReader();

            lector.onload =
                function () {

                    guardarEvento(
                        lector.result
                    );

                };

            lector.readAsDataURL(
                archivo
            );
        }
        else {

            guardarEvento(
                eventos[indiceEditar]
                    .imagen
            );

        }

    }
);

function guardarEvento(imagen) {

    const nuevoEvento = {

        nombre:
            document.getElementById(
                "nombre"
            ).value,

        genero:
            document.getElementById(
                "genero"
            ).value,

        ciudad:
            document.getElementById(
                "ciudad"
            ).value,

        hora:
            document.getElementById(
                "hora"
            ).value,

        precio:
            document.getElementById(
                "precio"
            ).value,

        imagen:
            imagen
    };

    if (
        indiceEditar === -1
    ) {

        eventos.push(
            nuevoEvento
        );

    }
    else {

        eventos[indiceEditar] =
            nuevoEvento;

        indiceEditar = -1;

        document.getElementById(
            "guardar"
        ).textContent =
            "Crear Evento";
    }

    localStorage.setItem(
        "eventos",
        JSON.stringify(
            eventos
        )
    );

    mostrarEventosAdmin();
    mostrarEventosCliente();

    limpiarFormulario();
}

function limpiarFormulario() {

    document.getElementById(
        "nombre"
    ).value = "";

    document.getElementById(
        "genero"
    ).value = "";

    document.getElementById(
        "ciudad"
    ).value = "";

    document.getElementById(
        "hora"
    ).value = "";

    document.getElementById(
        "precio"
    ).value = "";

    document.getElementById(
        "imagen"
    ).value = "";

}


function mostrarEventosAdmin() {

    const lista =
        document.querySelector(
            ".lista-admin"
        );

    if (!lista) {
        return;
    }

    lista.innerHTML = "";

    eventos.forEach(
        (evento, i) => {

            lista.innerHTML += `

                <div class="card-admin">

                    <img
                        src="${evento.imagen}"
                        width="180"
                    >

                    <h3>
                        ${evento.nombre}
                    </h3>

                    <p>
                        ${evento.genero}
                    </p>

                    <p>
                        ${evento.ciudad}
                    </p>

                    <p>
                        ${evento.hora}
                    </p>

                    <p>
                        $${evento.precio}
                    </p>

                    <button
                        onclick="
                        editarEvento(${i})
                        "
                    >
                        Editar
                    </button>

                    <button
                        onclick="
                        eliminarEvento(${i})
                        "
                    >
                        Eliminar
                    </button>

                </div>

            `;
        }
    );
}

function editarEvento(i) {

    const evento =
        eventos[i];

    document.getElementById(
        "nombre"
    ).value =
        evento.nombre;

    document.getElementById(
        "genero"
    ).value =
        evento.genero;

    document.getElementById(
        "ciudad"
    ).value =
        evento.ciudad;

    document.getElementById(
        "hora"
    ).value =
        evento.hora;

    document.getElementById(
        "precio"
    ).value =
        evento.precio;

    indiceEditar = i;

    document.getElementById(
        "guardar"
    ).textContent =
        "Actualizar Evento";
}

function eliminarEvento(i) {

    if (
        confirm(
            "¿Desea eliminar este concierto?"
        )
    ) {

        eventos.splice(i, 1);

        localStorage.setItem(
            "eventos",
            JSON.stringify(
                eventos
            )
        );

        mostrarEventosAdmin();
        mostrarEventosCliente();
    }

}