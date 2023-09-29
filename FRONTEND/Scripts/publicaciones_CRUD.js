const publicacionesUrl = 'http://localhost:3000/api/publicaciones';


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


async function uploadPublicacionesCSV() {
  const csvFileInput = document.getElementById('csvPublicaciones');
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
  sendPublicaciones(publicacionesUrl, proyectos);
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
  const publicaciones = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const publicacion = {};

    for (let j = 0; j < headers.length; j++) {
      publicacion[headers[j].trim()] = line[j].trim();
    }

    publicaciones.push(publicacion);
  }
  return publicaciones;
}


// Función para enviar los datos al API
async function sendPublicaciones(Url, publicaciones) {
  for (const publicacion of publicaciones) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(publicacion),
    };
    try {
      const response = await fetch(Url, requestOptions);
      if (response.ok) {
        console.log(`Datos enviados al API con éxito para ID: ${publicacion.idPub}`);
      } else {
        console.error(`Error al enviar los datos al API para ID: ${publicacion.idPub}`);
      }
    } catch (error) {
      console.error(`Error al enviar los datos al API para ID: ${publicacion.idPub}`, error);
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
const idPub = document.getElementById('id');
const titulo_publicacion = document.getElementById('titulo');
const anno_publicacion = document.getElementById('anno');
const nombre_revista = document.getElementById('nombre');

idPub.value = '';
titulo_publicacion.value = '';
anno_publicacion.value = '';
nombre_revista.value = '';

const selectPublicacion = document.getElementById('selectPublicacion');

const tituloEditar_pub = document.getElementById('tituloEditar');
const annoEditar_pub = document.getElementById('annoEditar');
const nombreEditar_pub = document.getElementById('nombreEditar');
const btnAgregar_pub = document.getElementById('btnAgregar');
const btnEditar_pub = document.getElementById('btnEditar');

// Manejar el botón de agregar (debes modificar esto para hacer una solicitud POST)
btnAgregar_pub.addEventListener('click', () => {
    const nuevaPublicacion = {
     idPub : document.getElementById('id').value,
     titulo_publicacion : document.getElementById('titulo').value,
     anno_publicacion : document.getElementById('anno').value,
     nombre_revista : document.getElementById('nombre').value,
    };

    create(publicacionesUrl, nuevaPublicacion);

    //console.log('Agregando publicacipn:', nuevaPublicacion);
    alert('Publicación agregada con éxito');
    location.reload();
});



// Manejar el botón de editar (debes modificar esto para hacer una solicitud PUT)
btnEditar_pub.addEventListener('click', () => {
    const idPublicacion = selectPublicacion.value;
    const publicacionEditada = {
        idPub: idPublicacion,
        titulo_publicacion: tituloEditar_pub.value,
        anno_publicacion: annoEditar_pub.value,
        nombre_revista: nombreEditar_pub.value,
    };

    
    update(publicacionesUrl, publicacionEditada);

    //console.log('Editando publicacion:', pubicacionEditada);
    alert('Publicación editada con éxito');
    location.reload();
});

 get(publicacionesUrl)
 .then((response) => {
   console.log('Datos de la API:', response);
   publicacionesList.innerHTML = '';

   // Llenar la tabla con los datos de los investigadores
   response.forEach((publicacion) => {
     const row = document.createElement('tr');
     row.innerHTML = `
         <td>${publicacion.idPub}</td>
         <td>${publicacion.titulo_publicacion}</td>
         <td>${publicacion.anno_publicacion}</td>
         <td>${publicacion.nombre_revista}</td>
     `;
     publicacionesList.appendChild(row);
 });


 // Llenar opciones del select
 response.forEach((publicacion) => {
   const option = document.createElement('option');
   option.value = publicacion.idPub;
   option.textContent = `${publicacion.idPub} - ${publicacion.titulo_publicacion}`;
   selectPublicacion.appendChild(option);
 });

 tituloEditar_pub.value = '';
 annoEditar_pub.value = '';
 nombreEditar_pub.value = '';

 selectPublicacion.addEventListener('change', () => {
   const selectedId = selectPublicacion.value;
   // Buscar el investigador seleccionado en la lista de investigadores
   const selectedPublicacion = response.find(
     (publicacion) => publicacion.idPub === selectedId
   );
   if (selectPublicacion) {
     // Actualizar campos de edición con los datos del investigador seleccionado
     tituloEditar_pub.value = selectedPublicacion.titulo_publicacion;
     annoEditar_pub.value = selectedPublicacion.anno_publicacion;
     nombreEditar_pub.value = selectedPublicacion.nombre_revista;
   }
 });

 })
 .catch((error) => {
   console.error('Error al obtener los datos:', error);
 });