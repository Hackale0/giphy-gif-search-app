// Escuchar el evento submit del formulario
document.getElementById("searchForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Evitar que el formulario recargue la página
    const query = document.getElementById("searchInput").value.trim(); // Obtener el término de búsqueda
    if (query) {
        searchGifs(query); // Llamar a la función para buscar GIFs
    } else {
        showError("Por favor, ingresa un término de búsqueda.");
    }
});

// Función para buscar GIFs utilizando la API de Giphy
async function searchGifs(query) {
    const apiKey = '0SzdxBsat56Z42Qel26DqUCyOlQiY94P'; // Reemplaza con tu clave de API de Giphy
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=9`;

    try {
        const response = await fetch(url); // Hacer la solicitud a la API

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); // Convertir la respuesta en formato JSON

        if (data.data.length === 0) {
            showError("No se encontraron GIFs para esa búsqueda.");
        } else {
            displayGifs(data.data); // Mostrar los GIFs en la página
        }
    } catch (error) {
        showError("Hubo un error al conectarse con Giphy: " + error.message);
    }
}

// Función para mostrar los GIFs en la cuadrícula
function displayGifs(gifs) {
    const gifGrid = document.getElementById("gifGrid");
    gifGrid.innerHTML = ""; // Limpiar resultados anteriores

    gifs.forEach(gif => {
        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url; // Usar la URL del GIF
        gifGrid.appendChild(img); // Agregar la imagen a la cuadrícula
    });

    clearError(); // Limpiar mensajes de error
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
}

// Función para limpiar mensajes de error
function clearError() {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = "";
}
