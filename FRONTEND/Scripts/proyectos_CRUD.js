const proyectosUrl = 'http://localhost:3000/api/proyectos';


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


////////////////////////////////////////////////////////////////// CSV /////////////////////////////////////////


async function uploadProyectosCSV() {
  const csvFileInput = document.getElementById('csvProyectos');
  const file = csvFileInput.files[0];

  if (!file) {
    alert('Por favor, selecciona un archivo CSV.');
    return;
  }
  // Lee el contenido del archivo CSV
  const csvData = await readFile(file);

  // Convierte el contenido CSV en un array de objetos
  const proyectos = parseCSV(csvData);

  // Envía los datos al API
  sendProyectos(proyectosUrl, proyectos);
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
  const proyectos = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const proyecto = {};

    for (let j = 0; j < headers.length; j++) {
      proyecto[headers[j].trim()] = line[j].trim();
    }

    proyectos.push(proyecto);
  }
  return proyectos;
}


// Función para enviar los datos al API
async function sendProyectos(Url, proyectos) {
  for (const proyecto of proyectos) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proyecto),
    };
    try {
      const response = await fetch(Url, requestOptions);
      if (response.ok) {
        console.log(`Datos enviados al API con éxito para ID: ${proyecto.idPry}`);
      } else {
        console.error(`Error al enviar los datos al API para ID: ${proyecto.idPry}`);
      }
    } catch (error) {
      console.error(`Error al enviar los datos al API para ID: ${proyecto.idPry}`, error);
    }
  }
  alert('Todos los datos han sido enviados al API con éxito.');
}



/*
  get(apiUrl)
  .then((response) => {
    console.log('Datos de la API:', response);
  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });
*/


////////////////////////////////////////////////////////////////// Mantenimiento /////////////////////////////////////////

const idPry = document.getElementById('id');
const titulo_proyecto = document.getElementById('titulo');
const anno_inicio = document.getElementById('anno');
const duracion_meses = document.getElementById('duracion');
const area_conocimiento = document.getElementById('area');

idPry.value = '';
titulo_proyecto.value = '';
anno_inicio.value = '';
duracion_meses.value = '';
area_conocimiento.value = '';

const selectProyecto = document.getElementById('selectProyecto');

const tituloEditar_proy = document.getElementById('tituloEditar');
const annoEditar_proy = document.getElementById('annoEditar');
const duracionEditar_proy = document.getElementById('duracionEditar');
const areaEditar_proy = document.getElementById('areaEditar');
const btnAgregar_proy = document.getElementById('btnAgregar');
const btnEditar_proy = document.getElementById('btnEditar');


// Manejar el botón de agregar (debes modificar esto para hacer una solicitud POST)
btnAgregar_proy.addEventListener('click', () => {
const nuevoProyecto = {
  idPry : document.getElementById('id').value,
  titulo_proyecto : document.getElementById('titulo').value,
  anno_inicio : document.getElementById('anno').value,
  duracion_meses : document.getElementById('duracion').value,
  area_conocimiento : document.getElementById('area').value
};

  create(proyectosUrl, nuevoProyecto);

  //console.log('Agregando proyecto:', nuevoProyecto);
  alert('Proyecto agregado con éxito');
  location.reload();
});

// Manejar el botón de editar (debes modificar esto para hacer una solicitud PUT)
btnEditar_proy.addEventListener('click', () => {
  const idProyecto = selectProyecto.value;
  const proyectoEditado = {
    idPry: idProyecto,
    titulo_proyecto: tituloEditar_proy.value,
    anno_inicio: annoEditar_proy.value,
    duracion_meses: duracionEditar_proy.value,
    area_conocimiento: areaEditar_proy.value
  };

  update(proyectosUrl, proyectoEditado);

  //console.log('Editando proyecto:', proyectoInvestigado);
  alert('Proyecto editado con éxito');
  location.reload();
});

get(proyectosUrl)
.then((response) => {
  console.log('Datos de la API:', response);
  proyectosList.innerHTML = '';

  // Llenar la tabla con los datos de los investigadores
  response.forEach((proyecto) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${proyecto.idPry}</td>
        <td>${proyecto.titulo_proyecto}</td>
        <td>${proyecto.anno_inicio}</td>
        <td>${proyecto.duracion_meses}</td>
        <td>${proyecto.area_conocimiento}</td>
    `;
    proyectosList.appendChild(row);
});

  // Llenar opciones del select
  response.forEach((proyecto) => {
    const option = document.createElement('option');
    option.value = proyecto.idPry;
    option.textContent = `${proyecto.idPry} - ${proyecto.titulo_proyecto}`;
    selectProyecto.appendChild(option);
  });

  tituloEditar_proy.value = '';
  annoEditar_proy.value = '';
  duracionEditar_proy.value = '';
  areaEditar_proy.value = '';

  selectProyecto.addEventListener('change', () => {
    const selectedId = selectProyecto.value;
    // Buscar el proyecto seleccionado en la lista de proyectos
    const selectedProyecto = response.find(
      (proyecto) => proyecto.idPry === selectedId
    );
    if (selectedProyecto) {
      // Actualizar campos de edición con los datos del investigador seleccionado
      tituloEditar_proy.value = selectedProyecto.titulo_proyecto;
      annoEditar_proy.value = selectedProyecto.anno_inicio;
      duracionEditar_proy.value = selectedProyecto.duracion_meses;
      areaEditar_proy.value = selectedProyecto.area_conocimiento;
    }
  });

  })
  .catch((error) => {
    console.error('Error al obtener los datos:', error);
  });