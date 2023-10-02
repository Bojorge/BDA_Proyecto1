const top_5_instituciones_URL = 'http://localhost:3000/api/top_5_instituciones';

function get(Url) {
    return fetch(Url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error:', error);
            throw error;
        });
}

get(top_5_instituciones_URL)
    .then((data) => {
        // Obtén la tabla y la fila de ejemplo
        const tabla = document.getElementById('tabla-resultados');
        const filaEjemplo = document.getElementById('fila-ejemplo');

        // Itera sobre los datos y agrega filas a la tabla
        data.forEach((resultado) => {
            // Clona la fila de ejemplo
            const nuevaFila = filaEjemplo.cloneNode(true);
            
            // Llena la nueva fila con los datos
            const celdas = nuevaFila.querySelectorAll('td');
            celdas[0].textContent = resultado.Institucion;
            celdas[1].textContent = resultado.CantidadProyectos; 
            
            // Agrega la nueva fila a la tabla
            tabla.querySelector('tbody').appendChild(nuevaFila);

            // Remueve el id de la fila clonada para evitar conflictos
            nuevaFila.removeAttribute('id');
        });

        // Remueve la fila de ejemplo
        filaEjemplo.remove();
    })
    .catch((error) => {
        console.error('Error al obtener los datos:', error);
    });
