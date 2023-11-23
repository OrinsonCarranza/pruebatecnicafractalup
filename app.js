let side = document.querySelector(".lado-izquierdo");
let listaBoton = document.getElementById("lista-nav");

listaBoton.addEventListener("click", () => {
    side.classList.toggle("lado-izquierdo-visible");
})
// cargaPaisAPI();
const cargaPaisAPI = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            // Solo los primeros 9 países como el UX
            const primerosNuevePaises = data.slice(0, 9);
            mostrarPaises(primerosNuevePaises);
        })
        .catch(error => console.error('Error al cargar los países:', error));
}

const mostrarPaises = countries => {
    const countriesHTML = countries.map(country => getCountry(country));
    const container = document.getElementById('galeria-paises');
    container.innerHTML = countriesHTML.join('');
}

const getCountry = (country) => {
    console.log(country);

    return `
        <div class="paises-cuadros">
            <h2>${country.name.common}</h2>
            <p>${country.region}</p>
            <img src="${country.flags.png}">
        </div>
    `;
}

const mostrarInformacionDetallada = (country) => {
    const cardContainer = document.getElementById('informacion-pais');
    // const cardContainer = document.getElementById('galeria-paises');

    // Crear la card con la información del país
    const cardHTML = `
        <div class="card">
            <h3>${country.name.common}</h3>
            <p>Capital: ${country.capital[0]}</p>
            <p>Idioma: ${country.languages[Object.keys(country.languages)[0]]}</p>
            <p>Moneda: ${country.currencies[Object.keys(country.currencies)[0]].name}</p>
            <p>Estados: ${country.states ? country.states.join(', ') : 'No especificado'}</p>
        </div>
    `;

    // Mostrar la card en el contenedor
    cardContainer.innerHTML = cardHTML;
}


const buscarPais = () => {
    const inputBusqueda = document.getElementById('inputBusqueda');
    const textoBusqueda = inputBusqueda.value.toLowerCase();

    // Filtrar los países que coinciden con la búsqueda
    const paisesFiltrados = todosLosPaises.filter(country =>
        country.name.common.toLowerCase().includes(textoBusqueda) ||
        country.region.toLowerCase().includes(textoBusqueda)
    );

    // Mostrar la información detallada del primer país encontrado
    if (paisesFiltrados.length > 0) {
            mostrarInformacionDetallada(paisesFiltrados[0]);
    }
    mostrarPaises(paisesFiltrados);
    // gridFlex.style.display = "flex";
    // gridFlex.style.flexDirection = "column";
    // gridFlex.style.justifyContent = "center";
    // gridFlex.style.alignItems = "center";
}

// Agregar evento de clic al botón de búsqueda
const botonBuscar = document.querySelector('.boton-buscar');
botonBuscar.addEventListener('click', buscarPais);

// Agregar evento de tecla presionada en el campo de búsqueda
inputBusqueda.addEventListener('keypress', (event) => {
    // Verificar si la tecla presionada es "Enter" (código 13)
    if (event.keyCode === 13) {
        buscarPais();
    }
});

// Variable para almacenar todos los países cargados
let todosLosPaises = [];

// Llamar a la función de carga de países y almacenarlos en la variable
const cargaPaisAPICompleta = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => {
            todosLosPaises = data;
            cargaPaisAPI();
        })
        .catch(error => console.error('Error al cargar los países:', error));
}

// Llamar a la función de carga completa de países
cargaPaisAPICompleta();

// Limpiar y reiniciar cuando presiono en inicio
let restablecerBusqueda = document.getElementById("restablecer");

const reiniciarBusqueda = () => {
    mostrarPaises(todosLosPaises);
    inputBusqueda.value = ''; // Limpiar el campo de búsqueda
}
// Agregar evento de clic al botón "Inicio"
restablecerBusqueda.addEventListener('click', reiniciarBusqueda);