/////////////NAVBAR////////////

const navbar =
    document.getElementById("navbar");

if (navbar) {

    navbar.innerHTML = `

    <nav class="navbar">

        <div class="logo">
            <h2>Eventix</h2>
        </div>

        <ul class="menu">

            <li>
                <a href="#">
                    Conciertos
                </a>
            </li>

            <li>
                <a href="#">
                    Artistas
                </a>
            </li>

            <li>
                <a href="Login/login.html">
                    Iniciar Sesión
                </a>
            </li>

        </ul>

        <div class="acciones">

            🛒

            <span id="cantidad-carrito">
                0
            </span>

        </div>

    </nav>

    `;
}


//////////PROMOCIONES///////////
const promociones =
    document.getElementById(
        "promociones"
    );

if (promociones) {

    promociones.innerHTML = `

    <div class="promociones">

        <div class="promo morado">

            <h3>Oferta</h3>

            <p>
                15% OFF en entradas VIP.
            </p>

        </div>

        <div class="promo azul">

            <h3>Nuevo</h3>

            <p>
                Paga hasta en 12 cuotas.
            </p>

        </div>

    </div>

    `;
}


////////////HERO///////////

const hero =
    document.getElementById("hero");

if (hero) {

    hero.innerHTML = `

    <div class="hero">

        <div class="hero-imagen">

            <img
            src="img/Img-Conciertos/concierto imagen.jpg">

            <div class="hero-info">

                <span>
                    K-POP
                </span>

                <h1>BTS</h1>

                <p>
                    Teatro Metropolitano
                </p>

                <button>
                    Comprar - $850
                </button>

            </div>

        </div>

    </div>

    `;
}


/////////////////FOOTER//////////////

const footer = document.getElementById("footer");

if (footer) {

    footer.innerHTML = `

        <div class="footer-logo">

            <h2>Eventix</h2>

            <p>
                La mejor experiencia para encontrar conciertos.
            </p>

        </div>

        <div>

            <h3>Explorar</h3>

            <a href="#">Conciertos</a>
            <a href="#">Artistas</a>
            <a href="#">Festivales</a>

        </div>

        <div>

            <h3>Soporte</h3>

            <a href="#">Ayuda</a>
            <a href="#">Contacto</a>
            <a href="#">Políticas</a>

        </div>

    `;
}