

////////PANEL LOGIN//////////

const panelAdmin =
    document.getElementById("panelAdmin");

if (panelAdmin) {

    panelAdmin.innerHTML = `

        <h1>Administrador de Eventos</h1>

        <div class="form-evento">

            <input
                type="text"
                id="nombre"
                placeholder="Nombre">

            <input
                type="text"
                id="genero"
                placeholder="Género">

            <input
                type="text"
                id="ciudad"
                placeholder="Ciudad">

            <input
                type="text"
                id="hora"
                placeholder="Hora">

            <input
                type="number"
                id="precio"
                placeholder="Precio">

            <input
                type="text"
                id="imagen"
                placeholder="Ruta de imagen">

            <button id="guardar">
                Crear Evento
            </button>

        </div>

        <h2>Lista de Eventos</h2>

        <div class="lista-admin">

        </div>

    `;

    mostrarEventosAdmin();
}




/////////////////////Eventos////////////////

let eventos =
    JSON.parse(
        localStorage.getItem("eventos")
    ) || [];

