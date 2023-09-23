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
  sendInvestigadores(investigadoresUrl, investigadores);
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
async function sendInvestigadores(Url, investigadores) {
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


 const id = document.getElementById('id');
 const nombre_completo = document.getElementById('nombre');
 const titulo_academico = document.getElementById('titulo');
 const institucion = document.getElementById('institucion');
 const email = document.getElementById('email');

 id.value = '';
 nombre_completo.value = '';
 titulo_academico.value = '';
 institucion.value = '';
 email.value = '';

 const selectInvestigador = document.getElementById('selectInvestigador');

 const nombreEditar = document.getElementById('nombreEditar');
 const tituloEditar = document.getElementById('tituloEditar');
 const institucionEditar = document.getElementById('institucionEditar');
 const emailEditar = document.getElementById('emailEditar');
 const btnAgregar = document.getElementById('btnAgregar');
 const btnEditar = document.getElementById('btnEditar');


 

 // Manejar el botón de agregar (debes modificar esto para hacer una solicitud POST)
 btnAgregar.addEventListener('click', () => {
     const nuevoInvestigador = {
      id : document.getElementById('id').value,
      nombre_completo : document.getElementById('nombre').value,
      titulo_academico : document.getElementById('titulo').value,
      institucion : document.getElementById('institucion').value,
      email : document.getElementById('email').value
     };

     create(investigadoresUrl, nuevoInvestigador);

     //console.log('Agregando investigador:', nuevoInvestigador);
     alert('Investigador agregado con éxito');
     location.reload();
 });



 // Manejar el botón de editar (debes modificar esto para hacer una solicitud PUT)
 btnEditar.addEventListener('click', () => {
     const idInvestigador = selectInvestigador.value;
     const investigadorEditado = {
         id: idInvestigador,
         nombre_completo: nombreEditar.value,
         titulo_academico: tituloEditar.value,
         institucion: institucionEditar.value,
         email: emailEditar.value
     };

     
     update(investigadoresUrl, investigadorEditado);

     //console.log('Editando investigador:', investigadorEditado);
     alert('Investigador editado con éxito');
     location.reload();
 });




  get(investigadoresUrl)
  .then((response) => {
    console.log('Datos de la API:', response);
    investigadoresList.innerHTML = '';

    // Llenar la tabla con los datos de los investigadores
    response.forEach((investigador) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${investigador.id}</td>
          <td>${investigador.nombre_completo}</td>
          <td>${investigador.titulo_academico}</td>
          <td>${investigador.institucion}</td>
          <td>${investigador.email}</td>
      `;
      investigadoresList.appendChild(row);
  });


  // Llenar opciones del select
  response.forEach((investigador) => {
    const option = document.createElement('option');
    option.value = investigador.id;
    option.textContent = `${investigador.id} - ${investigador.nombre_completo}`;
    selectInvestigador.appendChild(option);
  });

  nombreEditar.value = '';
  tituloEditar.value = '';
  institucionEditar.value = '';
  emailEditar.value = '';

  selectInvestigador.addEventListener('change', () => {
    const selectedId = selectInvestigador.value;
    // Buscar el investigador seleccionado en la lista de investigadores
    const selectedInvestigador = response.find(
      (investigador) => investigador.id === selectedId
    );
    if (selectedInvestigador) {
      // Actualizar campos de edición con los datos del investigador seleccionado
      nombreEditar.value = selectedInvestigador.nombre_completo;
      tituloEditar.value = selectedInvestigador.titulo_academico;
      institucionEditar.value = selectedInvestigador.institucion;
      emailEditar.value = selectedInvestigador.email;
    }
  });

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });


  