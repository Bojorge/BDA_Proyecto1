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