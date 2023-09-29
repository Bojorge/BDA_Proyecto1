const inv_proy_csv_Url = 'http://localhost:3000/api/asociar_inv_proy/csv';



async function uploadInv_ProyCSV() {
  const csvFileInput = document.getElementById('csvRelacionInvestigadoresProyectos');
  const file = csvFileInput.files[0];

  if (!file) {
    alert('Por favor, selecciona un archivo CSV.');
    return;
  }
  // Lee el contenido del archivo CSV
  const csvData = await readFile(file);

  // Convierte el contenido CSV en un array de objetos
  const Inv_Proy = parseCSV(csvData);

  // Envía los datos al API
  sendInv_Proy(inv_proy_csv_Url, Inv_Proy);
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
  const inv_proy_s = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].split(',');
    const inv_proy = {};

    for (let j = 0; j < headers.length; j++) {
      inv_proy[headers[j].trim()] = line[j].trim();
    }

    inv_proy_s.push(inv_proy);
  }
  return inv_proy_s;
}


// Función para enviar los datos al API
async function sendInv_Proy(Url, inv_proy_s) {
  for (const inv_proy of inv_proy_s) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inv_proy),
    };
    try {
      const response = await fetch(Url, requestOptions);
      if (response.ok) {
        console.log(`Datos enviados al API con éxito para ID: ${inv_proy.idInv} - ${inv_proy.idProy}`);
      } else {
        console.error(`Error al enviar los datos al API para ID: ${inv_proy.idInv} - ${inv_proy.idProy}`);
      }
    } catch (error) {
      console.error(`Error al enviar los datos al API para ID: ${inv_proy.idInv} - ${inv_proy.idProy}`, error);
    }
  }
  alert('Todos los datos han sido enviados al API con éxito.');
}
