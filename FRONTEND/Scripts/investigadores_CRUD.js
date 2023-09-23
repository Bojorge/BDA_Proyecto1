const investigadoresUrl = 'http://localhost:3000/api/investigadores';


////////////////////////////////////////////////////////////////// CRUD (sin Delete) /////////////////////////////////////////

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


function create(Url, data) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
    };
    // Realiza la solicitud POST a la API
    return fetch(Url, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no se pudo completar correctamente');
        }
        return response.json(); // Parsea la respuesta JSON si la hay
      })
      .then(data => {
        console.log('Respuesta de la API:', data);
        return data;
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        throw error;
      });
}


function update(url, data) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Convierte el objeto de datos a formato JSON
  };
  // Realiza la solicitud PUT a la API
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no se pudo completar correctamente');
      }
      return response.json(); // Parsea la respuesta JSON si la hay
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
}


////////////////////////////////////////////////////////////////// SUBIR CSV /////////////////////////////////////////


async function uploadInvestigadoresCSV() {
  const csvFileInput = document.getElementById('csvInvestigadores');
  const file = csvFileInput.files[0];

  if (!file) {
    alert('Por favor, selecciona un archivo CSV.');
    return;
  }
  // Lee el contenido del archivo CSV
  const csvData = await readFile(file);

  // Convierte el contenido CSV en un array de objetos
  const investigadores = parseCSV(csvData);

  // Envía los datos al API
  sendPublicaciones(investigadoresUrl, investigadores);
}

// Función para leer el contenido del archivo
function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (event) => {
      reject(event.target.error);
    };
    reader.readAsText(file);
  });
}

// Función para analizar el contenido CSV y convertirlo en un array de objetos
function parseCSV(csvData) {
  const lines = csvData.split('\n');
  const headers = lines[0].split(',');
  const investigadores = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const investigador = {};

    for (let j = 0; j < headers.length; j++) {
      investigador[headers[j].trim()] = line[j].trim();
    }

    investigadores.push(investigador);
  }
  return investigadores;
}


// Función para enviar los datos al API
async function sendPublicaciones(Url, investigadores) {
  for (const investigador of investigadores) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(investigador),
    };
    try {
      const response = await fetch(Url, requestOptions);
      if (response.ok) {
        console.log(`Datos enviados al API con éxito para ID: ${investigador.id}`);
      } else {
        console.error(`Error al enviar los datos al API para ID: ${investigador.id}`);
      }
    } catch (error) {
      console.error(`Error al enviar los datos al API para ID: ${investigador.id}`, error);
    }
  }
  alert('Todos los datos han sido enviados al API con éxito.');
}



////////////////////////////////////////////////////////////////// Mantenimiento /////////////////////////////////////////

 // JavaScript para cargar opciones del select y manejar acciones
 const selectInvestigador = document.getElementById('selectInvestigador');
 const nombreEditar = document.getElementById('nombreEditar');
 const tituloEditar = document.getElementById('tituloEditar');
 const institucionEditar = document.getElementById('institucionEditar');
 const emailEditar = document.getElementById('emailEditar');
 const btnAgregar = document.getElementById('btnAgregar');
 const btnEditar = document.getElementById('btnEditar');

 // Función para cargar opciones del select (debes modificar esto para hacer una solicitud GET)
 function cargarOpcionesSelect() {
     // Simulación de datos de investigadores
     const investigadores = [
         { id: 1, nombre: 'Investigador 1' },
         { id: 2, nombre: 'Investigador 2' },
         { id: 3, nombre: 'Investigador 3' }
     ];

     // Llenar opciones del select
     investigadores.forEach((investigador) => {
         const option = document.createElement('option');
         option.value = investigador.id;
         option.textContent = investigador.nombre;
         selectInvestigador.appendChild(option);
     });
 }

 // Manejar la selección de un investigador en el select
 selectInvestigador.addEventListener('change', () => {
     const selectedId = selectInvestigador.value;
     // Debes obtener los detalles del investigador seleccionado y llenar los campos
     // Esto es solo un ejemplo con datos simulados
     if (selectedId === '1') {
         nombreEditar.value = 'Investigador 1';
         tituloEditar.value = 'Título 1';
         institucionEditar.value = 'Institución 1';
         emailEditar.value = 'investigador1@example.com';
     } else if (selectedId === '2') {
         nombreEditar.value = 'Investigador 2';
         tituloEditar.value = 'Título 2';
         institucionEditar.value = 'Institución 2';
         emailEditar.value = 'investigador2@example.com';
     } else if (selectedId === '3') {
         nombreEditar.value = 'Investigador 3';
         tituloEditar.value = 'Título 3';
         institucionEditar.value = 'Institución 3';
         emailEditar.value = 'investigador3@example.com';
     }
 });

 // Manejar el botón de agregar (debes modificar esto para hacer una solicitud POST)
 btnAgregar.addEventListener('click', () => {
     const nuevoInvestigador = {
         id: document.getElementById('id').value,
         nombre: document.getElementById('nombre').value,
         titulo: document.getElementById('titulo').value,
         institucion: document.getElementById('institucion').value,
         email: document.getElementById('email').value
     };

     // Debes realizar una solicitud POST con los datos del nuevo investigador
     // Esto es solo un ejemplo
     console.log('Agregando investigador:', nuevoInvestigador);
     alert('Investigador agregado con éxito');
 });

 // Manejar el botón de editar (debes modificar esto para hacer una solicitud PUT)
 btnEditar.addEventListener('click', () => {
     const idInvestigador = selectInvestigador.value;
     const investigadorEditado = {
         id: idInvestigador,
         nombre: nombreEditar.value,
         titulo: tituloEditar.value,
         institucion: institucionEditar.value,
         email: emailEditar.value
     };

     // Debes realizar una solicitud PUT con los datos del investigador editado
     // Esto es solo un ejemplo
     console.log('Editando investigador:', investigadorEditado);
     alert('Investigador editado con éxito');
 });

 // Cargar opciones del select al cargar la página
 cargarOpcionesSelect();












/*
  get(apiUrl)
  .then((response) => {
    console.log('Datos de la API:', response);
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });
*/