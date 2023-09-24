// JavaScript para llenar el select de investigadores y manejar la selección
const selectInvestigador = document.getElementById('selectInvestigador');
const investigadorDetails = document.getElementById('investigadorDetails');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const btnAsociar = document.getElementById('btnAsociar');

// Simular datos de investigadores (puedes cargar estos datos desde tu API)
const investigadores = [
    { id: 1, nombre: 'Investigador 1', titulo: 'Título 1', institucion: 'Institución 1', email: 'investigador1@example.com' },
    { id: 2, nombre: 'Investigador 2', titulo: 'Título 2', institucion: 'Institución 2', email: 'investigador2@example.com' },
    { id: 3, nombre: 'Investigador 3', titulo: 'Título 3', institucion: 'Institución 3', email: 'investigador3@example.com' }
];

// Llena el select de investigadores
investigadores.forEach((investigador) => {
    const option = document.createElement('option');
    option.value = investigador.id;
    option.textContent = investigador.nombre;
    selectInvestigador.appendChild(option);
});

// Maneja la selección de investigador
selectInvestigador.addEventListener('change', () => {
    const selectedId = selectInvestigador.value;
    const selectedInvestigador = investigadores.find((investigador) => investigador.id === parseInt(selectedId));

    if (selectedInvestigador) {
        // Habilita los checkboxes y el botón
        checkboxes.forEach((checkbox) => checkbox.removeAttribute('disabled'));
        btnAsociar.removeAttribute('disabled');

        // Muestra los detalles del investigador
        investigadorDetails.innerHTML = `
            <h3>Detalles del Investigador</h3>
            <p>ID: ${selectedInvestigador.id}</p>
            <p>Nombre: ${selectedInvestigador.nombre}</p>
            <p>Título Académico: ${selectedInvestigador.titulo}</p>
            <p>Institución: ${selectedInvestigador.institucion}</p>
            <p>Email: ${selectedInvestigador.email}</p>
        `;
    } else {
        // Si no se selecciona un investigador, deshabilita los checkboxes y el botón
        checkboxes.forEach((checkbox) => checkbox.setAttribute('disabled', 'disabled'));
        btnAsociar.setAttribute('disabled', 'disabled');
        investigadorDetails.innerHTML = ''; // Limpia los detalles del investigador
    }
});