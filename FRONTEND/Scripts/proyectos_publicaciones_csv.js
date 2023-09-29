const proy_art_csv_Url = 'http://localhost:3000/api/asociar_proy_art/csv';



async function uploadProy_ArtCSV() {
  const csvFileInput = document.getElementById('csvRelacionPublicacionesProyectos');
  const file = csvFileInput.files[0];

  if (!file) {
    alert('Por favor, selecciona un archivo CSV.');
    return;
  }
  // Lee el contenido del archivo CSV
  const csvData = await readFile(file);

  // Convierte el contenido CSV en un array de objetos
  const Proy_Art = parseCSV(csvData);

  // Envía los datos al API
  sendProy_Art(proy_art_csv_Url, Proy_Art);
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
  const proy_art_s = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const proy_art = {};

    for (let j = 0; j < headers.length; j++) {
      proy_art[headers[j].trim()] = line[j].trim();
    }

    proy_art_s.push(proy_art);
  }
  return proy_art_s;
}


// Función para enviar los datos al API
async function sendProy_Art(Url, proy_art_s) {
  for (const proy_art of proy_art_s) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(proy_art),
    };
    try {
      const response = await fetch(Url, requestOptions);
      if (response.ok) {
        console.log(`Datos enviados al API con éxito para ID: ${proy_art.idProyecto} - ${proy_art.idArt}`);
      } else {
        console.error(`Error al enviar los datos al API para ID: ${proy_art.idProyecto} - ${proy_art.idArt}`);
      }
    } catch (error) {
      console.error(`Error al enviar los datos al API para ID: ${proy_art.idProyecto} - ${proy_art.idArt}`, error);
    }
  }
  alert('Todos los datos han sido enviados al API con éxito.');
}
